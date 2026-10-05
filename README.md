# GHB Revegetação Ambiental — Site institucional

Site estático (HTML/CSS/JS, sem dependências) seguindo o protótipo de arquitetura de informação, wireframes e design system da GHB.

## Estrutura
- `index.html` — Home (hero, métricas, serviços, diferenciais, segmentos, cases com filtro, CTA)
- `institucional.html` — História, missão/valores/SSMA, frota, certificações & ESG
- `solucoes/` — página geral + drenagem, bioengenharia, supressão vegetal, reflorestamento
- `obras/` — listagem com filtros (segmento / serviço) e página interna do case (`case.html?id=`)
- `conteudos.html`, `orcamento.html` (formulário B2B com validação de CNPJ e bloqueio de e-mails gratuitos), `contato.html`
- `intranet/` — dashboard do colaborador (login via modal no header — **apenas demonstração no front-end**, requer back-end real)
- `politicas.html`, `trabalhe-conosco.html` — conteúdo do menu "escondido" (gaveta lateral)

## Edição
As páginas são geradas a partir de `tools/pages/` (header/footer injetados por `assets/js/main.js`):

```bash
python3 tools/services.py   # regenera templates das páginas de serviço
python3 tools/build.py      # gera os HTML finais
```
Cases e serviços ficam em `CASES` / `SERVICES` em `assets/js/main.js`.

## Pendências
- Substituir os placeholders `.ph-*` por **fotos reais das obras** em `assets/img/`.
- Integrar os formulários a um back-end/CRM (hoje só validam e exibem confirmação).
