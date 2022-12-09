console.log("Shared worker created");

let wasmModule = null;
const recipients = [];

const onWasmModuleReady = (module) => {
  wasmModule = module;
  while (recipients.length) {
    console.log('Offline');
    recipients.pop().postMessage({op: 'wasmModule', wasmModule: wasmModule});
  }
};

WebAssembly.compileStreaming(fetch('jxl_decoder.wasm')).then(onWasmModuleReady);

onconnect = function (event) {
  const port = event.ports[0];
  console.log("Shared worker connected");

  if (wasmModule) {
    console.log('Online');
    port.postMessage({op: 'wasmModule', wasmModule: wasmModule});
  } else {
    recipients.push(port);
  }

  // port.onmessage = function (e) { console.log("Shared worker got message"); };
};
