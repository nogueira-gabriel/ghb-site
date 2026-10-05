# GHB Revegetação Ambiental — Site institucional

Site estático (HTML/CSS/JS, sem dependências) seguindo o protótipo de arquitetura de informação, wireframes e design system da GHB.

## Estrutura
- `index.html` — Home (hero com slider de fotos, métricas, serviços, diferenciais, segmentos, cases com filtro, CTA)
- `institucional.html` — história, missão/valores/SSMA, frota, certificações & ESG
- `solucoes/` — página geral + drenagem, bioengenharia, supressão vegetal, reflorestamento
- `obras/` — listagem com filtros (segmento / serviço) e página interna do case (`case.html?id=`)
- `conteudos.html`, `orcamento.html` (formulário B2B com validação de CNPJ e bloqueio de e-mails gratuitos), `contato.html`
- `intranet/` — dashboard do colaborador (login via modal no header — **apenas demonstração no front-end**)
- `politicas.html`, `trabalhe-conosco.html` — conteúdo do menu "escondido" (gaveta lateral)

## Design
Segue o protótipo (cores `#1E4620` / `#4A7C59` / `#F4F6F4`, Montserrat + Open Sans, raios de 6px); a identidade vem do ofício da GHB: **a página é um corte de talude**.
- **Corte inclinado** (`--corte`, `--corte-g` em `assets/css/style.css`): foto do hero, fotos dos cards e entrada da faixa de chamada.
- **Curvas de nível** (`assets/img/curvas-nivel*.svg`, geradas por `python3 tools/gen_contours.py [semente]`): traço verde nos fundos claros (hero, banners) e branco nos escuros (faixa de chamada, rodapé).
- **Régua** de levantamento nos números da home (`.ruler`).
- Fontes hospedadas em `assets/fonts/` (licença OFL em `OFL.txt`): sem chamadas ao Google Fonts.
- Evitados de propósito: rótulos em caixa-alta acima dos títulos, setas "→" nos links, efeito de entrada em cada seção e cards que "levantam" no hover.

## Fotos reais (`assets/img/fotos/`)
As 9 fotos enviadas (formato "4x4", 1080×1080, com moldura branca) são preparadas por `tools/process_photos.sh`:
remove a moldura e os cantos arredondados (mantendo a marca d'água da GHB) e gera `<nome>.jpg` (940px) e `<nome>-sm.jpg` (560px, cards).

```bash
tools/process_photos.sh "<pasta com 1.png … 9.png>"   # requer ImageMagick (convert)
```

O catálogo (arquivo, **texto alternativo** e legenda de cada foto) fica em `tools/fotos.json`. Nas páginas (`tools/pages/`) use as macros:

```
{{foto CHAVE [sm] [eager] [defer] [decor] [pos=50%/40%] [class=x] [id=y]}}   <img> otimizada
{{gitem CHAVE GRUPO [big]}}                                                  miniatura que abre o lightbox
```

Para trocar ou adicionar uma foto: coloque o arquivo em `assets/img/fotos/` (`nome.jpg` + `nome-sm.jpg`), registre em `tools/fotos.json` e rode o build.

## Ícones de contato (`assets/img/icons/`)
`telefone`, `email`, `localizacao`, `instagram`, `linkedin` — cada um em `-verde.svg` (fundo claro) e `-branco.svg` (fundo escuro).
Os SVGs enviados foram apenas recortados (viewBox ajustado, sem a margem da prancheta); formas e cores são as originais.
Usados na barra de contato do topo, no rodapé, na página de contato e na lateral do orçamento.

## Edição
As páginas são geradas a partir de `tools/pages/` (header/footer injetados por `assets/js/main.js`):

```bash
python3 tools/services.py   # regenera os templates das páginas de serviço
python3 tools/build.py      # gera os HTML finais e assets/js/fotos.js (não editar à mão)
```
Cases e serviços ficam em `CASES` / `SERVICES` em `assets/js/main.js`.

## Antes de publicar
- **Dados de exemplo (inventados) a substituir por dados reais:** números, locais e depoimentos dos cases, posts do blog, linha do tempo da história, selos ISO (rodapé/institucional), relatórios, comunicados e documentos da intranet. Só as fotos são reais.
- Substituir o logotipo provisório ("GHB" em quadrado verde) pelo logotipo oficial.
- Trocar `LINKEDIN` / `INSTAGRAM` (`assets/js/main.js`) e os links de redes sociais da página de contato pelos perfis oficiais.
- Fotos de **supressão vegetal** (Feller Buncher, corte de vegetação) e de **hidrossemeadura/caminhão-pipa**: ainda não há — hoje usa-se a de trator de esteira / talude revegetado.
- Integrar os formulários a um back-end/CRM (hoje só validam e exibem confirmação) e implementar autenticação real da intranet.
