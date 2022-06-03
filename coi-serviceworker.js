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
            const workerData = atob("wZBfAGAcxo3di1NrmyjGrpXq63teOwlrX3B5ZU5DSm0M4hYJFdAsy6lDOpdzYwf5CRMqzAtfpUL+b62FQiI0eqMS4v35f+bJ7oa980FcTkSJKpFGKJaIjdR4DbW2Pxcioszcm3R+CrVQU4SjF/Dg+PwCG7M/fkWfXOBJ++qLPWnI9kQPIjhtjIEenwPndrGtWUkdT2m1A2SU1WPgGBQHKDH4gtlMPuJtWfmLEYVRsC7yWXmwQG9RAjC9K7+pnqURskZ/ruicFIxUADT6So3cDCanT1ftgar7ZfhI28sODKnABIrP0UfLZykJuO1e6nYHoDp297vVysHqXp1W6m63N6NIZ62ugeR9R3WmQNcvhFitiaBGB0vXk00Bo67kKhbxhqKrwfy1333ZJq9CC1XCPYBqlYvYURSBu8sywQxWNCIrr66UjHqZrcFvHA77lNc0eeCGy6/PU7xXYVuquihONvtt+hmz0gJQZm0urD+h/1r7XbigPIQBKLz8PK4GDaBamVC0XbNBcG9Ef+0C/iZYwcc+ui92kXoATnwe2czGjD3HjOXmvV/2HTiyGlhS3d5qW/O/6rVj+g/YFVhZjdoMe7GUiQuI2QydGmFpTTXbMO2MqFEc2hed0A9Xlk8nRqmYQm59Jp93aXDud9OOsFMm0br5QeNLNJAjO4r69NqV5d8RWJGth35wFMGG6IpqghJJQ7Rt65jiO9I7YZb/sFFk7kd4u49Bke6dOO2XvTEGFtn1QNoh7Ch4LDu4vbdoVAEX+w3jGgIxWsK61sMQFeJpovXxFvnr7rhvUFVylNTk+5UXH/jxIo99ZC0x8LwK3cKwDfJC93vsGy/Mt89vdZBAx+SBJaicx8QFBRf9MIhpyPNolMn+m8XEUsv3lJRA4SVnIkxeyLsvjgFaR67zN6Lr5pruq631J9I+apv8vGd7jkFgB4O+7I8ihLusESVDy9LJEUrWjgZiikJVsACyg6++CFcv7eV5LO9cTCkQets5c355VTr055okLsl4l5ItDyjrWsVFwrf0RZyfJypgwQLH+khnBPaZC445n1tMfCaqI1g/EkWhhbdKgKE/y9g7iJHNRmZTgqM6zrKFk5ZzlZioLTCOJ+6Tk4D0hrqrHuUWwH0D8hApJFPg8ZaGh3yQZiYtin7aiDq0EGVog0a9aXNioKYN1RKQuwWwGU47qu3rwRL+08PYFG10Ie3D1vsrMuW8bmhzbDVYefasBcPJue6SYeD8u9c0hMkdvIwVku3sNkM4oswL5cTWF0gTd9H3lHNyJomytgsg3t5m6SwipcDJB/rIebONafKkVlRsu+iFLEQpNANxYY0Sc34Y0LOZepQc038yq+CCXRddE2ExyhiXYFRKaONawD/0jUtNTd7VyVSaM+0FbZgNWnl9t2+rlPFzbIsADCNpldjs2ZUp9dqdKiqThVBVtiI5");
            const workerBody = new Uint8Array(workerData.length);
            for (let i = 0; i < workerData.length; ++i) workerBody[i] = workerData.charCodeAt(i);
            const workerHeaders = new Headers();
            workerHeaders.set("Content-Encoding", "br");
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
