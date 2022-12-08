// Copyright (c) the JPEG XL Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*
 * ServiceWorker script.
 *
 * Multi-threading in WASM is currently implemented by the means of
 * SharedArrayBuffer. Due to infamous vulnerabilities this feature is disabled
 * unless site is running in "cross-origin isolated" mode.
 * If there is not enough control over the server (e.g. when pages are hosted as
 * "github pages") ServiceWorker is used to upgrade responses with corresponding
 * headers.
 *
 * This script could be executed in 2 environments: HTML page or ServiceWorker.
 * The environment is detected by the type of "window" reference.
 *
 * When this script is executed from HTML page then ServiceWorker is registered.
 * Page reload might be necessary in some situations. By default it is done via
 * `window.location.reload()`. However this can be altered by setting a
 * configuration object `window.serviceWorkerConfig`. It's `doReload` property
 * should be a replacement callable.
 *
 * When this script is executed from ServiceWorker then standard lifecycle
 * event dispatchers are setup along with `fetch` interceptor.
 */

(() => {
  // Embedded (baked-in) responses for faster turn-around.
  const EMBEDDED = {
    'client_worker.js': 'let wasmModule=null,wasmModuleRecipients=[],decoder=null,jobs=[];const processJobs=()=>{if(decoder)for(;;){let o=null;for(let e=0;e<jobs.length;++e)if(jobs[e].inputComplete){o=jobs[e],jobs[e]=jobs[jobs.length-1],jobs.pop();break}if(!o)return;console.log("CW job: "+o.uid);var d=o.input;let s=0;for(let e=0;e<d.length;e++)s+=d[e].length;var t=decoder._malloc(s);let l=0;for(let e=0;e<d.length;++e)decoder.HEAP8.set(d[e],t+l),l+=d[e].length;var e=Date.now(),n=decoder._jxlDecompress(t,s),r=Date.now(),r="Decoded "+o.url+" in "+(r-e)+"ms",e=(decoder._free(t),decoder.HEAP32[n>>2]),i=decoder.HEAP32[n+4>>2];const a=new Uint8Array(e),u=new Uint8Array(decoder.HEAP8.buffer);a.set(u.slice(i,i+e)),decoder._jxlCleanup(n);i={uid:o.uid,data:a,msg:r};postMessage(i,[a.buffer])}},onWasmModuleReceived=e=>{for(wasmModule=e;wasmModuleRecipients.length;)wasmModuleRecipients.shift()(e)},onLoadJxlModule=(onmessage=function(e){var s=e.data;if(console.log("CW received: "+s.op),"wasmModule"===s.op)onWasmModuleReceived(s.wasm);else if("decodeJxl"===s.op){let o=null;for(let e=0;e<jobs.length;++e)if(jobs[e].uid===s.uid){o=jobs[e];break}o||(o={uid:s.uid,input:[],inputComplete:!1,url:s.url},jobs.push(o)),s.data?o.input.push(s.data):o.inputComplete=!0,processJobs()}},e=>{decoder=e,processJobs()}),config=(importScripts("jxl_decoder.js"),{mainScriptUrlOrBlob:"https://jxl-demo.netlify.app/jxl_decoder.js",instantiateWasm:(o,s)=>{var e=e=>{WebAssembly.instantiate(e,o).then(e=>{s(e.exports)})};return wasmModule?e(wasmModule):wasmModuleRecipients.push(e),{}}});JxlDecoderModule(config).then(onLoadJxlModule);',
    'jxl_decoder.js': 'var JxlDecoderModule=(()=>{var Te="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0;return"undefined"!=typeof __filename&&(Te=Te||__filename),function(e){e=e||{},(o=o||(void 0!==e?e:{})).ready=new Promise(function(e,n){t=e,i=n});var o,t,i,n,s,r,D=Object.assign({},o),a=(e,n)=>{throw n},u="object"==typeof window,c="function"==typeof importScripts,f="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,w=o.ENVIRONMENT_IS_PTHREAD||!1,l="";function O(e){return o.locateFile?o.locateFile(e,l):l+e}if(f){var p,d,l=c?require("path").dirname(l)+"/":__dirname+"/";"function"==typeof require&&(p=require("fs"),d=require("path")),n=(e,n)=>(e=d.normalize(e),p.readFileSync(e,n?void 0:"utf8")),r=e=>e=(e=n(e,!0)).buffer?e:new Uint8Array(e),s=(e,t,r)=>{e=d.normalize(e),p.readFile(e,function(e,n){e?r(e):t(n.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(e){if(!(e instanceof M))throw e}),process.on("unhandledRejection",function(e){throw e}),a=(e,n)=>{if(y)throw process.exitCode=e,n;n instanceof M||g("exiting due to exception: "+n),process.exit(e)},o.inspect=function(){return"[Emscripten Module object]"};let e;try{e=require("worker_threads")}catch(e){throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'),e}global.Worker=e.Worker}else(u||c)&&(c?l=self.location.href:"undefined"!=typeof document&&document.currentScript&&(l=document.currentScript.src),l=0!==(l=Te?Te:l).indexOf("blob:")?l.substr(0,l.replace(/[?#].*/,"").lastIndexOf("/")+1):"",f||(n=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.send(null),n.responseText},c&&(r=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),s=(e,n,t)=>{var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=()=>{200==r.status||0==r.status&&r.response?n(r.response):t()},r.onerror=t,r.send(null)}));f&&"undefined"==typeof performance&&(global.performance=require("perf_hooks").performance);var m,h=console.log.bind(console),_=console.warn.bind(console),B=(f&&(h=e=>p.writeSync(1,e+"\\n"),_=e=>p.writeSync(2,e+"\\n")),o.print||h),g=o.printErr||_,y=(Object.assign(o,D),o.quit&&(a=o.quit),o.wasmBinary&&(m=o.wasmBinary),o.noExitRuntime||!0);"object"!=typeof WebAssembly&&E("no native wasm support detected");var b,C,v,H,x,A,F,N=!1,L="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,h=(w&&(S=o.buffer),o.INITIAL_MEMORY||78643200);if(w)b=o.wasmMemory,S=o.buffer;else if(o.wasmMemory)b=o.wasmMemory;else if(!((b=new WebAssembly.Memory({initial:h/65536,maximum:h/65536,shared:!0})).buffer instanceof SharedArrayBuffer))throw g("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),f&&g("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),Error("bad memory");var h=(S=b?b.buffer:S).byteLength,_=S,S=_;o.HEAP8=v=new Int8Array(_),o.HEAP16=new Int16Array(_),o.HEAP32=x=new Int32Array(_),o.HEAPU8=H=new Uint8Array(_),o.HEAPU16=new Uint16Array(_),o.HEAPU32=A=new Uint32Array(_),o.HEAPF32=new Float32Array(_),o.HEAPF64=F=new Float64Array(_);var V,X=[],J=[],z=[];var R,T=0,Q=null,k=null;function E(e){throw w?postMessage({cmd:"onAbort",arg:e}):o.onAbort&&o.onAbort(e),g(e="Aborted("+e+")"),N=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),i(e),e}function G(){return R.startsWith("data:application/octet-stream;base64,")}function Y(){var e=R;try{if(e==R&&m)return new Uint8Array(m);if(r)return r(e);throw"both async and sync fetching of the wasm failed"}catch(e){E(e)}}R="jxl_decoder.wasm",G()||(R=O(R));var Z={};function M(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function $(e){(e=j.S[e])||E(),j.$(e)}function K(e){var n=j.ma();if(!n)return 6;j.W.push(n),(j.S[e.R]=n).R=e.R;var t={cmd:"run",start_routine:e.qa,arg:e.ka,pthread_ptr:e.R};return n.V=()=>{t.time=performance.now(),n.postMessage(t,e.sa)},n.loaded&&(n.V(),delete n.V),0}function ee(e){if(w)return P(1,1,e);y||(j.ra(),o.onExit&&o.onExit(e),N=!0),a(e,new M(e))}function ne(e,n){if(!n&&w)throw te(e),"unwind";ee(e)}var j={T:[],W:[],da:[],S:{},X:function(){w?j.oa():j.na()},na:function(){for(var e=4;e--;)j.Y()},oa:function(){j.receiveObjectTransfer=j.pa,j.threadInitTLS=j.ba,j.setExitStatus=j.aa,y=!1},aa:function(){},ra:function(){for(var e of Object.values(j.S))j.$(e);for(e of j.T)e.terminate();j.T=[]},$:function(e){var n=e.R;delete j.S[n],j.T.push(e),j.W.splice(j.W.indexOf(e),1),e.R=0,ge(n)},pa:function(){},ba:function(){j.da.forEach(e=>e())},Z:function(r,a){r.onmessage=e=>{var n,t=(e=e.data).cmd;r.R&&(j.la=r.R),e.targetThread&&e.targetThread!=U()?(n=j.S[e.ua])?n.postMessage(e,e.transferList):g(\'Internal error! Worker sent a message "\'+t+\'" to target pthread \'+e.targetThread+", but that thread no longer exists!"):"processProxyingQueue"===t?se(e.queue):"spawnThread"===t?K(e):"cleanupThread"===t?$(e.thread):"killThread"===t?(e=e.thread,t=j.S[e],delete j.S[e],t.terminate(),ge(e),j.W.splice(j.W.indexOf(t),1),t.R=0):"cancelThread"===t?j.S[e.thread].postMessage({cmd:"cancel"}):"loaded"===t?(r.loaded=!0,a&&a(r),r.V&&(r.V(),delete r.V)):"print"===t?B("Thread "+e.threadId+": "+e.text):"printErr"===t?g("Thread "+e.threadId+": "+e.text):"alert"===t?alert("Thread "+e.threadId+": "+e.text):"setimmediate"===e.target?r.postMessage(e):"onAbort"===t?o.onAbort&&o.onAbort(e.arg):t&&g("worker sent an unknown command "+t),j.la=void 0},r.onerror=e=>{throw g("worker sent an error! "+e.filename+":"+e.lineno+": "+e.message),e},f&&(r.on("message",function(e){r.onmessage({data:e})}),r.on("error",function(e){r.onerror(e)}),r.on("detachedExit",function(){})),r.postMessage({cmd:"load",urlOrBlob:o.mainScriptUrlOrBlob||Te,wasmMemory:b,wasmModule:C})},Y:function(){var e=O("jxl_decoder.worker.js");j.T.push(new Worker(e))},ma:function(){return 0==j.T.length&&(j.Y(),j.Z(j.T[0])),j.T.pop()}};function I(e){for(;0<e.length;)e.shift()(o)}function te(e){if(w)return P(2,0,e);try{ne(e)}catch(e){e instanceof M||"unwind"==e||a(1,e)}}o.PThread=j,o.establishStackSpace=function(){var e=U(),n=x[e+44>>2];ve(n,n-x[e+48>>2]),Ae(n)};var W=[];function re(e){this.U=e-24,this.ja=function(e){A[this.U+4>>2]=e},this.ga=function(e){A[this.U+8>>2]=e},this.ha=function(){x[this.U>>2]=0},this.fa=function(){v[this.U+12>>0]=0},this.ia=function(){v[this.U+13>>0]=0},this.X=function(e,n){this.ea(),this.ja(e),this.ga(n),this.ha(),this.fa(),this.ia()},this.ea=function(){A[this.U+16>>2]=0}}o.invokeEntryPoint=function(e,n){var t=W[e];t||(e>=W.length&&(W.length=e+1),W[e]=t=V.get(e)),e=t(n),y?j.aa(e):be(e)};var ae;function oe(e,n,t,r){return w?P(3,1,e,n,t,r):ie(e,n,t,r)}function ie(e,n,t,r){if("undefined"==typeof SharedArrayBuffer)return g("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var a=[];return w&&0===a.length?oe(e,n,t,r):(e={qa:t,R:e,ka:r,sa:a},w?(e.ta="spawnThread",postMessage(e,a),0):K(e))}function se(e){Atomics.store(x,e>>2,1),U()&&we(e),Atomics.compareExchange(x,e>>2,1,0)}function P(r,a){var e,n,o=arguments.length-2,i=arguments;return e=()=>{for(var e=Se(8*o),n=e>>3,t=0;t<o;t++)F[n+t]=i[2+t];return ye(r,o,e,a)},n=xe(),e=e(),Ae(n),e}o.executeNotifiedProxyingQueue=se;var D=f?()=>{var e=process.hrtime();return 1e3*e[0]+e[1]/1e6}:w?()=>performance.now()-o.__performance_now_clock_drift:()=>performance.now(),ue=[];function ce(e){return w?P(4,1,e):52}function fe(e,n,t,r,a){return w?P(5,1,e,n,t,r,a):70}var le=[null,[],[]];function pe(e,n,t,r){if(w)return P(6,1,e,n,t,r);for(var a=0,o=0;o<t;o++){var i=A[n>>2],s=A[n+4>>2];n+=8;for(var u=0;u<s;u++){var c=H[i+u],f=le[e];if(0===c||10===c){for(var c=1===e?B:g,l=f,p=0,d=p+NaN,m=p;l[m]&&!(d<=m);)++m;if(16<m-p&&l.buffer&&L)l=L.decode(l.buffer instanceof SharedArrayBuffer?l.slice(p,m):l.subarray(p,m));else{for(d="";p<m;){var h,_,y=l[p++];128&y?(h=63&l[p++],192==(224&y)?d+=String.fromCharCode((31&y)<<6|h):(_=63&l[p++],(y=224==(240&y)?(15&y)<<12|h<<6|_:(7&y)<<18|h<<12|_<<6|63&l[p++])<65536?d+=String.fromCharCode(y):(y-=65536,d+=String.fromCharCode(55296|y>>10,56320|1023&y)))):d+=String.fromCharCode(y)}l=d}c(l),f.length=0}else f.push(c)}a+=s}return A[r>>2]=a,0}j.X();var q,de=[null,ee,te,oe,ce,fe,pe],me={t:function(e){return he(e+24)+24},s:function(e,n,t){throw new re(e).X(n,t),e},h:function(e){_e(e,!c,1,!u),j.ba()},e:function(e){w?postMessage({cmd:"cleanupThread",thread:e}):$(e)},p:ie,q:function(){return 2097152},r:function(e,n,t,r){if(e==n)setTimeout(()=>se(r));else if(w)postMessage({targetThread:e,cmd:"processProxyingQueue",queue:r});else{if(!(e=j.S[e]))return;e.postMessage({cmd:"processProxyingQueue",queue:r})}return 1},j:function(){return-1},b:function(){E("")},f:function(){var e;f||c||((ae=ae||{})[e="Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"]||(ae[e]=1,g(e=f?"warning: "+e:e)))},c:D,g:function(e,n,t){H.copyWithin(e,n,n+t)},i:function(e,n,t){ue.length=n,t>>=3;for(var r=0;r<n;r++)ue[r]=F[t+r];return(e<0?Z[-e-1]:de[e]).apply(null,ue)},n:function(){E("OOM")},k:function(){throw"unwind"},l:ne,o:ce,m:fe,d:pe,a:b||o.wasmMemory},he=(!function(){function n(e,n){var t;o.asm=e.exports,j.da.push(o.asm.E),V=o.asm.B,J.unshift(o.asm.u),C=n,w||(t=j.T.length,j.T.forEach(function(e){j.Z(e,function(){var e;!--t&&(T--,o.monitorRunDependencies&&o.monitorRunDependencies(T),0==T&&(null!==Q&&(clearInterval(Q),Q=null),k))&&(e=k,k=null,e())})}))}function t(e){n(e.instance,e.module)}function r(e){return function(){if(!m&&(u||c)){if("function"==typeof fetch&&!R.startsWith("file://"))return fetch(R,{credentials:"same-origin"}).then(function(e){if(e.ok)return e.arrayBuffer();throw"failed to load wasm binary file at \'"+R+"\'"}).catch(Y);if(s)return new Promise(function(n,e){s(R,function(e){n(new Uint8Array(e))},e)})}return Promise.resolve().then(Y)}().then(function(e){return WebAssembly.instantiate(e,a)}).then(function(e){return e}).then(e,function(e){g("failed to asynchronously prepare wasm: "+e),E(e)})}var a={a:me};if(w||(T++,o.monitorRunDependencies&&o.monitorRunDependencies(T)),o.instantiateWasm)try{return o.instantiateWasm(a,n)}catch(e){g("Module.instantiateWasm callback failed with error: "+e),i(e)}(m||"function"!=typeof WebAssembly.instantiateStreaming||G()||R.startsWith("file://")||f||"function"!=typeof fetch?r(t):fetch(R,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,a).then(t,function(e){return g("wasm streaming compile failed: "+e),g("falling back to ArrayBuffer instantiation"),r(t)})})).catch(i)}(),o.___wasm_call_ctors=function(){return(o.___wasm_call_ctors=o.asm.u).apply(null,arguments)},o._jxlCreateInstance=function(){return(o._jxlCreateInstance=o.asm.v).apply(null,arguments)},o._jxlDestroyInstance=function(){return(o._jxlDestroyInstance=o.asm.w).apply(null,arguments)},o._free=function(){return(o._free=o.asm.x).apply(null,arguments)},o._jxlProcessInput=function(){return(o._jxlProcessInput=o.asm.y).apply(null,arguments)},o._malloc=function(){return(he=o._malloc=o.asm.z).apply(null,arguments)}),U=(o._jxlFlush=function(){return(o._jxlFlush=o.asm.A).apply(null,arguments)},o._jxlDecompress=function(){return(o._jxlDecompress=o.asm.C).apply(null,arguments)},o._jxlCleanup=function(){return(o._jxlCleanup=o.asm.D).apply(null,arguments)},o.__emscripten_tls_init=function(){return(o.__emscripten_tls_init=o.asm.E).apply(null,arguments)},o._pthread_self=function(){return(U=o._pthread_self=o.asm.F).apply(null,arguments)}),_e=o.__emscripten_thread_init=function(){return(_e=o.__emscripten_thread_init=o.asm.G).apply(null,arguments)},ye=(o.__emscripten_thread_crashed=function(){return(o.__emscripten_thread_crashed=o.asm.H).apply(null,arguments)},o._emscripten_run_in_main_runtime_thread_js=function(){return(ye=o._emscripten_run_in_main_runtime_thread_js=o.asm.I).apply(null,arguments)}),we=o.__emscripten_proxy_execute_task_queue=function(){return(we=o.__emscripten_proxy_execute_task_queue=o.asm.J).apply(null,arguments)},ge=o.__emscripten_thread_free_data=function(){return(ge=o.__emscripten_thread_free_data=o.asm.K).apply(null,arguments)},be=o.__emscripten_thread_exit=function(){return(be=o.__emscripten_thread_exit=o.asm.L).apply(null,arguments)},ve=o._emscripten_stack_set_limits=function(){return(ve=o._emscripten_stack_set_limits=o.asm.M).apply(null,arguments)},xe=o.stackSave=function(){return(xe=o.stackSave=o.asm.N).apply(null,arguments)},Ae=o.stackRestore=function(){return(Ae=o.stackRestore=o.asm.O).apply(null,arguments)},Se=o.stackAlloc=function(){return(Se=o.stackAlloc=o.asm.P).apply(null,arguments)};function Re(){function e(){if(!q&&(q=!0,o.calledRun=!0,!N)&&(w||I(J),t(o),o.onRuntimeInitialized&&o.onRuntimeInitialized(),!w)){if(o.postRun)for("function"==typeof o.postRun&&(o.postRun=[o.postRun]);o.postRun.length;){var e=o.postRun.shift();z.unshift(e)}I(z)}}if(!(0<T))if(w)t(o),w||I(J),postMessage({cmd:"loaded"});else{if(o.preRun)for("function"==typeof o.preRun&&(o.preRun=[o.preRun]);o.preRun.length;)n=void 0,n=o.preRun.shift(),X.unshift(n);I(X),0<T||(o.setStatus?(o.setStatus("Running..."),setTimeout(function(){setTimeout(function(){o.setStatus("")},1),e()},1)):e())}var n}if(o.___cxa_is_pointer_type=function(){return(o.___cxa_is_pointer_type=o.asm.Q).apply(null,arguments)},o.keepRuntimeAlive=function(){return y},o.wasmMemory=b,o.ExitStatus=M,o.PThread=j,k=function e(){q||Re(),q||(k=e)},o.preInit)for("function"==typeof o.preInit&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.pop()();return Re(),e.ready}})();"object"==typeof exports&&"object"==typeof module?module.exports=JxlDecoderModule:"function"==typeof define&&define.amd?define([],function(){return JxlDecoderModule}):"object"==typeof exports&&(exports.JxlDecoderModule=JxlDecoderModule);',
    'jxl_decoder.worker.js': '"use strict";var Module={},ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,nodeWorkerThreads,parentPort,fs,initializedJS=(ENVIRONMENT_IS_NODE&&(nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort,parentPort.on("message",e=>onmessage({data:e})),fs=require("fs"),Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(e){(0,eval)(fs.readFileSync(e,"utf8"))},postMessage:function(e){parentPort.postMessage(e)},performance:global.performance||{now:function(){return Date.now()}}})),!1),pendingNotifiedProxyingQueues=[];function threadPrintErr(){var e=Array.prototype.slice.call(arguments).join(" ");ENVIRONMENT_IS_NODE?fs.writeSync(2,e+"\\n"):console.error(e)}function threadAlert(){var e=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:e,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,r)=>{e=new WebAssembly.Instance(Module.wasmModule,e);return r(e),Module.wasmModule=null,e.exports},self.onunhandledrejection=e=>{throw e.reason??e},self.onmessage=e=>{try{var r;if("load"===e.data.cmd)Module.wasmModule=e.data.wasmModule,Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,"string"==typeof e.data.urlOrBlob?importScripts(e.data.urlOrBlob):(r=URL.createObjectURL(e.data.urlOrBlob),importScripts(r),URL.revokeObjectURL(r)),JxlDecoderModule(Module).then(function(e){Module=e});else if("run"===e.data.cmd){Module.__performance_now_clock_drift=performance.now()-e.data.time,Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(pendingNotifiedProxyingQueues.forEach(e=>{Module.executeNotifiedProxyingQueue(e)}),pendingNotifiedProxyingQueues=[],initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(e){if("unwind"!=e){if(!(e instanceof Module.ExitStatus))throw e;Module.keepRuntimeAlive()||Module.__emscripten_thread_exit(e.status)}}}else"cancel"===e.data.cmd?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):"setimmediate"!==e.data.target&&("processProxyingQueue"===e.data.cmd?initializedJS?Module.executeNotifiedProxyingQueue(e.data.queue):pendingNotifiedProxyingQueues.push(e.data.queue):e.data.cmd&&(err("worker.js received unknown command "+e.data.cmd),err(e.data)))}catch(e){throw Module.__emscripten_thread_crashed&&Module.__emscripten_thread_crashed(),e}};',
  };

  const setCopHeaders = (headers) => {
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  };

  // Inflight object: {clientId, uid, timestamp, controller}
  const inflight = [];

  const wasmModule = null;

  const aliveClientIds = [];

  const makeUid = () => {
    return Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2);
  };

  const gatherTransferrables = (...args) => {
    const result = [];
    for (let i = 0; i < args.length; ++i) {
      if (args[i]) {
        result.push(args[i].buffer);
      }
    }
    return result;
  };

  const probeClients = () => {
    for (let i = 0; i < aliveClientIds.length; ++i) {
      const clientId = aliveClientIds[i];
      clients.get(clientId).then((client) => {
        if (!client) {
          // TODO: cleanup inflight.
          const idx = aliveClientIds.indexOf(clientId);
          if (idx === -1) return;  // Should never happen.
          aliveClientIds[idx] = aliveClientIds[aliveClientIds.length - 1];
          aliveClientIds.pop();
        }
      });
    }
  };

  const onWasmModuleReady = (module) => {
    wasmModule = module;
    for (let i = 0; i < aliveClientIds.length; ++i) {
      const clientId = aliveClientIds[i];
      clients.get(clientId).then((client) => {
        if (client) {
          client.postMessage({op: 'wasmModule', wasm: wasmModule});
        }
      });
    }
  };

  const maybeProcessEmbeddedResources = (event) => {
    const url = event.request.url;
    // Shortcut for baked-in scripts.
    for (const [key, value] of Object.entries(EMBEDDED)) {
      if (url.endsWith(key)) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/javascript');
        setCopHeaders(headers);

        event.respondWith(new Response(value, {
          status: 200,
          statusText: 'OK',
          headers: headers,
        }));
        return true;
      }
    }
    return false;
  };

  const wrapImageResponse = async (clientId, originalResponse) => {
    // TODO: cache?
    const client = await clients.get(clientId);
    // Client is gone? Not our problem then.
    if (!client) {
      return originalResponse;
    }

    const inputStream = await originalResponse.body;
    // Can't use "BYOB" for regular responses.
    const reader = inputStream.getReader();

    const inflightEntry = {
      clientId: clientId,
      uid: makeUid(),
      timestamp: Date.now(),
      inputStreamReader: reader,
      outputStreamController: null
    };
    inflight.push(inflightEntry);

    const outputStream = new ReadableStream({
      start: (controller) => {
        inflightEntry.outputStreamController = controller;
      }
    });

    const onRead = (chunk) => {
      const msg = {
        op: 'decodeJxl',
        uid: inflightEntry.uid,
        url: originalResponse.url,
        data: chunk.value || null
      };
      client.postMessage(msg, gatherTransferrables(msg.data));
      if (!chunk.done) {
        reader.read().then(onRead);
      }
    };
    reader.read(new SharedArrayBuffer(65536)).then(onRead);

    let modifiedResponseHeaders = new Headers(originalResponse.headers);
    modifiedResponseHeaders.set('Content-Type', 'image/png');
    return new Response(outputStream, {headers: modifiedResponseHeaders});
  };

  const wrapImageRequest = async (clientId, request) => {
    let modifiedRequestHeaders = new Headers(request.headers);
    modifiedRequestHeaders.append('Accept', 'image/jxl');
    let modifiedRequest =
        new Request(request, {headers: modifiedRequestHeaders});
    let originalResponse = await fetch(modifiedRequest);
    let contentType = originalResponse.headers.get('Content-Type');

    if (contentType === 'image/jxl') {
      return wrapImageResponse(clientId, originalResponse);
    }

    return originalResponse;
  };

  const onFetch = async (event) => {
    const clientId = event.clientId;
    const request = event.request;

    if (aliveClientIds.indexOf(clientId) === -1) {  // new client
      aliveClientIds.push(clientId);
      if (wasmModule) {
        clients.get(clientId).then((client) => {
          if (client) {
            client.postMessage({op: 'wasmModule', wasm: wasmModule});
          }
        });
      }
    }

    // Pass direct cached resource requests.
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
      return;
    }

    // Serve backed resources.
    if (maybeProcessEmbeddedResources(event)) {
      return;
    }

    // Notify server we are JXL-capable.
    if (request.destination === 'image') {
      let accept = request.headers.get('Accept');
      // Only if browser does not support JXL.
      if (accept.indexOf('image/jxl') === -1) {
        event.respondWith(wrapImageRequest(clientId, request));
      }
      return;
    }
  };

  const onMessage = (event) => {
    const data = event.data;
    const uid = data.uid;
    let inflightEntry = null;
    for (let i = 0; i < inflight.length; ++i) {
      if (inflight[i].uid === uid) {
        inflightEntry = inflight[i];
        break;
      }
    }
    if (!inflightEntry) {
      console.log('Ooops, not found: ' + uid);
      return;
    }
    inflightEntry.outputStreamController.enqueue(data.data);
    inflightEntry.outputStreamController.close();
  };

  const serviceWorkerMain = () => {
    WebAssembly.compileStreaming(fetch('jxl_decoder.wasm'))
        .then(onWasmModuleReady);

    // Periodically cleanup clients list.
    setInterval(probeClients, 2500);

    // ServiceWorker lifecycle.
    self.addEventListener('install', () => {
      return self.skipWaiting();
    });
    self.addEventListener(
        'activate', (event) => event.waitUntil(self.clients.claim()));
    self.addEventListener('message', onMessage);
    // Intercept some requests.
    self.addEventListener('fetch', onFetch);
  };

  // Service workers does not support multi-threading; that is why decoding is
  // relayed back to "client" (document / window).
  const prepareClient = () => {
    const clientWorker = new Worker('client_worker.js');
    clientWorker.onmessage = (event) => {
      const data = event.data;
      if (typeof addMessage !== 'undefined') {
        if (data.msg) {
          addMessage(data.msg, 'blue');
        }
      }
      navigator.serviceWorker.controller.postMessage(
          data, gatherTransferrables(data.data));
    };

    // Forward ServiceWorker requests to "Client" worker.
    navigator.serviceWorker.addEventListener('message', (event) => {
      clientWorker.postMessage(
          event.data, gatherTransferrables(event.data.data));
    });
  };

  // Executed in HTML page environment.
  const maybeRegisterServiceWorker = () => {
    if (!window.isSecureContext) {
      config.log('Secure context is required for this ServiceWorker.');
      return;
    }

    const config = {
      log: console.log,
      error: console.error,
      ...window.serviceWorkerConfig  // add overrides
    }

    const onServiceWorkerRegistrationSuccess = (registration) => {
      config.log('Service Worker registered', registration.scope);
    };

    const onServiceWorkerRegistrationFailure = (err) => {
      config.error('Service Worker failed to register:', err);
    };

    navigator.serviceWorker.register(window.document.currentScript.src)
        .then(
            onServiceWorkerRegistrationSuccess,
            onServiceWorkerRegistrationFailure);
  };

  if (typeof window === 'undefined') {
    serviceWorkerMain();
  } else {
    maybeRegisterServiceWorker();
    prepareClient();
  }
})();