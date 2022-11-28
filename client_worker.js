// Copyright (c) the JPEG XL Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

let decoder = null;

// Serialize work; plus postpone processing until decoder is ready.
let workQueue = [];

const processQueue = () => {
  while (workQueue.length) {
    const data = workQueue.shift();
    console.log('CW: decoding: ' + data.id);
    postMessage({id: data.id, result: 'bad'});
  }
}

const onmessage = function(event) {
  const data = event.data;
  if (data.op == 'decode') {
    workQueue.push(event.data);
    processQueue();
  } else {
    console.log('CW: unknown op: ' + event.data);
  }
}

const onLoadJxlModule = (module) => {
  decoder = module;
  processQueue();
}

importScripts('jxl_decoder.js');
const config = {mainScriptUrlOrBlob: 'https://jxl-demo.netlify.app/jxl_decoder.js'};
JxlCodecModule(config).then(onLoadJxlModule);
