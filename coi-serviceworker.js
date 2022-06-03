/*! coi-serviceworker v0.1.6 - Guido Zuidhof, licensed under MIT */
if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("message", (ev) => {
        if (ev.data && ev.data.type === "deregister") {
            self.registration
                .unregister()
                .then(() => {
                    return self.clients.matchAll();
                })
                .then(clients => {
                    clients.forEach((client) => client.navigate(client.url));
                });
        }
    });

    self.addEventListener("fetch", function (event) {
        if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
            return;
        }
        if (event.request.url.endsWith("/compressed/jxl_emcc.worker.js")) {
            const workerBody = "\"use strict\";var Module={};var ENVIRONMENT_IS_NODE=typeof process===\"object\"&&typeof process.versions===\"object\"&&typeof process.versions.node===\"string\";if(ENVIRONMENT_IS_NODE){var nodeWorkerThreads=require(\"worker_threads\");var parentPort=nodeWorkerThreads.parentPort;parentPort.on(\"message\",function(data){onmessage({data:data})});var fs=require(\"fs\");Object.assign(global,{self:global,require:require,Module:Module,location:{href:__filename},Worker:nodeWorkerThreads.Worker,importScripts:function(f){(0,eval)(fs.readFileSync(f,\"utf8\"))},postMessage:function(msg){parentPort.postMessage(msg)},performance:global.performance||{now:function(){return Date.now()}}})}function threadPrintErr(){var text=Array.prototype.slice.call(arguments).join(\" \");if(ENVIRONMENT_IS_NODE){fs.writeSync(2,text+\"\\n\");return}console.error(text)}function threadAlert(){var text=Array.prototype.slice.call(arguments).join(\" \");postMessage({cmd:\"alert\",text:text,threadId:Module[\"_pthread_self\"]()})}var err=threadPrintErr;self.alert=threadAlert;Module[\"instantiateWasm\"]=((info,receiveInstance)=>{var instance=new WebAssembly.Instance(Module[\"wasmModule\"],info);receiveInstance(instance);Module[\"wasmModule\"]=null;return instance.exports});self.onmessage=(e=>{try{if(e.data.cmd===\"load\"){Module[\"wasmModule\"]=e.data.wasmModule;Module[\"wasmMemory\"]=e.data.wasmMemory;Module[\"buffer\"]=Module[\"wasmMemory\"].buffer;Module[\"ENVIRONMENT_IS_PTHREAD\"]=true;if(typeof e.data.urlOrBlob===\"string\"){importScripts(e.data.urlOrBlob)}else{var objectUrl=URL.createObjectURL(e.data.urlOrBlob);importScripts(objectUrl);URL.revokeObjectURL(objectUrl)}JxlCodecModule(Module).then(function(instance){Module=instance})}else if(e.data.cmd===\"run\"){Module[\"__performance_now_clock_drift\"]=performance.now()-e.data.time;Module[\"__emscripten_thread_init\"](e.data.threadInfoStruct,\/*isMainBrowserThread=*\/0,\/*isMainRuntimeThread=*\/0,\/*canBlock=*\/1);Module[\"establishStackSpace\"]();Module[\"PThread\"].receiveObjectTransfer(e.data);Module[\"PThread\"].threadInit();try{var result=Module[\"invokeEntryPoint\"](e.data.start_routine,e.data.arg);if(Module[\"keepRuntimeAlive\"]()){Module[\"PThread\"].setExitStatus(result)}else{Module[\"__emscripten_thread_exit\"](result)}}catch(ex){if(ex!=\"unwind\"){if(ex instanceof Module[\"ExitStatus\"]){if(Module[\"keepRuntimeAlive\"]()){}else{Module[\"__emscripten_thread_exit\"](ex.status)}}else{throw ex}}}}else if(e.data.cmd===\"cancel\"){if(Module[\"_pthread_self\"]()){Module[\"__emscripten_thread_exit\"](-1)}}else if(e.data.target===\"setimmediate\"){}else if(e.data.cmd===\"processThreadQueue\"){if(Module[\"_pthread_self\"]()){Module[\"_emscripten_current_thread_process_queued_calls\"]()}}else if(e.data.cmd===\"processProxyingQueue\"){if(Module[\"_pthread_self\"]()){Module[\"_emscripten_proxy_execute_queue\"](e.data.queue)}}else{err(\"worker.js received unknown command \"+e.data.cmd);err(e.data)}}catch(ex){err(\"worker.js onmessage() captured an uncaught exception: \"+ex);if(ex&&ex.stack)err(ex.stack);if(Module[\"__emscripten_thread_crashed\"]){Module[\"__emscripten_thread_crashed\"]()}throw ex}});";
            const workerHeaders = new Headers();
            workerHeaders.set("Content-Type", "application/javascript");
            // TODO: refactor
            workerHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
            workerHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

            event.respondWith(new Response(workerBody, {
                status: 200,
                statusText: "OK",
                headers: workerHeaders,
            }));
            return;
        }

        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    if (response.status === 0) {
                        return response;
                    }

                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
                .catch((e) => console.error(e))
        );
    });

} else {
    (() => {
        // You can customize the behavior of this script through a global `coi` variable.
        const coi = {
            shouldRegister: () => true,
            shouldDeregister: () => false,
            doReload: () => window.location.reload(),
            quiet: false,
            ...window.coi
        }

        const n = navigator;
        if (coi.shouldDeregister() && n.serviceWorker && n.serviceWorker.controller) {
            n.serviceWorker.controller.postMessage({ type: "deregister" });
        }

        // If we're already coi: do nothing. Perhaps it's due to this script doing its job, or COOP/COEP are
        // already set from the origin server. Also if the browser has no notion of crossOriginIsolated, just give up here.
        if (window.crossOriginIsolated !== false || !coi.shouldRegister()) return;

        if (!window.isSecureContext) {
            !coi.quiet && console.log("COOP/COEP Service Worker not registered, a secure context is required.");
            return;
        }

        // In some environments (e.g. Chrome incognito mode) this won't be available
        if (n.serviceWorker) {
            n.serviceWorker.register(window.document.currentScript.src).then(
                (registration) => {
                    !coi.quiet && console.log("COOP/COEP Service Worker registered", registration.scope);

                    registration.addEventListener("updatefound", () => {
                        !coi.quiet && console.log("Reloading page to make use of updated COOP/COEP Service Worker.");
                        coi.doReload()
                    });

                    // If the registration is active, but it's not controlling the page
                    if (registration.active && !n.serviceWorker.controller) {
                        !coi.quiet && console.log("Reloading page to make use of COOP/COEP Service Worker.");
                        coi.doReload()
                    }
                },
                (err) => {
                    !coi.quiet && console.error("COOP/COEP Service Worker failed to register:", err);
                }
            );
        }
    })();
}
