/* GHB — layout compartilhado, componentes e validações */
const ROOT = document.body.dataset.root || '';
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const IMG=ROOT+'assets/img/';
const ico=(n,s=18)=>`<img class="ico-img" src="${IMG}icons/${n}.svg" alt="" width="${s}" height="${s}" aria-hidden="true">`;
// Contatos institucionais. TODO: trocar LINKEDIN/INSTAGRAM pelos perfis oficiais da GHB.
const EMAIL='ghbrevegetacao@ghbrevegetacao.com.br',LINKEDIN='https://www.linkedin.com',INSTAGRAM='https://www.instagram.com';
const I = {
  drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M3 21h18"/></svg>',
  leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/></svg>',
  saw:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 17h11l3-4h4v4h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 13V7l4-3"/></svg>',
  tree:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22v-6"/><path d="M12 2l6 8h-3l4 6H5l4-6H6z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
  flask:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>',
  mine:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 20l7-11 4 6 3-4 6 9z"/><path d="M14 5l3-2 2 3-3 2z"/></svg>',
  rail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3L5 21M16 3l3 18M6.5 8h11M6 13h12M5.3 18h13.4"/></svg>',
  energy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  build:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/></svg>',
  gov:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M4 10h16L12 4zM6 10v8M10 10v8M14 10v8M18 10v8"/></svg>',
  menu:'<svg width="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  dots:'<svg width="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>',
  x:'<svg width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevL:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  chevR:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.6v12.8a1 1 0 0 0 1.5.86l10.6-6.4a1 1 0 0 0 0-1.72L9.5 4.74A1 1 0 0 0 8 5.6z"/></svg>',
  lock:'<svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
};
const SERVICES = [
  {slug:'drenagem',icon:'drop',foto:'dreno',t:'Drenagem & contenção estrutural',a:'Muros de gabião, rip-rap, biorretentores de sedimentos e controle hídrico de taludes.',tag:'Drenagem'},
  {slug:'bioengenharia',icon:'leaf',foto:'biomanta',t:'Bioengenharia de solos',a:'Hidrossemeadura mecanizada, biomantas, biomassa projetada e plantio de capim vetiver.',tag:'Bioengenharia'},
  {slug:'supressao-vegetal',icon:'saw',foto:'trator',t:'Supressão vegetal mecanizada',a:'Limpeza de vegetação de grande porte com Feller Bunchers, escavadeiras multifuncionais e manejo de fauna/flora.',tag:'Supressão'},
  {slug:'reflorestamento',icon:'tree',foto:'muda',t:'Reflorestamento e plantio compensatório',a:'Recomposição florestal nativa, manutenção, cercamento de áreas e controle de pragas agrícolas/florestais.',tag:'Reflorestamento'}
];
/* ATENÇÃO: só as FOTOS dos cases são reais (catálogo em tools/fotos.json). Títulos, números, locais e
   depoimentos abaixo são EXEMPLOS e precisam ser trocados pelos dados reais de cada obra antes de publicar. */
