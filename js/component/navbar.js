import { logout } from "../main.js";
import { addCustomEventListener, createElementFromString, getCurrentPath, getElementUntilElementAvailable, isMobileDevice, isOwnerOrAdmin } from "../utils.js";

const noNavbarPage = ["login", "forgotpassword", "initialdata"].map(item => `/${item}.html`);

let currentPath = getCurrentPath();
if (!noNavbarPage.includes(currentPath)) {
    const adminMenu = `
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
        </li>`;

    const tenantMenu = `
        <li class="nav-item">
            <a class="nav-link" href="/servicerequest.html">Pengajuan Layanan</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/requesthistory.html">Histori Pengajuan Layanan</a>
        </li>
        `;

    const navBar = !isMobileDevice() ? `
        <nav class="navbar navbar-expand-lg sticky-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="./home.html">
                    <img src="./asset/image/Logo.png" alt="In D'Kos" height="28em">
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
                        ${isOwnerOrAdmin() ? adminMenu : tenantMenu}
                        <li class="nav-item dropdown">
                            <a class="nav-link" href="#" data-bs-toggle="dropdown">
                                <i class="fa-solid fa-circle-user fs-4"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="/profile.html">
                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profil
                                </a>
                                <a class="dropdown-item" href="/notification.html">
                                    <i class="fas fa-bell fa-sm fa-fw mr-2"></i>
                                    Notifikasi
                                </a>
                                <a class="dropdown-item" href="/settings.html">
                                    <i class="fad fa-cogs fa-sm fa-fw mr-2"></i>
                                    Pengaturan
                                </a>
                                <hr class="dropdown-divider">
                                <a type="logout" class="dropdown-item">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2"></i>
                                    Keluar
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>` :
        `<nav class="row card fixed-bottom rounded border-0 mt-4">
            <a href="./announcementmenu.html" class="menu hover-text">
                <span class="tooltip-text tooltip-top">Kelola Pengumuman</span>
                <i class="fa-solid fa-newspaper"></i>
            </a>
            <a href="./roomlist.html" class="menu hover-text">
                <span class="tooltip-text tooltip-top">Kelola Kamar</span>
                <i class="fa-solid fa-door-open"></i>
            </a>
            <a href="./service.html" class="menu hover-text">
                <span class="tooltip-text tooltip-top">Kelola Layanan Kos</span>
                <i class="fa-solid fa-tasks"></i>
            </a>
            <a href="./listuser.html" class="menu hover-text">
                <span class="tooltip-text tooltip-top">Kelola Penyewa</span>
                <i class="fa-solid fa-users"></i>
            </a>
            <a href="#!" class="menu hover-text">
                <span class="tooltip-text tooltip-top">Kelola Transaksi</span>
                <i class="fa-solid fa-money-bill-transfer"></i>
            </a>
        </nav>`
    
    let body = await getElementUntilElementAvailable("body");
    body.insertBefore(createElementFromString(navBar), document.body.firstChild);
        
    addCustomEventListener("logout", e => {
        logout();
    });
}

