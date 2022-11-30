// Copyright (c) the JPEG XL Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

let decoder = null;

// Serialize work; plus postpone processing until decoder is ready.
let jobs = [];

const processJobs = () => {
  while (true) {
    let job = null;
    // Currently we do not do progressive; process only "inputComplete" jobs.
    for (let i = 0; i < jobs.length; ++i) {
      if (!jobs[i].inputComplete) {
        continue;
      }
      job = jobs[i];
      jobs[i] = jobs[jobs.length - 1];
      jobs.pop();
      break;
    }
    if (!job) {
      return;
    }
    console.log('CW job: ' + job.uid);
    const response = {uid: job.uid, result: 'bad'};
    console.log('CW->Client: ' + JSON.stringify(response));
    postMessage(response);
  }
};

onmessage = function(event) {
  const data = event.data;
  console.log('CW received: ' + data.op);
  if (data.op === 'decodeJxl') {
    let job = null;
    for (let i = 0; i < jobs.length; ++i) {
      if (jobs[i].uid === data.uid) {
        job = jobs[i];
        break;
      }
    }
    if (!job) {
      job = {uid: data.uid, input: [], inputComplete: false};
      jobs.push(job);
    }
    if (data.data) {
      job.input.push(data.data);
    } else {
      job.inputComplete = true;
    }
    processJobs();
  }
};

const onLoadJxlModule = (module) => {
  decoder = module;
  processJobs();
}

importScripts('jxl_decoder.js');
const config = {mainScriptUrlOrBlob: 'https://jxl-demo.netlify.app/jxl_decoder.js'};
JxlCodecModule(config).then(onLoadJxlModule);