const CASES = [
  {id:'talude-complexo-minerario',t:'Estabilização de talude e hidrossemeadura — Complexo minerário',seg:'Mineração',svc:'Bioengenharia',area:'45.000 m²',prazo:'60 dias',local:'Quadrilátero Ferrífero/MG',foto:'revegetado',gal:['revegetado','talude','biomanta'],
   desc:'Recuperação de taludes de pilha de estéril com hidrossemeadura mecanizada, aplicação de biomanta antierosiva e canaletas de drenagem superficial, garantindo cobertura vegetal antes do período chuvoso.',
   kpis:[['45.000 m²','área tratada'],['60 dias','prazo de execução'],['92%','cobertura vegetal em 90 dias'],['0','acidentes com afastamento']],
   quote:['Entrega dentro do cronograma e com rigor de SSMA compatível com o nosso padrão corporativo.','Gerência de Meio Ambiente — mineradora cliente']},
  {id:'rodovia-protecao-taludes',t:'Proteção de taludes de corte com biomanta — Concessionária rodoviária',seg:'Rodovias',svc:'Bioengenharia',area:'28.000 m²',prazo:'45 dias',local:'BR-040/MG',foto:'biomanta',gal:['biomanta','talude','revegetado'],
   desc:'Aplicação de biomantas e biomassa projetada em taludes de corte de alta inclinação, com plantio de capim vetiver nas cristas para estabilização profunda.',
   kpis:[['28.000 m²','área protegida'],['45 dias','prazo'],['12 km','de trecho atendido'],['100%','conformidade com projeto']],
   quote:['Solução definitiva para os pontos críticos de erosão do trecho.','Coordenação de Conservação — concessionária']},
  {id:'ferrovia-drenagem',t:'Drenagem e gabiões em faixa de domínio — Ferrovia',seg:'Ferrovias',svc:'Drenagem',area:'3,2 km',prazo:'90 dias',local:'Região Central/MG',foto:'dreno',gal:['dreno','carga','caminhao'],
   desc:'Implantação de muros de gabião, rip-rap e dispositivos de dissipação de energia ao longo da faixa de domínio ferroviária.',
   kpis:[['3,2 km','de drenagem'],['1.800 m³','de gabião'],['90 dias','prazo'],['0','paralisações da via']],
   quote:['Execução sem interferir na operação ferroviária.','Engenharia de Via Permanente']},
  {id:'supressao-linha-transmissao',t:'Supressão vegetal mecanizada — Linha de transmissão',seg:'Energia',svc:'Supressão',area:'120 ha',prazo:'75 dias',local:'Norte de Minas/MG',foto:'trator',gal:['trator','carga','equipe'],
   desc:'Supressão mecanizada com Feller Bunchers e escavadeiras florestais, com resgate e afugentamento de fauna e romaneio do material lenhoso.',
   kpis:[['120 ha','suprimidos'],['75 dias','prazo'],['3.400 m³','lenha romaneada'],['100%','fauna acompanhada']],
   quote:['Equipe técnica e frota própria fizeram a diferença no prazo.','Gestão Ambiental de Obra — transmissora']},
  {id:'reflorestamento-compensatorio',t:'Plantio compensatório de espécies nativas — APP',seg:'Mineração',svc:'Reflorestamento',area:'38 ha',prazo:'24 meses (manutenção)',local:'Conselheiro Lafaiete/MG',foto:'muda',gal:['muda','revegetado','equipe'],
   desc:'Recomposição florestal com mais de 60 espécies nativas da Mata Atlântica, cercamento, controle de formigas e manutenção por 24 meses.',
   kpis:[['63.000','mudas plantadas'],['38 ha','recompostos'],['94%','índice de sobrevivência'],['60+','espécies nativas']],
   quote:['Relatórios de monitoramento impecáveis para o órgão ambiental.','Consultoria ambiental parceira']},
  {id:'porto-hidrossemeadura',t:'Revegetação de áreas de bota-fora — Terminal portuário',seg:'Infraestrutura',svc:'Bioengenharia',area:'60.000 m²',prazo:'50 dias',local:'Litoral/ES',foto:'talude',gal:['talude','revegetado','biomanta'],
   desc:'Hidrossemeadura com fixadores de alta aderência em solo arenoso salino e controle de sedimentos com biorretentores.',
   kpis:[['60.000 m²','revegetados'],['50 dias','prazo'],['85%','cobertura em 60 dias'],['ISO','padrões atendidos']],
   quote:['Resultado acima do esperado em solo muito desafiador.','Meio Ambiente — terminal portuário']}
];

// <img> de uma foto do catálogo (FOTO, gerado de tools/fotos.json). sm = versão 560px para cards.
function foto(k,o={}){
  const p=FOTO[k],base=`${IMG}fotos/${p.file}`,n=o.sm?560:940;
  const set=o.sm?` srcset="${base}-sm.jpg 560w, ${base}.jpg 940w" sizes="(max-width:640px) 92vw, (max-width:1000px) 46vw, 380px"`:'';
  return `<img src="${base}${o.sm?'-sm':''}.jpg"${set} alt="${o.decor?'':p.alt}" width="${n}" height="${n}" loading="lazy" decoding="async">`}
// miniatura de galeria que abre o lightbox (grupo = fotos navegáveis juntas)
function gitem(k,grp,big){
  const p=FOTO[k];
  return `<button type="button" class="g-item${big?' big':''}" data-lightbox="${grp}" data-full="${IMG}fotos/${p.file}.jpg" data-alt="${p.alt}" data-cap="${p.cap}" aria-label="Ampliar foto: ${p.cap}">${foto(k,{sm:!big,decor:true})}<span class="cap">${p.cap}</span></button>`}
