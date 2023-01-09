let CACHE_NAME = "my-site-cache-v1"
let urlsToCache = [
    "/",
    "/login.html",
    "/js/main.js",
    "/asset/home_image.jpeg"
]

self.addEventListener('install', event => {
    console.log('Install triggered')
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log(`Install serviceworker ${CACHE_NAME}, Opened cache and files cache in url ` + urlsToCache);
            return cache.addAll(urlsToCache);
        }).catch(err => {
            console.log("install error", err)
        })
    )
})

self.addEventListener('activate', event => {
    console.log('Activate triggered')
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.filter(cacheName => {
                return cacheName != CACHE_NAME;
            }).map(cacheName => {
                console.log(cacheName + " cahce deleted")
                return caches.delete(cacheName);
            }))
        })
    )
})

self.addEventListener("fetch", event => {
    console.log("Fetch triggered")
    let request = event.request
    let url = new URL(request.url)

    console.log(location.origin, url.href)
    if (url.origin === location.origin) {
        event.waitUntil(
            console.log(caches, "caches in fetch")
        )
        event.respondWith(
            caches.match(request).then(response => {
                return response || fetch(request);
            })
        )
    }
    // else {
    //     event.respondWith(
    //         caches.open('new-cache').then(cache => {
    //             return fetch(request).then(liveResponse => {
    //                 cache.put(request, liveResponse.clone())
    //                 return liveResponse;
    //             })
    //         })
    //     )
    // }

    // event.respondWith(
    //     caches.match(event.request).then(response => {
    //         if (response) {
    //             // console.log(event.request)
    //             // console.log("Get event request above from Cache")
    //             return response
    //         }
    //         // console.log(event.request)
    //         // console.log("Get event request above from Network")
    //         return fetch(event.request);
    //     })
    // )
})