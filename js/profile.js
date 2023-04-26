import { APIDelete, APIGet } from "./api.js";
import { showModalConfirmation } from "./component/modal.js";
import { Toast } from "./component/toast.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { showModalForm } from "./createcontactable.js";
import { logout } from "./main.js";
import { addCustomEventListener, goTo, UNIXtimeConverter } from "./utils.js";

APIGet(ServiceURL.User.getById(getCookie('id'))).then(res => {
    let user = res.data.data.user;
    delete user.contactAblePersons;
    let room = res.data.data.room;
    
    document.querySelector("#name").innerText = user.name;
    document.querySelector("#alias").innerText = `(${user.alias})`;
    document.querySelector("#email").innerText = user.email;
    document.querySelector("#phone").innerText = user.phone;
    document.querySelector("#job").innerText = user.job;
    document.querySelector("#gender").innerText = user.gender;
    document.querySelector("#status").innerText = user.married ? 'Sudah Menikah' : 'Belum Menikah';
    document.querySelector("#joinedOn").innerText = UNIXtimeConverter(user.joinedOn, 'DD MMMM YYYY');
    document.querySelector("#description").innerText = user.description;

    let identityImage = document.createElement("div");
    identityImage.innerHTML = `
        <a href="#" onclick="openImageInNewWindow(this)">
            <img src="data:image/png;base64,${user.identityCardImage}" alt="KTP">
        </a>
    `;
    document.querySelector("#identity-image").appendChild(identityImage);

    APIGet(ServiceURL.User.getContactable(user.id)).then(res => {
        let contactables = res.data.data;
        if(contactables.length == 0) {
            document.querySelector("#list-not-empty").remove();
        } else {
            document.querySelector("#list-empty").remove();

            let count = 0;
            contactables.forEach(data => {
                count++;

                let toggleEdit = document.createElement("td");
                toggleEdit.classList.add("text-center", "hover");
                toggleEdit.innerHTML = `
                    <div class="hover-text">
                        <span class="tooltip-text tooltip-top-toggle">Ubah</span>
                        <span id="edit"><a href="#"><i class="fa-solid fa-pencil"></i></a></span>
                    </div>`;
                    
                let toggleDelete = document.createElement("td");
                toggleDelete.classList.add("text-center", "hover");
                toggleDelete.innerHTML = `
                    <div class="hover-text">
                        <span class="tooltip-text tooltip-top-toggle">Hapus</span>
                        <span id="delete"><a href="#"><i class="fa-solid fa-trash"></i></a></span>
                    </div>`;
                
                let item = document.createElement("tr");
                item.innerHTML = `
                    <th scope="row">${count}</th>
                    <td class="contactable-table-data text-truncate">
                        <a href="/editcontactable.html?id=${data.id}">
                            ${data.name}
                        </a>
                    </td>
                    <td class="contactable-table-data text-truncate">
                        <a href="/editcontactable.html?id=${data.id}">
                            ${data.relation}
                        </a>
                    </td>
                    <td class="text-truncate" style="max-width: 8rem; min-width: 8rem;">
                        <a href="/editcontactable.html?id=${data.id}">
                            ${data.phone}
                        </a>
                    </td>
                    <td class="text-truncate" style="max-width: 18rem; min-width: 8rem;">
                        <a href="/editcontactable.html?id=${data.id}">
                            ${data.address}
                        </a>
                    </td>
                `;

                toggleEdit.addEventListener("click", e => {
                    goTo("./editcontactable.html?id=" + data.id);
                });
                item.appendChild(toggleEdit);

                toggleDelete.addEventListener("click", e => {
                    showModalConfirmation(
                        Constant.modalType.DELETECONFIRMATION, 
                        'Hapus Kontak Alternatif', 
                        'Anda yakin ingin menghapus kontak alternatif?', 
                        'Hapus', 'Batal', () => {
                            APIDelete(ServiceURL.User.deleteContactable(getCookie('id')) + data.id).then(response => {
                                Toast(Constant.httpStatus.SUCCESS, response.data.message);
                                setTimeout(function() { goTo('./profile.html') }, Event.timeout);
                            }).catch(err => {
                                Toast(Constant.httpStatus.ERROR, err?.message);
                            });
                        }
                    );
                });
                item.appendChild(toggleDelete);

                document.querySelector("#list-data").appendChild(item);
            });
        }
    });

    getRoomData(room.id)
});

addCustomEventListener("show-room-info", e => {
    document.getElementById("tenant-information").setAttribute("hidden", "");
    document.getElementById("room-information").removeAttribute("hidden");
});

addCustomEventListener("show-tenant-info", e => {
    document.getElementById("room-information").setAttribute("hidden", "");
    document.getElementById("tenant-information").removeAttribute("hidden");
});

addCustomEventListener("add-alternatif-contact", e => {
    showModalForm(Constant.modalType.FORM, 'Tambah Kontak Alternatif', 'Simpan');
});

let eLogout = document.getElementById("logout");
logout(eLogout);

function getRoomData(roomId) {
    APIGet(ServiceURL.Room.getById(roomId)).then(res => {
        let room = res.data.data;
        document.querySelector(".name").innerHTML = room.room.name;
        document.querySelector(".allotment").innerHTML = room.room.allotment;
        document.querySelector(".floor").innerHTML = 'Lantai ' + room.room.floor;
        document.querySelector(".description").innerHTML = room.room.description;

        let status = (room.totalTenants >= room.room.quota ? 'Kamar penuh' : 'Tersedia');
        document.querySelector(".status").classList.add(status === 'Kamar penuh' ? "text-danger" : "text-success");
        status += ` (${room.totalTenants}/${room.room.quota})`;
        document.querySelector(".status").innerHTML = status;

        // Room Details
        let details = room.room.details;
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

        let prices = room.room.prices;
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
    });
}

let js = document.createElement("script");
js.innerHTML = `
function openImageInNewWindow(e) {
    var newTab = window.open();
    setTimeout(function() {
        newTab.document.body.innerHTML = e.innerHTML;
    }, 500);
    return false;
}
function requestChangeRoom() {
    window.location.href = "/servicerequest.html"
}
`;
document.body.appendChild(js);
