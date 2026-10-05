/* GHB — layout compartilhado, componentes e validações */
const ROOT = document.body.dataset.root || '';
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
  lock:'<svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>'
};
const SERVICES = [
  {slug:'drenagem',icon:'drop',t:'Drenagem & contenção estrutural',a:'Muros de gabião, rip-rap, biorretentores de sedimentos e controle hídrico de taludes.',tag:'Drenagem'},
  {slug:'bioengenharia',icon:'leaf',t:'Bioengenharia de solos',a:'Hidrossemeadura mecanizada, biomantas, biomassa projetada e plantio de capim vetiver.',tag:'Bioengenharia'},
  {slug:'supressao-vegetal',icon:'saw',t:'Supressão vegetal mecanizada',a:'Limpeza de vegetação de grande porte com Feller Bunchers, escavadeiras multifuncionais e manejo de fauna/flora.',tag:'Supressão'},
  {slug:'reflorestamento',icon:'tree',t:'Reflorestamento e plantio compensatório',a:'Recomposição florestal nativa, manutenção, cercamento de áreas e controle de pragas agrícolas/florestais.',tag:'Reflorestamento'}
];
const CASES = [
  {id:'talude-complexo-minerario',t:'Estabilização de talude e hidrossemeadura — Complexo minerário',seg:'Mineração',svc:'Bioengenharia',area:'45.000 m²',prazo:'60 dias',local:'Quadrilátero Ferrífero/MG',ph:1,
   desc:'Recuperação de taludes de pilha de estéril com hidrossemeadura mecanizada, aplicação de biomanta antierosiva e canaletas de drenagem superficial, garantindo cobertura vegetal antes do período chuvoso.',
   kpis:[['45.000 m²','área tratada'],['60 dias','prazo de execução'],['92%','cobertura vegetal em 90 dias'],['0','acidentes com afastamento']],
   quote:['Entrega dentro do cronograma e com rigor de SSMA compatível com o nosso padrão corporativo.','Gerência de Meio Ambiente — mineradora cliente']},
  {id:'rodovia-protecao-taludes',t:'Proteção de taludes de corte com biomanta — Concessionária rodoviária',seg:'Rodovias',svc:'Bioengenharia',area:'28.000 m²',prazo:'45 dias',local:'BR-040/MG',ph:2,
   desc:'Aplicação de biomantas e biomassa projetada em taludes de corte de alta inclinação, com plantio de capim vetiver nas cristas para estabilização profunda.',
   kpis:[['28.000 m²','área protegida'],['45 dias','prazo'],['12 km','de trecho atendido'],['100%','conformidade com projeto']],
   quote:['Solução definitiva para os pontos críticos de erosão do trecho.','Coordenação de Conservação — concessionária']},
  {id:'ferrovia-drenagem',t:'Drenagem e gabiões em faixa de domínio — Ferrovia',seg:'Ferrovias',svc:'Drenagem',area:'3,2 km',prazo:'90 dias',local:'Região Central/MG',ph:4,
   desc:'Implantação de muros de gabião, rip-rap e dispositivos de dissipação de energia ao longo da faixa de domínio ferroviária.',
   kpis:[['3,2 km','de drenagem'],['1.800 m³','de gabião'],['90 dias','prazo'],['0','paralisações da via']],
   quote:['Execução sem interferir na operação ferroviária.','Engenharia de Via Permanente']},
  {id:'supressao-linha-transmissao',t:'Supressão vegetal mecanizada — Linha de transmissão',seg:'Energia',svc:'Supressão',area:'120 ha',prazo:'75 dias',local:'Norte de Minas/MG',ph:6,
   desc:'Supressão mecanizada com Feller Bunchers e escavadeiras florestais, com resgate e afugentamento de fauna e romaneio do material lenhoso.',
   kpis:[['120 ha','suprimidos'],['75 dias','prazo'],['3.400 m³','lenha romaneada'],['100%','fauna acompanhada']],
   quote:['Equipe técnica e frota própria fizeram a diferença no prazo.','Gestão Ambiental de Obra — transmissora']},
  {id:'reflorestamento-compensatorio',t:'Plantio compensatório de espécies nativas — APP',seg:'Mineração',svc:'Reflorestamento',area:'38 ha',prazo:'24 meses (manutenção)',local:'Conselheiro Lafaiete/MG',ph:3,
   desc:'Recomposição florestal com mais de 60 espécies nativas da Mata Atlântica, cercamento, controle de formigas e manutenção por 24 meses.',
   kpis:[['63.000','mudas plantadas'],['38 ha','recompostos'],['94%','índice de sobrevivência'],['60+','espécies nativas']],
   quote:['Relatórios de monitoramento impecáveis para o órgão ambiental.','Consultoria ambiental parceira']},
  {id:'porto-hidrossemeadura',t:'Revegetação de áreas de bota-fora — Terminal portuário',seg:'Infraestrutura',svc:'Bioengenharia',area:'60.000 m²',prazo:'50 dias',local:'Litoral/ES',ph:5,
   desc:'Hidrossemeadura com fixadores de alta aderência em solo arenoso salino e controle de sedimentos com biorretentores.',
   kpis:[['60.000 m²','revegetados'],['50 dias','prazo'],['85%','cobertura em 60 dias'],['ISO','padrões atendidos']],
   quote:['Resultado acima do esperado em solo muito desafiador.','Meio Ambiente — terminal portuário']}
];
function caseCard(c){return `<article class="case reveal" data-seg="${c.seg}" data-svc="${c.svc}"><div class="ph ph-${c.ph}"><span class="cap">Foto real da obra</span></div><div class="case-body"><div class="tags"><span class="tag">${c.seg}</span><span class="tag">${c.svc}</span></div><h3>${c.t}</h3><p class="meta"><b>Área:</b> ${c.area} | <b>Prazo:</b> ${c.prazo}<br>${c.local}</p><a class="btn btn-outline btn-sm" href="${ROOT}obras/case.html?id=${c.id}">Ver case completo →</a></div></article>`}
function serviceCard(s){return `<article class="card reveal"><div class="ico">${I[s.icon]}</div><h3>${s.t}</h3><p><b>Aplicações:</b> ${s.a}</p><div class="links"><a href="${ROOT}solucoes/${s.slug}.html">Saiba mais →</a><a href="${ROOT}obras/index.html?svc=${s.tag}">Ver obras</a></div></article>`}

