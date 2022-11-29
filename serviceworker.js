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
    'client_worker.js': '// Copyright (c) the JPEG XL Project Authors. All rights reserved.
//
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

let decoder = null;

// Serialize work; plus postpone processing until decoder is ready.
let workQueue = [];

const processQueue = () => {
  while (workQueue.length) {
    const data = workQueue.shift();
    console.log(\'CW job: \' + JSON.stringify(data));
    const response = {id: data.id, result: \'bad\'};
    console.log(\'CW->Client: \' + JSON.stringify(response));
    postMessage(response);
  }
};

onmessage = function(event) {
  const data = event.data;
  console.log(\'CW received: \' + JSON.stringify(data));
  if (data.op === \'decode\') {
    workQueue.push(event.data);
    processQueue();
  }
};

const onLoadJxlModule = (module) => {
  decoder = module;
  processQueue();
}

importScripts(\'jxl_decoder.js\');
const config = {mainScriptUrlOrBlob: \'https://jxl-demo.netlify.app/jxl_decoder.js\'};
JxlCodecModule(config).then(onLoadJxlModule);',
    'jxl_decoder.js': 'var JxlCodecModule = (() => {
  var _scriptDir = typeof document !== \'undefined\' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== \'undefined\') _scriptDir = _scriptDir || __filename;
  return (
function(JxlCodecModule) {
  JxlCodecModule = JxlCodecModule || {};

var Module=typeof JxlCodecModule!="undefined"?JxlCodecModule:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var ENVIRONMENT_IS_PTHREAD=Module["ENVIRONMENT_IS_PTHREAD"]||false;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}var fs,nodePath;if(typeof require==="function"){fs=require("fs");nodePath=require("path")}read_=(filename,binary)=>{filename=nodePath["normalize"](filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{filename=nodePath["normalize"](filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\\\/g,"/")}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",function(reason){throw reason});quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"};let nodeWorkerThreads;try{nodeWorkerThreads=require("worker_threads")}catch(e){console.error(\'The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?\');throw e}global.Worker=nodeWorkerThreads.Worker}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}if(!ENVIRONMENT_IS_NODE){read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}if(ENVIRONMENT_IS_NODE){if(typeof performance=="undefined"){global.performance=require("perf_hooks").performance}}var defaultPrint=console.log.bind(console);var defaultPrintErr=console.warn.bind(console);if(ENVIRONMENT_IS_NODE){defaultPrint=str=>fs.writeSync(1,str+"\\n");defaultPrintErr=str=>fs.writeSync(2,str+"\\n")}var out=Module["print"]||defaultPrint;var err=Module["printErr"]||defaultPrintErr;Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var POINTER_SIZE=4;var Atomics_load=Atomics.load;var Atomics_store=Atomics.store;var Atomics_compareExchange=Atomics.compareExchange;var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var wasmModule;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.buffer instanceof SharedArrayBuffer?heapOrArray.slice(idx,endPtr):heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;if(ENVIRONMENT_IS_PTHREAD){buffer=Module["buffer"]}function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||78643200;if(ENVIRONMENT_IS_PTHREAD){wasmMemory=Module["wasmMemory"];buffer=Module["buffer"]}else{if(Module["wasmMemory"]){wasmMemory=Module["wasmMemory"]}else{wasmMemory=new WebAssembly.Memory({"initial":INITIAL_MEMORY/65536,"maximum":INITIAL_MEMORY/65536,"shared":true});if(!(wasmMemory.buffer instanceof SharedArrayBuffer)){err("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");if(ENVIRONMENT_IS_NODE){err("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and also use a recent version)")}throw Error("bad memory")}}}if(wasmMemory){buffer=wasmMemory.buffer}INITIAL_MEMORY=buffer.byteLength;updateGlobalBufferAndViews(buffer);var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;if(ENVIRONMENT_IS_PTHREAD)return;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(ENVIRONMENT_IS_PTHREAD)return;if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(ENVIRONMENT_IS_PTHREAD){postMessage({"cmd":"onAbort","arg":what})}else{if(Module["onAbort"]){Module["onAbort"](what)}}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="jxl_decoder.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at \'"+wasmBinaryFile+"\'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"env":asmLibraryArg,"wasi_snapshot_preview1":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;registerTLSInit(Module["asm"]["_emscripten_tls_init"]);wasmTable=Module["asm"]["__indirect_function_table"];addOnInit(Module["asm"]["__wasm_call_ctors"]);wasmModule=module;if(!ENVIRONMENT_IS_PTHREAD){var numWorkersToLoad=PThread.unusedWorkers.length;PThread.unusedWorkers.forEach(function(w){PThread.loadWasmModuleToWorker(w,function(){if(!--numWorkersToLoad)removeRunDependency("wasm-instantiate")})})}}if(!ENVIRONMENT_IS_PTHREAD){addRunDependency("wasm-instantiate")}function receiveInstantiationResult(result){receiveInstance(result["instance"],result["module"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);readyPromiseReject(e)}}instantiateAsync().catch(readyPromiseReject);return{}}var tempDouble;var tempI64;var ASM_CONSTS={};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function killThread(pthread_ptr){var worker=PThread.pthreads[pthread_ptr];delete PThread.pthreads[pthread_ptr];worker.terminate();__emscripten_thread_free_data(pthread_ptr);PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker),1);worker.pthread_ptr=0}function cancelThread(pthread_ptr){var worker=PThread.pthreads[pthread_ptr];worker.postMessage({"cmd":"cancel"})}function cleanupThread(pthread_ptr){var worker=PThread.pthreads[pthread_ptr];assert(worker);PThread.returnWorkerToPool(worker)}function spawnThread(threadParams){var worker=PThread.getNewWorker();if(!worker){return 6}PThread.runningWorkers.push(worker);PThread.pthreads[threadParams.pthread_ptr]=worker;worker.pthread_ptr=threadParams.pthread_ptr;var msg={"cmd":"run","start_routine":threadParams.startRoutine,"arg":threadParams.arg,"pthread_ptr":threadParams.pthread_ptr};worker.runPthread=()=>{msg.time=performance.now();worker.postMessage(msg,threadParams.transferList)};if(worker.loaded){worker.runPthread();delete worker.runPthread}return 0}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _proc_exit(code){if(ENVIRONMENT_IS_PTHREAD)return _emscripten_proxy_to_main_thread_js(1,1,code);EXITSTATUS=code;if(!keepRuntimeAlive()){PThread.terminateAllThreads();if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;if(!implicit){if(ENVIRONMENT_IS_PTHREAD){exitOnMainThread(status);throw"unwind"}else{}}_proc_exit(status)}var _exit=exitJS;function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var PThread={unusedWorkers:[],runningWorkers:[],tlsInitFunctions:[],pthreads:{},init:function(){if(ENVIRONMENT_IS_PTHREAD){PThread.initWorker()}else{PThread.initMainThread()}},initMainThread:function(){var pthreadPoolSize=4;while(pthreadPoolSize--){PThread.allocateUnusedWorker()}},initWorker:function(){noExitRuntime=false},setExitStatus:function(status){EXITSTATUS=status},terminateAllThreads:function(){for(var worker of Object.values(PThread.pthreads)){PThread.returnWorkerToPool(worker)}for(var worker of PThread.unusedWorkers){worker.terminate()}PThread.unusedWorkers=[]},returnWorkerToPool:function(worker){var pthread_ptr=worker.pthread_ptr;delete PThread.pthreads[pthread_ptr];PThread.unusedWorkers.push(worker);PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker),1);worker.pthread_ptr=0;__emscripten_thread_free_data(pthread_ptr)},receiveObjectTransfer:function(data){},threadInitTLS:function(){PThread.tlsInitFunctions.forEach(f=>f())},loadWasmModuleToWorker:function(worker,onFinishedLoading){worker.onmessage=e=>{var d=e["data"];var cmd=d["cmd"];if(worker.pthread_ptr)PThread.currentProxiedOperationCallerThread=worker.pthread_ptr;if(d["targetThread"]&&d["targetThread"]!=_pthread_self()){var targetWorker=PThread.pthreads[d.targetThread];if(targetWorker){targetWorker.postMessage(d,d["transferList"])}else{err(\'Internal error! Worker sent a message "\'+cmd+\'" to target pthread \'+d["targetThread"]+", but that thread no longer exists!")}PThread.currentProxiedOperationCallerThread=undefined;return}if(cmd==="processProxyingQueue"){executeNotifiedProxyingQueue(d["queue"])}else if(cmd==="spawnThread"){spawnThread(d)}else if(cmd==="cleanupThread"){cleanupThread(d["thread"])}else if(cmd==="killThread"){killThread(d["thread"])}else if(cmd==="cancelThread"){cancelThread(d["thread"])}else if(cmd==="loaded"){worker.loaded=true;if(onFinishedLoading)onFinishedLoading(worker);if(worker.runPthread){worker.runPthread();delete worker.runPthread}}else if(cmd==="print"){out("Thread "+d["threadId"]+": "+d["text"])}else if(cmd==="printErr"){err("Thread "+d["threadId"]+": "+d["text"])}else if(cmd==="alert"){alert("Thread "+d["threadId"]+": "+d["text"])}else if(d.target==="setimmediate"){worker.postMessage(d)}else if(cmd==="onAbort"){if(Module["onAbort"]){Module["onAbort"](d["arg"])}}else if(cmd){err("worker sent an unknown command "+cmd)}PThread.currentProxiedOperationCallerThread=undefined};worker.onerror=e=>{var message="worker sent an error!";err(message+" "+e.filename+":"+e.lineno+": "+e.message);throw e};if(ENVIRONMENT_IS_NODE){worker.on("message",function(data){worker.onmessage({data:data})});worker.on("error",function(e){worker.onerror(e)});worker.on("detachedExit",function(){})}worker.postMessage({"cmd":"load","urlOrBlob":Module["mainScriptUrlOrBlob"]||_scriptDir,"wasmMemory":wasmMemory,"wasmModule":wasmModule})},allocateUnusedWorker:function(){var pthreadMainJs=locateFile("jxl_decoder.worker.js");PThread.unusedWorkers.push(new Worker(pthreadMainJs))},getNewWorker:function(){if(PThread.unusedWorkers.length==0){PThread.allocateUnusedWorker();PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0])}return PThread.unusedWorkers.pop()}};Module["PThread"]=PThread;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function establishStackSpace(){var pthread_ptr=_pthread_self();var stackTop=HEAP32[pthread_ptr+44>>2];var stackSize=HEAP32[pthread_ptr+48>>2];var stackMax=stackTop-stackSize;_emscripten_stack_set_limits(stackTop,stackMax);stackRestore(stackTop)}Module["establishStackSpace"]=establishStackSpace;function exitOnMainThread(returnCode){if(ENVIRONMENT_IS_PTHREAD)return _emscripten_proxy_to_main_thread_js(2,0,returnCode);try{_exit(returnCode)}catch(e){handleException(e)}}var wasmTableMirror=[];function getWasmTableEntry(funcPtr){var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func}function invokeEntryPoint(ptr,arg){var result=getWasmTableEntry(ptr)(arg);if(keepRuntimeAlive()){PThread.setExitStatus(result)}else{__emscripten_thread_exit(result)}}Module["invokeEntryPoint"]=invokeEntryPoint;function registerTLSInit(tlsInitFunc){PThread.tlsInitFunctions.push(tlsInitFunc)}function ___cxa_allocate_exception(size){return _malloc(size+24)+24}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24;this.set_type=function(type){HEAPU32[this.ptr+4>>2]=type};this.get_type=function(){return HEAPU32[this.ptr+4>>2]};this.set_destructor=function(destructor){HEAPU32[this.ptr+8>>2]=destructor};this.get_destructor=function(){return HEAPU32[this.ptr+8>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr>>2]=refcount};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+12>>0]=caught};this.get_caught=function(){return HEAP8[this.ptr+12>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13>>0]=rethrown};this.get_rethrown=function(){return HEAP8[this.ptr+13>>0]!=0};this.init=function(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false)};this.add_ref=function(){Atomics.add(HEAP32,this.ptr+0>>2,1)};this.release_ref=function(){var prev=Atomics.sub(HEAP32,this.ptr+0>>2,1);return prev===1};this.set_adjusted_ptr=function(adjustedPtr){HEAPU32[this.ptr+16>>2]=adjustedPtr};this.get_adjusted_ptr=function(){return HEAPU32[this.ptr+16>>2]};this.get_exception_ptr=function(){var isPointer=___cxa_is_pointer_type(this.get_type());if(isPointer){return HEAPU32[this.excPtr>>2]}var adjusted=this.get_adjusted_ptr();if(adjusted!==0)return adjusted;return this.excPtr}}var exceptionLast=0;var uncaughtExceptionCount=0;function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw ptr}function ___emscripten_init_main_thread_js(tb){__emscripten_thread_init(tb,!ENVIRONMENT_IS_WORKER,1,!ENVIRONMENT_IS_WEB);PThread.threadInitTLS()}function ___emscripten_thread_cleanup(thread){if(!ENVIRONMENT_IS_PTHREAD)cleanupThread(thread);else postMessage({"cmd":"cleanupThread","thread":thread})}function pthreadCreateProxied(pthread_ptr,attr,startRoutine,arg){if(ENVIRONMENT_IS_PTHREAD)return _emscripten_proxy_to_main_thread_js(3,1,pthread_ptr,attr,startRoutine,arg);return ___pthread_create_js(pthread_ptr,attr,startRoutine,arg)}function ___pthread_create_js(pthread_ptr,attr,startRoutine,arg){if(typeof SharedArrayBuffer=="undefined"){err("Current environment does not support SharedArrayBuffer, pthreads are not available!");return 6}var transferList=[];var error=0;if(ENVIRONMENT_IS_PTHREAD&&(transferList.length===0||error)){return pthreadCreateProxied(pthread_ptr,attr,startRoutine,arg)}if(error)return error;var threadParams={startRoutine:startRoutine,pthread_ptr:pthread_ptr,arg:arg,transferList:transferList};if(ENVIRONMENT_IS_PTHREAD){threadParams.cmd="spawnThread";postMessage(threadParams,transferList);return 0}return spawnThread(threadParams)}function __emscripten_default_pthread_stack_size(){return 2097152}var nowIsMonotonic=true;function __emscripten_get_now_is_monotonic(){return nowIsMonotonic}function executeNotifiedProxyingQueue(queue){Atomics.store(HEAP32,queue>>2,1);if(_pthread_self()){__emscripten_proxy_execute_task_queue(queue)}Atomics.compareExchange(HEAP32,queue>>2,1,0)}Module["executeNotifiedProxyingQueue"]=executeNotifiedProxyingQueue;function __emscripten_notify_task_queue(targetThreadId,currThreadId,mainThreadId,queue){if(targetThreadId==currThreadId){setTimeout(()=>executeNotifiedProxyingQueue(queue))}else if(ENVIRONMENT_IS_PTHREAD){postMessage({"targetThread":targetThreadId,"cmd":"processProxyingQueue","queue":queue})}else{var worker=PThread.pthreads[targetThreadId];if(!worker){return}worker.postMessage({"cmd":"processProxyingQueue","queue":queue})}return 1}function __emscripten_set_offscreencanvas_size(target,width,height){return-1}function _abort(){abort("")}function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;if(ENVIRONMENT_IS_NODE)text="warning: "+text;err(text)}}function _emscripten_check_blocking_allowed(){if(ENVIRONMENT_IS_NODE)return;if(ENVIRONMENT_IS_WORKER)return;warnOnce("Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread")}function _emscripten_date_now(){return Date.now()}var _emscripten_get_now;if(ENVIRONMENT_IS_NODE){_emscripten_get_now=()=>{var t=process["hrtime"]();return t[0]*1e3+t[1]/1e6}}else if(ENVIRONMENT_IS_PTHREAD){_emscripten_get_now=()=>performance.now()-Module["__performance_now_clock_drift"]}else _emscripten_get_now=()=>performance.now();function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function withStackSave(f){var stack=stackSave();var ret=f();stackRestore(stack);return ret}function _emscripten_proxy_to_main_thread_js(index,sync){var numCallArgs=arguments.length-2;var outerArgs=arguments;return withStackSave(()=>{var serializedNumCallArgs=numCallArgs;var args=stackAlloc(serializedNumCallArgs*8);var b=args>>3;for(var i=0;i<numCallArgs;i++){var arg=outerArgs[2+i];HEAPF64[b+i]=arg}return _emscripten_run_in_main_runtime_thread_js(index,serializedNumCallArgs,args,sync)})}var _emscripten_receive_on_main_thread_js_callArgs=[];function _emscripten_receive_on_main_thread_js(index,numCallArgs,args){_emscripten_receive_on_main_thread_js_callArgs.length=numCallArgs;var b=args>>3;for(var i=0;i<numCallArgs;i++){_emscripten_receive_on_main_thread_js_callArgs[i]=HEAPF64[b+i]}var isEmAsmConst=index<0;var func=!isEmAsmConst?proxiedFunctionTable[index]:ASM_CONSTS[-index-1];return func.apply(null,_emscripten_receive_on_main_thread_js_callArgs)}function abortOnCannotGrowMemory(requestedSize){abort("OOM")}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;abortOnCannotGrowMemory(requestedSize)}function _emscripten_unwind_to_js_event_loop(){throw"unwind"}function _fd_close(fd){if(ENVIRONMENT_IS_PTHREAD)return _emscripten_proxy_to_main_thread_js(4,1,fd);return 52}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){if(ENVIRONMENT_IS_PTHREAD)return _emscripten_proxy_to_main_thread_js(5,1,fd,offset_low,offset_high,whence,newOffset);return 70}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}function _fd_write(fd,iov,iovcnt,pnum){if(ENVIRONMENT_IS_PTHREAD)return _emscripten_proxy_to_main_thread_js(6,1,fd,iov,iovcnt,pnum);var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}PThread.init();var proxiedFunctionTable=[null,_proc_exit,exitOnMainThread,pthreadCreateProxied,_fd_close,_fd_seek,_fd_write];var asmLibraryArg={"__cxa_allocate_exception":___cxa_allocate_exception,"__cxa_throw":___cxa_throw,"__emscripten_init_main_thread_js":___emscripten_init_main_thread_js,"__emscripten_thread_cleanup":___emscripten_thread_cleanup,"__pthread_create_js":___pthread_create_js,"_emscripten_default_pthread_stack_size":__emscripten_default_pthread_stack_size,"_emscripten_get_now_is_monotonic":__emscripten_get_now_is_monotonic,"_emscripten_notify_task_queue":__emscripten_notify_task_queue,"_emscripten_set_offscreencanvas_size":__emscripten_set_offscreencanvas_size,"abort":_abort,"emscripten_check_blocking_allowed":_emscripten_check_blocking_allowed,"emscripten_date_now":_emscripten_date_now,"emscripten_get_now":_emscripten_get_now,"emscripten_memcpy_big":_emscripten_memcpy_big,"emscripten_receive_on_main_thread_js":_emscripten_receive_on_main_thread_js,"emscripten_resize_heap":_emscripten_resize_heap,"emscripten_unwind_to_js_event_loop":_emscripten_unwind_to_js_event_loop,"exit":_exit,"fd_close":_fd_close,"fd_seek":_fd_seek,"fd_write":_fd_write,"memory":wasmMemory||Module["wasmMemory"]};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["__wasm_call_ctors"]).apply(null,arguments)};var _jxlCreateInstance=Module["_jxlCreateInstance"]=function(){return(_jxlCreateInstance=Module["_jxlCreateInstance"]=Module["asm"]["jxlCreateInstance"]).apply(null,arguments)};var _jxlDestroyInstance=Module["_jxlDestroyInstance"]=function(){return(_jxlDestroyInstance=Module["_jxlDestroyInstance"]=Module["asm"]["jxlDestroyInstance"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["free"]).apply(null,arguments)};var _jxlProcessInput=Module["_jxlProcessInput"]=function(){return(_jxlProcessInput=Module["_jxlProcessInput"]=Module["asm"]["jxlProcessInput"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["malloc"]).apply(null,arguments)};var _jxlFlush=Module["_jxlFlush"]=function(){return(_jxlFlush=Module["_jxlFlush"]=Module["asm"]["jxlFlush"]).apply(null,arguments)};var __emscripten_tls_init=Module["__emscripten_tls_init"]=function(){return(__emscripten_tls_init=Module["__emscripten_tls_init"]=Module["asm"]["_emscripten_tls_init"]).apply(null,arguments)};var _pthread_self=Module["_pthread_self"]=function(){return(_pthread_self=Module["_pthread_self"]=Module["asm"]["pthread_self"]).apply(null,arguments)};var ___errno_location=Module["___errno_location"]=function(){return(___errno_location=Module["___errno_location"]=Module["asm"]["__errno_location"]).apply(null,arguments)};var __emscripten_thread_init=Module["__emscripten_thread_init"]=function(){return(__emscripten_thread_init=Module["__emscripten_thread_init"]=Module["asm"]["_emscripten_thread_init"]).apply(null,arguments)};var __emscripten_thread_crashed=Module["__emscripten_thread_crashed"]=function(){return(__emscripten_thread_crashed=Module["__emscripten_thread_crashed"]=Module["asm"]["_emscripten_thread_crashed"]).apply(null,arguments)};var _emscripten_main_thread_process_queued_calls=Module["_emscripten_main_thread_process_queued_calls"]=function(){return(_emscripten_main_thread_process_queued_calls=Module["_emscripten_main_thread_process_queued_calls"]=Module["asm"]["emscripten_main_thread_process_queued_calls"]).apply(null,arguments)};var _emscripten_main_browser_thread_id=Module["_emscripten_main_browser_thread_id"]=function(){return(_emscripten_main_browser_thread_id=Module["_emscripten_main_browser_thread_id"]=Module["asm"]["emscripten_main_browser_thread_id"]).apply(null,arguments)};var _emscripten_run_in_main_runtime_thread_js=Module["_emscripten_run_in_main_runtime_thread_js"]=function(){return(_emscripten_run_in_main_runtime_thread_js=Module["_emscripten_run_in_main_runtime_thread_js"]=Module["asm"]["emscripten_run_in_main_runtime_thread_js"]).apply(null,arguments)};var _emscripten_dispatch_to_thread_=Module["_emscripten_dispatch_to_thread_"]=function(){return(_emscripten_dispatch_to_thread_=Module["_emscripten_dispatch_to_thread_"]=Module["asm"]["emscripten_dispatch_to_thread_"]).apply(null,arguments)};var __emscripten_proxy_execute_task_queue=Module["__emscripten_proxy_execute_task_queue"]=function(){return(__emscripten_proxy_execute_task_queue=Module["__emscripten_proxy_execute_task_queue"]=Module["asm"]["_emscripten_proxy_execute_task_queue"]).apply(null,arguments)};var __emscripten_thread_free_data=Module["__emscripten_thread_free_data"]=function(){return(__emscripten_thread_free_data=Module["__emscripten_thread_free_data"]=Module["asm"]["_emscripten_thread_free_data"]).apply(null,arguments)};var __emscripten_thread_exit=Module["__emscripten_thread_exit"]=function(){return(__emscripten_thread_exit=Module["__emscripten_thread_exit"]=Module["asm"]["_emscripten_thread_exit"]).apply(null,arguments)};var _setThrew=Module["_setThrew"]=function(){return(_setThrew=Module["_setThrew"]=Module["asm"]["setThrew"]).apply(null,arguments)};var _saveSetjmp=Module["_saveSetjmp"]=function(){return(_saveSetjmp=Module["_saveSetjmp"]=Module["asm"]["saveSetjmp"]).apply(null,arguments)};var _emscripten_stack_set_limits=Module["_emscripten_stack_set_limits"]=function(){return(_emscripten_stack_set_limits=Module["_emscripten_stack_set_limits"]=Module["asm"]["emscripten_stack_set_limits"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return(stackSave=Module["stackSave"]=Module["asm"]["stackSave"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return(stackRestore=Module["stackRestore"]=Module["asm"]["stackRestore"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return(stackAlloc=Module["stackAlloc"]=Module["asm"]["stackAlloc"]).apply(null,arguments)};var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=function(){return(___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=Module["asm"]["__cxa_is_pointer_type"]).apply(null,arguments)};var dynCall_iiji=Module["dynCall_iiji"]=function(){return(dynCall_iiji=Module["dynCall_iiji"]=Module["asm"]["dynCall_iiji"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return(dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["dynCall_jiji"]).apply(null,arguments)};Module["keepRuntimeAlive"]=keepRuntimeAlive;Module["wasmMemory"]=wasmMemory;Module["ExitStatus"]=ExitStatus;Module["PThread"]=PThread;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(args){args=args||arguments_;if(runDependencies>0){return}if(ENVIRONMENT_IS_PTHREAD){readyPromiseResolve(Module);initRuntime();postMessage({"cmd":"loaded"});return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();


  return JxlCodecModule.ready
}
);
})();
if (typeof exports === \'object\' && typeof module === \'object\')
  module.exports = JxlCodecModule;
else if (typeof define === \'function\' && define[\'amd\'])
  define([], function() { return JxlCodecModule; });
else if (typeof exports === \'object\')
  exports["JxlCodecModule"] = JxlCodecModule;',
    'jxl_decoder.worker.js': '"use strict";var Module={};var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require("worker_threads");var parentPort=nodeWorkerThreads.parentPort;parentPort.on("message",data=>onmessage({data:data}));var fs=require("fs");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,"utf8"))},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}var initializedJS=false;var pendingNotifiedProxyingQueues=[];function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(" ");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+"\\n");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(" ");postMessage({cmd:"alert",text:text,threadId:Module["_pthread_self"]()})}var err=threadPrintErr;self.alert=threadAlert;Module["instantiateWasm"]=(info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module["wasmModule"],info);receiveInstance(instance);Module["wasmModule"]=null;return instance.exports};self.onunhandledrejection=e=>{throw e.reason??e};self.onmessage=e=>{try{if(e.data.cmd==="load"){Module["wasmModule"]=e.data.wasmModule;Module["wasmMemory"]=e.data.wasmMemory;Module["buffer"]=Module["wasmMemory"].buffer;Module["ENVIRONMENT_IS_PTHREAD"]=true;if(typeof e.data.urlOrBlob=="string"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}JxlCodecModule(Module).then(function(instance){Module=instance})}else if(e.data.cmd==="run"){Module["__performance_now_clock_drift"]=performance.now()-e.data.time;Module["__emscripten_thread_init"](e.data.pthread_ptr,0,0,1);Module["establishStackSpace"]();Module["PThread"].receiveObjectTransfer(e.data);Module["PThread"].threadInitTLS();if(!initializedJS){pendingNotifiedProxyingQueues.forEach(queue=>{Module["executeNotifiedProxyingQueue"](queue)});pendingNotifiedProxyingQueues=[];initializedJS=true}try{Module["invokeEntryPoint"](e.data.start_routine,e.data.arg)}catch(ex){if(ex!="unwind"){if(ex instanceof Module["ExitStatus"]){if(Module["keepRuntimeAlive"]()){}else{Module["__emscripten_thread_exit"](ex.status)}}else{throw ex}}}}else if(e.data.cmd==="cancel"){if(Module["_pthread_self"]()){Module["__emscripten_thread_exit"](-1)}}else if(e.data.target==="setimmediate"){}else if(e.data.cmd==="processProxyingQueue"){if(initializedJS){Module["executeNotifiedProxyingQueue"](e.data.queue)}else{pendingNotifiedProxyingQueues.push(e.data.queue)}}else if(e.data.cmd){err("worker.js received unknown command "+e.data.cmd);err(e.data)}}catch(ex){if(Module["__emscripten_thread_crashed"]){Module["__emscripten_thread_crashed"]()}throw ex}};',
  };

  const setCopHeaders = (headers) => {
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  };

  // Inflight object: {clientId, uid, timestamp}
  // TODO: cleanup, when client is gone / too old.
  const inflight = [];

  const getUid = () => {
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
    const client = await clients.get(clientId);
    // Client is gone? Not our problem then.
    if (!client) {
      return originalResponse;
    }
    let inputStream = await originalResponse.body;

    // const uid = makeUid();
    // const now = Date.now();
    const outputStream = new ReadableStream({
      start: (controller) => {
        console.log('outputStream start');
      },
      pull: (controller) => {
        console.log('outputStream pull');
        return inputStream.pull();
      },
      cancel: (reason) => {
        console.log('outputStream cancel');
      },
      // type: "bytes",
      // autoAllocateChunkSize: 65536,
    });

    let modifiedResponseHeaders = new Headers(originalResponse.headers);
    //  modifiedResponseHeaders.set('Content-Type', 'image/png');
    return new Response(outputStream, { headers: modifiedResponseHeaders });

    // inflight.push({clientId: clientId, uid: uid, timestamp: now, response: response});
    //console.log('SW->Client(' + clientId + ') url: ' + request.url);
    //client.postMessage({op: 'decode', url: request.url});
  };

  const wrapImageRequest = async (clientId, request) => {
    let modifiedRequestHeaders = new Headers(request.headers);
    modifiedRequestHeaders.append('Accept', 'image/jxl');
    let modifiedRequest = new Request(request, {headers: modifiedRequestHeaders});
    let originalResponse = await fetch(modifiedRequest);
    let contentType = originalResponse.headers.get('Content-Type');

    return wrapImageResponse(clientId, request);

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
    self.addEventListener('install', () => { return self.skipWaiting(); });
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