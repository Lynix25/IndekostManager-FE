let CACHE_NAME = "indkost-cache-v1";
let urlsToCache = [];
let DEBUG_MODE = false;
let OFFILINE_PAGE = "/offline.html"

function debug(...data) {
    if (DEBUG_MODE) console.log(...data);
}

self.addEventListener('install', event => {
    debug('Service worker install triggered');

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            debug(`Install serviceworker ${CACHE_NAME}, Opened cache and files cache in url ` + urlsToCache);
            return cache.addAll(urlsToCache);
        }).catch(err => {
            debug("install error", err)
        })
    )
})

self.addEventListener('activate', event => {
    debug('Service worker activate triggered')

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.filter(cacheName => {
                return cacheName != CACHE_NAME;
            }).map(cacheName => {
                debug(cacheName + " cache deleted")
                return caches.delete(cacheName);
            }))
        })
    )
})

self.addEventListener("fetch", event => {
    debug("Service worker fetch triggered")

    let request = event.request;
    let url = new URL(request.url);

    event.respondWith(
        caches.match(request).then(response =>
            fetch(request).then(res => {
                debug(`Get ${url} from Network`)
                return res;
            }).catch(err => {
                if (response) {
                    debug(`Get ${url} from Cache`)
                    return response
                } else {
                    debug(`Fail to fetch ${url}`);
                    if (url.toString().includes(".html")) {
                        // const cache = await caches.open(CACHE_NAME);
                        // const cachedResponse = await cache.match(OFFILINE_PAGE);
                        // return cachedResponse;
                        return caches.open(CACHE_NAME).then(cache =>
                            cache.match(OFFILINE_PAGE).then(offlinePage => offlinePage)
                        )
                    }
                }
            })
        )
    )
})

self.addEventListener('push', function (event) {
    debug("Service worker recive push triggered");
    debug(event);

    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var response = {};
    if (event.data) response = event.data.json();

    debug(response);
    response.icon = "asset/image/Logo-simple.png";
    response.badge = "asset/image/Logo-simple.png";

    self.clickTarget = response.redirect;

    event.waitUntil(self.registration.showNotification(response.title, response));
});

self.addEventListener('notificationclick', function (event) {
    debug('Service Worker Notification click Received.');

    event.notification.close();

    if (clients.openWindow) {
        event.waitUntil(clients.openWindow(self.clickTarget));
    }
});