function header(){
  const p=location.pathname, act=k=>p.includes(k)?'active':'';
  return `<a class="skip" href="#main">Pular para o conteúdo</a><header class="site-header"><div class="container nav">
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
  <span class="eyebrow">Intranet GHB</span><h2 id="lt" style="font-size:1.5rem">Área do colaborador</h2><p style="color:var(--muted);font-size:.9rem;margin-bottom:1.2rem">Acesso restrito a colaboradores.</p>
  <form class="form" id="loginForm" novalidate><div class="field"><label for="lu">E-mail / Usuário institucional</label><input id="lu" required autocomplete="username"><div class="msg"></div></div>
  <div class="field"><label for="lp">Senha</label><input id="lp" type="password" required autocomplete="current-password"><div class="msg"></div></div>
  <button class="btn btn-primary" type="submit" style="justify-content:center">Acessar Intranet</button><a href="#" id="forgot" style="font-size:.85rem;text-align:center">Esqueceu a senha?</a></form></div></div>`;
}
function footer(){
  return `<footer class="site-footer"><div class="container foot-grid">
  <div><a class="logo" href="${ROOT}index.html"><span class="logo-mark">GHB</span><span class="logo-text">GHB<small style="color:#9fc0a6">Revegetação Ambiental</small></span></a>
  <p style="margin:1rem 0">Engenharia ambiental e bioengenharia de alta complexidade para mineração, ferrovias, rodovias, portos e energia. Desde 1997.</p>
  <div class="badge-row"><span class="badge">ISO 9001</span><span class="badge">ISO 14001</span><span class="badge">ISO 45001</span></div></div>
  <div><h4>Soluções</h4><ul>${SERVICES.map(s=>`<li><a href="${ROOT}solucoes/${s.slug}.html">${s.t}</a></li>`).join('')}</ul></div>
  <div><h4>Contato & Unidades</h4><ul><li><b style="color:#fff">Sede:</b> Rodovia BR 482, nº 1516 — Conselheiro Lafaiete/MG</li><li><b style="color:#fff">Escritório:</b> R. Antônio de Albuquerque Brandão, 10 — Conselheiro Lafaiete/MG</li><li><a href="tel:+553137645000">(31) 3764-5000</a> / <a href="tel:+553137613347">(31) 3761-3347</a></li><li><a href="mailto:ghbrevegetacao@ghbrevegetacao.com.br">ghbrevegetacao@ghbrevegetacao.com.br</a></li></ul></div>
  <div><h4>Links rápidos</h4><ul><li><a href="${ROOT}intranet/index.html">Intranet</a></li><li><a href="${ROOT}trabalhe-conosco.html">Trabalhe conosco</a></li><li><a href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a></li></ul></div></div>
  <div class="container foot-bottom"><span>2026 © GHB Revegetação Ambiental. Todos os direitos reservados.</span><a href="${ROOT}politicas.html#lgpd">Políticas de Privacidade</a></div></footer>`;
}
document.getElementById('header').outerHTML=header();
document.getElementById('footer').outerHTML=footer();

