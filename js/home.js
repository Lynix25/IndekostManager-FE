import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { UNIXtimeConverter, numberWithThousandsSeparators, goTo, statusToString } from "./utils.js";


APIGet(ServiceURL.User.getById(getCookie("id"))).then(res => {
    let data = res.data.data.user;
    document.querySelector(".currUsername").innerHTML = `Halo, ${data.name}!`;
})

APIGet(ServiceURL.MasterData.getIndekos).then(res => {
    let data = res.data;

    document.querySelector(".kosName").innerHTML = `Selamat bergabung di <b class="text-muted fs-5">"${data.name}"</b>`
    document.querySelector(".address").innerHTML = `${data.address} RT.${data.rt}/ RW.${data.rw}`;
    document.querySelector(".sub-district").innerHTML = `${data.subdistrict}, ${data.district}`;
    document.querySelector(".city-province-country").innerHTML = `${data.cityOrRegency}, ${data.province}, ${data.country}`;
    document.querySelector(".postal-code").innerHTML = `Kode pos: ${data.postalCode}`;
})

// APIGet(ServiceURL.Transaction.unpaid(getCookie("id"))).then(res => {
//     let data = res.data;

//     document.querySelector(".unpaid-total").innerHTML = numberWithThousandsSeparators(data.unpaidTotal);
//     document.querySelector(".due-date").innerHTML = UNIXtimeConverter(data.maxDueDate, "DD MMMM YYYY");
// })

APIGet(ServiceURL.Announcement.getAll).then(res => {
    let announcements = res.data.data;
    if(announcements.length == 0) {
        document.querySelector("#newest-announcement").remove();
    } else {
        document.querySelector("#no-announcement").remove();

        let count = 0;
        announcements.forEach(data => {

            if(count < 5) {
                let announcement = document.createElement("div");
                let src;
                let image = data.image;
                if(image == null || image.trim() === "") src = "asset/no_image.png"
                else src = `data:image/png;base64,${image}`;

                announcement.classList.add("card-as-container", "image-container");
                announcement.innerHTML = `
                    <img src="${src}" alt="${data.title}">
                    <figcaption>${data.title}</figcaption>
                `;
                
                announcement.addEventListener("click", e => {
                    goTo("./announcementdetail.html?id=" + data.id);
                });
                document.querySelector("#newest-announcement").appendChild(announcement);

                count++;
            }
        });

        let viewmore = document.createElement("div");
        viewmore.classList.add("d-flex", "align-items-center", "px-2");
        viewmore.innerHTML = `
            <div class="hover-text">
                <span class="tooltip-text tooltip-top-title">Lihat lebih banyak</span>
                <a href="./announcementmenu.html"><i class="fa-solid fa-circle-chevron-right fs-2 text-on-hover"></i></a>
            </div>
        `;
        document.querySelector("#newest-announcement").appendChild(viewmore);
    }
});

APIGet(ServiceURL.Task.getAll('')).then(res => {
    let count = 0;
    res.data.data.forEach(service => {

        if(count > 0) 
            document.querySelector("#request-list").appendChild(document.createElement("hr"));

        addRequest(service);
        count++;
    });
})

function addRequest(taskObject) {
    let requestList = document.querySelector("#request-list");
    
    let task = document.createElement("li");
    task.setAttribute("data", taskObject.id);
    task.classList.add("row", "d-flex", "align-items-center");
    task.setAttribute("style", "cursor: pointer");
    
    let [color, status] = statusToString(taskObject.status);
    APIGet(ServiceURL.Service.getById(taskObject.serviceId)).then(res => {

        task.innerHTML = `
        <div class="col p-0 d-flex align-items-center">
            <div class="pe-2">
                <i class="fa fa-solid fa-bullseye-arrow fs-4"></i>
            </div>
            <div>    
                <div>${res.data.serviceName}: ${res.data.variant}</div>
                <div class="small">Target: ${UNIXtimeConverter(taskObject.taskDate, "DD MMMM YYYY hh:mm")}</div>
            </div>
        </div>
        <div class="col-3 p-2 pe-0 text-end">
            <div><span class="${color} p-1 small fw-bold rounded" style="font-size: x-small;">${status}</span></div>
            <div><span class="badge-green p-1 small fw-bold rounded" style="font-size: x-small;">Nama kamar</span></div>
        </div>`;
    });
    task.addEventListener("click", e => {
        goTo('./taskdetail.html?id=' + e.currentTarget.getAttribute("data"));
    });
    
    requestList.appendChild(task);
}

// if(isOwnerOrAdmin()) {
//     let adminMenu = document.createElement("div");
//     adminMenu.classList.add("row", "card", "rounded", "border-0", "my-4", "mx-3");
//     adminMenu.innerHTML = `
        // <a href="./announcementmenu.html" class="menu hover-text">
        //     <span class="tooltip-text tooltip-top">Kelola Pengumuman</span>
        //     <i class="fa-solid fa-newspaper"></i>
        // </a>
        // <a href="./roomlist.html" class="menu hover-text">
        //     <span class="tooltip-text tooltip-top">Kelola Kamar</span>
        //     <i class="fa-solid fa-door-open"></i>
        // </a>
        // <a href="./service.html" class="menu hover-text">
        //     <span class="tooltip-text tooltip-top">Kelola Layanan Kos</span>
        //     <i class="fa-solid fa-tasks"></i>
        // </a>
        // <a href="./listuser.html" class="menu hover-text">
        //     <span class="tooltip-text tooltip-top">Kelola Penyewa</span>
        //     <i class="fa-solid fa-users"></i>
        // </a>
        // <a href="#!" class="menu hover-text">
        //     <span class="tooltip-text tooltip-top">Kelola Transaksi</span>
        //     <i class="fa-solid fa-money-bill-transfer"></i>
        // </a>
//     `;
//     document.body.appendChild(adminMenu);
// }
