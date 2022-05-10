
var JxlCodecModule = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(JxlCodecModule) {
  JxlCodecModule = JxlCodecModule || {};


var b;b||(b=typeof JxlCodecModule !== 'undefined' ? JxlCodecModule : {});var h,k;b.ready=new Promise(function(a,c){h=a;k=c});var p=Object.assign({},b),q="object"===typeof window,t="function"===typeof importScripts,v="",w,x,z,fs,A,B;
if("object"===typeof process&&"object"===typeof process.versions&&"string"===typeof process.versions.node)v=t?require("path").dirname(v)+"/":__dirname+"/",B=()=>{A||(fs=require("fs"),A=require("path"))},w=function(a,c){B();a=A.normalize(a);return fs.readFileSync(a,c?void 0:"utf8")},z=a=>{a=w(a,!0);a.buffer||(a=new Uint8Array(a));return a},x=(a,c,e)=>{B();a=A.normalize(a);fs.readFile(a,function(d,f){d?e(d):c(f.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),
process.on("uncaughtException",function(a){throw a;}),process.on("unhandledRejection",function(a){throw a;}),b.inspect=function(){return"[Emscripten Module object]"};else if(q||t)t?v=self.location.href:"undefined"!==typeof document&&document.currentScript&&(v=document.currentScript.src),_scriptDir&&(v=_scriptDir),0!==v.indexOf("blob:")?v=v.substr(0,v.replace(/[?#].*/,"").lastIndexOf("/")+1):v="",w=a=>{var c=new XMLHttpRequest;c.open("GET",a,!1);c.send(null);return c.responseText},t&&(z=a=>{var c=
new XMLHttpRequest;c.open("GET",a,!1);c.responseType="arraybuffer";c.send(null);return new Uint8Array(c.response)}),x=(a,c,e)=>{var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=()=>{200==d.status||0==d.status&&d.response?c(d.response):e()};d.onerror=e;d.send(null)};var aa=b.print||console.log.bind(console),C=b.printErr||console.warn.bind(console);Object.assign(b,p);p=null;var D;b.wasmBinary&&(D=b.wasmBinary);var noExitRuntime=b.noExitRuntime||!0;
"object"!==typeof WebAssembly&&E("no native wasm support detected");var F,G=!1,H="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0,I,J,K,L;function M(){var a=F.buffer;I=a;b.HEAP8=J=new Int8Array(a);b.HEAP16=new Int16Array(a);b.HEAP32=L=new Int32Array(a);b.HEAPU8=K=new Uint8Array(a);b.HEAPU16=new Uint16Array(a);b.HEAPU32=new Uint32Array(a);b.HEAPF32=new Float32Array(a);b.HEAPF64=new Float64Array(a)}var Q,R=[],ba=[],ca=[];function da(){var a=b.preRun.shift();R.unshift(a)}
var S=0,T=null,U=null;b.preloadedImages={};b.preloadedAudios={};function E(a){if(b.onAbort)b.onAbort(a);a="Aborted("+a+")";C(a);G=!0;a=new WebAssembly.RuntimeError(a+". Build with -s ASSERTIONS=1 for more info.");k(a);throw a;}function ea(){return V.startsWith("data:application/octet-stream;base64,")}var V;V="jxl_emcc.wasm";if(!ea()){var fa=V;V=b.locateFile?b.locateFile(fa,v):v+fa}
function ha(){var a=V;try{if(a==V&&D)return new Uint8Array(D);if(z)return z(a);throw"both async and sync fetching of the wasm failed";}catch(c){E(c)}}
function ka(){if(!D&&(q||t)){if("function"===typeof fetch&&!V.startsWith("file://"))return fetch(V,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+V+"'";return a.arrayBuffer()}).catch(function(){return ha()});if(x)return new Promise(function(a,c){x(V,function(e){a(new Uint8Array(e))},c)})}return Promise.resolve().then(function(){return ha()})}
function W(a){for(;0<a.length;){var c=a.shift();if("function"==typeof c)c(b);else{var e=c.F;"number"===typeof e?void 0===c.s?la(e)():la(e)(c.s):e(void 0===c.s?null:c.s)}}}var X=[];function la(a){var c=X[a];c||(a>=X.length&&(X.length=a+1),X[a]=c=Q.get(a));return c}
function ma(a){this.o=a-16;this.A=function(c){L[this.o+4>>2]=c};this.D=function(c){L[this.o+8>>2]=c};this.u=function(){L[this.o>>2]=0};this.C=function(){J[this.o+12>>0]=0};this.v=function(){J[this.o+13>>0]=0};this.B=function(c,e){this.A(c);this.D(e);this.u();this.C();this.v()}}
var na=0,oa=[null,[],[]],ra={h:function(a){return pa(a+16)+16},g:function(a,c,e){(new ma(a)).B(c,e);na++;throw a;},a:function(){E("")},f:function(a,c,e){K.copyWithin(a,c,c+e)},d:function(a){var c=K.length;a>>>=0;if(2147483648<a)return!1;for(var e=1;4>=e;e*=2){var d=c*(1+.2/e);d=Math.min(d,a+100663296);d=Math.max(a,d);0<d%65536&&(d+=65536-d%65536);a:{try{F.grow(Math.min(2147483648,d)-I.byteLength+65535>>>16);M();var f=1;break a}catch(l){}f=void 0}if(f)return!0}return!1},e:function(){return 0},c:function(){},
b:function(a,c,e,d){for(var f=0,l=0;l<e;l++){var qa=L[c>>2],ia=L[c+4>>2];c+=8;for(var N=0;N<ia;N++){var y=K[qa+N],O=oa[a];if(0===y||10===y){y=1===a?aa:C;var m=O;for(var n=0,r=n+NaN,u=n;m[u]&&!(u>=r);)++u;if(16<u-n&&m.subarray&&H)m=H.decode(m.subarray(n,u));else{for(r="";n<u;){var g=m[n++];if(g&128){var P=m[n++]&63;if(192==(g&224))r+=String.fromCharCode((g&31)<<6|P);else{var ja=m[n++]&63;g=224==(g&240)?(g&15)<<12|P<<6|ja:(g&7)<<18|P<<12|ja<<6|m[n++]&63;65536>g?r+=String.fromCharCode(g):(g-=65536,r+=
String.fromCharCode(55296|g>>10,56320|g&1023))}}else r+=String.fromCharCode(g)}m=r}y(m);O.length=0}else O.push(y)}f+=ia}L[d>>2]=f;return 0}};
(function(){function a(f){b.asm=f.exports;F=b.asm.i;M();Q=b.asm.m;ba.unshift(b.asm.j);S--;b.monitorRunDependencies&&b.monitorRunDependencies(S);0==S&&(null!==T&&(clearInterval(T),T=null),U&&(f=U,U=null,f()))}function c(f){a(f.instance)}function e(f){return ka().then(function(l){return WebAssembly.instantiate(l,d)}).then(function(l){return l}).then(f,function(l){C("failed to asynchronously prepare wasm: "+l);E(l)})}var d={a:ra};S++;b.monitorRunDependencies&&b.monitorRunDependencies(S);if(b.instantiateWasm)try{return b.instantiateWasm(d,
a)}catch(f){return C("Module.instantiateWasm callback failed with error: "+f),!1}(function(){return D||"function"!==typeof WebAssembly.instantiateStreaming||ea()||V.startsWith("file://")||"function"!==typeof fetch?e(c):fetch(V,{credentials:"same-origin"}).then(function(f){return WebAssembly.instantiateStreaming(f,d).then(c,function(l){C("wasm streaming compile failed: "+l);C("falling back to ArrayBuffer instantiation");return e(c)})})})().catch(k);return{}})();
b.___wasm_call_ctors=function(){return(b.___wasm_call_ctors=b.asm.j).apply(null,arguments)};b._jxlDecompress=function(){return(b._jxlDecompress=b.asm.k).apply(null,arguments)};var pa=b._malloc=function(){return(pa=b._malloc=b.asm.l).apply(null,arguments)};b._free=function(){return(b._free=b.asm.n).apply(null,arguments)};var Y;U=function sa(){Y||Z();Y||(U=sa)};
function Z(){function a(){if(!Y&&(Y=!0,b.calledRun=!0,!G)){W(ba);h(b);if(b.onRuntimeInitialized)b.onRuntimeInitialized();if(b.postRun)for("function"==typeof b.postRun&&(b.postRun=[b.postRun]);b.postRun.length;){var c=b.postRun.shift();ca.unshift(c)}W(ca)}}if(!(0<S)){if(b.preRun)for("function"==typeof b.preRun&&(b.preRun=[b.preRun]);b.preRun.length;)da();W(R);0<S||(b.setStatus?(b.setStatus("Running..."),setTimeout(function(){setTimeout(function(){b.setStatus("")},1);a()},1)):a())}}b.run=Z;
if(b.preInit)for("function"==typeof b.preInit&&(b.preInit=[b.preInit]);0<b.preInit.length;)b.preInit.pop()();Z();


  return JxlCodecModule.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = JxlCodecModule;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return JxlCodecModule; });
else if (typeof exports === 'object')
  exports["JxlCodecModule"] = JxlCodecModule;
