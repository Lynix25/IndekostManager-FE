import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { UNIXtimeConverter, createElementFromString, isOwnerOrAdmin, numberWithThousandsSeparators } from "./utils.js";

APIGet(ServiceURL.Transaction.unpaid(getCookie("id"))).then(res => {
    let data = res.data;

    document.querySelector(".unpaid-total").innerHTML = numberWithThousandsSeparators(data.unpaidTotal);
    document.querySelector(".due-date").innerHTML = UNIXtimeConverter(data.maxDueDate, "DD MMMM YYYY");
})

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
                        <img src="${src}" alt="${data.title}">`;
            } else {
                announcement.classList.add("carousel-item");
                announcement.innerHTML += `
                        <figcaption>${data.title}</figcaption>
                        <img src="${src}" alt="${data.title}">`;
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
})