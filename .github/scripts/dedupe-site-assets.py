#!/usr/bin/env python3
"""Share one copy of every binary asset across the nested language sites.

Zensical copies each docs tree's static files into its own build, so after
nesting, site/<lang>/ repeats every image that site/ already has. This script
deletes each byte-identical binary file under site/<lang>/ and rewrites the
relative references in that language's HTML/CSS/XML so they resolve to the
single copy in the site root. Files that differ from the root copy (or have no
root counterpart) are left alone. A final pass verifies that every relative
reference in every rewritten file still resolves; any miss fails the run, so
a deploy never ships broken images.

Usage: dedupe-site-assets.py SITE_DIR LANG [LANG ...]
"""
from __future__ import annotations

import filecmp
import os
import posixpath
import re
import sys
from pathlib import Path
from urllib.parse import quote, unquote

BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".avif",
              ".pdf", ".xlsx", ".zip", ".mp4", ".webm", ".woff", ".woff2"}
TEXT_EXT = {".html", ".css", ".xml", ".json", ".js", ".txt"}
# attribute values / css url() / srcset entries
REF = re.compile(r"""(?P<pre>(?:src|href|poster|data-src|content)=["']|url\(["']?|srcset=["'])(?P<val>[^"')\s>]+)""")


def is_relative(u: str) -> bool:
    return bool(u) and not re.match(r"^([a-zA-Z][a-zA-Z0-9+.-]*:|//|#|/|data:)", u)


def main() -> int:
    site = Path(sys.argv[1]).resolve()
    langs = sys.argv[2:]
    saved = 0
    for lang in langs:
        ldir = site / lang
        removed: set[str] = set()  # paths relative to ldir
        for p in sorted(ldir.rglob("*")):
            if not p.is_file() or p.suffix.lower() not in BINARY_EXT:
                continue
            rel = p.relative_to(ldir)
            root_copy = site / rel
            if root_copy.is_file() and filecmp.cmp(p, root_copy, shallow=False):
                saved += p.stat().st_size
                p.unlink()
                removed.add(rel.as_posix())

        rewritten = 0
        for p in ldir.rglob("*"):
            if not p.is_file() or p.suffix.lower() not in {".html", ".css", ".xml"}:
                continue
            base = p.parent.relative_to(ldir).as_posix()
            text = p.read_text(encoding="utf-8")

            def fix(m: re.Match) -> str:
                val = m.group("val")
                path, tail = re.match(r"([^?#]*)(.*)", val).groups()
                if is_relative(path):
                    tgt = posixpath.normpath(posixpath.join(base, unquote(path)))
                    if tgt in removed:
                        depth = 0 if base == "." else len(base.split("/"))
                        val = "../" * (depth + 1) + quote(tgt, safe="/") + tail
                return m.group("pre") + val

            new_text = REF.sub(fix, text)
            if new_text != text:
                p.write_text(new_text, encoding="utf-8")
                rewritten += 1

        # verify: every relative ref in this language resolves on disk
        bad = []
        for p in ldir.rglob("*"):
            if not p.is_file() or p.suffix.lower() not in {".html", ".css"}:
                continue
            for m in REF.finditer(p.read_text(encoding="utf-8")):
                path = re.match(r"[^?#]*", m.group("val")).group(0)
                if not is_relative(path) or Path(path).suffix.lower() not in BINARY_EXT:
                    continue
                if not (p.parent / unquote(path)).resolve().exists():
                    bad.append((p.relative_to(site).as_posix(), path))
        print(f"{lang}: removed {len(removed)} duplicate files, rewrote {rewritten} files, {len(bad)} unresolved refs")
        for b in bad[:10]:
            print("  UNRESOLVED", b)
        if bad:
            return 1
    print(f"saved {saved / 1e6:.1f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
