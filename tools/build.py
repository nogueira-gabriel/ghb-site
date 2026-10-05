"""Gera as páginas estáticas do site GHB a partir de templates em tools/pages/.
Uso: python3 tools/build.py"""
import pathlib, re
BASE = pathlib.Path(__file__).resolve().parent.parent
SRC = BASE / 'tools' / 'pages'
HEAD = '''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="{desc}">
<meta name="theme-color" content="#1E4620"><link rel="icon" href="{root}assets/img/favicon.svg">
<link rel="stylesheet" href="{root}assets/css/style.css"></head>
<body data-root="{root}"><div id="header"></div><main id="main">
'''
TAIL = '''</main><div id="footer"></div><script src="{root}assets/js/main.js"></script></body></html>
'''
for f in sorted(SRC.rglob('*.html')):
    rel = f.relative_to(SRC)
    raw = f.read_text(encoding='utf-8')
    meta = dict(re.findall(r'^<!--\s*(\w+):\s*(.*?)\s*-->$', raw, re.M))
    body = re.sub(r'^<!--\s*\w+:.*?-->\n', '', raw, flags=re.M)
    root = '../' * (len(rel.parts) - 1)
    out = BASE / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(HEAD.format(title=meta.get('title', 'GHB'), desc=meta.get('desc', ''), root=root)
                   + body.replace('{root}', root) + TAIL.format(root=root), encoding='utf-8')
    print('ok', rel)
