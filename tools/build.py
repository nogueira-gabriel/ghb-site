"""Gera as páginas estáticas do site GHB a partir de templates em tools/pages/.

Uso: python3 tools/build.py

Além de copiar os templates (substituindo {root} pelo caminho relativo até a raiz), o build:
  * expande as macros de foto, que leem o catálogo tools/fotos.json:
      {{foto CHAVE [sm] [eager] [defer] [decor] [pos=50%/40%] [class=x] [id=y]}}  -> <img> otimizada
      (defer = só baixa depois do load da página; usado nos slides 2+ do hero)
      {{gitem CHAVE GRUPO [big]}}                                          -> miniatura que abre o lightbox
      {{icon NOME [sm|lg]}}                                                 -> ícone do sprite (tools/icons/NOME.svg)
  * monta o sprite de ícones (tools/icons/*.svg) e o embute no começo de cada página;
  * gera assets/js/fotos.js com o mesmo catálogo (usado pelo main.js nos cards renderizados via JS).
"""
import html
import json
import pathlib
import re

BASE = pathlib.Path(__file__).resolve().parent.parent
SRC = BASE / 'tools' / 'pages'
FOTOS = json.loads((BASE / 'tools' / 'fotos.json').read_text(encoding='utf-8'))
ICONS = BASE / 'tools' / 'icons'

HEAD = '''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title><meta name="description" content="{desc}">
<meta name="theme-color" content="#1E4620"><link rel="icon" href="{root}assets/img/favicon.svg">
<link rel="preload" href="{root}assets/fonts/montserrat-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{root}assets/fonts/open-sans-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{root}assets/css/style.css"></head>
<body data-root="{root}">{sprite}<div id="header"></div><main id="main">
'''
TAIL = '''</main><div id="footer"></div><script src="{root}assets/js/fotos.js"></script><script src="{root}assets/js/main.js"></script></body></html>
'''


def foto_url(key, small=False):
    return '{root}assets/img/fotos/%s%s.jpg' % (FOTOS[key]['file'], '-sm' if small else '')


def macro_foto(args):
    key, *opts = args.split()
    flags = {o for o in opts if '=' not in o}
    kv = dict(o.split('=', 1) for o in opts if '=' in o)
    f, sm = FOTOS[key], 'sm' in flags
    n = 560 if sm else 940
    a = ['%s="%s"' % ('data-src' if 'defer' in flags else 'src', foto_url(key, sm))]
    if sm:
        a.append('srcset="%s 560w, %s 940w" sizes="(max-width:640px) 92vw, (max-width:1000px) 46vw, 380px"'
                 % (foto_url(key, True), foto_url(key)))
    a.append('alt="%s"' % ('' if 'decor' in flags else html.escape(f['alt'], quote=True)))
    a.append('width="%d" height="%d"' % (n, n))
    if 'eager' in flags:
        a.append('loading="eager" fetchpriority="high"')
    elif 'defer' not in flags:
        a.append('loading="lazy"')
    a.append('decoding="async"')
    for attr in ('class', 'id'):
        if attr in kv:
            a.append('%s="%s"' % (attr, kv[attr]))
    if 'pos' in kv:
        a.append('style="object-position:%s"' % kv['pos'].replace('/', ' '))
    return '<img %s>' % ' '.join(a)


def macro_gitem(args):
    key, group, *opts = args.split()
    f, big = FOTOS[key], 'big' in opts
    cap = html.escape(f['cap'], quote=True)
    return ('<button type="button" class="g-item%s" data-lightbox="%s" data-full="%s" data-alt="%s" data-cap="%s" '
            'aria-label="Ampliar foto: %s">%s<span class="cap">%s</span></button>'
            % (' big' if big else '', group, foto_url(key), html.escape(f['alt'], quote=True), cap, cap,
               macro_foto('%s decor%s' % (key, '' if big else ' sm')), cap))


def build_sprite():
    """Um <symbol> por arquivo de tools/icons. Todos herdam a cor do texto (currentColor)."""
    out = ['<svg xmlns="http://www.w3.org/2000/svg" class="sprite" aria-hidden="true" focusable="false">']
    for f in sorted(ICONS.glob('*.svg')):
        t = f.read_text(encoding='utf-8')
        vb = re.search(r'viewBox="([^"]+)"', t).group(1)
        inner = re.sub(r'^.*?<svg[^>]*>|</svg>\s*$', '', t, flags=re.S).strip()
        out.append('<symbol id="i-%s" viewBox="%s">%s</symbol>' % (f.stem, vb, inner))
    out.append('</svg>')
    return ''.join(out)


def macro_icon(args):
    name, *opts = args.split()
    assert (ICONS / (name + '.svg')).exists(), 'ícone inexistente: ' + name
    cls = ' '.join(['i'] + ['i-' + o for o in opts])
    return '<svg class="%s" aria-hidden="true" focusable="false"><use href="#i-%s"/></svg>' % (cls, name)


def expand(text):
    text = re.sub(r'\{\{\s*foto\s+([^}]*?)\s*\}\}', lambda m: macro_foto(m.group(1)), text)
    text = re.sub(r'\{\{\s*gitem\s+([^}]*?)\s*\}\}', lambda m: macro_gitem(m.group(1)), text)
    return re.sub(r'\{\{\s*icon\s+([^}]*?)\s*\}\}', lambda m: macro_icon(m.group(1)), text)


# catálogo para o main.js (cards e galerias renderizados no navegador)
(BASE / 'assets' / 'js' / 'fotos.js').write_text(
    '/* GERADO por tools/build.py a partir de tools/fotos.json: não editar à mão. */\n'
    'const FOTO = %s;\n' % json.dumps(FOTOS, ensure_ascii=False, indent=2), encoding='utf-8')

SPRITE = build_sprite()
for f in sorted(SRC.rglob('*.html')):
    rel = f.relative_to(SRC)
    raw = f.read_text(encoding='utf-8')
    meta = dict(re.findall(r'^<!--\s*(\w+):\s*(.*?)\s*-->$', raw, re.M))
    body = expand(re.sub(r'^<!--\s*\w+:.*?-->\n', '', raw, flags=re.M))
    root = '../' * (len(rel.parts) - 1)
    out = BASE / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(HEAD.format(title=meta.get('title', 'GHB'), desc=meta.get('desc', ''), root=root, sprite=SPRITE)
                   + body.replace('{root}', root) + TAIL.format(root=root), encoding='utf-8')
    print('ok', rel)
