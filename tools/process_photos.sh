#!/usr/bin/env bash
# Prepara as fotos "4x4" (1080x1080, com moldura branca arredondada) para o site.
#  - remove a moldura e os cantos arredondados (a marca d'água da GHB é mantida);
#  - gera JPEG progressivo otimizado: <nome>.jpg (940px) e <nome>-sm.jpg (560px, cards).
# Uso: tools/process_photos.sh <pasta com 1.png ... 9.png> [pasta de saída]
set -euo pipefail
SRC="${1:?informe a pasta com as fotos 1.png ... 9.png}"
OUT="${2:-$(dirname "$0")/../assets/img/fotos}"
mkdir -p "$OUT"

# número do arquivo original -> nome descritivo (usado no HTML/JS)
declare -A NAMES=(
  [1]=biomanta-talude-canaleta
  [2]=colaborador-talude-reservatorio
  [3]=trator-esteira-mineracao
  [4]=escavadeira-dreno-brita
  [5]=equipe-epi-escavadeira
  [6]=muda-nativa-plantio
  [7]=caminhao-ghb-frota
  [8]=escavadeira-carregando-caminhao
  [9]=talude-revegetado
)

for n in "${!NAMES[@]}"; do
  name="${NAMES[$n]}"
  # moldura = 46px; o canto arredondado (raio ~68px) só tem foto a ~20px da borda -> corta 70px
  convert "$SRC/$n.png" -crop 940x940+70+70 +repage -strip \
    -sampling-factor 4:2:0 -interlace Plane -quality 82 "$OUT/$name.jpg"
  convert "$OUT/$name.jpg" -filter Lanczos -resize 560x560 -unsharp 0x0.6+0.5+0.02 \
    -strip -sampling-factor 4:2:0 -interlace Plane -quality 80 "$OUT/$name-sm.jpg"
  echo "ok $n -> $name"
done
