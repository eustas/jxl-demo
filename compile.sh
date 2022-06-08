#!/bin/sh
jxl_emcc_js=$(uglifyjs ./compressed/jxl_emcc.js -m -c | sed -z "s/\n/ /g;s/'/\\\'/g")
jxl_emcc_worker_js=$(uglifyjs ./compressed/jxl_emcc.worker.js -m -c | sed -z "s/\n/ /g;s/'/\\\'/g")

coi_serviceworker_js=$(cat ./coi-serviceworker.template)
coi_serviceworker_js=${coi_serviceworker_js//'$jxl_emcc.js$'/$jxl_emcc_js}
coi_serviceworker_js=${coi_serviceworker_js//'$jxl_emcc_worker.js$'/$jxl_emcc_worker_js}
echo "${coi_serviceworker_js}" | uglifyjs -m -c > ./coi-serviceworker.js

#brotli -Zfk ./coi-serviceworker.js
#zopfli      ./coi-serviceworker.js
brotli -Zfk ./compressed/jxl_emcc.wasm
zopfli      ./compressed/jxl_emcc.wasm
