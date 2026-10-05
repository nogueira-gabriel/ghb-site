# GHB Revegetação Ambiental: site institucional

Site estático (HTML, CSS e JS, sem dependências) seguindo o protótipo de arquitetura de informação, wireframes e design system da GHB.

## Estrutura
- `index.html`: home (hero com slider de fotos, números, serviços, diferenciais, segmentos, cases com filtro, chamada final)
- `institucional.html`: história, missão, valores, SSMA, frota, certificações e ESG
- `solucoes/`: página geral e as páginas de drenagem, bioengenharia, supressão vegetal e reflorestamento
- `obras/`: listagem com filtros (segmento e serviço) e página interna do case (`case.html?id=`)
- `conteudos.html`, `orcamento.html` (formulário B2B com validação de CNPJ e bloqueio de e-mails gratuitos), `contato.html`
- `intranet/`: dashboard do colaborador (login pelo modal do cabeçalho, **apenas demonstração no front-end**)
- `politicas.html` e `trabalhe-conosco.html`: conteúdo do menu lateral escondido

## Design system (`assets/css/style.css`)
Cores, fontes e raios seguem o protótipo (`#1E4620`, `#4A7C59`, `#F4F6F4`, Montserrat e Open Sans, raio de 6px). Regras que mantêm tudo alinhado:
- **Grade única** de 1200px, com 24px de margem lateral; títulos, textos e imagens partem da mesma borda esquerda.
- **Espaçamento** em múltiplos de 8; seções com 96px de respiro (64px no celular).
- **Controles** com altura fixa: botões de 48px (40px no tamanho pequeno) e campos de formulário de 48px.
- **Cards** com um único padrão (foto 4:3, corpo com 24px, ações alinhadas ao rodapé), sempre com a mesma altura na linha.
- **Fontes** hospedadas em `assets/fonts/` (licença OFL em `OFL.txt`), sem chamadas ao Google Fonts.

## Ícones
Uma única família em sólido, embutida em cada página como sprite inline (herda a cor do texto). Três tamanhos: pequeno (16px), padrão (20px) e grande (28px, sempre dentro de uma caixa de 48px com fundo `--tinta`).
Os arquivos ficam em `tools/icons/`: `telefone`, `email`, `localizacao`, `instagram` e `linkedin` usam o desenho enviado pela GHB; os demais são da família Phosphor (licença MIT).

```
{{icon NOME [sm|lg]}}     nos templates de tools/pages
icon('nome', 'sm')        no assets/js/main.js
```
Para adicionar um ícone, coloque o SVG em `tools/icons/` e rode o build.

## Fotos reais (`assets/img/fotos/`)
As 9 fotos enviadas (formato "4x4", 1080×1080, com moldura branca) são preparadas por `tools/process_photos.sh`: remove a moldura e os cantos arredondados (mantendo a marca d'água da GHB) e gera `<nome>.jpg` (940px) e `<nome>-sm.jpg` (560px, cards).

```bash
tools/process_photos.sh "<pasta com 1.png a 9.png>"   # requer ImageMagick (convert)
```

O catálogo (arquivo, **texto alternativo** e legenda de cada foto) fica em `tools/fotos.json`. Nos templates:

```
{{foto CHAVE [sm] [eager] [defer] [decor] [pos=50%/40%] [class=x] [id=y]}}   <img> otimizada
{{gitem CHAVE GRUPO [big]}}                                                  miniatura que abre o lightbox
```

Para trocar ou adicionar uma foto: coloque `nome.jpg` e `nome-sm.jpg` em `assets/img/fotos/`, registre em `tools/fotos.json` e rode o build.

## Edição
As páginas são geradas a partir de `tools/pages/` (cabeçalho e rodapé são injetados por `assets/js/main.js`):

```bash
python3 tools/services.py   # regenera os templates das páginas de serviço
python3 tools/build.py      # gera os HTML finais, o sprite de ícones e assets/js/fotos.js
```
Cases e serviços ficam em `CASES` e `SERVICES` em `assets/js/main.js`.

## Antes de publicar
- **Dados de exemplo (inventados) a substituir por dados reais:** números, locais e depoimentos dos cases, posts do blog, linha do tempo da história, selos ISO (rodapé e institucional), relatórios, comunicados e documentos da intranet. Só as fotos são reais.
- Substituir o logotipo provisório (quadrado verde com "GHB") pelo logotipo oficial.
- Trocar `LINKEDIN` e `INSTAGRAM` (em `assets/js/main.js`) e os links de redes sociais da página de contato pelos perfis oficiais.
- Fotos de **supressão vegetal** (Feller Buncher, corte de vegetação) e de **hidrossemeadura e caminhão-pipa**: ainda não há; hoje usa-se a de trator de esteira e a de talude revegetado.
- Integrar os formulários a um back-end ou CRM (hoje só validam e exibem confirmação) e implementar autenticação real da intranet.
