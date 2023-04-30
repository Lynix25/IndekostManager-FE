import { APIGet } from "./api.js";
import { Toast } from "./component/toast.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { Toast } from "./component/toast.js";
import { UNIXtimeConverter, numberWithThousandsSeparators, goTo, statusToString } from "./utils.js";

APIGet(ServiceURL.User.getById(getCookie("id"))).then(res => {
    let data = res.data.data.user;
    document.querySelector(".currUsername").innerHTML = `Halo, ${data.name}!`;
}).catch(err => {
    Toast(Constant.httpStatus.ERROR, "Data login tidak valid");
    setTimeout(() => goTo(PAGE.LOGIN), Event.timeout);
});

APIGet(ServiceURL.MasterData.getIndekos).then(res => {
    let data = res.data;

    document.querySelector(".kosName").innerHTML = `Selamat bergabung di <b class="text-muted fs-5">"${data.name}"</b>`
    document.querySelector(".address").innerHTML = `${data.address} RT.${data.rt}/ RW.${data.rw}`;
    document.querySelector(".sub-district").innerHTML = `${data.subdistrict}, ${data.district}`;
    document.querySelector(".city-province-country").innerHTML = `${data.cityOrRegency}, ${data.province}, ${data.country}`;
    document.querySelector(".postal-code").innerHTML = `Kode pos: ${data.postalCode}`;
})

APIGet(ServiceURL.Transaction.unpaid(getCookie("id"))).then(res => {
    let data = res.data;
    document.querySelector(".unpaid-total").innerHTML = numberWithThousandsSeparators(data.unpaidTotal);
    document.querySelector(".due-date").innerHTML = UNIXtimeConverter(data.maxDueDate, "DD MMMM YYYY");
});

APIGet(ServiceURL.Announcement.getAll).then(res => {
    let announcements = res.data.data;
    if(announcements.length == 0) {
        let announcementCarousel = document.createElement("div");
        announcementCarousel.classList.add("carousel-indicators", "align-items-end");
        announcementCarousel.innerHTML = `
            <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>`;
        document.querySelector("#carousel").appendChild(announcementCarousel);

        let announcement = document.createElement("div");
        announcement.classList.add("carousel-inner");
        announcement.innerHTML = `
            <div class="carousel-item active">
                <img class="img-no-text" src="asset/no_announcement.png" alt="Belum ada pengumuman">
            </div>`;
        document.querySelector("#carousel").appendChild(announcement);
    } else {
        let announcementCarousel = document.createElement("div");
        announcementCarousel.classList.add("carousel-indicators", "align-items-end");
        announcementCarousel.setAttribute("id", "carousel-indicators")
        for(let i=0; i < announcements.length; i++) {
            if(i==0) {
                announcementCarousel.innerHTML += `
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to=${i} class="active"
                        aria-current="true" aria-label="Slide ${i+1}"></button>`;
            } else {
                announcementCarousel.innerHTML += `
                    <button type="button" data-bs-target="#carousel" data-bs-slide-to=${i} 
                        aria-label="Slide ${i+1}"></button>`;
            }
        }
        document.querySelector("#announcement-list").appendChild(announcementCarousel);

        let count = 0;
        announcements.forEach(data => {

            let announcement = document.createElement("div");
            let src;
            let image = data.image;
            if(image == null || image.trim() === "") src = "asset/no_image.png"
            else src = `data:image/png;base64,${image}`;

            if(count == 0) {
                announcement.classList.add("carousel-item", "active");
                announcement.innerHTML = `
                    <figcaption>${data.title}</figcaption>
                    <img src="${src}" alt="${data.title}">
                `;
            } else {
                announcement.classList.add("carousel-item");
                announcement.innerHTML += `
                <figcaption>${data.title}</figcaption>
                <img src="${src}" alt="${data.title}">
            `;
            }
            count++;
            
            announcement.addEventListener("click", e => {
                goTo("./announcementdetail.html?id=" + data.id);
            });
            document.querySelector("#announcement-list").appendChild(announcement);
        });
        // if(count > 1) {
        //     let carouselButton = document.createElement("div");
        //     carouselButton.innerHTML = `
        //         <button class="carousel-button carousel-control-prev ml-2" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        //             <span class="carousel-control-prev-icon rounded-circle" aria-hidden="true"></span>
        //         </button>
        //         <button class="carousel-button carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        //             <span class="carousel-control-next-icon rounded-circle" aria-hidden="true"></span>
        //         </button>
        //     `;
        //     document.querySelector("#carousel").appendChild(carouselButton);
        // }
    }
});
/*
APIGet(ServiceURL.User.getById(getCookie("id"))).then(res => {
    let data = res.data.data.user;
    document.querySelector(".currUsername").innerHTML = `Halo, ${data.name}!`;
}).catch(err => {
    Toast(Constant.httpStatus.ERROR, "Invalid Login Data");
    setTimeout(() => goTo(PAGE.LOGIN), Event.timeout);
})

APIGet(ServiceURL.MasterData.getIndekos).then(res => {
    let data = res.data;

    document.querySelector(".kosName").innerHTML = `Selamat bergabung di <b class="text-muted fs-5">"${data.name}"</b>`
    document.querySelector(".address").innerHTML = `${data.address} RT.${data.rt}/ RW.${data.rw}`;
    document.querySelector(".sub-district").innerHTML = `${data.subdistrict}, ${data.district}`;
    document.querySelector(".city-province-country").innerHTML = `${data.cityOrRegency}, ${data.province}, ${data.country}`;
    document.querySelector(".postal-code").innerHTML = `Kode pos: ${data.postalCode}`;
})

APIGet(ServiceURL.Announcement.getAll).then(res => {
    let announcements = res.data.data;
    if (announcements.length == 0) {
        document.querySelector("#newest-announcement").remove();
    } else {
        document.querySelector("#no-announcement").remove();

        let count = 0;
        announcements.forEach(data => {

            if (count < 5) {
                let announcement = document.createElement("div");
                let src;
                let image = data.image;
                if (image == null || image.trim() === "") src = "asset/no_image.png"
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

        if (count > 0)
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
*/