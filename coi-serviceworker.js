if("undefined"==typeof window){const a={"jxl_emcc.js":'var JxlCodecModule=(()=>{var Te="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0;return"undefined"!=typeof __filename&&(Te=Te||__filename),function(e){e=e||{},(o=o||(void 0!==e?e:{})).ready=new Promise(function(e,n){t=e,i=n});var o,t,i,n,s,r,U=Object.assign({},o),a=(e,n)=>{throw n},u="object"==typeof window,c="function"==typeof importScripts,f="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,w=o.ENVIRONMENT_IS_PTHREAD||!1,l="";function O(e){return o.locateFile?o.locateFile(e,l):l+e}if(f){var p,d,l=c?require("path").dirname(l)+"/":__dirname+"/";"function"==typeof require&&(p=require("fs"),d=require("path")),n=(e,n)=>(e=d.normalize(e),p.readFileSync(e,n?void 0:"utf8")),r=e=>e=(e=n(e,!0)).buffer?e:new Uint8Array(e),s=(e,t,r)=>{e=d.normalize(e),p.readFile(e,function(e,n){e?r(e):t(n.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(e){if(!(e instanceof E))throw e}),process.on("unhandledRejection",function(e){throw e}),a=(e,n)=>{if(y)throw process.exitCode=e,n;n instanceof E||g("exiting due to exception: "+n),process.exit(e)},o.inspect=function(){return"[Emscripten Module object]"};let e;try{e=require("worker_threads")}catch(e){throw console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\'),e}global.Worker=e.Worker}else(u||c)&&(c?l=self.location.href:"undefined"!=typeof document&&document.currentScript&&(l=document.currentScript.src),l=0!==(l=Te?Te:l).indexOf("blob:")?l.substr(0,l.replace(/[?#].*/,"").lastIndexOf("/")+1):"",f||(n=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.send(null),n.responseText},c&&(r=e=>{var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),s=(e,n,t)=>{var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType="arraybuffer",r.onload=()=>{200==r.status||0==r.status&&r.response?n(r.response):t()},r.onerror=t,r.send(null)}));f&&"undefined"==typeof performance&&(global.performance=require("perf_hooks").performance);var m,h=console.log.bind(console),_=console.warn.bind(console),B=(f&&(h=e=>p.writeSync(1,e+"\\n"),_=e=>p.writeSync(2,e+"\\n")),o.print||h),g=o.printErr||_,y=(Object.assign(o,U),o.quit&&(a=o.quit),o.wasmBinary&&(m=o.wasmBinary),o.noExitRuntime||!0);"object"!=typeof WebAssembly&&M("no native wasm support detected");var b,H,v,F,x,A,D,N=!1,L="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,h=(w&&(S=o.buffer),o.INITIAL_MEMORY||78643200);if(w)b=o.wasmMemory,S=o.buffer;else if(o.wasmMemory)b=o.wasmMemory;else if(!((b=new WebAssembly.Memory({initial:h/65536,maximum:h/65536,shared:!0})).buffer instanceof SharedArrayBuffer))throw g("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),f&&g("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),Error("bad memory");var h=(S=b?b.buffer:S).byteLength,_=S,S=_;o.HEAP8=v=new Int8Array(_),o.HEAP16=new Int16Array(_),o.HEAP32=x=new Int32Array(_),o.HEAPU8=F=new Uint8Array(_),o.HEAPU16=new Uint16Array(_),o.HEAPU32=A=new Uint32Array(_),o.HEAPF32=new Float32Array(_),o.HEAPF64=D=new Float64Array(_);var V,J=[],X=[],z=[];var R,T=0,G=null,k=null;function M(e){throw w?postMessage({cmd:"onAbort",arg:e}):o.onAbort&&o.onAbort(e),g(e="Aborted("+e+")"),N=!0,e=new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info."),i(e),e}function Q(){return R.startsWith("data:application/octet-stream;base64,")}function Y(){var e=R;try{if(e==R&&m)return new Uint8Array(m);if(r)return r(e);throw"both async and sync fetching of the wasm failed"}catch(e){M(e)}}R="jxl_emcc.wasm",Q()||(R=O(R));var Z={};function E(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function $(e){(e=P.R[e])||M(),P.Z(e)}function K(e){var n=P.la();if(!n)return 6;P.V.push(n),(P.R[e.P]=n).P=e.P;var t={cmd:"run",start_routine:e.pa,arg:e.ja,pthread_ptr:e.P};return n.U=()=>{t.time=performance.now(),n.postMessage(t,e.ra)},n.loaded&&(n.U(),delete n.U),0}function ee(e){if(w)return W(1,1,e);y||(P.qa(),o.onExit&&o.onExit(e),N=!0),a(e,new E(e))}function ne(e,n){if(!n&&w)throw te(e),"unwind";ee(e)}var P={S:[],V:[],ba:[],R:{},W:function(){w?P.na():P.ma()},ma:function(){for(var e=4;e--;)P.X()},na:function(){P.receiveObjectTransfer=P.oa,P.threadInitTLS=P.aa,P.setExitStatus=P.$,y=!1},$:function(){},qa:function(){for(var e of Object.values(P.R))P.Z(e);for(e of P.S)e.terminate();P.S=[]},Z:function(e){var n=e.P;delete P.R[n],P.S.push(e),P.V.splice(P.V.indexOf(e),1),e.P=0,ge(n)},oa:function(){},aa:function(){P.ba.forEach(e=>e())},Y:function(r,a){r.onmessage=e=>{var n,t=(e=e.data).cmd;r.P&&(P.ka=r.P),e.targetThread&&e.targetThread!=C()?(n=P.R[e.ta])?n.postMessage(e,e.transferList):g(\'Internal error! Worker sent a message "\'+t+\'" to target pthread \'+e.targetThread+", but that thread no longer exists!"):"processProxyingQueue"===t?se(e.queue):"spawnThread"===t?K(e):"cleanupThread"===t?$(e.thread):"killThread"===t?(e=e.thread,t=P.R[e],delete P.R[e],t.terminate(),ge(e),P.V.splice(P.V.indexOf(t),1),t.P=0):"cancelThread"===t?P.R[e.thread].postMessage({cmd:"cancel"}):"loaded"===t?(r.loaded=!0,a&&a(r),r.U&&(r.U(),delete r.U)):"print"===t?B("Thread "+e.threadId+": "+e.text):"printErr"===t?g("Thread "+e.threadId+": "+e.text):"alert"===t?alert("Thread "+e.threadId+": "+e.text):"setimmediate"===e.target?r.postMessage(e):"onAbort"===t?o.onAbort&&o.onAbort(e.arg):t&&g("worker sent an unknown command "+t),P.ka=void 0},r.onerror=e=>{throw g("worker sent an error! "+e.filename+":"+e.lineno+": "+e.message),e},f&&(r.on("message",function(e){r.onmessage({data:e})}),r.on("error",function(e){r.onerror(e)}),r.on("detachedExit",function(){})),r.postMessage({cmd:"load",urlOrBlob:o.mainScriptUrlOrBlob||Te,wasmMemory:b,wasmModule:H})},X:function(){var e=O("jxl_emcc.worker.js");P.S.push(new Worker(e))},la:function(){return 0==P.S.length&&(P.X(),P.Y(P.S[0])),P.S.pop()}};function I(e){for(;0<e.length;)e.shift()(o)}function te(e){if(w)return W(2,0,e);try{ne(e)}catch(e){e instanceof E||"unwind"==e||a(1,e)}}o.PThread=P,o.establishStackSpace=function(){var e=C(),n=x[e+44>>2];ve(n,n-x[e+48>>2]),Ae(n)};var j=[];function re(e){this.T=e-24,this.ia=function(e){A[this.T+4>>2]=e},this.fa=function(e){A[this.T+8>>2]=e},this.ga=function(){x[this.T>>2]=0},this.ea=function(){v[this.T+12>>0]=0},this.ha=function(){v[this.T+13>>0]=0},this.W=function(e,n){this.da(),this.ia(e),this.fa(n),this.ga(),this.ea(),this.ha()},this.da=function(){A[this.T+16>>2]=0}}o.invokeEntryPoint=function(e,n){var t=j[e];t||(e>=j.length&&(j.length=e+1),j[e]=t=V.get(e)),e=t(n),y?P.$(e):be(e)};var ae;function oe(e,n,t,r){return w?W(3,1,e,n,t,r):ie(e,n,t,r)}function ie(e,n,t,r){if("undefined"==typeof SharedArrayBuffer)return g("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var a=[];return w&&0===a.length?oe(e,n,t,r):(e={pa:t,P:e,ja:r,ra:a},w?(e.sa="spawnThread",postMessage(e,a),0):K(e))}function se(e){Atomics.store(x,e>>2,1),C()&&we(e),Atomics.compareExchange(x,e>>2,1,0)}function W(r,a){var e,n,o=arguments.length-2,i=arguments;return e=()=>{for(var e=Se(8*o),n=e>>3,t=0;t<o;t++)D[n+t]=i[2+t];return ye(r,o,e,a)},n=xe(),e=e(),Ae(n),e}o.executeNotifiedProxyingQueue=se;var U=f?()=>{var e=process.hrtime();return 1e3*e[0]+e[1]/1e6}:w?()=>performance.now()-o.__performance_now_clock_drift:()=>performance.now(),ue=[];function ce(e){return w?W(4,1,e):52}function fe(e,n,t,r,a){return w?W(5,1,e,n,t,r,a):70}var le=[null,[],[]];function pe(e,n,t,r){if(w)return W(6,1,e,n,t,r);for(var a=0,o=0;o<t;o++){var i=A[n>>2],s=A[n+4>>2];n+=8;for(var u=0;u<s;u++){var c=F[i+u],f=le[e];if(0===c||10===c){for(var c=1===e?B:g,l=f,p=0,d=p+NaN,m=p;l[m]&&!(d<=m);)++m;if(16<m-p&&l.buffer&&L)l=L.decode(l.buffer instanceof SharedArrayBuffer?l.slice(p,m):l.subarray(p,m));else{for(d="";p<m;){var h,_,y=l[p++];128&y?(h=63&l[p++],192==(224&y)?d+=String.fromCharCode((31&y)<<6|h):(_=63&l[p++],(y=224==(240&y)?(15&y)<<12|h<<6|_:(7&y)<<18|h<<12|_<<6|63&l[p++])<65536?d+=String.fromCharCode(y):(y-=65536,d+=String.fromCharCode(55296|y>>10,56320|1023&y)))):d+=String.fromCharCode(y)}l=d}c(l),f.length=0}else f.push(c)}a+=s}return A[r>>2]=a,0}P.W();var q,de=[null,ee,te,oe,ce,fe,pe],me={t:function(e){return he(e+24)+24},s:function(e,n,t){throw new re(e).W(n,t),e},i:function(e){_e(e,!c,1,!u),P.aa()},e:function(e){w?postMessage({cmd:"cleanupThread",thread:e}):$(e)},q:ie,r:function(){return 2097152},g:function(e,n,t,r){if(e==n)setTimeout(()=>se(r));else if(w)postMessage({targetThread:e,cmd:"processProxyingQueue",queue:r});else{if(!(e=P.R[e]))return;e.postMessage({cmd:"processProxyingQueue",queue:r})}return 1},k:function(){return-1},b:function(){M("")},f:function(){var e;f||c||((ae=ae||{})[e="Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread"]||(ae[e]=1,g(e=f?"warning: "+e:e)))},c:U,h:function(e,n,t){F.copyWithin(e,n,n+t)},j:function(e,n,t){ue.length=n,t>>=3;for(var r=0;r<n;r++)ue[r]=D[t+r];return(e<0?Z[-e-1]:de[e]).apply(null,ue)},n:function(){M("OOM")},l:function(){throw"unwind"},p:ne,o:ce,m:fe,d:pe,a:b||o.wasmMemory},he=(!function(){function n(e,n){var t;o.asm=e.exports,P.ba.push(o.asm.C),V=o.asm.B,X.unshift(o.asm.u),H=n,w||(t=P.S.length,P.S.forEach(function(e){P.Y(e,function(){var e;!--t&&(T--,o.monitorRunDependencies&&o.monitorRunDependencies(T),0==T&&(null!==G&&(clearInterval(G),G=null),k))&&(e=k,k=null,e())})}))}function t(e){n(e.instance,e.module)}function r(e){return function(){if(!m&&(u||c)){if("function"==typeof fetch&&!R.startsWith("file://"))return fetch(R,{credentials:"same-origin"}).then(function(e){if(e.ok)return e.arrayBuffer();throw"failed to load wasm binary file at \'"+R+"\'"}).catch(Y);if(s)return new Promise(function(n,e){s(R,function(e){n(new Uint8Array(e))},e)})}return Promise.resolve().then(Y)}().then(function(e){return WebAssembly.instantiate(e,a)}).then(function(e){return e}).then(e,function(e){g("failed to asynchronously prepare wasm: "+e),M(e)})}var a={a:me};if(w||(T++,o.monitorRunDependencies&&o.monitorRunDependencies(T)),o.instantiateWasm)try{return o.instantiateWasm(a,n)}catch(e){g("Module.instantiateWasm callback failed with error: "+e),i(e)}(m||"function"!=typeof WebAssembly.instantiateStreaming||Q()||R.startsWith("file://")||f||"function"!=typeof fetch?r(t):fetch(R,{credentials:"same-origin"}).then(function(e){return WebAssembly.instantiateStreaming(e,a).then(t,function(e){return g("wasm streaming compile failed: "+e),g("falling back to ArrayBuffer instantiation"),r(t)})})).catch(i)}(),o.___wasm_call_ctors=function(){return(o.___wasm_call_ctors=o.asm.u).apply(null,arguments)},o._jxlCreateInstance=function(){return(o._jxlCreateInstance=o.asm.v).apply(null,arguments)},o._jxlDestroyInstance=function(){return(o._jxlDestroyInstance=o.asm.w).apply(null,arguments)},o._free=function(){return(o._free=o.asm.x).apply(null,arguments)},o._jxlProcessInput=function(){return(o._jxlProcessInput=o.asm.y).apply(null,arguments)},o._malloc=function(){return(he=o._malloc=o.asm.z).apply(null,arguments)}),C=(o._jxlFlush=function(){return(o._jxlFlush=o.asm.A).apply(null,arguments)},o.__emscripten_tls_init=function(){return(o.__emscripten_tls_init=o.asm.C).apply(null,arguments)},o._pthread_self=function(){return(C=o._pthread_self=o.asm.D).apply(null,arguments)}),_e=o.__emscripten_thread_init=function(){return(_e=o.__emscripten_thread_init=o.asm.E).apply(null,arguments)},ye=(o.__emscripten_thread_crashed=function(){return(o.__emscripten_thread_crashed=o.asm.F).apply(null,arguments)},o._emscripten_run_in_main_runtime_thread_js=function(){return(ye=o._emscripten_run_in_main_runtime_thread_js=o.asm.G).apply(null,arguments)}),we=o.__emscripten_proxy_execute_task_queue=function(){return(we=o.__emscripten_proxy_execute_task_queue=o.asm.H).apply(null,arguments)},ge=o.__emscripten_thread_free_data=function(){return(ge=o.__emscripten_thread_free_data=o.asm.I).apply(null,arguments)},be=o.__emscripten_thread_exit=function(){return(be=o.__emscripten_thread_exit=o.asm.J).apply(null,arguments)},ve=o._emscripten_stack_set_limits=function(){return(ve=o._emscripten_stack_set_limits=o.asm.K).apply(null,arguments)},xe=o.stackSave=function(){return(xe=o.stackSave=o.asm.L).apply(null,arguments)},Ae=o.stackRestore=function(){return(Ae=o.stackRestore=o.asm.M).apply(null,arguments)},Se=o.stackAlloc=function(){return(Se=o.stackAlloc=o.asm.N).apply(null,arguments)};function Re(){function e(){if(!q&&(q=!0,o.calledRun=!0,!N)&&(w||I(X),t(o),o.onRuntimeInitialized&&o.onRuntimeInitialized(),!w)){if(o.postRun)for("function"==typeof o.postRun&&(o.postRun=[o.postRun]);o.postRun.length;){var e=o.postRun.shift();z.unshift(e)}I(z)}}if(!(0<T))if(w)t(o),w||I(X),postMessage({cmd:"loaded"});else{if(o.preRun)for("function"==typeof o.preRun&&(o.preRun=[o.preRun]);o.preRun.length;)n=void 0,n=o.preRun.shift(),J.unshift(n);I(J),0<T||(o.setStatus?(o.setStatus("Running..."),setTimeout(function(){setTimeout(function(){o.setStatus("")},1),e()},1)):e())}var n}if(o.___cxa_is_pointer_type=function(){return(o.___cxa_is_pointer_type=o.asm.O).apply(null,arguments)},o.keepRuntimeAlive=function(){return y},o.wasmMemory=b,o.ExitStatus=E,o.PThread=P,k=function e(){q||Re(),q||(k=e)},o.preInit)for("function"==typeof o.preInit&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.pop()();return Re(),e.ready}})();"object"==typeof exports&&"object"==typeof module?module.exports=JxlCodecModule:"function"==typeof define&&define.amd?define([],function(){return JxlCodecModule}):"object"==typeof exports&&(exports.JxlCodecModule=JxlCodecModule);',"jxl_emcc.worker.js":'"use strict";var Module={},ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,nodeWorkerThreads,parentPort,fs,initializedJS=(ENVIRONMENT_IS_NODE&&(nodeWorkerThreads=require("worker_threads"),parentPort=nodeWorkerThreads.parentPort,parentPort.on("message",e=>onmessage({data:e})),fs=require("fs"),Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(e){(0,eval)(fs.readFileSync(e,"utf8"))},postMessage:function(e){parentPort.postMessage(e)},performance:global.performance||{now:function(){return Date.now()}}})),!1),pendingNotifiedProxyingQueues=[];function threadPrintErr(){var e=Array.prototype.slice.call(arguments).join(" ");ENVIRONMENT_IS_NODE?fs.writeSync(2,e+"\\n"):console.error(e)}function threadAlert(){var e=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:e,threadId:Module._pthread_self()})}var err=threadPrintErr;self.alert=threadAlert,Module.instantiateWasm=(e,r)=>{e=new WebAssembly.Instance(Module.wasmModule,e);return r(e),Module.wasmModule=null,e.exports},self.onunhandledrejection=e=>{throw e.reason??e},self.onmessage=e=>{try{var r;if("load"===e.data.cmd)Module.wasmModule=e.data.wasmModule,Module.wasmMemory=e.data.wasmMemory,Module.buffer=Module.wasmMemory.buffer,Module.ENVIRONMENT_IS_PTHREAD=!0,"string"==typeof e.data.urlOrBlob?importScripts(e.data.urlOrBlob):(r=URL.createObjectURL(e.data.urlOrBlob),importScripts(r),URL.revokeObjectURL(r)),JxlCodecModule(Module).then(function(e){Module=e});else if("run"===e.data.cmd){Module.__performance_now_clock_drift=performance.now()-e.data.time,Module.__emscripten_thread_init(e.data.pthread_ptr,0,0,1),Module.establishStackSpace(),Module.PThread.receiveObjectTransfer(e.data),Module.PThread.threadInitTLS(),initializedJS||(pendingNotifiedProxyingQueues.forEach(e=>{Module.executeNotifiedProxyingQueue(e)}),pendingNotifiedProxyingQueues=[],initializedJS=!0);try{Module.invokeEntryPoint(e.data.start_routine,e.data.arg)}catch(e){if("unwind"!=e){if(!(e instanceof Module.ExitStatus))throw e;Module.keepRuntimeAlive()||Module.__emscripten_thread_exit(e.status)}}}else"cancel"===e.data.cmd?Module._pthread_self()&&Module.__emscripten_thread_exit(-1):"setimmediate"!==e.data.target&&("processProxyingQueue"===e.data.cmd?initializedJS?Module.executeNotifiedProxyingQueue(e.data.queue):pendingNotifiedProxyingQueues.push(e.data.queue):e.data.cmd&&(err("worker.js received unknown command "+e.data.cmd),err(e.data)))}catch(e){throw Module.__emscripten_thread_crashed&&Module.__emscripten_thread_crashed(),e}};'};self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",e=>e.waitUntil(self.clients.claim())),self.addEventListener("message",e=>{e.data&&"deregister"===e.data.type&&self.registration.unregister().then(()=>self.clients.matchAll()).then(e=>{e.forEach(e=>e.navigate(e.url))})}),self.addEventListener("fetch",function(e){if("only-if-cached"!==e.request.cache||"same-origin"===e.request.mode){const n=e.request.url;for(var[t,r]of Object.entries(a))if(n.endsWith(t)){const o=new Headers;return o.set("Content-Type","application/javascript"),o.set("Cross-Origin-Embedder-Policy","require-corp"),o.set("Cross-Origin-Opener-Policy","same-origin"),void e.respondWith(new Response(r,{status:200,statusText:"OK",headers:o}))}"document"===e.request.destination&&e.respondWith(fetch(e.request).then(e=>{if(0===e.status)return e;const t=new Headers(e.headers);return t.set("Cross-Origin-Embedder-Policy","require-corp"),t.set("Cross-Origin-Opener-Policy","same-origin"),new Response(e.body,{status:e.status,statusText:e.statusText,headers:t})}).catch(e=>console.error(e)))}})}else(()=>{const t={shouldRegister:()=>!0,shouldDeregister:()=>!1,doReload:()=>window.location.reload(),quiet:!1,...window.coi},r=navigator;t.shouldDeregister()&&r.serviceWorker&&r.serviceWorker.controller&&r.serviceWorker.controller.postMessage({type:"deregister"}),!1===window.crossOriginIsolated&&t.shouldRegister()&&(window.isSecureContext?r.serviceWorker&&r.serviceWorker.register(window.document.currentScript.src).then(e=>{t.quiet||console.log("COOP/COEP Service Worker registered",e.scope),e.addEventListener("updatefound",()=>{t.quiet||console.log("Reloading page to make use of updated COOP/COEP Service Worker."),t.doReload()}),e.active&&!r.serviceWorker.controller&&(t.quiet||console.log("Reloading page to make use of COOP/COEP Service Worker."),t.doReload())},e=>{t.quiet||console.error("COOP/COEP Service Worker failed to register:",e)}):t.quiet||console.log("COOP/COEP Service Worker not registered, a secure context is required."))})();
