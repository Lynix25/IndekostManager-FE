let CACHE_NAME = "indkost-cache-v1";
let urlsToCache = [];

self.addEventListener('install', event => {
    console.log('Service worker install triggered')
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
    console.log('Service worker activate triggered')
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.filter(cacheName => {
                return cacheName != CACHE_NAME;
            }).map(cacheName => {
                console.log(cacheName + " cache deleted")
                return caches.delete(cacheName);
            }))
        })
    )
})

self.addEventListener("fetch", event => {
    console.log("Service worker fetch triggered")

    event.respondWith(
        caches.match(event.request).then(response => {
            return fetch(event.request).then(res => {
                console.log(`Get ${event.request.url} from Network`)
                return res;
            }).catch(err => {
                if (response) {
                    console.log(`Get ${event.request.url} from Cache`)
                    return response
                } else {
                    console.log(`Fail to fetch ${event.request.url}`);
                }
            });
        })
    )
})

self.addEventListener('push', function (event) {
    console.log("Service worker recive push triggered");
    console.log(event);
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var response = {};
    if (event.data) response = event.data.json();

    console.log(response);
    response.icon = "asset/image/Logo.png";
    response.badge = "asset/image/Logo.png";

    self.clickTarget = response.redirect;
    // {
    //     body: message,
    //     icon: icon,
    //     badge: icon,
    //      data : {hello : "world"}
    // }
    event.waitUntil(self.registration.showNotification(response.title, response));
});

self.addEventListener('notificationclick', function (event) {
    console.log('Service Worker Notification click Received.');

    event.notification.close();

    if (clients.openWindow) {
        event.waitUntil(clients.openWindow(self.clickTarget));
    }
});