function caseCard(c){return `<article class="case" data-seg="${c.seg}" data-svc="${c.svc}"><a class="case-media" href="${ROOT}obras/case.html?id=${c.id}" tabindex="-1" aria-hidden="true">${foto(c.foto,{sm:true,decor:true})}</a><div class="case-body"><div class="tags"><span class="tag">${c.seg}</span><span class="tag">${c.svc}</span></div><h3>${c.t}</h3><p class="where">${c.local}</p><dl class="meta"><div><dt>Área</dt><dd>${c.area}</dd></div><div><dt>Prazo</dt><dd>${c.prazo}</dd></div></dl><a class="more" href="${ROOT}obras/case.html?id=${c.id}">Ver case completo</a></div></article>`}
function serviceCard(s){return `<article class="plate"><a class="plate-media" href="${ROOT}solucoes/${s.slug}.html" tabindex="-1" aria-hidden="true">${foto(s.foto,{sm:true,decor:true})}</a><div class="plate-body"><div class="plate-head"><span class="plate-ico">${I[s.icon]}</span><h3>${s.t}</h3></div><p><b>Aplicações:</b> ${s.a}</p><div class="links"><a href="${ROOT}solucoes/${s.slug}.html">Saiba mais</a><a href="${ROOT}obras/index.html?svc=${s.tag}">Ver obras</a></div></div></article>`}
function topbar(){
  return `<div class="topbar"><div class="container"><div class="topbar-contact"><a href="tel:+553137645000">${ico('telefone-branco',16)}<span>(31) 3764-5000</span></a><a class="topbar-mail" href="mailto:${EMAIL}">${ico('email-branco',16)}<span>${EMAIL}</span></a></div>
  <div class="topbar-social"><a href="${LINKEDIN}" target="_blank" rel="noopener" aria-label="LinkedIn da GHB">${ico('linkedin-branco',18)}</a><a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram da GHB">${ico('instagram-branco',18)}</a></div></div></div>`}

