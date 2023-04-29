import { APIGet } from "./api.js";
import { Constant, ServiceURL } from "./config.js";
import { getURLParam, goTo } from "./utils.js";

APIGet(ServiceURL.Room.getById(getURLParam("id"))).then(res => {
    let room = res.data.data;
    document.querySelector(".name").innerHTML = room.room.name;
    document.querySelector(".allotment").innerHTML = room.room.allotment;
    document.querySelector(".floor").innerHTML = 'Lantai ' + room.room.floor;
    document.querySelector(".description").innerHTML = room.room.description;

    let status = (room.tenantsInRoom >= room.room.quota ? 'Kamar penuh' : 'Tersedia');
    document.querySelector(".status").classList.add(status === 'Kamar penuh' ? "text-danger" : "text-success");
    status += ` (${room.tenantsInRoom}/${room.room.quota})`;
    document.querySelector(".status").innerHTML = status;

    // Room Details
    let details = room.details;
    details.forEach(detail => {
        let icon = detail.enable ? "fa-check-circle" : "fa-times-circle";
        if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.KAMAR_TIDUR) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col", "align-items-center")

            itemList.innerHTML = `
                <div class="w-100">
                    <div class="d-flex align-items-center">
                        <li class="w-100">${detail.name}</li>
                        <i class="fa ${icon}"></i>
                    </div>
                    <div class="font-italic">This is description</div>
                </div>
            `;
            document.querySelector("#kamar-tidur").appendChild(itemList);
        }
        else if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.KAMAR_MANDI) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col", "align-items-center")

            itemList.innerHTML = `
                <div class="w-100">
                    <div class="d-flex align-items-center">
                        <li class="w-100">${detail.name}</li>
                        <i class="fa ${icon}"></i>
                    </div>
                    <div class="font-italic">This is description</div>
                </div>
            `;
            document.querySelector("#kamar-mandi").appendChild(itemList);
        }
        else if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.FURNITURE) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col", "align-items-center")
            
            itemList.innerHTML = `
                <div class="w-100">
                    <div class="d-flex align-items-center">
                        <li class="w-100">${detail.name}</li>
                        <i class="fa ${icon}"></i>
                    </div>
                    <div class="font-italic">This is description</div>
                </div>
            `;
            document.querySelector("#furniture").appendChild(itemList);
        }
        else if(detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.ALAT_ELEKTRONIK) {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col", "align-items-center")
            
            itemList.innerHTML = `
                <div class="w-100">
                    <div class="d-flex align-items-center">
                        <li class="w-100">${detail.name}</li>
                        <i class="fa ${icon}"></i>
                    </div>
                    <div class="font-italic">This is description</div>
                </div>
            `;
            document.querySelector("#alat-elektronik").appendChild(itemList);
        }
        else {
            let itemList = document.createElement("div");
            itemList.classList.add("d-flex", "col", "align-items-center")
            
            itemList.innerHTML = `
                <div class="w-100">
                    <div class="d-flex align-items-center">
                        <li class="w-100">${detail.name}</li>
                        <i class="fa ${icon}"></i>
                    </div>
                    <div class="font-italic">This is description</div>
                </div>
            `;
            document.querySelector("#fasilitas-lain").appendChild(itemList);
        }
    });

    let prices = room.prices;
    prices.forEach(price => {
        let item = document.createElement("tr");
        item.innerHTML = `
            <td>${price.capacity} orang</td>
            <td>Rp ${price.price},-</td>
        `
        document.querySelector("#price-data").appendChild(item);
    });

    document.querySelector("#category1").innerHTML = Constant.roomDetailsCategory.KAMAR_TIDUR;
    document.querySelector("#category2").innerHTML = Constant.roomDetailsCategory.KAMAR_MANDI;
    document.querySelector("#category3").innerHTML = Constant.roomDetailsCategory.FURNITURE;
    document.querySelector("#category4").innerHTML = Constant.roomDetailsCategory.ALAT_ELEKTRONIK;
    document.querySelector("#category5").innerHTML = Constant.roomDetailsCategory.FASILITAS_KAMAR_LAINNYA;

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