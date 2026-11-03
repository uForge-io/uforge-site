#!/usr/bin/env python3
"""Write redirect stubs into the assembled site for pages whose URL changed.

GitHub Pages has no server-side redirects, so each old URL gets a tiny HTML page
with a canonical link, a meta refresh and a JS fallback pointing at the new URL.
The map (old path -> new path, both relative to a language root, trailing slash) lives
in tools/data/redirects.json (copied to .github/data/redirects.json in the public repo).

Usage: make-redirects.py PUBLISH_DIR [--map FILE] [--langs zh ja ...] [--base https://uForge.io/]
Stubs are created for the English root and for every language prefix. A stub is only
written when the new page exists in the assembled site and the old path is not a real page.
"""
import argparse, json, sys
from pathlib import Path
from urllib.parse import quote

TPL = """<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="{abs_new}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url={abs_new}">
<script>location.replace({js_new});</script>
</head><body><p>This page has moved to <a href="{abs_new}">{abs_new}</a>.</p></body></html>
"""

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("publish")
    ap.add_argument("--map", default="tools/data/redirects.json")
    ap.add_argument("--langs", nargs="*", default=["zh", "ja", "es", "de", "fr", "pt", "ru", "ko"])
    ap.add_argument("--base", default="https://uForge.io/")
    a = ap.parse_args()
    root = Path(a.publish)
    mapping = json.loads(Path(a.map).read_text(encoding="utf-8"))
    made = 0
    for prefix, lang in [("", "en")] + [(f"{l}/", l) for l in a.langs]:
        for old, new in mapping.items():
            new_dir = root / (prefix + new)
            old_dir = root / (prefix + old)
            if not (new_dir / "index.html").exists():
                print(f"make-redirects: skip {prefix}{old} (target missing)", file=sys.stderr)
                continue
            if (old_dir / "index.html").exists():
                continue
            abs_new = a.base + quote(prefix + new, safe="/")
            old_dir.mkdir(parents=True, exist_ok=True)
            (old_dir / "index.html").write_text(
                TPL.format(lang=lang, abs_new=abs_new, js_new=json.dumps(abs_new)), encoding="utf-8")
            made += 1
    print(f"make-redirects: wrote {made} stub(s) in {root}")

if __name__ == "__main__":
    main()
