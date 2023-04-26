// Route JS
let routeJs = document.createElement("script");
routeJs.setAttribute("src", "js/routes.js");
routeJs.setAttribute("type", "module");
document.head.appendChild(routeJs);

// General CSS
let fontAwesomeV6 = document.createElement("link");
fontAwesomeV6.setAttribute("rel", "stylesheet");
fontAwesomeV6.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css");
document.head.appendChild(fontAwesomeV6);

let bootstrapCss = document.createElement("link");
bootstrapCss.setAttribute("rel", "stylesheet");
bootstrapCss.setAttribute("href", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
document.head.appendChild(bootstrapCss);

let styleCSS = document.createElement("link");
styleCSS.setAttribute("rel", "stylesheet");
styleCSS.setAttribute("href", "css/style.css");
document.head.appendChild(styleCSS);

let toastCss = document.createElement("link");
toastCss.setAttribute("rel", "stylesheet");
toastCss.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css");
document.head.appendChild(toastCss);

// General JS
let bootstrapJs = document.createElement("script");
bootstrapJs.setAttribute("src", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js");
document.head.appendChild(bootstrapJs);

let fontAwesomeV5Premium = document.createElement("script");
fontAwesomeV5Premium.setAttribute("src", "https://kit-pro.fontawesome.com/releases/v5.10.1/js/pro.min.js");
fontAwesomeV5Premium.setAttribute("data-auto-fetch-svg", "");
document.head.appendChild(fontAwesomeV5Premium);

let axiosJs = document.createElement("script");
axiosJs.setAttribute("src", "https://cdn.jsdelivr.net/npm/axios@1.2.0/dist/axios.min.js")
document.head.appendChild(axiosJs);

// let jQueryJs = document.createElement("script");
// jQueryJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js")
// document.head.appendChild(jQueryJs);

let navbarJs = document.createElement("script");
navbarJs.setAttribute("defer","");
navbarJs.setAttribute("type", "module");
navbarJs.setAttribute("src", "js/component/navbar.js");
document.head.appendChild(navbarJs);

let mainJs = document.createElement("script");
mainJs.setAttribute("type", "module");
mainJs.setAttribute("src", "js/main.js");
document.head.appendChild(mainJs);

// Perlu disempurnakan lagi:
// 1. harusnya ada panggil endpoint logout
// 2. gimana caranya biar bisa import dari yang sudah ada
function logout() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const cookieName = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        // "onCloseClick": function() { console.log('close button clicked'); },
        "showDuration": "300",
        "hideDuration": "10",
        "timeOut": "2000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
        "rtl": false
      }
    toastr.success("Berhasil logout", "SUCCESS");
    setTimeout(function() {
        window.location.href = "/login.html";
    }, 1500);
}