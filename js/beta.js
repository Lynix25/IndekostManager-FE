function getNotificationPermission() {
    Notification.requestPermission().then(result => result);
}

function notify(title, body) {
    if("serviceWorker" in navigator){
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, body);
        });
    }
}