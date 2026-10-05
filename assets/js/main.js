/* GHB: layout compartilhado (topo, rodapé), componentes e validação de formulários.
   Depende de assets/js/fotos.js (catálogo de fotos) e do sprite de ícones embutido em cada página. */
const ROOT = document.body.dataset.root || '';
const IMG = ROOT + 'assets/img/';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Contatos institucionais. TODO: trocar LINKEDIN e INSTAGRAM pelos perfis oficiais da GHB.
const EMAIL = 'ghbrevegetacao@ghbrevegetacao.com.br';
const LINKEDIN = 'https://www.linkedin.com';
const INSTAGRAM = 'https://www.instagram.com';

// Ícone do sprite (tools/icons). Tamanhos: sm (16px), padrão (20px), lg (28px).
const icon = (nome, tam) => `<svg class="i${tam ? ' i-' + tam : ''}" aria-hidden="true" focusable="false"><use href="#i-${nome}"/></svg>`;

/* ------------------------------------------------------------------ dados */
const SERVICES = [
  {slug: 'drenagem', icon: 'drenagem', foto: 'dreno', t: 'Drenagem e contenção estrutural', tag: 'Drenagem',
   a: 'Muros de gabião, rip-rap, biorretentores de sedimentos e controle hídrico de taludes.'},
  {slug: 'bioengenharia', icon: 'bioengenharia', foto: 'biomanta', t: 'Bioengenharia de solos', tag: 'Bioengenharia',
   a: 'Hidrossemeadura mecanizada, biomantas, biomassa projetada e plantio de capim vetiver.'},
  {slug: 'supressao-vegetal', icon: 'supressao', foto: 'trator', t: 'Supressão vegetal mecanizada', tag: 'Supressão',
   a: 'Limpeza de vegetação de grande porte com Feller Bunchers, escavadeiras multifuncionais e manejo de fauna e flora.'},
  {slug: 'reflorestamento', icon: 'reflorestamento', foto: 'muda', t: 'Reflorestamento e plantio compensatório', tag: 'Reflorestamento',
   a: 'Recomposição florestal nativa, manutenção, cercamento de áreas e controle de pragas agrícolas e florestais.'}
];

/* ATENÇÃO: só as FOTOS dos cases são reais (catálogo em tools/fotos.json). Títulos, números, locais e
   depoimentos abaixo são EXEMPLOS e precisam ser trocados pelos dados reais de cada obra antes de publicar. */
