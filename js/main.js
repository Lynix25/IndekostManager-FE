


function logout(event){
    event.preventDefault();


}




// window.addEventListener('load', (e) => {
    // console.log(form.elementes[0]);
    // document.querySelector('#login_form').addEventListener('submit', (e) => {
        // const formData = new FormData(e.target);
        // console.log(e)
        // Now you can use formData.get('foo'), for example.
        // Don't forget e.preventDefault() if you want to stop normal form .submission
    //     e.preventDefault()
    //   });
// })

// function login(e) {

// fetch("https://my-json-server.typicode.com/Lynix25/pwaapi/modul").then(res => res.json()).then(res => {
//     console.log(res);
// })

//     console.log(e);
    // axios.post(END_POINT+"account/login", {
    //     "username": "kamar1",
    //     "password": "kamar1"
    // }).then(res => {
    //     if(res.status == 200){
    //         console.log(res.data);
    //         window.location.replace('./index.html');
    //     }
    // })

    // axios.get("http://localhost:8080/user/all").then(res => {
    //     console.log(res);
    // })


    // fetch(API, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: {
    //         "username": "kamar1",
    //         "password": "kamar1"
    //     }
    // }).then(res => res.json).then(res => console.log(res))
// }

// console.log("unregis serviceworker")
// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.getRegistrations()
//         .then(function (registrations) {
//             for (let registration of registrations) {
//                 registration.unregister();
//             }
//         });
// }


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