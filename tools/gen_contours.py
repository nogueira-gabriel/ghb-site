"""Gera assets/img/curvas-nivel.svg (traço branco) e curvas-nivel-verde.svg (traço sálvia): curvas de nível
(mapa topográfico) usadas como textura. A cada 5ª curva é mais grossa ("curva mestra").
Python puro (sem dependências). Uso: python3 tools/gen_contours.py [semente]"""
import math, random, sys, pathlib

SEED = int(sys.argv[1]) if len(sys.argv) > 1 else 7
W, H = 1600, 1000          # viewBox
NX, NY = 130, 82           # grade do campo de altura
LEVELS = 26
random.seed(SEED)

# relevo: alguns morros gaussianos + ondulações suaves
hills = [(random.uniform(.1, .9), random.uniform(.1, .9), random.uniform(.12, .3), random.uniform(.6, 1.0)) for _ in range(7)]
waves = [(random.uniform(1.5, 4), random.uniform(1.5, 4), random.uniform(0, 6.28), random.uniform(.05, .12)) for _ in range(4)]
def height(u, v):
    z = sum(a * math.exp(-((u - cx) ** 2 + (v - cy) ** 2) / (2 * r * r)) for cx, cy, r, a in hills)
    return z + sum(a * math.sin(fx * u * 6.28 + fy * v * 6.28 + ph) for fx, fy, ph, a in waves)

grid = [[height(i / (NX - 1), j / (NY - 1)) for i in range(NX)] for j in range(NY)]
lo, hi = min(map(min, grid)), max(map(max, grid))

def edge_pt(key, level):
    kind, i, j = key
    (i2, j2) = (i + 1, j) if kind == 'h' else (i, j + 1)
    a, b = grid[j][i], grid[j2][i2]
    t = (level - a) / (b - a)
    return ((i + (i2 - i) * t) * W / (NX - 1), (j + (j2 - j) * t) * H / (NY - 1))

def contour(level):
    segs = []
    for j in range(NY - 1):
        for i in range(NX - 1):
            a, b, c, d = grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i]
            idx = (a > level) | ((b > level) << 1) | ((c > level) << 2) | ((d > level) << 3)
            top, right, bottom, left = ('h', i, j), ('v', i + 1, j), ('h', i, j + 1), ('v', i, j)
            table = {1: [(left, top)], 2: [(top, right)], 3: [(left, right)], 4: [(right, bottom)],
                     5: [(left, top), (right, bottom)], 6: [(top, bottom)], 7: [(left, bottom)],
                     8: [(left, bottom)], 9: [(top, bottom)], 10: [(top, right), (left, bottom)],
                     11: [(right, bottom)], 12: [(left, right)], 13: [(top, right)], 14: [(left, top)]}
            segs += table.get(idx, [])
    adj = {}
    for s, e in segs:
        adj.setdefault(s, []).append(e); adj.setdefault(e, []).append(s)
    seen, lines = set(), []
    def walk(start):
        chain, cur, prev = [start], start, None
        while True:
            nxt = [n for n in adj[cur] if n != prev and (cur, n) not in seen and (n, cur) not in seen]
            if not nxt: break
            seen.add((cur, nxt[0])); prev, cur = cur, nxt[0]; chain.append(cur)
            if cur == start: break
        return chain
    ends = [k for k, v in adj.items() if len(v) == 1]
    for k in ends + list(adj):
        if any(((k, n) in seen or (n, k) in seen) for n in adj[k]): continue
        ch = walk(k)
        if len(ch) > 3: lines.append([edge_pt(e, level) for e in ch])
    return lines

def path(pts, step=2):
    pts = pts[::step] + ([pts[-1]] if (len(pts) - 1) % step else [])
    if len(pts) < 3: return ''
    mid = lambda p, q: ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
    m = mid(pts[0], pts[1])
    d = 'M%.0f %.0f' % m
    for k in range(1, len(pts) - 1):
        e = mid(pts[k], pts[k + 1])
        d += 'Q%.0f %.0f %.0f %.0f' % (pts[k][0], pts[k][1], e[0], e[1])
    return d

minor, major = [], []
for n in range(1, LEVELS):
    lvl = lo + (hi - lo) * n / LEVELS
    d = ''.join(path(l) for l in contour(lvl))
    (major if n % 5 == 0 else minor).append(d)

def svg(stroke, op_minor, op_major):
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" preserveAspectRatio="xMidYMid slice">'
            '<g fill="none" stroke="%s" stroke-linecap="round" stroke-linejoin="round">'
            '<path stroke-opacity="%s" stroke-width="1.1" d="%s"/>'
            '<path stroke-opacity="%s" stroke-width="2" d="%s"/></g></svg>') % (W, H, stroke, op_minor, ''.join(minor), op_major, ''.join(major))

img = pathlib.Path(__file__).resolve().parent.parent / 'assets' / 'img'
for name, args in (('curvas-nivel.svg', ('#fff', '.11', '.2')),          # sobre fundos escuros
                   ('curvas-nivel-verde.svg', ('#4A7C59', '.2', '.38'))):  # sobre fundos claros
    (img / name).write_text(svg(*args), encoding='utf-8'); print('ok', name)