const CASES = [
  {id: 'talude-complexo-minerario', t: 'Estabilização de talude e hidrossemeadura em complexo minerário', seg: 'Mineração', svc: 'Bioengenharia',
   area: '45.000 m²', prazo: '60 dias', local: 'Quadrilátero Ferrífero/MG', foto: 'revegetado', gal: ['revegetado', 'talude', 'biomanta'],
   desc: 'Recuperação de taludes de pilha de estéril com hidrossemeadura mecanizada, aplicação de biomanta antierosiva e canaletas de drenagem superficial, garantindo cobertura vegetal antes do período chuvoso.',
   kpis: [['45.000 m²', 'área tratada'], ['60 dias', 'prazo de execução'], ['92%', 'cobertura vegetal em 90 dias'], ['0', 'acidentes com afastamento']],
   quote: ['Entrega dentro do cronograma e com rigor de SSMA compatível com o nosso padrão corporativo.', 'Gerência de Meio Ambiente, mineradora cliente']},
  {id: 'rodovia-protecao-taludes', t: 'Proteção de taludes de corte com biomanta em concessionária rodoviária', seg: 'Rodovias', svc: 'Bioengenharia',
   area: '28.000 m²', prazo: '45 dias', local: 'BR-040/MG', foto: 'biomanta', gal: ['biomanta', 'talude', 'revegetado'],
   desc: 'Aplicação de biomantas e biomassa projetada em taludes de corte de alta inclinação, com plantio de capim vetiver nas cristas para estabilização profunda.',
   kpis: [['28.000 m²', 'área protegida'], ['45 dias', 'prazo'], ['12 km', 'de trecho atendido'], ['100%', 'conformidade com projeto']],
   quote: ['Solução definitiva para os pontos críticos de erosão do trecho.', 'Coordenação de Conservação, concessionária']},
  {id: 'ferrovia-drenagem', t: 'Drenagem e gabiões em faixa de domínio ferroviária', seg: 'Ferrovias', svc: 'Drenagem',
   area: '3,2 km', prazo: '90 dias', local: 'Região Central/MG', foto: 'dreno', gal: ['dreno', 'carga', 'caminhao'],
   desc: 'Implantação de muros de gabião, rip-rap e dispositivos de dissipação de energia ao longo da faixa de domínio ferroviária.',
   kpis: [['3,2 km', 'de drenagem'], ['1.800 m³', 'de gabião'], ['90 dias', 'prazo'], ['0', 'paralisações da via']],
   quote: ['Execução sem interferir na operação ferroviária.', 'Engenharia de Via Permanente']},
  {id: 'supressao-linha-transmissao', t: 'Supressão vegetal mecanizada em linha de transmissão', seg: 'Energia', svc: 'Supressão',
   area: '120 ha', prazo: '75 dias', local: 'Norte de Minas/MG', foto: 'trator', gal: ['trator', 'carga', 'equipe'],
   desc: 'Supressão mecanizada com Feller Bunchers e escavadeiras florestais, com resgate e afugentamento de fauna e romaneio do material lenhoso.',
   kpis: [['120 ha', 'suprimidos'], ['75 dias', 'prazo'], ['3.400 m³', 'lenha romaneada'], ['100%', 'fauna acompanhada']],
   quote: ['Equipe técnica e frota própria fizeram a diferença no prazo.', 'Gestão Ambiental de Obra, transmissora']},
  {id: 'reflorestamento-compensatorio', t: 'Plantio compensatório de espécies nativas em APP', seg: 'Mineração', svc: 'Reflorestamento',
   area: '38 ha', prazo: '24 meses (manutenção)', local: 'Conselheiro Lafaiete/MG', foto: 'muda', gal: ['muda', 'revegetado', 'equipe'],
   desc: 'Recomposição florestal com mais de 60 espécies nativas da Mata Atlântica, cercamento, controle de formigas e manutenção por 24 meses.',
   kpis: [['63.000', 'mudas plantadas'], ['38 ha', 'recompostos'], ['94%', 'índice de sobrevivência'], ['60+', 'espécies nativas']],
   quote: ['Relatórios de monitoramento impecáveis para o órgão ambiental.', 'Consultoria ambiental parceira']},
  {id: 'porto-hidrossemeadura', t: 'Revegetação de áreas de bota-fora em terminal portuário', seg: 'Infraestrutura', svc: 'Bioengenharia',
   area: '60.000 m²', prazo: '50 dias', local: 'Litoral/ES', foto: 'talude', gal: ['talude', 'revegetado', 'biomanta'],
   desc: 'Hidrossemeadura com fixadores de alta aderência em solo arenoso salino e controle de sedimentos com biorretentores.',
   kpis: [['60.000 m²', 'revegetados'], ['50 dias', 'prazo'], ['85%', 'cobertura em 60 dias'], ['ISO', 'padrões atendidos']],
   quote: ['Resultado acima do esperado em solo muito desafiador.', 'Meio Ambiente, terminal portuário']}
];

/* ------------------------------------------------------------- componentes */
// <img> de uma foto do catálogo (FOTO, gerado de tools/fotos.json). sm = versão de 560px para cards.
function foto(k, o = {}) {
  const p = FOTO[k], base = `${IMG}fotos/${p.file}`, n = o.sm ? 560 : 940;
  const set = o.sm ? ` srcset="${base}-sm.jpg 560w, ${base}.jpg 940w" sizes="(max-width:640px) 92vw, (max-width:1000px) 46vw, 380px"` : '';
  return `<img src="${base}${o.sm ? '-sm' : ''}.jpg"${set} alt="${o.decor ? '' : p.alt}" width="${n}" height="${n}" loading="lazy" decoding="async">`;
}

