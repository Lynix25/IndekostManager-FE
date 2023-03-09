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

let jQueryJs = document.createElement("script");
jQueryJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js")
document.head.appendChild(jQueryJs);

let mainJs = document.createElement("script");
// mainJs.setAttribute("type", "module");
mainJs.setAttribute("src", "js/main.js");
document.head.appendChild(mainJs);

// DEV NavBar Component
let currentPath = window.location.pathname;
if (currentPath !== `/login.html` && currentPath !== `/forgotpassword.html`)
document.addEventListener('DOMContentLoaded', e => {
    let navBar = document.createElement("nav");
    navBar.classList.add("navbar", "navbar-expand-lg", "sticky-top");
    // nav class="navbar navbar-expand-lg sticky-top"
    navBar.innerHTML = `<div class="container-fluid">
<a class="navbar-brand" href="#">
    <img src="./asset/image/Logo.png" alt="In D'Kos" height="24">
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
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Admin
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="/agenda.html">Agenda</a></li>
                <li><a class="dropdown-item" href="/createroom.html">Add Room</a></li>
                <li><a class="dropdown-item" href="/roomlist.html">Room List</a></li>
                <li><a class="dropdown-item" href="/service.html">Add Service</a></li>
                <li><a class="dropdown-item" href="/registeruser.html">Register User</a></li>
                <li><a class="dropdown-item" href="/listuser.html">List User</a></li>
                <li><a class="dropdown-item" href="#">History</a></li>
            </ul>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Tenant
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="/servicerequest.html">Request Service</a></li>
            <li><a class="dropdown-item" href="/requesthistory.html">Request Service History</a></li>
        </ul>
    </li>
        <li class="nav-item dropdown">
            <a class="nav-link" href="#" data-bs-toggle="dropdown">
                <i class="fa-solid fa-circle-user fs-4"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="/profile.html">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                </a>
                <span>
                    <a class="dropdown-item" href="/notification.html">
                        <i class="fas fa-bell fa-sm fa-fw mr-2"></i>
                        Notifications
                    </a>
                </span>
                <hr class="dropdown-divider">
                <a type="button" class="dropdown-item">
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

{/* <script src="https://kit-pro.fontawesome.com/releases/v5.10.1/js/pro.min.js" data-auto-fetch-svg></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker3.min.css" /> */}