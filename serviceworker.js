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
    'client_worker.js': 'let decoder=null,workQueue=[];const processQueue=()=>{for(;workQueue.length;){var e=workQueue.shift(),e=(console.log("CW job: "+JSON.stringify(e)),{id:e.id,result:"bad"});console.log("CW->Client: "+JSON.stringify(e)),postMessage(e)}},onLoadJxlModule=(onmessage=function(e){var o=e.data;console.log("CW received: "+JSON.stringify(o)),"decode"===o.op&&(workQueue.push(e.data),processQueue())},e=>{decoder=e,processQueue()}),config=(importScripts("jxl_decoder.js"),{mainScriptUrlOrBlob:"https://jxl-demo.netlify.app/jxl_decoder.js"});JxlCodecModule(config).then(onLoadJxlModule);',
    'jxl_decoder.js': 'var JxlCodecModule=(()=>{var Ee="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0;return"undefined"!=typeof __filename&&(Ee=Ee||__filename),function(e){var r,o,t,a,n,s=void 0!==(e=e||{})?e:{},O=(s.ready=new Promise(function(e,t){r=e,o=t}),Object.assign({},s)),i=(e,t)=>{throw t},u="object"==typeof window,c="function"==typeof importScripts,l="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,_=s.ENVIRONMENT_IS_PTHREAD||!1,p="";function B(e){return s.locateFile?s.locateFile(e,p):p+e}if(l){var f,F,p=c?require("path").dirname(p)+"/":__dirname+"/";"function"==typeof require&&(f=require("fs"),F=require("path")),t=(e,t)=>(e=F.normalize(e),f.readFileSync(e,t?void 0:"utf8")),n=e=>{e=t(e,!0);return e=e.buffer?e:new Uint8Array(e)},a=(e,r,n)=>{e=F.normalize(e),f.readFile(e,function(e,t){e?n(e):r(t.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(e){if(!(e instanceof P))throw e}),process.on("unhandledRejection",function(e){throw e}),i=(e,t)=>{if(w)throw process.exitCode=e,t;(t=t)instanceof P||g("exiting due to exception: "+t),process.exit(e)},s.inspect=function(){return"[Emscripten Module object]"};let e;try{e=require("worker_threads")}catch(e){throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'),e}global.Worker=e.Worker}else(u||c)&&(c?p=self.location.href:"undefined"!=typeof document&&document.currentScript&&(p=document.currentScript.src),p=0!==(p=Ee?Ee:p).indexOf("blob:")?p.substr(0,p.replace(/[?#].*/,"").lastIndexOf("/")+1):"",l||(t=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},c&&(n=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),a=(e,t,r)=>{var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=()=>{200==n.status||0==n.status&&n.response?t(n.response):r()},n.onerror=r,n.send(null)}),0);l&&"undefined"==typeof performance&&(global.performance=require("perf_hooks").performance);var d,h,U,m=console.log.bind(console),y=console.warn.bind(console),H=(l&&(m=e=>f.writeSync(1,e+"\\n"),y=e=>f.writeSync(2,e+"\\n")),s.print||m),g=s.printErr||y,w=(Object.assign(s,O),s.arguments&&s.arguments,s.thisProgram&&s.thisProgram,s.quit&&(i=s.quit),Atomics.load,Atomics.store,Atomics.compareExchange,s.wasmBinary&&(d=s.wasmBinary),s.noExitRuntime||!0),D=("object"!=typeof WebAssembly&&W("no native wasm support detected"),!1);var v,x,b,k,A,L,N="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function z(e,t,r){for(var n=t+r,i=t;e[i]&&!(n<=i);)++i;if(16<i-t&&e.buffer&&N)return N.decode(e.buffer instanceof SharedArrayBuffer?e.slice(t,i):e.subarray(t,i));for(var o="";t<i;){var a,s,u=e[t++];128&u?(s=63&e[t++],192==(224&u)?o+=String.fromCharCode((31&u)<<6|s):(a=63&e[t++],(u=224==(240&u)?(15&u)<<12|s<<6|a:(7&u)<<18|s<<12|a<<6|63&e[t++])<65536?o+=String.fromCharCode(u):(s=u-65536,o+=String.fromCharCode(55296|s>>10,56320|1023&s)))):o+=String.fromCharCode(u)}return o}_&&(v=s.buffer);var J,m=s.INITIAL_MEMORY||78643200;if(_)h=s.wasmMemory,v=s.buffer;else if(s.wasmMemory)h=s.wasmMemory;else if(!((h=new WebAssembly.Memory({initial:m/65536,maximum:m/65536,shared:!0})).buffer instanceof SharedArrayBuffer))throw g("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),l&&g("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),Error("bad memory");m=(v=h?h.buffer:v).byteLength,v=y=v,s.HEAP8=x=new Int8Array(y),s.HEAP16=new Int16Array(y),s.HEAP32=k=new Int32Array(y),s.HEAPU8=b=new Uint8Array(y),s.HEAPU16=new Uint16Array(y),s.HEAPU32=A=new Uint32Array(y),s.HEAPF32=new Float32Array(y),s.HEAPF64=L=new Float64Array(y);var Q=[],G=[],X=[];function V(){return w}function Y(){if(s.preRun)for("function"==typeof s.preRun&&(s.preRun=[s.preRun]);s.preRun.length;)e=s.preRun.shift(),Q.unshift(e);var e;ue(Q)}function K(){_||ue(G)}function Z(){if(!_){if(s.postRun)for("function"==typeof s.postRun&&(s.postRun=[s.postRun]);s.postRun.length;)e=s.postRun.shift(),X.unshift(e);var e;ue(X)}}var j=0,$=null,T=null;function W(e){_?postMessage({cmd:"onAbort",arg:e}):s.onAbort&&s.onAbort(e),g(e="Aborted("+e+")"),D=!0,e+=". Build with -sASSERTIONS for more info.";e=new WebAssembly.RuntimeError(e);throw o(e),e}var S;function ee(e){return e.startsWith("data:application/octet-stream;base64,")}function te(e){return e.startsWith("file://")}function re(e){try{if(e==S&&d)return new Uint8Array(d);if(n)return n(e);throw"both async and sync fetching of the wasm failed"}catch(e){W(e)}}ee(S="jxl_decoder.wasm")||(S=B(S));var ne={};function P(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function ie(e){var t,e=M.pthreads[e];e||W(t),M.returnWorkerToPool(e)}function oe(e){var t=M.getNewWorker();if(!t)return 6;M.runningWorkers.push(t),(M.pthreads[e.pthread_ptr]=t).pthread_ptr=e.pthread_ptr;var r={cmd:"run",start_routine:e.startRoutine,arg:e.arg,pthread_ptr:e.pthread_ptr};return t.runPthread=()=>{r.time=performance.now(),t.postMessage(r,e.transferList)},t.loaded&&(t.runPthread(),delete t.runPthread),0}function ae(e){if(_)return E(1,1,e);w||(M.terminateAllThreads(),s.onExit&&s.onExit(e),D=!0),i(e,new P(e))}var se=function(e,t){if(!t&&_)throw ce(e),"unwind";ae(e)};var M={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){_?M.initWorker():M.initMainThread()},initMainThread:function(){for(var e=4;e--;)M.allocateUnusedWorker()},initWorker:function(){w=!1},setExitStatus:function(e){0},terminateAllThreads:function(){for(var e of Object.values(M.pthreads))M.returnWorkerToPool(e);for(var e of M.unusedWorkers)e.terminate();M.unusedWorkers=[]},returnWorkerToPool:function(e){var t=e.pthread_ptr;delete M.pthreads[t],M.unusedWorkers.push(e),M.runningWorkers.splice(M.runningWorkers.indexOf(e),1),e.pthread_ptr=0,je(t)},receiveObjectTransfer:function(e){},threadInitTLS:function(){M.tlsInitFunctions.forEach(e=>e())},loadWasmModuleToWorker:function(i,o){i.onmessage=e=>{var t,r,e=e.data,n=e.cmd;if(i.pthread_ptr&&(M.currentProxiedOperationCallerThread=i.pthread_ptr),e.targetThread&&e.targetThread!=q())return(t=M.pthreads[e.targetThread])?t.postMessage(e,e.transferList):g(\'Internal error! Worker sent a message "\'+n+\'" to target pthread \'+e.targetThread+", but that thread no longer exists!"),void(M.currentProxiedOperationCallerThread=void 0);"processProxyingQueue"===n?fe(e.queue):"spawnThread"===n?oe(e):"cleanupThread"===n?ie(e.thread):"killThread"===n?(t=e.thread,r=M.pthreads[t],delete M.pthreads[t],r.terminate(),je(t),M.runningWorkers.splice(M.runningWorkers.indexOf(r),1),r.pthread_ptr=0):"cancelThread"===n?(r=e.thread,M.pthreads[r].postMessage({cmd:"cancel"})):"loaded"===n?(i.loaded=!0,o&&o(i),i.runPthread&&(i.runPthread(),delete i.runPthread)):"print"===n?H("Thread "+e.threadId+": "+e.text):"printErr"===n?g("Thread "+e.threadId+": "+e.text):"alert"===n?alert("Thread "+e.threadId+": "+e.text):"setimmediate"===e.target?i.postMessage(e):"onAbort"===n?s.onAbort&&s.onAbort(e.arg):n&&g("worker sent an unknown command "+n),M.currentProxiedOperationCallerThread=void 0},i.onerror=e=>{throw g("worker sent an error! "+e.filename+":"+e.lineno+": "+e.message),e},l&&(i.on("message",function(e){i.onmessage({data:e})}),i.on("error",function(e){i.onerror(e)}),i.on("detachedExit",function(){})),i.postMessage({cmd:"load",urlOrBlob:s.mainScriptUrlOrBlob||Ee,wasmMemory:h,wasmModule:U})},allocateUnusedWorker:function(){var e=B("jxl_decoder.worker.js");M.unusedWorkers.push(new Worker(e))},getNewWorker:function(){return 0==M.unusedWorkers.length&&(M.allocateUnusedWorker(),M.loadWasmModuleToWorker(M.unusedWorkers[0])),M.unusedWorkers.pop()}};function ue(e){for(;0<e.length;)e.shift()(s)}function ce(t){if(_)return E(2,0,t);try{se(t)}catch(e){(t=e)instanceof P||"unwind"==t||i(1,t)}}s.PThread=M,s.establishStackSpace=function(){var e=q(),t=k[e+44>>2],e=k[e+48>>2];We(t,t-e),Pe(t)};var I=[];function le(e){this.excPtr=e,this.ptr=e-24,this.set_type=function(e){A[this.ptr+4>>2]=e},this.get_type=function(){return A[this.ptr+4>>2]},this.set_destructor=function(e){A[this.ptr+8>>2]=e},this.get_destructor=function(){return A[this.ptr+8>>2]},this.set_refcount=function(e){k[this.ptr>>2]=e},this.set_caught=function(e){x[this.ptr+12>>0]=e=e?1:0},this.get_caught=function(){return 0!=x[this.ptr+12>>0]},this.set_rethrown=function(e){x[this.ptr+13>>0]=e=e?1:0},this.get_rethrown=function(){return 0!=x[this.ptr+13>>0]},this.init=function(e,t){this.set_adjusted_ptr(0),this.set_type(e),this.set_destructor(t),this.set_refcount(0),this.set_caught(!1),this.set_rethrown(!1)},this.add_ref=function(){Atomics.add(k,this.ptr+0>>2,1)},this.release_ref=function(){return 1===Atomics.sub(k,this.ptr+0>>2,1)},this.set_adjusted_ptr=function(e){A[this.ptr+16>>2]=e},this.get_adjusted_ptr=function(){return A[this.ptr+16>>2]},this.get_exception_ptr=function(){if(Ie(this.get_type()))return A[this.excPtr>>2];var e=this.get_adjusted_ptr();return 0!==e?e:this.excPtr}}s.invokeEntryPoint=function(e,t){(r=I[e=e])||(e>=I.length&&(I.length=e+1),I[e]=r=J.get(e));var r,e=r(t);w?M.setExitStatus(e):Te(e)};function pe(e,t,r,n){return _?E(3,1,e,t,r,n):_e(e,t,r,n)}function _e(e,t,r,n){if("undefined"==typeof SharedArrayBuffer)return g("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var i=[];if(_&&0===i.length)return pe(e,t,r,n);t={startRoutine:r,pthread_ptr:e,arg:n,transferList:i};return _?(t.cmd="spawnThread",postMessage(t,i),0):oe(t)}function fe(e){Atomics.store(k,e>>2,1),q()&&Ae(e),Atomics.compareExchange(k,e>>2,1,0)}function R(e){R.shown||(R.shown={}),R.shown[e]||(R.shown[e]=1,g(e=l?"warning: "+e:e))}function E(i,o){var e,t,a=arguments.length-2,s=arguments;return e=()=>{for(var e=a,t=Me(8*e),r=t>>3,n=0;n<a;n++)L[r+n]=s[2+n];return ke(i,e,t,o)},t=Se(),e=e(),Pe(t),e}s.executeNotifiedProxyingQueue=fe;var O=l?()=>{var e=process.hrtime();return 1e3*e[0]+e[1]/1e6}:_?()=>performance.now()-s.__performance_now_clock_drift:()=>performance.now(),de=[];function he(e){return _?E(4,1,e):52}function me(e,t,r,n,i){return _?E(5,1,e,t,r,n,i):70}var ye=[null,[],[]];function ge(e,t,r,n){if(_)return E(6,1,e,t,r,n);for(var i,o,a,s=0,u=0;u<r;u++){var c=A[t>>2],l=A[t+4>>2];t+=8;for(var p=0;p<l;p++)i=e,o=b[c+p],a=void 0,a=ye[i],0===o||10===o?((1===i?H:g)(z(a,0)),a.length=0):a.push(o);s+=l}return A[n>>2]=s,0}M.init();var C,we=[null,ae,ce,pe,he,me,ge],ve={__cxa_allocate_exception:function(e){return xe(e+24)+24},__cxa_throw:function(e,t,r){throw new le(e).init(t,r),e},__emscripten_init_main_thread_js:function(e){be(e,!c,1,!u),M.threadInitTLS()},__emscripten_thread_cleanup:function(e){_?postMessage({cmd:"cleanupThread",thread:e}):ie(e)},__pthread_create_js:_e,_emscripten_default_pthread_stack_size:function(){return 2097152},_emscripten_get_now_is_monotonic:function(){return!0},_emscripten_notify_task_queue:function(e,t,r,n){if(e==t)setTimeout(()=>fe(n));else if(_)postMessage({targetThread:e,cmd:"processProxyingQueue",queue:n});else{t=M.pthreads[e];if(!t)return;t.postMessage({cmd:"processProxyingQueue",queue:n})}return 1},_emscripten_set_offscreencanvas_size:function(e,t,r){return-1},abort:function(){W("")},emscripten_check_blocking_allowed:function(){l||c||R("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")},emscripten_date_now:function(){return Date.now()},emscripten_get_now:O,emscripten_memcpy_big:function(e,t,r){b.copyWithin(e,t,t+r)},emscripten_receive_on_main_thread_js:function(e,t,r){de.length=t;for(var n=r>>3,i=0;i<t;i++)de[i]=L[n+i];return(e<0?ne[-e-1]:we[e]).apply(null,de)},emscripten_resize_heap:function(e){b.length,W("OOM")},emscripten_unwind_to_js_event_loop:function(){throw"unwind"},exit:se,fd_close:he,fd_seek:me,fd_write:ge,memory:h||s.wasmMemory},xe=(function(){var t={env:ve,wasi_snapshot_preview1:ve};function r(e,t){var r,e=e.exports;s.asm=e,e=s.asm._emscripten_tls_init,M.tlsInitFunctions.push(e),J=s.asm.__indirect_function_table,e=s.asm.__wasm_call_ctors,G.unshift(e),U=t,_||(r=M.unusedWorkers.length,M.unusedWorkers.forEach(function(e){M.loadWasmModuleToWorker(e,function(){var e;--r||(j--,s.monitorRunDependencies&&s.monitorRunDependencies(j),0==j&&(null!==$&&(clearInterval($),$=null),T&&(e=T,T=null,e())))})}))}function n(e){r(e.instance,e.module)}function i(e){return function(){if(!d&&(u||c)){if("function"==typeof fetch&&!te(S))return fetch(S,{credentials:"same-origin"}).then(function(e){if(e.ok)return e.arrayBuffer();throw"failed to load wasm binary file at \'"+S+"\'"}).catch(function(){return re(S)});if(a)return new Promise(function(t,e){a(S,function(e){t(new Uint8Array(e))},e)})}return Promise.resolve().then(function(){return re(S)})}().then(function(e){return WebAssembly.instantiate(e,t)}).then(function(e){return e}).then(e,function(e){g("failed to asynchronously prepare wasm: "+e),W(e)})}if(_||(j++,s.monitorRunDependencies&&s.monitorRunDependencies(j)),s.instantiateWasm)try{return s.instantiateWasm(t,r)}catch(e){g("Module.instantiateWasm callback failed with error: "+e),o(e)}(d||"function"!=typeof WebAssembly.instantiateStreaming||ee(S)||te(S)||l||"function"!=typeof fetch?i(n):fetch(S,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,t).then(n,function(e){return g("wasm streaming compile failed: "+e),g("falling back to ArrayBuffer instantiation"),i(n)})})).catch(o)}(),s.___wasm_call_ctors=function(){return(s.___wasm_call_ctors=s.asm.__wasm_call_ctors).apply(null,arguments)},s._jxlCreateInstance=function(){return(s._jxlCreateInstance=s.asm.jxlCreateInstance).apply(null,arguments)},s._jxlDestroyInstance=function(){return(s._jxlDestroyInstance=s.asm.jxlDestroyInstance).apply(null,arguments)},s._free=function(){return(s._free=s.asm.free).apply(null,arguments)},s._jxlProcessInput=function(){return(s._jxlProcessInput=s.asm.jxlProcessInput).apply(null,arguments)},s._malloc=function(){return(xe=s._malloc=s.asm.malloc).apply(null,arguments)}),q=(s._jxlFlush=function(){return(s._jxlFlush=s.asm.jxlFlush).apply(null,arguments)},s.__emscripten_tls_init=function(){return(s.__emscripten_tls_init=s.asm._emscripten_tls_init).apply(null,arguments)},s._pthread_self=function(){return(q=s._pthread_self=s.asm.pthread_self).apply(null,arguments)}),be=(s.___errno_location=function(){return(s.___errno_location=s.asm.__errno_location).apply(null,arguments)},s.__emscripten_thread_init=function(){return(be=s.__emscripten_thread_init=s.asm._emscripten_thread_init).apply(null,arguments)}),ke=(s.__emscripten_thread_crashed=function(){return(s.__emscripten_thread_crashed=s.asm._emscripten_thread_crashed).apply(null,arguments)},s._emscripten_main_thread_process_queued_calls=function(){return(s._emscripten_main_thread_process_queued_calls=s.asm.emscripten_main_thread_process_queued_calls).apply(null,arguments)},s._emscripten_main_browser_thread_id=function(){return(s._emscripten_main_browser_thread_id=s.asm.emscripten_main_browser_thread_id).apply(null,arguments)},s._emscripten_run_in_main_runtime_thread_js=function(){return(ke=s._emscripten_run_in_main_runtime_thread_js=s.asm.emscripten_run_in_main_runtime_thread_js).apply(null,arguments)}),Ae=(s._emscripten_dispatch_to_thread_=function(){return(s._emscripten_dispatch_to_thread_=s.asm.emscripten_dispatch_to_thread_).apply(null,arguments)},s.__emscripten_proxy_execute_task_queue=function(){return(Ae=s.__emscripten_proxy_execute_task_queue=s.asm._emscripten_proxy_execute_task_queue).apply(null,arguments)}),je=s.__emscripten_thread_free_data=function(){return(je=s.__emscripten_thread_free_data=s.asm._emscripten_thread_free_data).apply(null,arguments)},Te=s.__emscripten_thread_exit=function(){return(Te=s.__emscripten_thread_exit=s.asm._emscripten_thread_exit).apply(null,arguments)},We=(s._setThrew=function(){return(s._setThrew=s.asm.setThrew).apply(null,arguments)},s._saveSetjmp=function(){return(s._saveSetjmp=s.asm.saveSetjmp).apply(null,arguments)},s._emscripten_stack_set_limits=function(){return(We=s._emscripten_stack_set_limits=s.asm.emscripten_stack_set_limits).apply(null,arguments)}),Se=s.stackSave=function(){return(Se=s.stackSave=s.asm.stackSave).apply(null,arguments)},Pe=s.stackRestore=function(){return(Pe=s.stackRestore=s.asm.stackRestore).apply(null,arguments)},Me=s.stackAlloc=function(){return(Me=s.stackAlloc=s.asm.stackAlloc).apply(null,arguments)},Ie=s.___cxa_is_pointer_type=function(){return(Ie=s.___cxa_is_pointer_type=s.asm.__cxa_is_pointer_type).apply(null,arguments)};s.dynCall_iiji=function(){return(s.dynCall_iiji=s.asm.dynCall_iiji).apply(null,arguments)},s.dynCall_jiji=function(){return(s.dynCall_jiji=s.asm.dynCall_jiji).apply(null,arguments)};function Re(){if(!(0<j)){if(_)return r(s),K(),void postMessage({cmd:"loaded"});Y(),0<j||(s.setStatus?(s.setStatus("Running..."),setTimeout(function(){setTimeout(function(){s.setStatus("")},1),e()},1)):e())}function e(){C||(C=!0,s.calledRun=!0,D||(K(),r(s),s.onRuntimeInitialized&&s.onRuntimeInitialized(),Z()))}}if(s.keepRuntimeAlive=V,s.wasmMemory=h,s.ExitStatus=P,s.PThread=M,T=function e(){C||Re(),C||(T=e)},s.preInit)for("function"==typeof s.preInit&&(s.preInit=[s.preInit]);0<s.preInit.length;)s.preInit.pop()();return Re(),e.ready}})();"object"==typeof exports&&"object"==typeof module?module.exports=JxlCodecModule:"function"==typeof define&&define.amd?define([],function(){return JxlCodecModule}):"object"==typeof exports&&(exports.JxlCodecModule=JxlCodecModule);',
    'jxl_decoder.worker.js': '"use strict";var Module={},ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,nodeWorkerThreads,parentPort,fs,initializedJS=(ENVIRONMENT_IS_NODE&&(nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort,parentPort.on("message",e=>onmessage({data:e})),fs=require("fs"),Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(e){(0,eval)(fs.readFileSync(e,"utf8"))},postMessage:function(e){parentPort.postMessage(e)},performance:global.performance||{now:function(){return Date.now()}}})),!1),pendingNotifiedProxyingQueues=[];function threadPrintErr(){var e=Array.prototype.slice.call(arguments).join(" ");ENVIRONMENT_IS_NODE?fs.writeSync(2,e+"\\n"):console.error(e)}function threadAlert(){var e=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:e,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,r)=>{e=new WebAssembly.Instance(Module.wasmModule,e);return r(e),Module.wasmModule=null,e.exports},self.onunhandledrejection=e=>{throw e.reason??e},self.onmessage=e=>{try{var r;if("load"===e.data.cmd)Module.wasmModule=e.data.wasmModule,Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,"string"==typeof e.data.urlOrBlob?importScripts(e.data.urlOrBlob):(r=URL.createObjectURL(e.data.urlOrBlob),importScripts(r),URL.revokeObjectURL(r)),JxlCodecModule(Module).then(function(e){Module=e});else if("run"===e.data.cmd){Module.__performance_now_clock_drift=performance.now()-e.data.time,Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(pendingNotifiedProxyingQueues.forEach(e=>{Module.executeNotifiedProxyingQueue(e)}),pendingNotifiedProxyingQueues=[],initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(e){if("unwind"!=e){if(!(e instanceof Module.ExitStatus))throw e;Module.keepRuntimeAlive()||Module.__emscripten_thread_exit(e.status)}}}else"cancel"===e.data.cmd?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):"setimmediate"!==e.data.target&&("processProxyingQueue"===e.data.cmd?initializedJS?Module.executeNotifiedProxyingQueue(e.data.queue):pendingNotifiedProxyingQueues.push(e.data.queue):e.data.cmd&&(err("worker.js received unknown command "+e.data.cmd),err(e.data)))}catch(e){throw Module.__emscripten_thread_crashed&&Module.__emscripten_thread_crashed(),e}};',
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
    console.log(
        'Response status: ' + originalResponse.status +
        ', url: ' + originalResponse.url);

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
      },
      // pull: async (controller) => { },
      // cancel: (reason) => { console.log('outputStream cancel'); },
      // type: "bytes",
      // autoAllocateChunkSize: 65536,
    });

    const onRead = (chunk) => {
      console.log(chunk.value.length);
      if (!chunk.done) {
        reader.read().then(onRead);
      }
      /*console.log('outputStream pull');
      const chunk = await reader.read();
      if (chunk.done) {
        console.log('done');
        controller.close();
      } else {
        console.log('chunk ' + chunk.value.length);
        controller.enqueue(chunk.value);
      }*/
    };
    reader.read(new SharedArrayBuffer(65536)).then(onRead);

    let modifiedResponseHeaders = new Headers(originalResponse.headers);
    //  modifiedResponseHeaders.set('Content-Type', 'image/png');
    return new Response(outputStream, {headers: modifiedResponseHeaders});
    // console.log('SW->Client(' + clientId + ') url: ' + request.url);
    // client.postMessage({op: 'decode', url: request.url});
  };

  const wrapImageRequest = async (clientId, request) => {
    let modifiedRequestHeaders = new Headers(request.headers);
    modifiedRequestHeaders.append('Accept', 'image/jxl');
    let modifiedRequest =
        new Request(request, {headers: modifiedRequestHeaders});
    let originalResponse = await fetch(modifiedRequest);
    let contentType = originalResponse.headers.get('Content-Type');

    return wrapImageResponse(clientId, originalResponse);

    // If server does not support JXL resources, then pass.
    if (contentType != 'image/jxl') {
      return originalResponse;
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

  const serviceWorkerMain = () => {
    // ServiceWorker lifecycle.
    self.addEventListener('install', () => {
      return self.skipWaiting();
    });
    self.addEventListener(
        'activate', (event) => event.waitUntil(self.clients.claim()));
    self.addEventListener('message', (event) => {
      console.log('SW received: ' + JSON.stringify(event.data));
      if (event.data && event.data.type === 'deregister') {
        self.registration.unregister()
            .then(() => {
              return self.clients.matchAll();
            })
            .then(clients => {
              clients.forEach((client) => client.navigate(client.url));
            });
      }
    });
    // Intercept some requests.
    self.addEventListener('fetch', onFetch);
  };

  // Service workers does not support multi-threading; that is why decoding is
  // relayed back to "client" (document / window).
  const prepareClient = () => {
    const clientWorker = new Worker('client_worker.js');
    clientWorker.onmessage = (event) => {
      console.log('CW received: ' + JSON.stringify(event.data));
      console.log('CW->SW: ' + JSON.stringify(event.data));
      navigator.serviceWorker.controller.postMessage(event.data);
    };

    // Forward ServiceWorker requests to "Client" worker.
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('Client->CW: ' + JSON.stringify(event.data));
      clientWorker.postMessage(event.data);
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