// Interações globais
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
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

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12});
function observe(){ $$('.reveal:not(.in)').forEach(el=>io.observe(el)) }

// Renderizações data-driven
$$('[data-services]').forEach(el=>el.innerHTML=SERVICES.map(serviceCard).join(''));
$$('[data-cases]').forEach(el=>{const f=el.dataset.cases;let list=CASES;if(f&&f!=='all'&&!/^\d+$/.test(f))list=CASES.filter(c=>c.svc===f);if(/^\d+$/.test(f))list=CASES.slice(0,+f);el.innerHTML=list.map(caseCard).join('')});
$$('[data-icon]').forEach(el=>el.innerHTML=I[el.dataset.icon]);

// Filtros de cases
const fw=$('#caseFilters');
if(fw){const state={seg:'Todos',svc:'Todos'};const q=new URLSearchParams(location.search);if(q.get('svc'))state.svc=q.get('svc');
  const apply=()=>{$$('.chip',fw).forEach(c=>c.classList.toggle('on',state[c.dataset.k]===c.dataset.v));let n=0;
    $$('#caseGrid .case').forEach(c=>{const show=(state.seg==='Todos'||c.dataset.seg===state.seg)&&(state.svc==='Todos'||c.dataset.svc===state.svc);c.style.display=show?'':'none';if(show)n++});
    $('#caseEmpty').style.display=n?'none':'block'};
  fw.onclick=e=>{const c=e.target.closest('.chip');if(!c)return;if(c.dataset.v==='Todos'){state.seg='Todos';state.svc='Todos'}else state[c.dataset.k]=c.dataset.v;apply()};apply()}

// Página interna do case
const cd=$('#caseDetail');
if(cd){const c=CASES.find(x=>x.id===new URLSearchParams(location.search).get('id'))||CASES[0];document.title=c.t+' | GHB';
  $('#cTitle').textContent=c.t;$('#cCrumb').textContent=c.t;$('#cTags').innerHTML=`<span class="tag">${c.seg}</span><span class="tag">${c.svc}</span>`;$('#cLocal').textContent=c.local;$('#cDesc').textContent=c.desc;
  $('#cKpis').innerHTML=c.kpis.map(k=>`<div><strong>${k[0]}</strong>${k[1]}</div>`).join('');
  $('#cGallery').innerHTML=[c.ph,(c.ph%6)+1,((c.ph+1)%6)+1].map((p,i)=>`<div class="ph ph-${p} ${i?'':'big'}"><span class="cap">${['Antes','Durante a execução','Resultado final'][i]}</span></div>`).join('');
  $('#cQuote').innerHTML=`“${c.quote[0]}”<cite>— ${c.quote[1]}</cite>`;
  $('#cRelated').innerHTML=CASES.filter(x=>x.id!==c.id&&(x.svc===c.svc||x.seg===c.seg)).slice(0,3).map(caseCard).join('')||CASES.filter(x=>x.id!==c.id).slice(0,3).map(caseCard).join('')}

// Hero slider
const hs=$$('.hero-slide');if(hs.length>1){const dots=$('.hero-dots');let i=0;dots.innerHTML=hs.map((_,k)=>`<button aria-label="Slide ${k+1}"></button>`).join('');const db=$$('button',dots);
  const go=k=>{hs[i].classList.remove('on');db[i].classList.remove('on');i=k;hs[i].classList.add('on');db[i].classList.add('on')};db.forEach((b,k)=>b.onclick=()=>go(k));go(0);setInterval(()=>go((i+1)%hs.length),6000)}

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

// Galeria interativa (lightbox simples)
$$('.gallery .ph').forEach(p=>p.onclick=()=>{const m=document.createElement('div');m.className='modal open';m.innerHTML=`<div class="ph ${p.className.replace('big','')}" style="width:min(1000px,100%);height:70vh">${p.innerHTML}</div>`;m.onclick=()=>m.remove();document.body.appendChild(m)});

observe();