// Miniatura de galeria que abre o lightbox (grupo = fotos navegáveis juntas).
function gitem(k, grupo, big) {
  const p = FOTO[k];
  return `<button type="button" class="g-item${big ? ' big' : ''}" data-lightbox="${grupo}" data-full="${IMG}fotos/${p.file}.jpg" data-alt="${p.alt}" data-cap="${p.cap}" aria-label="Ampliar foto: ${p.cap}">${foto(k, {sm: !big, decor: true})}<span class="cap">${p.cap}</span></button>`;
}

function serviceCard(s) {
  const url = `${ROOT}solucoes/${s.slug}.html`;
  return `<article class="card card-link">
    <a class="card-photo" href="${url}" tabindex="-1" aria-hidden="true">${foto(s.foto, {sm: true, decor: true})}</a>
    <div class="card-body">
      <span class="icon-box">${icon(s.icon, 'lg')}</span>
      <h3>${s.t}</h3>
      <p><b>Aplicações:</b> ${s.a}</p>
      <div class="card-actions"><a class="link" href="${url}">Saiba mais</a><a class="link" href="${ROOT}obras/index.html?svc=${s.tag}">Ver obras</a></div>
    </div></article>`;
}

function caseCard(c) {
  const url = `${ROOT}obras/case.html?id=${c.id}`;
  return `<article class="card card-link" data-seg="${c.seg}" data-svc="${c.svc}">
    <a class="card-photo" href="${url}" tabindex="-1" aria-hidden="true">${foto(c.foto, {sm: true, decor: true})}</a>
    <div class="card-body">
      <div class="tags"><span class="tag">${c.seg}</span><span class="tag">${c.svc}</span></div>
      <h3>${c.t}</h3>
      <p>${c.local}</p>
      <dl class="meta"><div><dt>Área</dt><dd>${c.area}</dd></div><div><dt>Prazo</dt><dd>${c.prazo}</dd></div></dl>
      <div class="card-actions"><a class="btn btn-outline btn-sm btn-block" href="${url}">Ver case completo</a></div>
    </div></article>`;
}

function topbar() {
  return `<div class="topbar"><div class="container">
    <div class="topbar-contact">
      <a href="tel:+553137645000">${icon('telefone', 'sm')}<span>(31) 3764-5000</span></a>
      <a class="topbar-mail" href="mailto:${EMAIL}">${icon('email', 'sm')}<span>${EMAIL}</span></a>
    </div>
    <div class="topbar-social">
      <a href="${LINKEDIN}" target="_blank" rel="noopener" aria-label="LinkedIn da GHB">${icon('linkedin', 'sm')}</a>
      <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram da GHB">${icon('instagram', 'sm')}</a>
    </div></div></div>`;
}