function header(){
  const p=location.pathname, act=k=>p.includes(k)?'active':'';
  return `<a class="skip" href="#main">Pular para o conteúdo</a>${topbar()}<header class="site-header"><div class="container nav">
  <a class="logo" href="${ROOT}index.html" aria-label="GHB — página inicial"><span class="logo-mark">GHB</span><span class="logo-text">GHB<small>Revegetação Ambiental</small></span></a>
  <ul class="menu" id="menu"><li><a class="${act('institucional')}" href="${ROOT}institucional.html">A GHB</a></li><li><a class="${act('solucoes')}" href="${ROOT}solucoes/index.html">Soluções</a></li><li><a class="${act('obras')}" href="${ROOT}obras/index.html">Obras</a></li><li><a class="${act('conteudos')}" href="${ROOT}conteudos.html">Conteúdos</a></li><li><a class="${act('contato')}" href="${ROOT}contato.html">Contato</a></li></ul>
  <div class="nav-cta"><button class="btn btn-outline btn-sm hide-md" data-open-login>${I.lock} Área do colaborador</button><a class="btn btn-primary btn-sm" href="${ROOT}orcamento.html">Solicitar orçamento B2B</a>
  <button class="icon-btn" data-open-drawer aria-label="Menu institucional (políticas, downloads, acessibilidade)" title="Políticas, downloads e acessibilidade">${I.dots}</button>
  <button class="icon-btn mobile-toggle" id="mtoggle" aria-label="Abrir navegação">${I.menu}</button></div></div></header>
  <div class="drawer-bg" data-close-drawer></div>
  <aside class="drawer" id="drawer" aria-label="Menu institucional"><button class="icon-btn drawer-close" data-close-drawer aria-label="Fechar">${I.x}</button>
  <a class="logo" href="${ROOT}index.html"><span class="logo-mark">GHB</span></a>
  <h4>Políticas corporativas</h4><ul><li><a href="${ROOT}politicas.html#lgpd">Política de Privacidade & LGPD</a></li><li><a href="${ROOT}politicas.html#compliance">Compliance & Código de Conduta</a></li><li><a href="${ROOT}politicas.html#ssma">Política de SSMA</a></li></ul>
  <h4>Transparência</h4><ul><li><a href="${ROOT}institucional.html#esg">Relatórios de transparência</a></li><li><a href="${ROOT}institucional.html#esg">Relatório de igualdade salarial</a></li></ul>
  <h4>Canais</h4><ul><li><a href="${ROOT}politicas.html#etica">Canal de ética, sugestões e reclamações</a></li><li><a href="${ROOT}trabalhe-conosco.html">Trabalhe conosco / Envio de currículos</a></li><li><a href="${ROOT}politicas.html#downloads">Downloads</a></li></ul>
  <h4>Acessibilidade</h4><ul><li><a href="#" data-a11y="big">Aumentar fonte</a></li><li><a href="#" data-a11y="contrast">Alto contraste</a></li></ul></aside>
  <div class="modal" id="login" role="dialog" aria-modal="true" aria-labelledby="lt"><div class="modal-box"><button class="icon-btn" data-close-login aria-label="Fechar">${I.x}</button>
  <h2 id="lt" style="font-size:1.5rem">Área do colaborador</h2><p style="color:var(--muted);font-size:.9rem;margin-bottom:1.2rem">Acesso restrito a colaboradores.</p>
  <form class="form" id="loginForm" novalidate><div class="field"><label for="lu">E-mail / Usuário institucional</label><input id="lu" required autocomplete="username"><div class="msg"></div></div>
  <div class="field"><label for="lp">Senha</label><input id="lp" type="password" required autocomplete="current-password"><div class="msg"></div></div>
  <button class="btn btn-primary" type="submit" style="justify-content:center">Acessar Intranet</button><a href="#" id="forgot" style="font-size:.85rem;text-align:center">Esqueceu a senha?</a></form></div></div>`;
}
function footer(){
  const line=(i,h)=>`<li class="f-line">${ico(i+'-branco')}<span>${h}</span></li>`;
  return `<footer class="site-footer"><div class="container foot-grid">
  <div><a class="logo" href="${ROOT}index.html"><span class="logo-mark">GHB</span><span class="logo-text">GHB<small style="color:#9fc0a6">Revegetação Ambiental</small></span></a>
  <p style="margin:1rem 0">Engenharia ambiental e bioengenharia de alta complexidade para mineração, ferrovias, rodovias, portos e energia. Desde 1997.</p>
  <div class="badge-row"><span class="badge">ISO 9001</span><span class="badge">ISO 14001</span><span class="badge">ISO 45001</span></div></div>
  <div><h4>Soluções</h4><ul>${SERVICES.map(s=>`<li><a href="${ROOT}solucoes/${s.slug}.html">${s.t}</a></li>`).join('')}</ul></div>
  <div><h4>Contato & Unidades</h4><ul>
    ${line('localizacao','<b>Sede:</b> Rodovia BR 482, nº 1516 — Conselheiro Lafaiete/MG')}
    ${line('localizacao','<b>Escritório:</b> R. Antônio de Albuquerque Brandão, 10 — Conselheiro Lafaiete/MG')}
    ${line('telefone','<a href="tel:+553137645000">(31) 3764-5000</a> / <a href="tel:+553137613347">(31) 3761-3347</a>')}
    ${line('email',`<a href="mailto:${EMAIL}">${EMAIL}</a>`)}</ul></div>
  <div><h4>Links rápidos</h4><ul><li><a href="${ROOT}intranet/index.html">Intranet</a></li><li><a href="${ROOT}trabalhe-conosco.html">Trabalhe conosco</a></li></ul>
    <h4 style="margin-top:1.6rem">Redes sociais</h4><ul class="social"><li><a href="${LINKEDIN}" target="_blank" rel="noopener">${ico('linkedin-branco',22)}LinkedIn</a></li><li><a href="${INSTAGRAM}" target="_blank" rel="noopener">${ico('instagram-branco',22)}Instagram</a></li></ul></div></div>
  <div class="container foot-bottom"><span>2026 © GHB Revegetação Ambiental. Todos os direitos reservados.</span><a href="${ROOT}politicas.html#lgpd">Políticas de Privacidade</a></div></footer>`;
}
document.getElementById('header').outerHTML=header();
document.getElementById('footer').outerHTML=footer();

