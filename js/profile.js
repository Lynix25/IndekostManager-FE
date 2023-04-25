import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { addCustomEventListener, goTo, map, range } from "./utils.js";

APIGet(ServiceURL.User.getById(getCookie('id'))).then(res => {
    let user = res.data.data.user;

    document.querySelector("#alias").innerText = `(${user.alias})`;

    document.querySelector("#name").innerText = user.name;
    document.querySelector("#email").innerText = user.email || "-";
    document.querySelector("#phone").innerText = user.phone;
    document.querySelector("#domicile").innerText = user.city || "-";

    if (user.contactAblePersons.length) {
        const contactAblePersonList = document.querySelector("#contactAblePersonList");
        contactAblePersonList.classList.add("carousel", "carousel-dark", "slide", "p-0");
        let list = `
        <div class="carousel-inner">
            ${map(user.contactAblePersons, contactAblePerson =>
            `<div class="carousel-item">
                <div class="row">
                    <div class="col">
                        <div>
                            <div class="title">Nama</div>
                            <div id="contactAblePersonName">${contactAblePerson.name}</div>
                        </div>
                        <div>
                            <div class="title">Nomor Telfon</div>
                            <div id="contactAblePersonPhone">${contactAblePerson.phone}</div>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <div class="title">Alamat</div>
                            <div id="contactAblePersonAddress">${contactAblePerson.address}</div>
                        </div>
                        <div>
                            <div class="title">Hubungan</div>
                            <div id="contactAblePersonRelation">${contactAblePerson.relation}</div>
                        </div>
                    </div>
                    <button class="btn">Delete</button>
                </div>
            </div>`).replace('carousel-item"', 'carousel-item active"')}
        </div>
        <div class="carousel-indicators align-items-end mb-0" style="position: relative;">
            ${map(range(user.contactAblePersons.length), i =>
                `<button type="button" data-bs-target="#contactAblePersonList" data-bs-slide-to="${i}" ${i ? "" :
                    'class="active" aria-current="true"'}></button>
                `
            )}
        </div>
        `
        contactAblePersonList.innerHTML = list;
    }

    let room = res.data.data.room;
    document.querySelector("#roomName").innerText = room.name;
    document.querySelector("#roomFloor").innerText = room.floor;
    document.querySelector("#roomCapacity").innerText = room.quota;
    document.querySelector("#roomPrice").innerText = "-";
})

addCustomEventListener("show-room-info", e => {
    document.getElementById("tenant-information").setAttribute("hidden", "");
    document.getElementById("room-information").removeAttribute("hidden");
});

addCustomEventListener("show-tenant-info", e => {
    document.getElementById("room-information").setAttribute("hidden", "");
    document.getElementById("tenant-information").removeAttribute("hidden");
});

addCustomEventListener("add-alternatif-contact", e => {
    goTo("./addcontactableperson.html")
})