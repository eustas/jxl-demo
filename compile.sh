#!/bin/sh
set -kx

uglifyjs ./jxl_emcc.js -m -c > /tmp/jxl_emcc.js
uglifyjs ./jxl_emcc.worker.js -m -c > /tmp/jxl_emcc.worker.js

python3 <<EOF
import pathlib
sq = chr(39)
bs = chr(92)
ds = chr(36)
jxl_emcc_js = pathlib.Path('/tmp/jxl_emcc.js').read_text().strip()
jxl_emcc_js = jxl_emcc_js.replace(bs, bs + bs).replace(sq, bs + sq)
jxl_emcc_worker_js = pathlib.Path('/tmp/jxl_emcc.worker.js').read_text().strip()
jxl_emcc_worker_js = jxl_emcc_worker_js.replace(bs, bs + bs).replace(sq, bs + sq)
coi_serviceworker_js = pathlib.Path('coi-serviceworker.template').read_text().strip()
coi_serviceworker_js = coi_serviceworker_js.replace(ds + 'jxl_emcc.js' + ds, jxl_emcc_js)
coi_serviceworker_js = coi_serviceworker_js.replace(ds + 'jxl_emcc.worker.js' + ds, jxl_emcc_worker_js)
pathlib.Path('/tmp/coi-serviceworker.js').write_text(coi_serviceworker_js)
EOF

cat /tmp/coi-serviceworker.js | uglifyjs -m -c > ./coi-serviceworker.js

brotli -Zfk ./coi-serviceworker.js
zopfli      ./coi-serviceworker.js
brotli -Zfk ./jxl_emcc.wasm
zopfli      ./jxl_emcc.wasm
brotli -Zfk ./index.html
zopfli      ./index.html
