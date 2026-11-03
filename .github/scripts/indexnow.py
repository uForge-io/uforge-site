#!/usr/bin/env python3
"""Tell IndexNow search engines (Bing, Yandex, Seznam, Naver...) which pages changed.

Run by the public Pages workflow after a successful deploy. It maps the docs/ files that
changed in the deployed commit to their public URLs, keeps only URLs that really exist in
the assembled site (publish/), and POSTs them to https://api.indexnow.org/indexnow.
Google does not use IndexNow; it relies on the sitemaps.

Usage:
  indexnow.py PUBLISH_DIR [--from REV] [--config tools/data/indexnow.json] [--dry-run]
    --from REV   diff REV..HEAD (default HEAD^); a push that touched only non-page files
                 (config, overrides) changes every page, so those submit the whole sitemap set.
The key file <key>.txt (content = key) is published at the site root (docs/en/<key>.txt).
"""
import argparse, json, subprocess, sys, urllib.request
from pathlib import Path
from urllib.parse import quote

LANGS = ["zh", "ja", "es", "de", "fr", "pt", "ru", "ko"]
GLOBAL_TRIGGERS = ("config/", "overrides/")   # change every page's HTML


def git(*args):
    return subprocess.run(["git", *args], capture_output=True, text=True, check=False)


def page_url(path, publish):
    """docs/<lang>/<rel>.md -> (relative url path) or None."""
    parts = Path(path).parts
    if len(parts) < 3 or parts[0] != "docs" or not path.endswith(".md"):
        return None
    lang, rel = parts[1], "/".join(parts[2:])
    if lang not in ["en"] + LANGS:
        return None
    if rel.startswith("about/others/"):
        return None
    is_index = Path(rel).name == "index.md"
    rel = rel[:-3]
    rel = rel[:-len("index")] if is_index else rel + "/"
    url = ("" if lang == "en" else f"{lang}/") + rel
    return url if (publish / url / "index.html").exists() else None


def all_pages(publish):
    out = []
    for f in publish.rglob("index.html"):
        rel = f.relative_to(publish).parent.as_posix()
        if rel.startswith(("assets", "search")) or "/assets/" in rel:
            continue
        if rel.startswith("about/others/") or "/about/others/" in rel:
            continue
        out.append("" if rel == "." else rel + "/")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("publish")
    ap.add_argument("--from", dest="rev", default="HEAD^")
    ap.add_argument("--config", default="tools/data/indexnow.json")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    publish = Path(a.publish)
    cfg = json.loads(Path(a.config).read_text(encoding="utf-8"))
    host, key = cfg["host"], cfg["key"]

    d = git("diff", "--name-only", a.rev, "HEAD")
    if d.returncode:
        print(f"indexnow: cannot diff {a.rev}..HEAD ({d.stderr.strip()}); nothing submitted")
        return 0
    changed = [x for x in d.stdout.splitlines() if x]
    if any(x.startswith(GLOBAL_TRIGGERS) for x in changed):
        urls = all_pages(publish)
    else:
        urls = sorted({u for u in (page_url(x, publish) for x in changed) if u is not None})
    urls = [f"https://{host}/{quote(u, safe='/')}" for u in urls]
    if not urls:
        print("indexnow: no changed pages to submit")
        return 0
    print(f"indexnow: {len(urls)} URL(s)")
    if a.dry_run:
        print("\n".join(urls[:20]))
        return 0
    for i in range(0, len(urls), 10000):
        body = json.dumps({"host": host, "key": key, "keyLocation": f"https://{host}/{key}.txt",
                           "urlList": urls[i:i + 10000]}).encode()
        req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body,
                                     headers={"Content-Type": "application/json; charset=utf-8"})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                print(f"indexnow: HTTP {r.status}")
        except Exception as e:   # never fail a deploy over this
            print(f"indexnow: submission failed ({e})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
