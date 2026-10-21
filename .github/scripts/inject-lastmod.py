#!/usr/bin/env python3
"""Stamp last-modified dates into built HTML and sitemaps (reads lastmod.json).

For each page: JSON-LD Article/TechArticle/BlogPosting gets dateModified, a
<meta property="article:modified_time"> is added, and a visible
"Last updated: YYYY-MM-DD" line (localized) is appended to the article body.
Each sitemap <url> gets <lastmod>.

Usage: inject-lastmod.py <site_dir> [--prefix zh/] [--map docs/lastmod.json]
  site root of the published site: no prefix; a per-language build dir
  (site_zh): --prefix zh/ ; language is inferred from the prefix.
"""
import argparse, json, os, re, sys

LABEL = {"en": "Last updated", "zh": "最后更新", "ja": "最終更新", "es": "Última actualización",
         "de": "Zuletzt aktualisiert", "fr": "Dernière mise à jour", "pt": "Última atualização",
         "ru": "Последнее обновление", "ko": "최종 업데이트"}
LANGS = set(LABEL)
LD = re.compile(r'(<script type="application/ld\+json">)(.*?)(</script>)', re.S)


def lang_of(key):
    p = key.split("/", 1)[0]
    return p if p in LANGS and p != "en" else "en"


def patch_html(path, key, date, lang):
    s = open(path, encoding="utf-8").read()
    if "article:modified_time" in s:
        return False

    def ld(m):
        try: j = json.loads(m.group(2))
        except Exception: return m.group(0)
        for n in j.get("@graph", []):
            if n.get("@type") in ("Article", "TechArticle", "BlogPosting"):
                n["dateModified"] = date
        return m.group(1) + "\n" + json.dumps(j, ensure_ascii=False, indent=2) + "\n" + m.group(3)
    s = LD.sub(ld, s, count=1)
    meta = f'<meta property="article:modified_time" content="{date}">'
    s = s.replace("</head>", meta + "\n</head>", 1)
    line = (f'<p class="uf-lastmod" style="font-size:.7rem;opacity:.7;margin-top:2rem">'
            f'{LABEL[lang]}: <time datetime="{date}">{date}</time></p>\n')
    i = s.find("</article>")
    if i > 0: s = s[:i] + line + s[i:]
    open(path, "w", encoding="utf-8").write(s)
    return True


def patch_sitemap(path, prefix, m):
    s = open(path, encoding="utf-8").read()
    if "<lastmod>" in s: return 0
    n = 0
    def rep(mm):
        nonlocal n
        loc = mm.group(1)
        key = re.sub(r"^https?://[^/]+/", "", loc)
        if prefix and not key.startswith(prefix): key = prefix + key
        d = m.get(key)
        if not d: return mm.group(0)
        n += 1
        return f"<loc>{loc}</loc>\n        <lastmod>{d}</lastmod>"
    s = re.sub(r"<loc>([^<]+)</loc>", rep, s)
    open(path, "w", encoding="utf-8").write(s)
    return n


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("site"); ap.add_argument("--prefix", default="")
    ap.add_argument("--map", default="docs/lastmod.json", help="path relative to the current directory (run from the repo root)")
    a = ap.parse_args()
    m = json.load(open(a.map, encoding="utf-8"))
    h = 0
    for dp, _, fs in os.walk(a.site):
        for f in fs:
            full = os.path.join(dp, f)
            rel = os.path.relpath(full, a.site).replace(os.sep, "/")
            if f == "index.html":
                key = a.prefix + rel[:-len("index.html")]
                d = m.get(key)
                if d and patch_html(full, key, d, lang_of(key)): h += 1
            elif f == "sitemap.xml":
                patch_sitemap(full, a.prefix if rel == "sitemap.xml" else "", m)
    print(f"inject-lastmod: {h} pages stamped in {a.site}")


if __name__ == "__main__":
    main()