// Interações globais
const drawer=$('#drawer'),dbg=$('.drawer-bg'),login=$('#login');
$$('[data-open-drawer]').forEach(b=>b.onclick=()=>{drawer.classList.add('open');dbg.classList.add('open')});
$$('[data-close-drawer]').forEach(b=>b.onclick=()=>{drawer.classList.remove('open');dbg.classList.remove('open')});
document.addEventListener('click',e=>{if(e.target.closest('[data-open-login]')){e.preventDefault();login.classList.add('open');$('#lu').focus()}});
$$('[data-close-login]').forEach(b=>b.onclick=()=>login.classList.remove('open'));
login.onclick=e=>{if(e.target===login)login.classList.remove('open')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){login.classList.remove('open');drawer.classList.remove('open');dbg.classList.remove('open')}});
$('#mtoggle').onclick=()=>$('#menu').classList.toggle('open');
$$('[data-a11y]').forEach(a=>a.onclick=e=>{e.preventDefault();document.body.classList.toggle('a11y-'+a.dataset.a11y)});
$('#forgot').onclick=e=>{e.preventDefault();alert('Um link de redefinição será enviado ao seu e-mail institucional. Em caso de dúvidas, contate o setor de TI.')};
$('#loginForm').onsubmit=e=>{e.preventDefault();let ok=true;['#lu','#lp'].forEach(s=>{const f=$(s).parentElement,v=$(s).value.trim();f.classList.toggle('err',!v);f.querySelector('.msg').textContent=v?'':'Campo obrigatório';if(!v)ok=false});
  if(ok){try{sessionStorage.setItem('ghb_user',$('#lu').value.trim())}catch(_){}location.href=ROOT+'intranet/index.html'}};

// Renderizações data-driven
$$('[data-services]').forEach(el=>el.innerHTML=SERVICES.map(serviceCard).join(''));
$$('[data-cases]').forEach(el=>{const f=el.dataset.cases;let list=CASES;if(f&&f!=='all'&&!/^\d+$/.test(f))list=CASES.filter(c=>c.svc===f);if(/^\d+$/.test(f))list=CASES.slice(0,+f);el.innerHTML=list.map(caseCard).join('')});
$$('[data-icon]').forEach(el=>el.innerHTML=I[el.dataset.icon]);

// Filtros de cases (data-single: uma aba por vez; data-max no #caseGrid: limite de cards visíveis)
const fw=$('#caseFilters');
if(fw){const state={seg:'Todos',svc:'Todos'},single='single' in fw.dataset,grid=$('#caseGrid'),max=+(grid.dataset.max||0);
  const q=new URLSearchParams(location.search);if(q.get('svc'))state.svc=q.get('svc');
  const isOn=c=>c.dataset.v==='Todos'&&single?state.seg==='Todos'&&state.svc==='Todos':state[c.dataset.k]===c.dataset.v;
  const apply=()=>{$$('.chip',fw).forEach(c=>c.classList.toggle('on',isOn(c)));let n=0;
    $$('.case',grid).forEach(c=>{const show=(state.seg==='Todos'||c.dataset.seg===state.seg)&&(state.svc==='Todos'||c.dataset.svc===state.svc)&&(!max||n<max);c.style.display=show?'':'none';c.classList.toggle('is-lead',show&&n===0);if(show)n++});
    $('#caseEmpty').style.display=n?'none':'block'};
  fw.onclick=e=>{const c=e.target.closest('.chip');if(!c)return;if(c.dataset.v==='Todos'||single){state.seg='Todos';state.svc='Todos'}if(c.dataset.v!=='Todos')state[c.dataset.k]=c.dataset.v;apply()};apply()}

// Página interna do case
const cd=$('#caseDetail');
if(cd){const c=CASES.find(x=>x.id===new URLSearchParams(location.search).get('id'))||CASES[0];document.title=c.t+' | GHB';
  $('#cTitle').textContent=c.t;$('#cCrumb').textContent=c.t;$('#cTags').innerHTML=`<span class="tag">${c.seg}</span><span class="tag">${c.svc}</span>`;$('#cLocal').textContent=c.local;$('#cDesc').textContent=c.desc;
  $('#cKpis').innerHTML=c.kpis.map(k=>`<div><strong>${k[0]}</strong>${k[1]}</div>`).join('');
  $('#cGallery').innerHTML=c.gal.map((k,i)=>gitem(k,'case',i===0)).join('');
  const hi=$('#cHeroImg');if(hi)hi.src=`${IMG}fotos/${FOTO[c.foto].file}.jpg`;
  $('#cQuote').innerHTML=`“${c.quote[0]}”<cite>— ${c.quote[1]}</cite>`;
  $('#cRelated').innerHTML=CASES.filter(x=>x.id!==c.id&&(x.svc===c.svc||x.seg===c.seg)).slice(0,3).map(caseCard).join('')||CASES.filter(x=>x.id!==c.id).slice(0,3).map(caseCard).join('')}