function header() {
  const ativo = k => location.pathname.includes(k) ? 'active' : '';
  return `<a class="skip" href="#main">Pular para o conteúdo</a>${topbar()}
  <header class="site-header"><div class="container nav">
    <a class="logo" href="${ROOT}index.html" aria-label="GHB, página inicial"><span class="logo-mark">GHB</span><span class="logo-text">GHB<small>Revegetação Ambiental</small></span></a>
    <ul class="menu" id="menu">
      <li><a class="${ativo('institucional')}" href="${ROOT}institucional.html">A GHB</a></li>
      <li><a class="${ativo('solucoes')}" href="${ROOT}solucoes/index.html">Soluções</a></li>
      <li><a class="${ativo('obras')}" href="${ROOT}obras/index.html">Obras</a></li>
      <li><a class="${ativo('conteudos')}" href="${ROOT}conteudos.html">Conteúdos</a></li>
      <li><a class="${ativo('contato')}" href="${ROOT}contato.html">Contato</a></li>
    </ul>
    <div class="nav-cta">
      <button type="button" class="btn btn-outline btn-sm hide-md" data-open-login>${icon('cadeado', 'sm')}Área do colaborador</button>
      <a class="btn btn-primary btn-sm" href="${ROOT}orcamento.html">Solicitar orçamento B2B</a>
      <button type="button" class="icon-btn" data-open-drawer aria-label="Menu institucional: políticas, downloads e acessibilidade" title="Políticas, downloads e acessibilidade">${icon('grade')}</button>
      <button type="button" class="icon-btn mobile-toggle" id="mtoggle" aria-label="Abrir navegação">${icon('menu')}</button>
    </div></div></header>
  <div class="drawer-bg" data-close-drawer></div>
  <aside class="drawer" id="drawer" aria-label="Menu institucional">
    <div class="drawer-top"><a class="logo" href="${ROOT}index.html"><span class="logo-mark">GHB</span></a><button type="button" class="icon-btn" data-close-drawer aria-label="Fechar">${icon('fechar')}</button></div>
    <h4>Políticas corporativas</h4><ul><li><a href="${ROOT}politicas.html#lgpd">Política de Privacidade e LGPD</a></li><li><a href="${ROOT}politicas.html#compliance">Compliance e Código de Conduta</a></li><li><a href="${ROOT}politicas.html#ssma">Política de SSMA</a></li></ul>
    <h4>Transparência</h4><ul><li><a href="${ROOT}institucional.html#esg">Relatórios de transparência</a></li><li><a href="${ROOT}institucional.html#esg">Relatório de igualdade salarial</a></li></ul>
    <h4>Canais</h4><ul><li><a href="${ROOT}politicas.html#etica">Canal de ética, sugestões e reclamações</a></li><li><a href="${ROOT}trabalhe-conosco.html">Trabalhe conosco e envio de currículos</a></li><li><a href="${ROOT}politicas.html#downloads">Downloads</a></li></ul>
    <h4>Acessibilidade</h4><ul><li><a href="#" data-a11y="big">Aumentar fonte</a></li><li><a href="#" data-a11y="contrast">Alto contraste</a></li></ul>
  </aside>
  <div class="modal" id="login" role="dialog" aria-modal="true" aria-labelledby="lt"><div class="modal-box">
    <button type="button" class="icon-btn" data-close-login aria-label="Fechar">${icon('fechar')}</button>
    <h2 id="lt">Área do colaborador</h2><p>Acesso restrito a colaboradores.</p>
    <form class="form" id="loginForm" novalidate>
      <div class="field"><label for="lu">E-mail ou usuário institucional</label><input id="lu" required autocomplete="username"><div class="msg"></div></div>
      <div class="field"><label for="lp">Senha</label><input id="lp" type="password" required autocomplete="current-password"><div class="msg"></div></div>
      <button class="btn btn-primary btn-block" type="submit">Acessar intranet</button>
      <a class="link" href="#" id="forgot" style="text-align:center">Esqueceu a senha?</a>
    </form></div></div>`;
}

function footer() {
  const linha = (nome, html) => `<li class="f-line">${icon(nome)}<span>${html}</span></li>`;
  return `<footer class="site-footer"><div class="container foot-grid">
    <div>
      <a class="logo" href="${ROOT}index.html"><span class="logo-mark">GHB</span><span class="logo-text">GHB<small style="color:#9fc0a6">Revegetação Ambiental</small></span></a>
      <p>Engenharia ambiental e bioengenharia de alta complexidade para mineração, ferrovias, rodovias, portos e energia. Desde 1997.</p>
      <div class="badge-row"><span class="badge">ISO 9001</span><span class="badge">ISO 14001</span><span class="badge">ISO 45001</span></div>
    </div>
    <div><h4>Soluções</h4><ul>${SERVICES.map(s => `<li><a href="${ROOT}solucoes/${s.slug}.html">${s.t}</a></li>`).join('')}</ul></div>
    <div><h4>Contato e unidades</h4><ul>
      ${linha('localizacao', '<b>Sede:</b> Rodovia BR 482, nº 1516, Conselheiro Lafaiete/MG')}
      ${linha('localizacao', '<b>Escritório:</b> R. Antônio de Albuquerque Brandão, 10, Conselheiro Lafaiete/MG')}
      ${linha('telefone', '<a href="tel:+553137645000">(31) 3764-5000</a> / <a href="tel:+553137613347">(31) 3761-3347</a>')}
      ${linha('email', `<a href="mailto:${EMAIL}">${EMAIL}</a>`)}
    </ul></div>
    <div>
      <h4>Links rápidos</h4><ul><li><a href="${ROOT}intranet/index.html">Intranet</a></li><li><a href="${ROOT}trabalhe-conosco.html">Trabalhe conosco</a></li></ul>
      <h4 style="margin-top:32px">Redes sociais</h4>
      <ul class="social"><li><a href="${LINKEDIN}" target="_blank" rel="noopener">${icon('linkedin')}LinkedIn</a></li><li><a href="${INSTAGRAM}" target="_blank" rel="noopener">${icon('instagram')}Instagram</a></li></ul>
    </div></div>
    <div class="container foot-bottom"><span>2026 © GHB Revegetação Ambiental. Todos os direitos reservados.</span><a href="${ROOT}politicas.html#lgpd">Políticas de Privacidade</a></div></footer>`;
}

