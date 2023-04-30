import { APIDelete, APIGet } from "./api.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { showModalForm } from "./createcontactable.js";
import { showModalConfirmation } from "./component/modal.js";
import { UNIXtimeConverter, addCustomEventListener, goTo, map, numberWithThousandsSeparators, range } from "./utils.js";
import { Toast } from "./component/toast.js";
import { logout } from "./main.js";

APIGet(ServiceURL.User.getById(getCookie('id'))).then(res => {
    let user = res.data.data.user;
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
                            <div>${contactAblePerson.name}</div>
                        </div>
                        <div>
                            <div class="title">Nomor Telfon</div>
                            <div>${contactAblePerson.phone}</div>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <div class="title">Alamat</div>
                            <div>${contactAblePerson.address}</div>
                        </div>
                        <div>
                            <div class="title">Hubungan</div>
                            <div>${contactAblePerson.relation}</div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary me-3" type="delete-contactable" target="${contactAblePerson.id}">Delete</button>
                        <button class="btn btn-primary" type="edit-contactable">Edit</button>
                    </div>
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
        
        addCustomEventListener("delete-contactable", e => {
            const target = e.detail.target.getAttribute("target");
            showModalConfirmation(
                Constant.modalType.DELETECONFIRMATION,
                'Hapus Kontak Alternatif',
                'Anda yakin ingin menghapus kontak alternatif?',
                'Hapus', 'Batal',
                () => {
                    APIDelete(ServiceURL.User.deleteContactable(getCookie('id')) + target).then(response => {
                        Toast(Constant.httpStatus.SUCCESS, response.data.message);
                        setTimeout(function () { goTo('./profile.html') }, Event.timeout);
                    }).catch(err => {
                        Toast(Constant.httpStatus.ERROR, err?.message);
                    });
                }
            );
        })

        addCustomEventListener("edit-contactable", e => {
            console.log(e.detail.target);
        })

    }

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

function getRoomData(roomId) {
    APIGet(ServiceURL.Room.getById(roomId)).then(res => {
        let room = res.data.data.room;
        document.querySelector(".name").innerHTML = room.name;
        document.querySelector(".price").innerHTML = `Rp${numberWithThousandsSeparators("1000000")}`;
        document.querySelector(".floor").innerHTML = `Lantai ${room.floor}`;
        // document.querySelector(".price").innerHTML = room.price;
        // document.querySelector(".description").innerHTML = room.description;

        let status = (room.totalTenants >= room.quota ? 'Kamar penuh' : 'Tersedia');
        document.querySelector(".status").classList.add(status === 'Kamar penuh' ? "text-danger" : "text-success");
        status += ` (${res.data.data.totalTenants}/${room.quota})`;
        document.querySelector(".status").innerHTML = status;

        // Room Details
        let details = room.details;
        details.forEach(detail => {
            let icon = detail.enable ? "fa-check-circle" : "fa-times-circle";
            if (detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.KAMAR_TIDUR) {
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
            else if (detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.KAMAR_MANDI) {
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
            else if (detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.FURNITURE) {
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
            else if (detail.masterRoomDetailCategory.name === Constant.roomDetailsCategory.ALAT_ELEKTRONIK) {
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

        // let prices = room.prices;
        // prices.forEach(price => {
        //     let item = document.createElement("tr");
        //     item.innerHTML = `
        //         <td>${price.capacity} orang</td>
        //         <td>Rp ${price.price},-</td>
        //     `
        //     document.querySelector("#price-data").appendChild(item);
        // });

        document.querySelector("#category1").innerHTML = Constant.roomDetailsCategory.KAMAR_TIDUR;
        document.querySelector("#category2").innerHTML = Constant.roomDetailsCategory.KAMAR_MANDI;
        document.querySelector("#category3").innerHTML = Constant.roomDetailsCategory.FURNITURE;
        document.querySelector("#category4").innerHTML = Constant.roomDetailsCategory.ALAT_ELEKTRONIK;
        document.querySelector("#category5").innerHTML = Constant.roomDetailsCategory.FASILITAS_KAMAR_LAINNYA;
    });
}

addCustomEventListener("logout", e => {
    logout();
    console.log(e)
});

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
