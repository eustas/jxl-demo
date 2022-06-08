#!/bin/sh

jxl_emcc_js=$(uglifyjs ./jxl_emcc.js -m -c)
jxl_emcc_js=${jxl_emcc_js//"\\"/"\\\\"}
jxl_emcc_js=${jxl_emcc_js//"'"/"\\'"}

jxl_emcc_worker_js=$(uglifyjs ./jxl_emcc.worker.js -m -c)
jxl_emcc_worker_js=${jxl_emcc_worker_js//"\\"/"\\\\"}
jxl_emcc_worker_js=${jxl_emcc_worker_js//"'"/"\\'"}

coi_serviceworker_js=$(cat ./coi-serviceworker.template)
coi_serviceworker_js=${coi_serviceworker_js//'$jxl_emcc.js$'/$jxl_emcc_js}
coi_serviceworker_js=${coi_serviceworker_js//'$jxl_emcc_worker.js$'/$jxl_emcc_worker_js}
echo "${coi_serviceworker_js}" | uglifyjs -m -c > ./coi-serviceworker.js

brotli -Zfk ./coi-serviceworker.js
zopfli      ./coi-serviceworker.js
brotli -Zfk ./jxl_emcc.wasm
zopfli      ./jxl_emcc.wasm
brotli -Zfk ./index.html
zopfli      ./index.html