$('#header').outerHTML = header();
$('#footer').outerHTML = footer();

/* ------------------------------------------------------ interações globais */
const drawer = $('#drawer'), drawerBg = $('.drawer-bg'), login = $('#login');
const fecharMenus = () => { login.classList.remove('open'); drawer.classList.remove('open'); drawerBg.classList.remove('open'); };
$$('[data-open-drawer]').forEach(b => b.onclick = () => { drawer.classList.add('open'); drawerBg.classList.add('open'); });
$$('[data-close-drawer]').forEach(b => b.onclick = () => { drawer.classList.remove('open'); drawerBg.classList.remove('open'); });
document.addEventListener('click', e => { if (e.target.closest('[data-open-login]')) { e.preventDefault(); login.classList.add('open'); $('#lu').focus(); } });
$$('[data-close-login]').forEach(b => b.onclick = () => login.classList.remove('open'));
login.onclick = e => { if (e.target === login) login.classList.remove('open'); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharMenus(); });
$('#mtoggle').onclick = () => $('#menu').classList.toggle('open');
$$('[data-a11y]').forEach(a => a.onclick = e => { e.preventDefault(); document.body.classList.toggle('a11y-' + a.dataset.a11y); });
$('#forgot').onclick = e => { e.preventDefault(); alert('Um link de redefinição será enviado ao seu e-mail institucional. Em caso de dúvidas, contate o setor de TI.'); };
$('#loginForm').onsubmit = e => {
  e.preventDefault();
  let ok = true;
  ['#lu', '#lp'].forEach(sel => {
    const campo = $(sel).parentElement, v = $(sel).value.trim();
    campo.classList.toggle('err', !v);
    campo.querySelector('.msg').textContent = v ? '' : 'Campo obrigatório';
    if (!v) ok = false;
  });
  if (ok) { try { sessionStorage.setItem('ghb_user', $('#lu').value.trim()); } catch (_) {} location.href = ROOT + 'intranet/index.html'; }
};

/* ------------------------------------------------------ listas data-driven */
$$('[data-services]').forEach(el => el.innerHTML = SERVICES.map(serviceCard).join(''));
$$('[data-cases]').forEach(el => {
  const f = el.dataset.cases;
  let lista = CASES;
  if (f && f !== 'all' && !/^\d+$/.test(f)) lista = CASES.filter(c => c.svc === f);
  if (/^\d+$/.test(f)) lista = CASES.slice(0, +f);
  el.innerHTML = lista.map(caseCard).join('');
});

