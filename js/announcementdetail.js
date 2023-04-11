import { ServiceURL } from "./config.js";
import { APIDelete, APIGet, getURLParam, isOwnerOrAdmin } from "./utils.js";

APIGet(ServiceURL.Announcement.getById.replace("$1", getURLParam("id"))).then(res => {
    let data = res.data.data;
    let image = data.image;
    let src;
    if(image == null || image.trim() === "") src = "asset/no_image.png"
    else src = `data:image/png;base64,${image}`;
    
    let announcement = document.createElement("div");
    announcement.innerHTML = `
            <h3 class="text-center">${data.title}</h3>
            <div class="d-flex row align-items-center justify-content-center my-4">
                <img src="${src}" width="75%">
            </div>
            <div class="text-center"><i>Berlaku pada : ${data.period}</i></div>
            <hr/>
            <p class="text-align-justify">${data.description}</p>
        </div>
    `;
    document.querySelector("#announcement-detail").appendChild(announcement);

    let actionButton = document.createElement("div");
    actionButton.classList.add("d-flex", "justify-content-end", "mt-4");
    if(isOwnerOrAdmin()) {
        actionButton.innerHTML = `
            <button class="btn btn-primary mx-2" id="editAnnouncement">Ubah</button>
            <button class="btn btn-danger" id="deleteAnnouncement">Hapus</button>`
    } else {
        actionButton.innerHTML = `
            <button class="btn btn-secondary" onClick="goToHome()">Kembali</button>`;
    }
    document.querySelector("#announcement-detail").appendChild(actionButton);
})

let js = document.createElement("script");
js.innerHTML = `
    function goToHome() {
        window.location.href='./home.html'
    }
`;
document.body.appendChild(js);

//     // function editAnnouncement() {
//     //     document.getElementById("editAnnouncement").addEventListener("click", e => {
//     //         // console.log("???")
//     //         console.log(APIDelete(ServiceURL.Announcement.delete).replace("$1", getURLParam("id")))
//     //     })
//     //     // .onclick(e => {
//     //     //     console.log("???")
//     //     //     // console.log(APIDelete(ServiceURL.Announcement.delete).replace("$1", getURLParam("id")))
//     //     // })
//     // }


// APIDelete("/announcement/" + getURLParam("id")).then(res => {
//     console.log(res.data);
//     document.querySelector("#delete-announcement").addEventListener("click", e => {
//         goTo("./home.html");
//     })
// })