"""Gera os templates das páginas de serviço (tools/pages/solucoes/*.html)."""
import pathlib
OUT = pathlib.Path(__file__).resolve().parent / 'pages' / 'solucoes'
S = [
 dict(slug='bioengenharia', tag='Bioengenharia', title='Bioengenharia de solos', hero='biomanta pos=50%/30%', fotos=['biomanta','talude','revegetado'],
  resumo='Técnicas que combinam vegetação e materiais biodegradáveis para conter erosões, proteger taludes e recuperar áreas degradadas em rodovias, ferrovias e mineração.',
  desc='A bioengenharia de solos utiliza elementos vivos (sementes, mudas e raízes) associados a estruturas de proteção para estabilizar superfícies expostas. A GHB aplica essas técnicas na contenção de erosões, proteção de taludes de rodovias e mineração, recuperação de pilhas de estéril, áreas de empréstimo e bota-foras.',
  apps=['Contenção de erosões laminares e em sulcos','Proteção de taludes de corte e aterro em rodovias e ferrovias','Recuperação de pilhas de estéril e barragens na mineração','Recuperação de Áreas Degradadas (PRAD)'],
  subs=[('Hidrossemeadura & semeadura manual','Projeção mecanizada de mistura de sementes, fertilizantes, mulch e fixadores; semeadura manual em áreas de difícil acesso.'),
        ('Biomantas & biomassa projetada','Mantas de fibras vegetais e biomassa projetada para proteção imediata de taludes íngremes e rochosos.'),
        ('Plantio de capim vetiver','Barreiras vivas com raízes profundas (até 3 m) para estabilização estrutural do solo.')],
  table=[('Hidrossemeadura','Taludes e áreas planas degradadas','Insumos e fixadores de alta fixação'),('Biomantas e biomassa','Taludes de alta inclinação / rochosos','Proteção imediata contra chuva e erosão'),('Capim vetiver','Estabilização profunda de solo','Raízes de alta resistência')],
  ben=['Redução do risco de deslizamento','Conformidade legal e atendimento a condicionantes','Rapidez de germinação e cobertura','Sustentabilidade e baixo impacto']),
 dict(slug='drenagem', tag='Drenagem', title='Dreno & drenagem', hero='dreno pos=50%/55%', fotos=['dreno','biomanta','carga'],
  resumo='Drenagem superficial e profunda e contenção estrutural para controle hídrico de taludes, faixas de domínio e áreas industriais.',
  desc='Projetos e execução de sistemas de drenagem e contenção que controlam o escoamento superficial, reduzem a energia da água e evitam processos erosivos e instabilidades geotécnicas.',
  apps=['Controle hídrico de taludes de corte e aterro','Faixas de domínio rodoviárias e ferroviárias','Áreas de mineração e pátios industriais','Dissipação de energia em descidas d’água'],
  subs=[('Muros de gabião','Estruturas flexíveis e drenantes em pedra e malha metálica.'),('Rip-rap','Enrocamento de proteção para margens e saídas de drenagem.'),('Biorretentores de sedimentos','Retenção de sedimentos com materiais biodegradáveis.')],
  table=[('Gabiões','Contenção de taludes e margens','Estrutura drenante e flexível'),('Rip-rap','Margens e dissipadores','Alta resistência hidráulica'),('Canaletas e descidas d’água','Taludes e bermas','Controle preciso do escoamento'),('Biorretentores','Controle de sedimentos','Solução biodegradável')],
  ben=['Controle de erosões e assoreamento','Aumento da vida útil das estruturas','Conformidade com licenças ambientais','Execução com frota própria']),
 dict(slug='supressao-vegetal', tag='Supressão', title='Supressão vegetal mecanizada e semimecanizada', hero='trator pos=50%/50%', fotos=['trator','carga','equipe'],
  resumo='Limpeza de vegetação de grande porte com Feller Bunchers e escavadeiras multifuncionais, com manejo de fauna e flora.',
  desc='Supressão vegetal autorizada para implantação de empreendimentos, executada com equipamentos florestais de alta produtividade e acompanhamento técnico de fauna e flora, em conformidade com a ASV.',
  apps=['Implantação de linhas de transmissão e dutos','Abertura de cavas e expansões minerárias','Faixas de domínio rodoviárias e ferroviárias','Canteiros de obras de infraestrutura'],
  subs=[('Supressão mecanizada','Feller Bunchers, harvesters e escavadeiras multifuncionais.'),('Supressão semimecanizada','Equipes com motosserras em áreas sensíveis ou de difícil acesso.'),('Manejo de fauna e flora','Afugentamento, resgate e salvamento de germoplasma.')],
  table=[('Mecanizada','Grandes áreas e prazos curtos','Alta produtividade e segurança'),('Semimecanizada','Áreas sensíveis / declivosas','Precisão e baixo impacto'),('Romaneio e cubagem','Material lenhoso','Rastreabilidade para o órgão ambiental')],
  ben=['Cumprimento rigoroso da ASV','Redução de prazos de liberação de frentes','Segurança operacional SSMA','Rastreabilidade do material lenhoso']),
 dict(slug='reflorestamento', tag='Reflorestamento', title='Reflorestamento & plantio compensatório', hero='muda pos=50%/55%', fotos=['muda','revegetado','equipe'],
  resumo='Recomposição florestal nativa, manutenção, cercamento de áreas e controle de pragas para cumprimento de compensações ambientais.',
  desc='Execução de plantios compensatórios e recomposição florestal com espécies nativas, incluindo preparo de solo, plantio, irrigação, manutenção e monitoramento até a entrega ao órgão ambiental.',
  apps=['Compensação ambiental e florestal','Recomposição de APP e Reserva Legal','PRAD em áreas mineradas','Corredores ecológicos'],
  subs=[('Recomposição florestal nativa','Seleção de espécies por grupo ecológico.'),('Manutenção e monitoramento','Coroamento, adubação, replantio e relatórios.'),('Cercamento e controle de pragas','Proteção das áreas e combate a formigas cortadeiras.')],
  table=[('Plantio de nativas','APP, RL e compensação','Alta taxa de sobrevivência'),('Manutenção','Pós-plantio (até 36 meses)','Relatórios técnicos periódicos'),('Cercamento','Isolamento de áreas','Proteção contra gado e fogo')],
  ben=['Cumprimento de condicionantes e TCCAs','Altos índices de sobrevivência','Relatórios para órgãos ambientais','Ganho de biodiversidade e ESG']),
]
for s in S:
    subs = ''.join(f'<div class="card reveal"><h3>{a}</h3><p>{b}</p></div>' for a, b in s['subs'])
    rows = ''.join(f'<tr><td><b>{a}</b></td><td>{b}</td><td>{c}</td></tr>' for a, b, c in s['table'])
    apps = ''.join(f'<li>{a}</li>' for a in s['apps'])
    ben = ''.join(f'<div class="card reveal"><div class="ico">✓</div><h3>{b}</h3></div>' for b in s['ben'])
    hero = '{{foto %s decor eager class=ph-bg}}' % s['hero']
    gal = ''.join('{{gitem %s svc-%s%s}}' % (k, s['slug'], ' big' if i == 0 else '') for i, k in enumerate(s['fotos']))
    opts = ''.join(f'<option{" selected" if t==s["title"] else ""}>{t}</option>' for t in [x['title'] for x in S])
    (OUT / f"{s['slug']}.html").write_text(f'''<!-- title: {s['title']} | Soluções GHB -->
<!-- desc: {s['resumo']} -->
<section class="page-hero has-photo">{hero}<div class="container">
  <nav class="crumb" aria-label="Breadcrumb"><a href="{{root}}index.html">Home</a> › <a href="{{root}}solucoes/index.html">Soluções</a> › {s['title']}</nav>
  <h1>{s['title']}</h1><p>{s['resumo']}</p>
  <a class="btn btn-light" href="{{root}}orcamento.html?servico={s['tag']}">Solicitar orçamento deste serviço</a>
</div></section>
<section class="section"><div class="container layout-side">
  <div>
    <span class="eyebrow">Descrição técnica & aplicações</span><h2>Onde e como aplicamos</h2>
    <p class="lead" style="margin-bottom:1.5rem">{s['desc']}</p>
    <ul class="check-list">{apps}</ul>
    <div class="gallery photo-row" aria-label="Fotos de obras">{gal}</div>
    <div class="grid g3" style="margin-top:2.5rem">{subs}</div>
    <h2 style="margin-top:3.5rem">Soluções e técnicas utilizadas</h2>
    <div class="tbl-wrap" style="margin-top:1rem"><table class="tbl"><thead><tr><th>Solução técnica</th><th>Foco de aplicação</th><th>Diferencial GHB</th></tr></thead><tbody>{rows}</tbody></table></div>
    <h2 style="margin-top:3.5rem">Benefícios técnicos</h2>
    <div class="grid g2" style="margin-top:1rem">{ben}</div>
  </div>
  <aside class="sticky-form" aria-label="Formulário rápido">
    <h3>Dúvidas técnicas ou orçamento</h3><p style="font-size:.88rem;color:var(--muted);margin:.4rem 0 1rem">Resposta da equipe técnica em até 1 dia útil.</p>
    <form class="form" data-validate novalidate>
      <div class="field"><label>Empresa <span class="req">*</span></label><input data-rule="required" name="empresa"><div class="msg"></div></div>
      <div class="field"><label>E-mail corporativo <span class="req">*</span></label><input type="email" data-rule="corp" name="email"><div class="msg"></div></div>
      <div class="field"><label>Telefone <span class="req">*</span></label><input data-rule="tel" name="tel"><div class="msg"></div></div>
      <div class="field"><label>Serviço</label><select name="servico">{opts}</select></div>
      <div class="field"><label>Mensagem <span class="req">*</span></label><textarea rows="3" data-rule="required" name="msg"></textarea><div class="msg"></div></div>
      <label class="consent"><input type="checkbox" name="lgpd"> Concordo com a <a href="{{root}}politicas.html#lgpd">Política de Privacidade</a>.</label>
      <button class="btn btn-primary" style="justify-content:center">Enviar</button>
    </form>
    <div class="form-success"><h3>Mensagem enviada!</h3><p>Nossa equipe técnica retornará em breve.</p></div>
  </aside>
</div></section>
<section class="section alt"><div class="container">
  <div class="head"><div><span class="eyebrow">Obras relacionadas</span><h2>Cases com {s['title'].lower()}</h2></div><a class="btn btn-outline" href="{{root}}obras/index.html?svc={s['tag']}">Ver todas</a></div>
  <div class="carousel" data-cases="{s['tag']}"></div>
</div></section>
<section class="cta-band"><div class="container"><h2>Vamos dimensionar a solução para o seu edital?</h2><p>Envie o termo de referência e receba uma proposta técnica qualificada.</p><a class="btn btn-light" href="{{root}}orcamento.html?servico={s['tag']}">Solicitar proposta técnica</a></div></section>
''', encoding='utf-8')
    print('ok', s['slug'])