// Filtros de cases. data-single: uma aba por vez; data-max no #caseGrid: limite de cards visíveis.
const fw = $('#caseFilters');
if (fw) {
  const estado = {seg: 'Todos', svc: 'Todos'}, unica = 'single' in fw.dataset, grade = $('#caseGrid'), max = +(grade.dataset.max || 0);
  const q = new URLSearchParams(location.search);
  if (q.get('svc')) estado.svc = q.get('svc');
  const ativa = c => c.dataset.v === 'Todos' && unica ? estado.seg === 'Todos' && estado.svc === 'Todos' : estado[c.dataset.k] === c.dataset.v;
  const aplicar = () => {
    $$('.chip', fw).forEach(c => c.classList.toggle('on', ativa(c)));
    let n = 0;
    $$('.card', grade).forEach(c => {
      const mostra = (estado.seg === 'Todos' || c.dataset.seg === estado.seg) && (estado.svc === 'Todos' || c.dataset.svc === estado.svc) && (!max || n < max);
      c.hidden = !mostra;
      if (mostra) n++;
    });
    $('#caseEmpty').hidden = n > 0;
  };
  fw.onclick = e => {
    const c = e.target.closest('.chip');
    if (!c) return;
    if (c.dataset.v === 'Todos' || unica) { estado.seg = 'Todos'; estado.svc = 'Todos'; }
    if (c.dataset.v !== 'Todos') estado[c.dataset.k] = c.dataset.v;
    aplicar();
  };
  aplicar();
}

// Filtro dos artigos do blog
const pf = $('#postFilters');
if (pf) pf.onclick = e => {
  const c = e.target.closest('.chip');
  if (!c) return;
  $$('.chip', pf).forEach(x => x.classList.toggle('on', x === c));
  $$('#postGrid [data-cat]').forEach(a => a.hidden = c.dataset.cat !== 'Todos' && a.dataset.cat !== c.dataset.cat);
};

// Página interna do case (?id=)
if ($('#caseDetail')) {
  const c = CASES.find(x => x.id === new URLSearchParams(location.search).get('id')) || CASES[0];
  document.title = c.t + ' | GHB';
  $('#cTitle').textContent = c.t;
  $('#cCrumb').textContent = c.t;
  $('#cTags').innerHTML = `<span class="tag">${c.seg}</span><span class="tag">${c.svc}</span>`;
  $('#cLocal').textContent = c.local;
  $('#cDesc').textContent = c.desc;
  $('#cKpis').innerHTML = c.kpis.map(k => `<div><strong>${k[0]}</strong>${k[1]}</div>`).join('');
  $('#cGallery').innerHTML = c.gal.map((k, i) => gitem(k, 'case', i === 0)).join('');
  $('#cHeroImg').src = `${IMG}fotos/${FOTO[c.foto].file}.jpg`;
  $('#cQuote').innerHTML = `“${c.quote[0]}”<cite>${c.quote[1]}</cite>`;
  const rel = CASES.filter(x => x.id !== c.id && (x.svc === c.svc || x.seg === c.seg)).slice(0, 3);
  $('#cRelated').innerHTML = (rel.length ? rel : CASES.filter(x => x.id !== c.id).slice(0, 3)).map(caseCard).join('');
}

/* ------------------------------------------------------------------- hero */
// Imagens com data-src (slides 2+) só são baixadas depois do load, para não competir com a primeira foto.
const carregarAdiadas = () => $$('img[data-src]').forEach(i => { i.src = i.dataset.src; i.removeAttribute('data-src'); });
addEventListener('load', () => setTimeout(carregarAdiadas, 1200));

