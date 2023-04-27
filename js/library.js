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

let mainJs = document.createElement("script");
mainJs.setAttribute("type", "module");
mainJs.setAttribute("src", "js/main.js");
document.head.appendChild(mainJs);

// let toastJs = document.createElement("script");
// toastJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js");
// document.head.appendChild(toastJs);

/* Get Role
    [0]: tokens
    [1]: indekossecret{userId}
    [2]: id
    [3]: {userId}
    [4]: role
    [5]: {userRoleName}
*/

let splittedCookies = ((document.cookie).split(/[\;\=]+/));
let role = ((document.cookie).split(/[\;\=]+/))[splittedCookies.length-1];

// NavBar Component
let currentPath = window.location.pathname;
if (currentPath !== "/login.html" && currentPath !== "/forgotpassword.html")
    document.addEventListener('DOMContentLoaded', e => {
        let navBar = document.createElement("nav");
        navBar.classList.add("navbar", "navbar-expand-lg", "sticky-top");

        // Menus Only For Admin
        let menu = "";
        if(role.toLowerCase() === "owner" || role.toLowerCase() === "admin") {
            menu = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Kelola Pengumuman 
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="/announcementmenu.html">Lihat Daftar Pengumuman</a></li>
                    <li><a class="dropdown-item" href="/createannouncement.html">Buat Pengumuman</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Kelola Kamar 
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="/roomlist.html">Lihat Daftar Kamar</a></li>
                    <li><a class="dropdown-item" href="/createroom.html">Tambah Data Kamar</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/service.html" role="button">
                    Kelola Layanan Kos 
                </a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Kelola Penyewa 
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="/listuser.html">Lihat Daftar Penyewa</a></li>
                    <li><a class="dropdown-item" href="/registeruser.html">Tambah Data Penyewa</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#!" role="button">
                    Kelola Transaksi
                </a>
            </li>`
        } else {
            menu = `
                <li class="nav-item">
                    <a class="nav-link" href="/servicerequest.html">Pengajuan Layanan</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/requesthistory.html">Histori Pengajuan Layanan</a>
                </li>
            `;
        }

        navBar.innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="./home.html">
                <img src="./asset/image/Logo.png" alt="In D'Kos" style="width: 10vmax">
            </a>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link fw-bolder" aria-current="page" href="/home.html">Home</a>
                    </li>
                    ${menu}
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-circle-user fs-4"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="/profile.html">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            <a class="dropdown-item" href="/notification.html">
                                <i class="fas fa-bell fa-sm fa-fw mr-2"></i>
                                Notifications
                            </a>
                            <a class="dropdown-item" href="/settings.html">
                                <i class="fad fa-cogs fa-sm fa-fw mr-2"></i>
                                Settings
                            </a>
                            <hr class="dropdown-divider">
                            <a type="button" class="dropdown-item" onclick="logout()">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>`;
        document.body.insertBefore(navBar, document.body.firstChild);
    })

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

{/* <script src="https://kit-pro.fontawesome.com/releases/v5.10.1/js/pro.min.js" data-auto-fetch-svg></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker3.min.css" /> */}