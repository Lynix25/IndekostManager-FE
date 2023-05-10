import { APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, Event, PAGE, SERVICE_WORKER, ServiceURL } from "./config.js";
import { deleteCookie, getCookie } from "./cookiemanagement.js";
import { goTo } from "./utils.js";

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href.includes(`${activePage}`)) {
        link.classList.add('active');
    }
})


export function logout() {
    APIPut(ServiceURL.User.logout(getCookie('id'))).then(res => {
        let deletedCache = res.data.data.deletedCache;
        deleteCookie(...deletedCache);
        Toast(Constant.httpStatus.SUCCESS, res.data.message);
        setTimeout(() => goTo(PAGE.LOGIN), Event.timeout);
    }).catch(err => {
        if (err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
        else Toast(Constant.httpStatus.ERROR, err.data.message);
    })
}

export function logoutWithoutToast() {
    APIPut(ServiceURL.User.logout(getCookie('id'))).then(res => {
        let deletedCache = res.data.data.deletedCache;
        deleteCookie(...deletedCache);
    }).catch(err => {
        if (err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
        else Toast(Constant.httpStatus.ERROR, err.data.message);
    });
}

registerServiceWorker()

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(SERVICE_WORKER).then(registration => {
            console.log("Service worker registration successful with scope : ", registration.scope);
            if (registration.installing) {
                console.log('Service worker installing');
            } else if (registration.waiting) {
                console.log('Service worker installed');
            } else if (registration.active) {
                console.log('Service worker active');
            }
        }).catch(err => {
            console.log("Service worker registration failed: ", err);
        });
    } else {
        console.log('Service workers aren\'t supported in this browser.');
    }
}

// Notification.requestPermission().then(result => {
//     if (result === "granted") {
//         console.log("granted");
//         navigator.serviceWorker.ready.then((registration) => {
//             console.log('gift user notif')
//             registration.showNotification("Hello World!!", { body: "This body hello world!!" });
            //   registration.showNotification("Vibration Sample", {
            //     body: "Buzz! Buzz!",
            //     icon: "../images/touch/chrome-touch-icon-192x192.png",
            //     vibrate: [200, 100, 200, 100, 200, 100, 200],
            //     tag: "vibration-sample",
            //   });
//         });
//     }
// })