// Slider com barras de progresso, setas e pausa. O tempo de cada foto é a própria animação da barra.
const hero = $('[data-hero]');
if (hero) {
  const slides = $$('.hero-slide', hero);
  if (slides.length > 1) {
    let atual = 0;
    const ctrl = document.createElement('div');
    ctrl.className = 'hero-ctrl';
    ctrl.innerHTML = `<div class="hero-bars" role="group" aria-label="Escolher foto">${slides.map((_, k) => `<button type="button" aria-label="Foto ${k + 1} de ${slides.length}"><i></i></button>`).join('')}</div>
      <div class="hero-btns">
        <button type="button" class="hb-prev" aria-label="Foto anterior">${icon('anterior', 'sm')}</button>
        <button type="button" class="hb-toggle"><span class="ic-pause">${icon('pausar', 'sm')}</span><span class="ic-play">${icon('reproduzir', 'sm')}</span></button>
        <button type="button" class="hb-next" aria-label="Próxima foto">${icon('proximo', 'sm')}</button>
      </div>`;
    $('.hero-media', hero).appendChild(ctrl);
    const barras = $$('.hero-bars button', ctrl), alterna = $('.hb-toggle', ctrl);
    const ir = (k, primeira) => {
      if (!primeira) carregarAdiadas();
      slides[atual].classList.remove('on');
      barras[atual].classList.remove('on');
      atual = (k + slides.length) % slides.length;
      slides[atual].classList.add('on');
      void barras[atual].offsetWidth;            // reinicia a animação da barra
      barras[atual].classList.add('on');
      barras.forEach((b, j) => j === atual ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'));
    };
    const pausar = p => {
      hero.classList.toggle('is-paused', p);
      alterna.setAttribute('aria-label', p ? 'Retomar apresentação' : 'Pausar apresentação');
    };
    barras.forEach((b, k) => b.onclick = () => ir(k));
    $('.hb-prev', ctrl).onclick = () => ir(atual - 1);
    $('.hb-next', ctrl).onclick = () => ir(atual + 1);
    alterna.onclick = () => pausar(!hero.classList.contains('is-paused'));
    ctrl.addEventListener('animationend', e => { if (e.target.closest('button') === barras[atual]) ir(atual + 1); });
    pausar(matchMedia('(prefers-reduced-motion: reduce)').matches);
    ir(0, true);
  }
}

/* ------------------------------------------------------------- formulários */
const GRATUITOS = /@(gmail|hotmail|outlook|live|yahoo|bol|uol|icloud|terra|ig|msn|aol|proton(mail)?)\.(com|com\.br|me)(\.br)?$/i;
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cnpjValido(v) {
  const c = v.replace(/\D/g, '');
  if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
  const dv = n => { let s = 0, p = n - 7; for (let i = 0; i < n; i++) { s += +c[i] * p--; if (p < 2) p = 9; } const r = s % 11; return r < 2 ? 0 : 11 - r; };
  return dv(12) == +c[12] && dv(13) == +c[13];
}
const mascaraCNPJ = v => v.replace(/\D/g, '').slice(0, 14).replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2');
const mascaraTel = v => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  return d.length > 10 ? d.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3') : d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/[-( )]+$/, '');
};

const REGRAS = {
  required: v => v.trim() ? '' : 'Campo obrigatório',
  cnpj: v => !v ? 'Campo obrigatório' : cnpjValido(v) ? '' : 'CNPJ inválido. Verifique os dígitos.',
  corp: v => !v ? 'Campo obrigatório' : !EMAIL_OK.test(v) ? 'E-mail inválido' : GRATUITOS.test(v) ? 'Use um e-mail corporativo (não aceitamos Gmail, Hotmail e similares).' : '',
  email: v => !v ? 'Campo obrigatório' : EMAIL_OK.test(v) ? '' : 'E-mail inválido',
  tel: v => v.replace(/\D/g, '').length >= 10 ? '' : 'Informe o telefone com DDD'
};

function validar(inp) {
  const campo = inp.closest('.field'), regra = inp.dataset.rule;
  if (!regra) return true;
  const erro = REGRAS[regra](inp.value);
  campo.classList.toggle('err', !!erro);
  campo.classList.toggle('ok', !erro && !!inp.value);
  campo.querySelector('.msg').textContent = erro || (regra === 'cnpj' ? 'CNPJ válido' : '');
  return !erro;
}