// Imagens com data-src (slides 2+ do hero) só são baixadas depois do load da página, para não competir com a primeira foto
const loadDeferred=()=>$$('img[data-src]').forEach(i=>{i.src=i.dataset.src;i.removeAttribute('data-src')});
addEventListener('load',()=>setTimeout(loadDeferred,1200));
// Hero: slider de fotos com barras de progresso, setas e botão de pausa (o tempo de cada foto é a própria animação da barra)
const hero=$('[data-hero]');
if(hero){const slides=$$('.hero-slide',hero);
  if(slides.length>1){let cur=0;
    const ctrl=document.createElement('div');ctrl.className='hero-ctrl';
    ctrl.innerHTML=`<div class="hero-bars" role="group" aria-label="Escolher foto">${slides.map((_,k)=>`<button type="button" aria-label="Foto ${k+1} de ${slides.length}"><i></i></button>`).join('')}</div>
      <div class="hero-btns"><button type="button" class="hb-prev" aria-label="Foto anterior">${I.chevL}</button><button type="button" class="hb-toggle"><span class="ic-pause">${I.pause}</span><span class="ic-play">${I.play}</span></button><button type="button" class="hb-next" aria-label="Próxima foto">${I.chevR}</button></div>`;
    ($('.hero-copy',hero)||hero).appendChild(ctrl);
    const bars=$$('.hero-bars button',ctrl),toggle=$('.hb-toggle',ctrl);
    const go=(k,first)=>{if(!first)loadDeferred();slides[cur].classList.remove('on');bars[cur].classList.remove('on');cur=(k+slides.length)%slides.length;slides[cur].classList.add('on');void bars[cur].offsetWidth;bars[cur].classList.add('on');
      bars.forEach((b,j)=>j===cur?b.setAttribute('aria-current','true'):b.removeAttribute('aria-current'))};
    const setPaused=p=>{hero.classList.toggle('is-paused',p);toggle.setAttribute('aria-label',p?'Retomar apresentação':'Pausar apresentação')};
    bars.forEach((b,k)=>b.onclick=()=>go(k));
    $('.hb-prev',ctrl).onclick=()=>go(cur-1);$('.hb-next',ctrl).onclick=()=>go(cur+1);toggle.onclick=()=>setPaused(!hero.classList.contains('is-paused'));
    ctrl.addEventListener('animationend',e=>{if(e.target.closest('button')===bars[cur])go(cur+1)});
    setPaused(matchMedia('(prefers-reduced-motion: reduce)').matches);go(0,true)}}

