import { APIGet } from "./api.js";
import { Constant, ServiceURL } from "./config.js";
import { getParamOnURL, goTo } from "./utils.js";

APIGet(ServiceURL.Room.getById(getParamOnURL("id"))).then(res => {
    let room = res.data.data.room;
    document.querySelector(".name").innerHTML = room.name;
    document.querySelector(".allotment").innerHTML = room.allotment;
    document.querySelector(".floor").innerHTML = 'Lantai ' + room.floor;
    document.querySelector(".description").innerHTML = room.description;

    let status = room.tenant >= room.quota ? 'Kamar penuh' : 'Tersedia';
    document.querySelector(".status").classList.add(status === 'Kamar penuh' ? "text-danger" : "text-success");
    document.querySelector(".status").innerHTML = status;

    // Room Details
    let details = room.details;
    details.forEach(detail => {
        if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.KAMAR_TIDUR) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col")

            let icon = detail.enable ? "fa-circle-check" : "fa-circle-check";
            itemList.innerHTML = `
                <div class="w-100">
                    <li>${detail.name}</li>
                </div>
                <i class="fa ${icon} align-items-center"></i>
            `;
            // <small>${detail.description}</small>
            document.querySelector("#kamar-tidur").appendChild(itemList);
        }
        else if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.KAMAR_MANDI) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col")

            let icon = detail.enable ? "fa-circle-check" : "fa-circle-check";
            itemList.innerHTML = `
                <div class="w-100">
                    <li>${detail.name}</li>
                </div>
                <i class="fa ${icon} align-items-center"></i>
            `;
            document.querySelector("#kamar-mandi").appendChild(itemList);
        }
        else if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.FURNITURE) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col")
            
            let icon = detail.enable ? "fa-circle-check" : "fa-circle-check";
            itemList.innerHTML = `
                <div class="w-100">
                    <li>${detail.name}</li>
                </div>
                <i class="fa ${icon} align-items-center"></i>
            `;
            document.querySelector("#furniture").appendChild(itemList);
        }
        else if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.ALAT_ELEKTRONIK) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col")
            
            let icon = detail.enable ? "fa-circle-check" : "fa-circle-check";
            itemList.innerHTML = `
                <div class="w-100">
                    <li>${detail.name}</li>
                </div>
                <i class="fa ${icon} align-items-center"></i>
            `;
            document.querySelector("#alat-elektronik").appendChild(itemList);
        }
        else {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col")
            
            let icon = detail.enable ? "fa-solid fa-check" : "fa-solid fa-xmark";
            itemList.innerHTML = `
                <div class="w-100">
                    <li>${detail.name}</li>
                </div>
                <i class="fa ${icon} align-items-center"></i>
            `;
            document.querySelector("#fasilitas-lain").appendChild(itemList);
        }
    });

    let prices = room.prices;
    prices.forEach(price => {
        let item = document.createElement("tr");
        item.innerHTML = `
            <td>${price.capacity}</td>
            <td>Rp ${price.price},-</td>
        `
        document.querySelector("#price-data").appendChild(item);
    });

    // room.details.forEach(facility => {
    //     let detail = document.createElement("li");
    //     detail.classList.add("d-flex");
    //     detail.innerHTML = `<i class="fad fa-user"></i>
    //     <div>${facility.name}</div>`
    //     if(facility.category == "Spesifikasi") document.querySelector(".specifications").appendChild(detail);
    //     // console.log(facility);
    // });
    
});

document.querySelector(".btn-warning").addEventListener("click", e => {
    goTo("./editroom.html");
})