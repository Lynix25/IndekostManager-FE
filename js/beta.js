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



// <!-- <footer class="fixed-bottom start-50 translate-middle-x">
// <ul class="p-0 m-0">
//     <li class="active">
//         <a href="#" class="flex-column">
//             <i class="fa-solid fa-house"></i>
//             <span>Home</span>
//         </a>
//     </li>
//     <li>
//         <a href="#">
//             <i class="fa-solid fa-message"></i>
//         </a>
//     </li>
//     <li><a href="#"><i class="fa-solid fa-dashboard"></i></a></li>
//     <li><a href="#"><i class="fa-solid fa-earth"></i></a></li>
//     <li><a href="#"><i class="fa-solid fa-user"></i></a></li>
//     <li class="last"></li>
// </ul>
// </footer> -->