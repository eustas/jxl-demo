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
    console.log('CW job: ' + data.uid);
    const response = {uid: data.uid, result: 'bad'};
    console.log('CW->Client: ' + JSON.stringify(response));
    postMessage(response);
  }
};

onmessage = function(event) {
  const data = event.data;
  console.log('CW received: ' + data.op);
  if (data.op === 'decodeJxl') {
    workQueue.push(event.data);
    processQueue();
  }
};

const onLoadJxlModule = (module) => {
  decoder = module;
  processQueue();
}

importScripts('jxl_decoder.js');
const config = {mainScriptUrlOrBlob: 'https://jxl-demo.netlify.app/jxl_decoder.js'};
JxlCodecModule(config).then(onLoadJxlModule);