// Formulários
const FREE=/@(gmail|hotmail|outlook|live|yahoo|bol|uol|icloud|terra|ig|msn|aol|proton(mail)?)\.(com|com\.br|me)(\.br)?$/i;
function validCNPJ(v){const c=v.replace(/\D/g,'');if(c.length!==14||/^(\d)\1+$/.test(c))return false;const calc=n=>{let s=0,p=n-7;for(let i=0;i<n;i++){s+=+c[i]*p--;if(p<2)p=9}const r=s%11;return r<2?0:11-r};return calc(12)==+c[12]&&calc(13)==+c[13]}
const maskCNPJ=v=>v.replace(/\D/g,'').slice(0,14).replace(/^(\d{2})(\d)/,'$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3').replace(/\.(\d{3})(\d)/,'.$1/$2').replace(/(\d{4})(\d)/,'$1-$2');
const maskTel=v=>{const d=v.replace(/\D/g,'').slice(0,11);return d.length>10?d.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3'):d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/[-( )]+$/,'')};
const RULES={
  required:v=>v.trim()?'':'Campo obrigatório',
  cnpj:v=>!v?'Campo obrigatório':validCNPJ(v)?'':'CNPJ inválido — verifique os dígitos',
  corp:v=>!v?'Campo obrigatório':!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'E-mail inválido':FREE.test(v)?'Utilize um e-mail corporativo (não aceitamos Gmail, Hotmail etc.)':'',
  email:v=>!v?'Campo obrigatório':/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'E-mail inválido',
  tel:v=>v.replace(/\D/g,'').length>=10?'':'Informe telefone com DDD'
};
function check(inp){const f=inp.closest('.field'),r=inp.dataset.rule;if(!r)return true;const m=RULES[r](inp.value);f.classList.toggle('err',!!m);f.classList.toggle('ok',!m&&!!inp.value);
  f.querySelector('.msg').textContent=m||(r==='cnpj'?'✓ CNPJ válido':'');return !m}
$$('form[data-validate]').forEach(form=>{
  $$('[data-rule]',form).forEach(inp=>{
    inp.addEventListener('input',()=>{if(inp.dataset.rule==='cnpj')inp.value=maskCNPJ(inp.value);if(inp.dataset.rule==='tel')inp.value=maskTel(inp.value);
      if(inp.dataset.rule==='cnpj'&&inp.value.replace(/\D/g,'').length===14||inp.closest('.field').classList.contains('err'))check(inp)});
    inp.addEventListener('blur',()=>check(inp))});
  const up=$('.upload',form);if(up){const fi=$('input[type=file]',up);up.onclick=e=>{if(e.target!==fi)fi.click()};
    fi.onchange=()=>{const f=fi.files[0],msg=$('.upmsg',up);if(!f)return;if(f.size>25*1024*1024){msg.textContent='Arquivo excede 25MB.';msg.style.color='#b3261e';fi.value='';return}
      if(!/\.(pdf|dwg|zip)$/i.test(f.name)){msg.textContent='Formato não permitido (use PDF, DWG ou ZIP).';msg.style.color='#b3261e';fi.value='';return}msg.style.color='var(--salvia)';msg.textContent='✓ '+f.name+' ('+(f.size/1048576).toFixed(1)+' MB)'}}
  form.addEventListener('submit',e=>{e.preventDefault();let ok=true;$$('[data-rule]',form).forEach(i=>{if(!check(i))ok=false});
    const g=$('[data-group]',form);if(g){const any=$$('input:checked',g).length>0;const gm=$('.msg',g.closest('.field'));gm.textContent=any?'':'Selecione ao menos um serviço';if(!any)ok=false}
    const lg=$('[name=lgpd]',form);if(lg&&!lg.checked){ok=false;lg.closest('.consent').style.color='#b3261e'}else if(lg)lg.closest('.consent').style.color='';
    if(!ok){const first=$('.err input,.err select,.err textarea',form);first&&first.focus();return}
    form.style.display='none';const s=form.nextElementSibling;if(s&&s.classList.contains('form-success')){s.classList.add('show');s.scrollIntoView({behavior:'smooth',block:'center'})}})
});

// Lightbox das galerias de fotos ([data-lightbox="grupo"]): setas, Esc, foco preso e retorno do foco
const lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Galeria de fotos');
lb.innerHTML=`<button type="button" class="lb-close" aria-label="Fechar">${I.x}</button><button type="button" class="lb-prev" aria-label="Foto anterior">${I.chevL}</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-next" aria-label="Próxima foto">${I.chevR}</button>`;
document.body.appendChild(lb);
let lbItems=[],lbI=0,lbFrom=null;
const lbShow=i=>{lbI=(i+lbItems.length)%lbItems.length;const it=lbItems[lbI],im=$('img',lb);im.src=it.dataset.full;im.alt=it.dataset.alt;$('figcaption',lb).textContent=it.dataset.cap;lb.classList.toggle('single',lbItems.length<2)};
const lbClose=()=>{lb.classList.remove('open');document.body.style.overflow='';if(lbFrom)lbFrom.focus()};
document.addEventListener('click',e=>{const it=e.target.closest('[data-lightbox]');
  if(it){lbItems=$$(`[data-lightbox="${it.dataset.lightbox}"]`);lbFrom=it;lbShow(lbItems.indexOf(it));lb.classList.add('open');document.body.style.overflow='hidden';$('.lb-close',lb).focus();return}
  if(!lb.classList.contains('open'))return;
  if(e.target===lb||e.target.closest('.lb-close'))lbClose();else if(e.target.closest('.lb-prev'))lbShow(lbI-1);else if(e.target.closest('.lb-next'))lbShow(lbI+1)});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;
  if(e.key==='Escape')lbClose();else if(e.key==='ArrowLeft')lbShow(lbI-1);else if(e.key==='ArrowRight')lbShow(lbI+1);
  else if(e.key==='Tab'){const f=$$('button',lb).filter(b=>b.offsetParent!==null),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});