$$('form[data-validate]').forEach(form => {
  $$('[data-rule]', form).forEach(inp => {
    inp.addEventListener('input', () => {
      if (inp.dataset.rule === 'cnpj') inp.value = mascaraCNPJ(inp.value);
      if (inp.dataset.rule === 'tel') inp.value = mascaraTel(inp.value);
      if ((inp.dataset.rule === 'cnpj' && inp.value.replace(/\D/g, '').length === 14) || inp.closest('.field').classList.contains('err')) validar(inp);
    });
    inp.addEventListener('blur', () => validar(inp));
  });

  const up = $('.upload', form);
  if (up) {
    const arq = $('input[type=file]', up), msg = $('.upmsg', up);
    up.onclick = e => { if (e.target !== arq) arq.click(); };
    up.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); arq.click(); } };
    arq.onchange = () => {
      const f = arq.files[0];
      if (!f) return;
      const erro = f.size > 25 * 1024 * 1024 ? 'O arquivo excede 25MB.' : !/\.(pdf|dwg|zip)$/i.test(f.name) ? 'Formato não permitido. Use PDF, DWG ou ZIP.' : '';
      msg.style.color = erro ? '#b3261e' : 'var(--salvia)';
      msg.textContent = erro || `Arquivo anexado: ${f.name} (${(f.size / 1048576).toFixed(1)} MB)`;
      if (erro) arq.value = '';
    };
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('[data-rule]', form).forEach(i => { if (!validar(i)) ok = false; });
    const grupo = $('[data-group]', form);
    if (grupo) {
      const algum = $$('input:checked', grupo).length > 0;
      $('.msg', grupo.closest('.field')).textContent = algum ? '' : 'Selecione ao menos um serviço';
      if (!algum) ok = false;
    }
    const lgpd = $('[name=lgpd]', form);
    if (lgpd) { lgpd.closest('.consent').style.color = lgpd.checked ? '' : '#b3261e'; if (!lgpd.checked) ok = false; }
    if (!ok) { const primeiro = $('.err input,.err select,.err textarea', form); if (primeiro) primeiro.focus(); return; }
    form.hidden = true;
    const sucesso = form.nextElementSibling;
    if (sucesso && sucesso.classList.contains('form-success')) { sucesso.classList.add('show'); sucesso.scrollIntoView({behavior: 'smooth', block: 'center'}); }
  });
});

/* --------------------------------------------------------------- lightbox */
// Galerias ([data-lightbox="grupo"]): setas, Esc, foco preso e retorno do foco ao fechar.
const lb = document.createElement('div');
lb.className = 'lb';
lb.setAttribute('role', 'dialog');
lb.setAttribute('aria-modal', 'true');
lb.setAttribute('aria-label', 'Galeria de fotos');
lb.innerHTML = `<button type="button" class="lb-close" aria-label="Fechar">${icon('fechar')}</button>
  <button type="button" class="lb-prev" aria-label="Foto anterior">${icon('anterior')}</button>
  <figure><img alt=""><figcaption></figcaption></figure>
  <button type="button" class="lb-next" aria-label="Próxima foto">${icon('proximo')}</button>`;
document.body.appendChild(lb);
let lbItens = [], lbPos = 0, lbOrigem = null;
const lbMostrar = i => {
  lbPos = (i + lbItens.length) % lbItens.length;
  const it = lbItens[lbPos], im = $('img', lb);
  im.src = it.dataset.full;
  im.alt = it.dataset.alt;
  $('figcaption', lb).textContent = it.dataset.cap;
  lb.classList.toggle('single', lbItens.length < 2);
};
const lbFechar = () => { lb.classList.remove('open'); document.body.style.overflow = ''; if (lbOrigem) lbOrigem.focus(); };
document.addEventListener('click', e => {
  const it = e.target.closest('[data-lightbox]');
  if (it) {
    lbItens = $$(`[data-lightbox="${it.dataset.lightbox}"]`);
    lbOrigem = it;
    lbMostrar(lbItens.indexOf(it));
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    $('.lb-close', lb).focus();
    return;
  }
  if (!lb.classList.contains('open')) return;
  if (e.target === lb || e.target.closest('.lb-close')) lbFechar();
  else if (e.target.closest('.lb-prev')) lbMostrar(lbPos - 1);
  else if (e.target.closest('.lb-next')) lbMostrar(lbPos + 1);
});
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') lbFechar();
  else if (e.key === 'ArrowLeft') lbMostrar(lbPos - 1);
  else if (e.key === 'ArrowRight') lbMostrar(lbPos + 1);
  else if (e.key === 'Tab') {
    const f = $$('button', lb).filter(b => b.offsetParent !== null), a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }
});
