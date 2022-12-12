
var JxlDecoderModule = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(JxlDecoderModule) {
  JxlDecoderModule = JxlDecoderModule || {};


function aa(){b.buffer!=f&&h(b.buffer);return ba}function k(){b.buffer!=f&&h(b.buffer);return ca}function m(){b.buffer!=f&&h(b.buffer);return da}function p(){b.buffer!=f&&h(b.buffer);return ea}function fa(){b.buffer!=f&&h(b.buffer);return ha}var q;q||(q=typeof JxlDecoderModule !== 'undefined' ? JxlDecoderModule : {});var r,u;q.ready=new Promise(function(a,c){r=a;u=c});
var ka=Object.assign({},q),x=(a,c)=>{throw c;},y="object"==typeof window,z="function"==typeof importScripts,C="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,D=q.ENVIRONMENT_IS_PTHREAD||!1,F="";function la(a){return q.locateFile?q.locateFile(a,F):F+a}var G,H,I;
if(C){F=z?require("path").dirname(F)+"/":__dirname+"/";var fs,J;"function"===typeof require&&(fs=require("fs"),J=require("path"));G=(c,d)=>{c=J.normalize(c);return fs.readFileSync(c,d?void 0:"utf8")};I=c=>{c=G(c,!0);c.buffer||(c=new Uint8Array(c));return c};H=(c,d,e)=>{c=J.normalize(c);fs.readFile(c,function(g,l){g?e(g):d(l.buffer)})};1<process.argv.length&&process.argv[1].replace(/\\/g,"/");process.argv.slice(2);process.on("uncaughtException",function(c){if(!(c instanceof M))throw c;});process.on("unhandledRejection",
function(c){throw c;});x=(c,d)=>{if(noExitRuntime)throw process.exitCode=c,d;d instanceof M||N("exiting due to exception: "+d);process.exit(c)};q.inspect=function(){return"[Emscripten Module object]"};let a;try{a=require("worker_threads")}catch(c){throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'),c;}global.Worker=a.Worker}else if(y||z)z?F=self.location.href:"undefined"!=typeof document&&document.currentScript&&(F=document.currentScript.src),
_scriptDir&&(F=_scriptDir),0!==F.indexOf("blob:")?F=F.substr(0,F.replace(/[?#].*/,"").lastIndexOf("/")+1):F="",C||(G=a=>{var c=new XMLHttpRequest;c.open("GET",a,!1);c.send(null);return c.responseText},z&&(I=a=>{var c=new XMLHttpRequest;c.open("GET",a,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)}),H=(a,c,d)=>{var e=new XMLHttpRequest;e.open("GET",a,!0);e.responseType="arraybuffer";e.onload=()=>{200==e.status||0==e.status&&e.response?c(e.response):d()};e.onerror=d;
e.send(null)});C&&"undefined"==typeof performance&&(global.performance=require("perf_hooks").performance);var ma=console.log.bind(console),na=console.warn.bind(console);C&&(ma=a=>fs.writeSync(1,a+"\n"),na=a=>fs.writeSync(2,a+"\n"));var oa=q.print||ma,N=q.printErr||na;Object.assign(q,ka);ka=null;q.quit&&(x=q.quit);var O;q.wasmBinary&&(O=q.wasmBinary);var noExitRuntime=q.noExitRuntime||!0;"object"!=typeof WebAssembly&&P("no native wasm support detected");
var b,pa,qa=!1,ra="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,f,ba,ca,da,ea,ha;D&&(f=q.buffer);function h(a){f=a;q.HEAP8=ba=new Int8Array(a);q.HEAP16=new Int16Array(a);q.HEAP32=da=new Int32Array(a);q.HEAPU8=ca=new Uint8Array(a);q.HEAPU16=new Uint16Array(a);q.HEAPU32=ea=new Uint32Array(a);q.HEAPF32=new Float32Array(a);q.HEAPF64=ha=new Float64Array(a)}var sa=q.INITIAL_MEMORY||78643200;
if(D)b=q.wasmMemory,f=q.buffer;else if(q.wasmMemory)b=q.wasmMemory;else if(b=new WebAssembly.Memory({initial:sa/65536,maximum:32768,shared:!0}),!(b.buffer instanceof SharedArrayBuffer))throw N("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),C&&N("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)"),
Error("bad memory");b&&(f=b.buffer);sa=f.byteLength;h(f);var ta,ua=[],va=[],wa=[];function xa(){var a=q.preRun.shift();ua.unshift(a)}var Q=0,ya=null,R=null;function P(a){if(D)postMessage({cmd:"onAbort",arg:a});else if(q.onAbort)q.onAbort(a);a="Aborted("+a+")";N(a);qa=!0;a=new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");u(a);throw a;}function za(){return S.startsWith("data:application/octet-stream;base64,")}var S;S="jxl_decoder.wasm";za()||(S=la(S));
function Aa(){var a=S;try{if(a==S&&O)return new Uint8Array(O);if(I)return I(a);throw"both async and sync fetching of the wasm failed";}catch(c){P(c)}}
function Ba(){if(!O&&(y||z)){if("function"==typeof fetch&&!S.startsWith("file://"))return fetch(S,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+S+"'";return a.arrayBuffer()}).catch(function(){return Aa()});if(H)return new Promise(function(a,c){H(S,function(d){a(new Uint8Array(d))},c)})}return Promise.resolve().then(function(){return Aa()})}var Ca={};
function M(a){this.name="ExitStatus";this.message="Program terminated with exit("+a+")";this.status=a}function Da(a){(a=T.S[a])||P();T.$(a)}function Ea(a){var c=T.ma();if(!c)return 6;T.W.push(c);T.S[a.R]=c;c.R=a.R;var d={cmd:"run",start_routine:a.qa,arg:a.ka,pthread_ptr:a.R};c.V=()=>{d.time=performance.now();c.postMessage(d,a.sa)};c.loaded&&(c.V(),delete c.V);return 0}function Fa(a){if(D)return U(1,1,a);if(!noExitRuntime){T.ra();if(q.onExit)q.onExit(a);qa=!0}x(a,new M(a))}
function Ga(a,c){if(!c&&D)throw Ha(a),"unwind";Fa(a)}
var T={T:[],W:[],da:[],S:{},X:function(){D?T.oa():T.na()},na:function(){for(var a=4;a--;)T.Y()},oa:function(){T.receiveObjectTransfer=T.pa;T.threadInitTLS=T.ba;T.setExitStatus=T.aa;noExitRuntime=!1},aa:function(){},ra:function(){for(var a of Object.values(T.S))T.$(a);for(a of T.T)a.terminate();T.T=[]},$:function(a){var c=a.R;delete T.S[c];T.T.push(a);T.W.splice(T.W.indexOf(a),1);a.R=0;Ia(c)},pa:function(){},ba:function(){T.da.forEach(a=>a())},Z:function(a,c){a.onmessage=d=>{d=d.data;var e=d.cmd;a.R&&
(T.la=a.R);if(d.targetThread&&d.targetThread!=V()){var g=T.S[d.ua];g?g.postMessage(d,d.transferList):N('Internal error! Worker sent a message "'+e+'" to target pthread '+d.targetThread+", but that thread no longer exists!")}else if("processProxyingQueue"===e)Ja(d.queue);else if("spawnThread"===e)Ea(d);else if("cleanupThread"===e)Da(d.thread);else if("killThread"===e)d=d.thread,e=T.S[d],delete T.S[d],e.terminate(),Ia(d),T.W.splice(T.W.indexOf(e),1),e.R=0;else if("cancelThread"===e)T.S[d.thread].postMessage({cmd:"cancel"});
else if("loaded"===e)a.loaded=!0,c&&c(a),a.V&&(a.V(),delete a.V);else if("print"===e)oa("Thread "+d.threadId+": "+d.text);else if("printErr"===e)N("Thread "+d.threadId+": "+d.text);else if("alert"===e)alert("Thread "+d.threadId+": "+d.text);else if("setimmediate"===d.target)a.postMessage(d);else if("onAbort"===e){if(q.onAbort)q.onAbort(d.arg)}else e&&N("worker sent an unknown command "+e);T.la=void 0};a.onerror=d=>{N("worker sent an error! "+d.filename+":"+d.lineno+": "+d.message);throw d;};C&&(a.on("message",
function(d){a.onmessage({data:d})}),a.on("error",function(d){a.onerror(d)}),a.on("detachedExit",function(){}));a.postMessage({cmd:"load",urlOrBlob:q.mainScriptUrlOrBlob||_scriptDir,wasmMemory:b,wasmModule:pa})},Y:function(){var a=la("jxl_decoder.worker.js");T.T.push(new Worker(a))},ma:function(){0==T.T.length&&(T.Y(),T.Z(T.T[0]));return T.T.pop()}};q.PThread=T;function W(a){for(;0<a.length;)a.shift()(q)}q.establishStackSpace=function(){var a=V(),c=m()[a+44>>2];a=m()[a+48>>2];Ka(c,c-a);La(c)};
function Ha(a){if(D)return U(2,0,a);try{Ga(a)}catch(c){c instanceof M||"unwind"==c||x(1,c)}}var X=[];q.invokeEntryPoint=function(a,c){var d=X[a];d||(a>=X.length&&(X.length=a+1),X[a]=d=ta.get(a));a=d(c);noExitRuntime?T.aa(a):Ma(a)};
function Na(a){this.U=a-24;this.ja=function(c){p()[this.U+4>>2]=c};this.ga=function(c){p()[this.U+8>>2]=c};this.ha=function(){m()[this.U>>2]=0};this.fa=function(){var c=0;aa()[this.U+12>>0]=c};this.ia=function(){var c=0;aa()[this.U+13>>0]=c};this.X=function(c,d){this.ea();this.ja(c);this.ga(d);this.ha();this.fa();this.ia()};this.ea=function(){p()[this.U+16>>2]=0}}var Oa=0;function Pa(a,c,d,e){return D?U(3,1,a,c,d,e):Qa(a,c,d,e)}
function Qa(a,c,d,e){if("undefined"==typeof SharedArrayBuffer)return N("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var g=[];if(D&&0===g.length)return Pa(a,c,d,e);a={qa:d,R:a,ka:e,sa:g};return D?(a.ta="spawnThread",postMessage(a,g),0):Ea(a)}function Ja(a){Atomics.store(m(),a>>2,1);V()&&Ra(a);Atomics.compareExchange(m(),a>>2,1,0)}q.executeNotifiedProxyingQueue=Ja;var Y,Sa;
Sa=C?()=>{var a=process.hrtime();return 1E3*a[0]+a[1]/1E6}:D?()=>performance.now()-q.__performance_now_clock_drift:()=>performance.now();function Ta(a){var c=Ua();a=a();La(c);return a}function U(a,c){var d=arguments.length-2,e=arguments;return Ta(()=>{for(var g=Wa(8*d),l=g>>3,w=0;w<d;w++){var E=e[2+w];fa()[l+w]=E}return Xa(a,d,g,c)})}var Ya=[];function Za(a){return D?U(4,1,a):52}function $a(a,c,d,e,g){return D?U(5,1,a,c,d,e,g):70}var ab=[null,[],[]];
function bb(a,c,d,e){if(D)return U(6,1,a,c,d,e);for(var g=0,l=0;l<d;l++){var w=p()[c>>2],E=p()[c+4>>2];c+=8;for(var K=0;K<E;K++){var L=k()[w+K],ia=ab[a];if(0===L||10===L){L=1===a?oa:N;var t=ia;for(var v=0,A=v+NaN,B=v;t[B]&&!(B>=A);)++B;if(16<B-v&&t.buffer&&ra)t=ra.decode(t.buffer instanceof SharedArrayBuffer?t.slice(v,B):t.subarray(v,B));else{for(A="";v<B;){var n=t[v++];if(n&128){var ja=t[v++]&63;if(192==(n&224))A+=String.fromCharCode((n&31)<<6|ja);else{var Va=t[v++]&63;n=224==(n&240)?(n&15)<<12|
ja<<6|Va:(n&7)<<18|ja<<12|Va<<6|t[v++]&63;65536>n?A+=String.fromCharCode(n):(n-=65536,A+=String.fromCharCode(55296|n>>10,56320|n&1023))}}else A+=String.fromCharCode(n)}t=A}L(t);ia.length=0}else ia.push(L)}g+=E}p()[e>>2]=g;return 0}T.X();
var cb=[null,Fa,Ha,Pa,Za,$a,bb],fb={t:function(a){return db(a+24)+24},s:function(a,c,d){(new Na(a)).X(c,d);Oa++;throw a;},h:function(a){eb(a,!z,1,!y);T.ba()},e:function(a){D?postMessage({cmd:"cleanupThread",thread:a}):Da(a)},p:Qa,q:function(){return 2097152},r:function(a,c,d,e){if(a==c)setTimeout(()=>Ja(e));else if(D)postMessage({targetThread:a,cmd:"processProxyingQueue",queue:e});else{a=T.S[a];if(!a)return;a.postMessage({cmd:"processProxyingQueue",queue:e})}return 1},j:function(){return-1},b:function(){P("")},
f:function(){if(!C&&!z){var a="Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread";Y||(Y={});Y[a]||(Y[a]=1,C&&(a="warning: "+a),N(a))}},c:Sa,g:function(a,c,d){k().copyWithin(a,c,c+d)},i:function(a,c,d){Ya.length=c;d>>=3;for(var e=0;e<c;e++)Ya[e]=fa()[d+e];return(0>a?Ca[-a-1]:cb[a]).apply(null,Ya)},n:function(a){var c=k().length;a>>>=0;if(a<=c||2147483648<a)return!1;for(var d=1;4>=d;d*=2){var e=c*(1+.2/d);e=Math.min(e,
a+100663296);var g=Math;e=Math.max(a,e);g=g.min.call(g,2147483648,e+(65536-e%65536)%65536);a:{try{b.grow(g-f.byteLength+65535>>>16);h(b.buffer);var l=1;break a}catch(w){}l=void 0}if(l)return!0}return!1},k:function(){throw"unwind";},l:Ga,o:Za,m:$a,d:bb,a:b||q.wasmMemory};
(function(){function a(g,l){q.asm=g.exports;T.da.push(q.asm.E);ta=q.asm.B;va.unshift(q.asm.u);pa=l;if(!D){var w=T.T.length;T.T.forEach(function(E){T.Z(E,function(){if(!--w&&(Q--,q.monitorRunDependencies&&q.monitorRunDependencies(Q),0==Q&&(null!==ya&&(clearInterval(ya),ya=null),R))){var K=R;R=null;K()}})})}}function c(g){a(g.instance,g.module)}function d(g){return Ba().then(function(l){return WebAssembly.instantiate(l,e)}).then(function(l){return l}).then(g,function(l){N("failed to asynchronously prepare wasm: "+
l);P(l)})}var e={a:fb};D||(Q++,q.monitorRunDependencies&&q.monitorRunDependencies(Q));if(q.instantiateWasm)try{return q.instantiateWasm(e,a)}catch(g){N("Module.instantiateWasm callback failed with error: "+g),u(g)}(function(){return O||"function"!=typeof WebAssembly.instantiateStreaming||za()||S.startsWith("file://")||C||"function"!=typeof fetch?d(c):fetch(S,{credentials:"same-origin"}).then(function(g){return WebAssembly.instantiateStreaming(g,e).then(c,function(l){N("wasm streaming compile failed: "+
l);N("falling back to ArrayBuffer instantiation");return d(c)})})})().catch(u);return{}})();q.___wasm_call_ctors=function(){return(q.___wasm_call_ctors=q.asm.u).apply(null,arguments)};q._jxlCreateInstance=function(){return(q._jxlCreateInstance=q.asm.v).apply(null,arguments)};q._jxlDestroyInstance=function(){return(q._jxlDestroyInstance=q.asm.w).apply(null,arguments)};q._free=function(){return(q._free=q.asm.x).apply(null,arguments)};
q._jxlProcessInput=function(){return(q._jxlProcessInput=q.asm.y).apply(null,arguments)};var db=q._malloc=function(){return(db=q._malloc=q.asm.z).apply(null,arguments)};q._jxlFlush=function(){return(q._jxlFlush=q.asm.A).apply(null,arguments)};q._jxlDecompress=function(){return(q._jxlDecompress=q.asm.C).apply(null,arguments)};q._jxlCleanup=function(){return(q._jxlCleanup=q.asm.D).apply(null,arguments)};q.__emscripten_tls_init=function(){return(q.__emscripten_tls_init=q.asm.E).apply(null,arguments)};
var V=q._pthread_self=function(){return(V=q._pthread_self=q.asm.F).apply(null,arguments)},eb=q.__emscripten_thread_init=function(){return(eb=q.__emscripten_thread_init=q.asm.G).apply(null,arguments)};q.__emscripten_thread_crashed=function(){return(q.__emscripten_thread_crashed=q.asm.H).apply(null,arguments)};
var Xa=q._emscripten_run_in_main_runtime_thread_js=function(){return(Xa=q._emscripten_run_in_main_runtime_thread_js=q.asm.I).apply(null,arguments)},Ra=q.__emscripten_proxy_execute_task_queue=function(){return(Ra=q.__emscripten_proxy_execute_task_queue=q.asm.J).apply(null,arguments)},Ia=q.__emscripten_thread_free_data=function(){return(Ia=q.__emscripten_thread_free_data=q.asm.K).apply(null,arguments)},Ma=q.__emscripten_thread_exit=function(){return(Ma=q.__emscripten_thread_exit=q.asm.L).apply(null,
arguments)},Ka=q._emscripten_stack_set_limits=function(){return(Ka=q._emscripten_stack_set_limits=q.asm.M).apply(null,arguments)},Ua=q.stackSave=function(){return(Ua=q.stackSave=q.asm.N).apply(null,arguments)},La=q.stackRestore=function(){return(La=q.stackRestore=q.asm.O).apply(null,arguments)},Wa=q.stackAlloc=function(){return(Wa=q.stackAlloc=q.asm.P).apply(null,arguments)};q.___cxa_is_pointer_type=function(){return(q.___cxa_is_pointer_type=q.asm.Q).apply(null,arguments)};q.keepRuntimeAlive=function(){return noExitRuntime};
q.wasmMemory=b;q.ExitStatus=M;q.PThread=T;var Z;R=function gb(){Z||hb();Z||(R=gb)};
function hb(){function a(){if(!Z&&(Z=!0,q.calledRun=!0,!qa)){D||W(va);r(q);if(q.onRuntimeInitialized)q.onRuntimeInitialized();if(!D){if(q.postRun)for("function"==typeof q.postRun&&(q.postRun=[q.postRun]);q.postRun.length;){var c=q.postRun.shift();wa.unshift(c)}W(wa)}}}if(!(0<Q))if(D)r(q),D||W(va),postMessage({cmd:"loaded"});else{if(q.preRun)for("function"==typeof q.preRun&&(q.preRun=[q.preRun]);q.preRun.length;)xa();W(ua);0<Q||(q.setStatus?(q.setStatus("Running..."),setTimeout(function(){setTimeout(function(){q.setStatus("")},
1);a()},1)):a())}}if(q.preInit)for("function"==typeof q.preInit&&(q.preInit=[q.preInit]);0<q.preInit.length;)q.preInit.pop()();hb();


  return JxlDecoderModule.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = JxlDecoderModule;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return JxlDecoderModule; });
else if (typeof exports === 'object')
  exports["JxlDecoderModule"] = JxlDecoderModule;
