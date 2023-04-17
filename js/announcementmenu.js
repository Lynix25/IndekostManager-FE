import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { goBack, goTo } from "./utils.js";

const searchBox = document.getElementById("search");
let announcementList = []

searchBox.addEventListener("input", e => {
    const search = e.target.value.toLowerCase();
    for(let i=0; i < announcementList.length; i++) {
        const isVisible = announcementList[i].title.toLowerCase().includes(search);
        
        // console.log("=========================");
        // console.log(isVisible);
        // console.log(search);
        // console.log(announcementList[i].title.toLowerCase());
        // console.log("=========================");

        if(isVisible) announcementList[i].element.style.display = "";
        else announcementList[i].element.style.display = "none";
    }
})

APIGet(ServiceURL.Announcement.getAll).then(res => {
    let announcements = res.data.data;
    if(announcements.length == 0) {
        let announcement = document.createElement("div");
        announcement.classList.add("text-center", "w-100", "p-2");
        announcement.innerHTML = `<p>Tidak ada pengumuman</p>`;
        document.querySelector("#list-announcement").appendChild(announcement);
    } else {
        announcementList = announcements.map(data => {
            let src;
            let image = data.image;
            if(image == null || image.trim() === "") src = "asset/no_image.png"
            else src = `data:image/png;base64,${image}`;
            
            let title = data.title;
            let content;
            if(data.description.length < 80) content = data.description;
            else content = data.description.substring(0, 80) + '...';
            let announcement = document.createElement("div");
            announcement.classList.add("card");
            announcement.innerHTML = `
                <div class="card-image-container">
                    <img src=${src} >
                </div>
                <div class="card-body">
                    <div class="card-title m-0"><b>${title}</b></div>
                    <div class="card-text mb-1">${content}</div>
                </div>
                <div class="card-footer">
                    <p class="small">Berlaku pada: ${data.period}</p>
                </div>`;

            announcement.addEventListener("click", e => {
                goTo("./announcementdetail.html?id=" + data.id);
            });
            document.querySelector("#list-announcement").appendChild(announcement);
            return { title: title, element: announcement};
        });
    }
});

document.getElementById("back").addEventListener("click", e => {
    goBack();
})

document.getElementById("add-new").addEventListener("click", e => {
    goTo("./createannouncement.html");
})