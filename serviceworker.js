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
    'client_worker.js': 'let decoder=null,jobs=[];const processJobs=()=>{if(decoder)for(;;){let o=null;for(let e=0;e<jobs.length;++e)if(jobs[e].inputComplete){o=jobs[e],jobs[e]=jobs[jobs.length-1],jobs.pop();break}if(!o)return;console.log("CW job: "+o.uid);var r=o.input;let l=0;for(let e=0;e<r.length;e++)l+=r[e].length;var t=decoder._malloc(l);let d=0;for(let e=0;e<r.length;++e)decoder.HEAP8.set(r[e],t+d),d+=r[e].length;var e=Date.now(),s=decoder._jxlDecompress(t,l),n=Date.now(),n="Decoded "+o.url+" in "+(n-e)+"ms",e=(decoder._free(t),decoder.HEAP32[s>>2]),c=decoder.HEAP32[s+4>>2];const i=new Uint8Array(e),u=new Uint8Array(decoder.HEAP8.buffer);i.set(u.slice(c,c+e)),decoder._jxlCleanup(s);c={uid:o.uid,data:i,msg:n};postMessage(c,[i.buffer])}},onLoadJxlModule=(onmessage=function(e){var l=e.data;if(console.log("CW received: "+l.op),"decodeJxl"===l.op){let o=null;for(let e=0;e<jobs.length;++e)if(jobs[e].uid===l.uid){o=jobs[e];break}o||(o={uid:l.uid,input:[],inputComplete:!1,url:l.url},jobs.push(o)),l.data?o.input.push(l.data):o.inputComplete=!0,processJobs()}},e=>{decoder=e,processJobs()}),config=(importScripts("jxl_decoder.js"),{mainScriptUrlOrBlob:"https://jxl-demo.netlify.app/jxl_decoder.js"});JxlDecoderModule(config).then(onLoadJxlModule);',
    'jxl_decoder.js': 'var JxlDecoderModule=(()=>{var je="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0;return"undefined"!=typeof __filename&&(je=je||__filename),function(e){e=e||{},(o=o||(void 0!==e?e:{})).ready=new Promise(function(e,n){t=e,i=n});var o,t,i,n,s,r,O=Object.assign({},o),a=(e,n)=>{throw n},u="object"==typeof window,c="function"==typeof importScripts,f="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,w=o.ENVIRONMENT_IS_PTHREAD||!1,l="";function B(e){return o.locateFile?o.locateFile(e,l):l+e}if(f){var p,C,l=c?require("path").dirname(l)+"/":__dirname+"/";"function"==typeof require&&(p=require("fs"),C=require("path")),n=(e,n)=>(e=C.normalize(e),p.readFileSync(e,n?void 0:"utf8")),r=e=>e=(e=n(e,!0)).buffer?e:new Uint8Array(e),s=(e,t,r)=>{e=C.normalize(e),p.readFile(e,function(e,n){e?r(e):t(n.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(e){if(!(e instanceof M))throw e}),process.on("unhandledRejection",function(e){throw e}),a=(e,n)=>{if(_)throw process.exitCode=e,n;n instanceof M||g("exiting due to exception: "+n),process.exit(e)},o.inspect=function(){return"[Emscripten Module object]"};let e;try{e=require("worker_threads")}catch(e){throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'),e}global.Worker=e.Worker}else(u||c)&&(c?l=self.location.href:"undefined"!=typeof document&&document.currentScript&&(l=document.currentScript.src),l=0!==(l=je?je:l).indexOf("blob:")?l.substr(0,l.replace(/[?#].*/,"").lastIndexOf("/")+1):"",f||(n=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.send(null),n.responseText},c&&(r=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),s=(e,n,t)=>{var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=()=>{200==r.status||0==r.status&&r.response?n(r.response):t()},r.onerror=t,r.send(null)}));f&&"undefined"==typeof performance&&(global.performance=require("perf_hooks").performance);var d,m=console.log.bind(console),h=console.warn.bind(console),H=(f&&(m=e=>p.writeSync(1,e+"\\n"),h=e=>p.writeSync(2,e+"\\n")),o.print||m),g=o.printErr||h,_=(Object.assign(o,O),o.quit&&(a=o.quit),o.wasmBinary&&(d=o.wasmBinary),o.noExitRuntime||!0);"object"!=typeof WebAssembly&&k("no native wasm support detected");var y,X,U,F,v,b,V,N=!1,L="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,m=(w&&(x=o.buffer),o.INITIAL_MEMORY||78643200);if(w)y=o.wasmMemory,x=o.buffer;else if(o.wasmMemory)y=o.wasmMemory;else if(!((y=new WebAssembly.Memory({initial:m/65536,maximum:m/65536,shared:!0})).buffer instanceof SharedArrayBuffer))throw g("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),f&&g("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),Error("bad memory");var m=(x=y?y.buffer:x).byteLength,h=x,x=h;o.HEAP8=U=new Int8Array(h),o.HEAP16=new Int16Array(h),o.HEAP32=v=new Int32Array(h),o.HEAPU8=F=new Uint8Array(h),o.HEAPU16=new Uint16Array(h),o.HEAPU32=b=new Uint32Array(h),o.HEAPF32=new Float32Array(h),o.HEAPF64=V=new Float64Array(h);var Y,J=[],Z=[],$=[];var A,S=0,z=null,T=null;function k(e){throw w?postMessage({cmd:"onAbort",arg:e}):o.onAbort&&o.onAbort(e),g(e="Aborted("+e+")"),N=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),i(e),e}function Q(){return A.startsWith("data:application/octet-stream;base64,")}function G(){var e=A;try{if(e==A&&d)return new Uint8Array(d);if(r)return r(e);throw"both async and sync fetching of the wasm failed"}catch(e){k(e)}}A="jxl_decoder.wasm",Q()||(A=B(A));var K={};function M(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function ee(e){(e=j.W[e])||k(),j.ea(e)}function ne(e){var n=j.qa();if(!n)return 6;j.$.push(n),(j.W[e.V]=n).V=e.V;var t={cmd:"run",start_routine:e.ua,arg:e.oa,pthread_ptr:e.V};return n.Z=()=>{t.time=performance.now(),n.postMessage(t,e.wa)},n.loaded&&(n.Z(),delete n.Z),0}function te(e){if(w)return I(1,1,e);_||(j.va(),o.onExit&&o.onExit(e),N=!0),a(e,new M(e))}function re(e,n){if(!n&&w)throw ae(e),"unwind";te(e)}var j={X:[],$:[],ha:[],W:{},aa:function(){w?j.sa():j.ra()},ra:function(){for(var e=4;e--;)j.ba()},sa:function(){j.receiveObjectTransfer=j.ta,j.threadInitTLS=j.ga,j.setExitStatus=j.fa,_=!1},fa:function(){},va:function(){for(var e of Object.values(j.W))j.ea(e);for(e of j.X)e.terminate();j.X=[]},ea:function(e){var n=e.V;delete j.W[n],j.X.push(e),j.$.splice(j.$.indexOf(e),1),e.V=0,xe(n)},ta:function(){},ga:function(){j.ha.forEach(e=>e())},da:function(r,a){r.onmessage=e=>{var n,t=(e=e.data).cmd;r.V&&(j.pa=r.V),e.targetThread&&e.targetThread!=P()?(n=j.W[e.ya])?n.postMessage(e,e.transferList):g(\'Internal error! Worker sent a message "\'+t+\'" to target pthread \'+e.targetThread+", but that thread no longer exists!"):"processProxyingQueue"===t?fe(e.queue):"spawnThread"===t?ne(e):"cleanupThread"===t?ee(e.thread):"killThread"===t?(e=e.thread,t=j.W[e],delete j.W[e],t.terminate(),xe(e),j.$.splice(j.$.indexOf(t),1),t.V=0):"cancelThread"===t?j.W[e.thread].postMessage({cmd:"cancel"}):"loaded"===t?(r.loaded=!0,a&&a(r),r.Z&&(r.Z(),delete r.Z)):"print"===t?H("Thread "+e.threadId+": "+e.text):"printErr"===t?g("Thread "+e.threadId+": "+e.text):"alert"===t?alert("Thread "+e.threadId+": "+e.text):"setimmediate"===e.target?r.postMessage(e):"onAbort"===t?o.onAbort&&o.onAbort(e.arg):t&&g("worker sent an unknown command "+t),j.pa=void 0},r.onerror=e=>{throw g("worker sent an error! "+e.filename+":"+e.lineno+": "+e.message),e},f&&(r.on("message",function(e){r.onmessage({data:e})}),r.on("error",function(e){r.onerror(e)}),r.on("detachedExit",function(){})),r.postMessage({cmd:"load",urlOrBlob:o.mainScriptUrlOrBlob||je,wasmMemory:y,wasmModule:X})},ba:function(){var e=B("jxl_decoder.worker.js");j.X.push(new Worker(e))},qa:function(){return 0==j.X.length&&(j.ba(),j.da(j.X[0])),j.X.pop()}};function E(e){for(;0<e.length;)e.shift()(o)}function ae(e){if(w)return I(2,0,e);try{re(e)}catch(e){e instanceof M||"unwind"==e||a(1,e)}}o.PThread=j,o.establishStackSpace=function(){var e=P(),n=v[e+44>>2];Te(n,n-v[e+48>>2]),D(n)};var R=[];function oe(e){var n=R[e];return n||(e>=R.length&&(R.length=e+1),R[e]=n=Y.get(e)),n}function ie(e){this.Y=e-24,this.na=function(e){b[this.Y+4>>2]=e},this.la=function(e){b[this.Y+8>>2]=e},this.ma=function(){v[this.Y>>2]=0},this.ka=function(){U[this.Y+12>>0]=0},this.ia=function(){U[this.Y+13>>0]=0},this.aa=function(e,n){this.ja(),this.na(e),this.la(n),this.ma(),this.ka(),this.ia()},this.ja=function(){b[this.Y+16>>2]=0}}o.invokeEntryPoint=function(e,n){e=oe(e)(n),_?j.fa(e):Ae(e)};var se;function ue(e,n,t,r){return w?I(3,1,e,n,t,r):ce(e,n,t,r)}function ce(e,n,t,r){if("undefined"==typeof SharedArrayBuffer)return g("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var a=[];return w&&0===a.length?ue(e,n,t,r):(e={ua:t,V:e,oa:r,wa:a},w?(e.xa="spawnThread",postMessage(e,a),0):ne(e))}function fe(e){Atomics.store(v,e>>2,1),P()&&be(e),Atomics.compareExchange(v,e>>2,1,0)}function I(r,a){var e,n,o=arguments.length-2,i=arguments;return e=()=>{for(var e=ke(8*o),n=e>>3,t=0;t<o;t++)V[n+t]=i[2+t];return ve(r,o,e,a)},n=q(),e=e(),D(n),e}o.executeNotifiedProxyingQueue=fe;var O=f?()=>{var e=process.hrtime();return 1e3*e[0]+e[1]/1e6}:w?()=>performance.now()-o.__performance_now_clock_drift:()=>performance.now(),le=[];function pe(e){return w?I(4,1,e):52}function de(e,n,t,r,a){return w?I(5,1,e,n,t,r,a):70}var me=[null,[],[]];function he(e,n,t,r){if(w)return I(6,1,e,n,t,r);for(var a=0,o=0;o<t;o++){var i=b[n>>2],s=b[n+4>>2];n+=8;for(var u=0;u<s;u++){var c=F[i+u],f=me[e];if(0===c||10===c){for(var c=1===e?H:g,l=f,p=0,d=p+NaN,m=p;l[m]&&!(d<=m);)++m;if(16<m-p&&l.buffer&&L)l=L.decode(l.buffer instanceof SharedArrayBuffer?l.slice(p,m):l.subarray(p,m));else{for(d="";p<m;){var h,_,y=l[p++];128&y?(h=63&l[p++],192==(224&y)?d+=String.fromCharCode((31&y)<<6|h):(_=63&l[p++],(y=224==(240&y)?(15&y)<<12|h<<6|_:(7&y)<<18|h<<12|_<<6|63&l[p++])<65536?d+=String.fromCharCode(y):(y-=65536,d+=String.fromCharCode(55296|y>>10,56320|1023&y)))):d+=String.fromCharCode(y)}l=d}c(l),f.length=0}else f.push(c)}a+=s}return b[r>>2]=a,0}j.aa();var W,_e=[null,te,ae,ue,pe,de,he],ye={w:function(e){return we(e+24)+24},v:function(e,n,t){throw new ie(e).aa(n,t),e},r:function(e){ge(e,!c,1,!u),j.ga()},e:function(e){w?postMessage({cmd:"cleanupThread",thread:e}):ee(e)},o:ce,p:function(){return 2097152},q:function(e,n,t,r){if(e==n)setTimeout(()=>fe(r));else if(w)postMessage({targetThread:e,cmd:"processProxyingQueue",queue:r});else{if(!(e=j.W[e]))return;e.postMessage({cmd:"processProxyingQueue",queue:r})}return 1},t:function(){return-1},m:function(){throw 1/0},b:function(){k("")},f:function(){var e;f||c||((se=se||{})[e="Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"]||(se[e]=1,g(e=f?"warning: "+e:e)))},c:O,h:function(e,n,t){F.copyWithin(e,n,n+t)},s:function(e,n,t){le.length=n,t>>=3;for(var r=0;r<n;r++)le[r]=V[t+r];return(e<0?K[-e-1]:_e[e]).apply(null,le)},n:function(){k("OOM")},g:function(){throw"unwind"},k:re,u:pe,l:de,d:he,j:function(e,n,t){var r=q();try{return oe(e)(n,t)}catch(e){if(D(r),e!==e+0)throw e;Se(1,0)}},i:function(e,n,t){var r=q();try{oe(e)(n,t)}catch(e){if(D(r),e!==e+0)throw e;Se(1,0)}},a:y||o.wasmMemory},we=(!function(){function n(e,n){var t;o.asm=e.exports,j.ha.push(o.asm.H),Y=o.asm.E,Z.unshift(o.asm.x),X=n,w||(t=j.X.length,j.X.forEach(function(e){j.da(e,function(){var e;!--t&&(S--,o.monitorRunDependencies&&o.monitorRunDependencies(S),0==S&&(null!==z&&(clearInterval(z),z=null),T))&&(e=T,T=null,e())})}))}function t(e){n(e.instance,e.module)}function r(e){return function(){if(!d&&(u||c)){if("function"==typeof fetch&&!A.startsWith("file://"))return fetch(A,{credentials:"same-origin"}).then(function(e){if(e.ok)return e.arrayBuffer();throw"failed to load wasm binary file at \'"+A+"\'"}).catch(G);if(s)return new Promise(function(n,e){s(A,function(e){n(new Uint8Array(e))},e)})}return Promise.resolve().then(G)}().then(function(e){return WebAssembly.instantiate(e,a)}).then(function(e){return e}).then(e,function(e){g("failed to asynchronously prepare wasm: "+e),k(e)})}var a={a:ye};if(w||(S++,o.monitorRunDependencies&&o.monitorRunDependencies(S)),o.instantiateWasm)try{return o.instantiateWasm(a,n)}catch(e){g("Module.instantiateWasm callback failed with error: "+e),i(e)}(d||"function"!=typeof WebAssembly.instantiateStreaming||Q()||A.startsWith("file://")||f||"function"!=typeof fetch?r(t):fetch(A,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,a).then(t,function(e){return g("wasm streaming compile failed: "+e),g("falling back to ArrayBuffer instantiation"),r(t)})})).catch(i)}(),o.___wasm_call_ctors=function(){return(o.___wasm_call_ctors=o.asm.x).apply(null,arguments)},o._jxlCreateInstance=function(){return(o._jxlCreateInstance=o.asm.y).apply(null,arguments)},o._jxlDestroyInstance=function(){return(o._jxlDestroyInstance=o.asm.z).apply(null,arguments)},o._free=function(){return(o._free=o.asm.A).apply(null,arguments)},o._jxlProcessInput=function(){return(o._jxlProcessInput=o.asm.B).apply(null,arguments)},o._malloc=function(){return(we=o._malloc=o.asm.C).apply(null,arguments)}),P=(o._jxlFlush=function(){return(o._jxlFlush=o.asm.D).apply(null,arguments)},o._jxlDecompress=function(){return(o._jxlDecompress=o.asm.F).apply(null,arguments)},o._jxlCleanup=function(){return(o._jxlCleanup=o.asm.G).apply(null,arguments)},o.__emscripten_tls_init=function(){return(o.__emscripten_tls_init=o.asm.H).apply(null,arguments)},o._pthread_self=function(){return(P=o._pthread_self=o.asm.I).apply(null,arguments)}),ge=o.__emscripten_thread_init=function(){return(ge=o.__emscripten_thread_init=o.asm.J).apply(null,arguments)},ve=(o.__emscripten_thread_crashed=function(){return(o.__emscripten_thread_crashed=o.asm.K).apply(null,arguments)},o._emscripten_run_in_main_runtime_thread_js=function(){return(ve=o._emscripten_run_in_main_runtime_thread_js=o.asm.L).apply(null,arguments)}),be=o.__emscripten_proxy_execute_task_queue=function(){return(be=o.__emscripten_proxy_execute_task_queue=o.asm.M).apply(null,arguments)},xe=o.__emscripten_thread_free_data=function(){return(xe=o.__emscripten_thread_free_data=o.asm.N).apply(null,arguments)},Ae=o.__emscripten_thread_exit=function(){return(Ae=o.__emscripten_thread_exit=o.asm.O).apply(null,arguments)},Se=o._setThrew=function(){return(Se=o._setThrew=o.asm.P).apply(null,arguments)},Te=o._emscripten_stack_set_limits=function(){return(Te=o._emscripten_stack_set_limits=o.asm.Q).apply(null,arguments)},q=o.stackSave=function(){return(q=o.stackSave=o.asm.R).apply(null,arguments)},D=o.stackRestore=function(){return(D=o.stackRestore=o.asm.S).apply(null,arguments)},ke=o.stackAlloc=function(){return(ke=o.stackAlloc=o.asm.T).apply(null,arguments)};function Me(){function e(){if(!W&&(W=!0,o.calledRun=!0,!N)&&(w||E(Z),t(o),o.onRuntimeInitialized&&o.onRuntimeInitialized(),!w)){if(o.postRun)for("function"==typeof o.postRun&&(o.postRun=[o.postRun]);o.postRun.length;){var e=o.postRun.shift();$.unshift(e)}E($)}}if(!(0<S))if(w)t(o),w||E(Z),postMessage({cmd:"loaded"});else{if(o.preRun)for("function"==typeof o.preRun&&(o.preRun=[o.preRun]);o.preRun.length;)n=void 0,n=o.preRun.shift(),J.unshift(n);E(J),0<S||(o.setStatus?(o.setStatus("Running..."),setTimeout(function(){setTimeout(function(){o.setStatus("")},1),e()},1)):e())}var n}if(o.___cxa_is_pointer_type=function(){return(o.___cxa_is_pointer_type=o.asm.U).apply(null,arguments)},o.keepRuntimeAlive=function(){return _},o.wasmMemory=y,o.ExitStatus=M,o.PThread=j,T=function e(){W||Me(),W||(T=e)},o.preInit)for("function"==typeof o.preInit&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.pop()();return Me(),e.ready}})();"object"==typeof exports&&"object"==typeof module?module.exports=JxlDecoderModule:"function"==typeof define&&define.amd?define([],function(){return JxlDecoderModule}):"object"==typeof exports&&(exports.JxlDecoderModule=JxlDecoderModule);',
    'jxl_decoder.worker.js': '"use strict";var Module={},ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,nodeWorkerThreads,parentPort,fs,initializedJS=(ENVIRONMENT_IS_NODE&&(nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort,parentPort.on("message",e=>onmessage({data:e})),fs=require("fs"),Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(e){(0,eval)(fs.readFileSync(e,"utf8"))},postMessage:function(e){parentPort.postMessage(e)},performance:global.performance||{now:function(){return Date.now()}}})),!1),pendingNotifiedProxyingQueues=[];function threadPrintErr(){var e=Array.prototype.slice.call(arguments).join(" ");ENVIRONMENT_IS_NODE?fs.writeSync(2,e+"\\n"):console.error(e)}function threadAlert(){var e=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:e,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,r)=>{e=new WebAssembly.Instance(Module.wasmModule,e);return r(e),Module.wasmModule=null,e.exports},self.onunhandledrejection=e=>{throw e.reason??e},self.onmessage=e=>{try{var r;if("load"===e.data.cmd)Module.wasmModule=e.data.wasmModule,Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,"string"==typeof e.data.urlOrBlob?importScripts(e.data.urlOrBlob):(r=URL.createObjectURL(e.data.urlOrBlob),importScripts(r),URL.revokeObjectURL(r)),JxlDecoderModule(Module).then(function(e){Module=e});else if("run"===e.data.cmd){Module.__performance_now_clock_drift=performance.now()-e.data.time,Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(pendingNotifiedProxyingQueues.forEach(e=>{Module.executeNotifiedProxyingQueue(e)}),pendingNotifiedProxyingQueues=[],initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(e){if("unwind"!=e){if(!(e instanceof Module.ExitStatus))throw e;Module.keepRuntimeAlive()||Module.__emscripten_thread_exit(e.status)}}}else"cancel"===e.data.cmd?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):"setimmediate"!==e.data.target&&("processProxyingQueue"===e.data.cmd?initializedJS?Module.executeNotifiedProxyingQueue(e.data.queue):pendingNotifiedProxyingQueues.push(e.data.queue):e.data.cmd&&(err("worker.js received unknown command "+e.data.cmd),err(e.data)))}catch(e){throw Module.__emscripten_thread_crashed&&Module.__emscripten_thread_crashed(),e}};',
  };

  const setCopHeaders = (headers) => {
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  };

  // Inflight object: {clientId, uid, timestamp, controller}
  // TODO: cleanup, when client is gone / too old.
  const inflight = [];

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
    // Pass direct cached resource requests.
    if (event.request.cache === 'only-if-cached' &&
        event.request.mode !== 'same-origin') {
      return;
    }

    // Serve backed resources.
    if (maybeProcessEmbeddedResources(event)) {
      return;
    }

    // Notify server we are JXL-capable.
    if (event.request.destination === 'image') {
      let accept = event.request.headers.get('Accept');
      // Only if browser does not support JXL.
      if (accept.indexOf('image/jxl') === -1) {
        event.respondWith(wrapImageRequest(event.clientId, event.request));
      }
      return;
    }
  };

  const onMessage = (event) => {
    const data = event.data;
    const uid = data.uid;
    if (data.msg && addMessage) {
      addMessage(data.msg, 'blue');
    }
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
      navigator.serviceWorker.controller.postMessage(
          event.data, gatherTransferrables(event.data.data));
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