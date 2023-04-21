import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { logout } from "./main.js";
import { addCustomEventListener, goTo, UNIXtimeConverter } from "./utils.js";

APIGet(ServiceURL.User.getById(getCookie('id'))).then(res => {
    let user = res.data.data.user;
    
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
                toggleEdit.classList.add("text-center");
                toggleEdit.innerHTML = `
                    <div class="hover-text">
                        <span class="tooltip-text tooltip-top-title">Ubah</span>
                        <span id="back"><a href="#"><i class="fa-solid fa-pencil"></i></a></span>
                    </div>`;
                    
                let toggleDelete = document.createElement("td");
                toggleDelete.classList.add("text-center");
                toggleDelete.innerHTML = `
                    <div class="hover-text">
                        <span class="tooltip-text tooltip-top-title">Hapus</span>
                        <span id="back"><a href="#"><i class="fa-solid fa-trash"></i></a></span>
                    </div>`;
                
                let item = document.createElement("tr");
                item.innerHTML = `
                    <th scope="row">${count}</th>
                    <td><a href="/editcontactable.html?id=${data.id}">${data.name}</a></td>
                    <td><a href="/editcontactable.html?id=${data.id}">${data.relation}</a></td>
                    <td><a href="/editcontactable.html?id=${data.id}">${data.phone}</a></td>
                    <td class="text-truncate"><a href="/editcontactable.html?id=${data.id}">${data.address}</a></td>
                `;

                toggleEdit.addEventListener("click", e => {
                    goTo("./editcontactable.html?id=" + data.id);
                });
                item.appendChild(toggleEdit);

                toggleDelete.addEventListener("click", e => {
                    alert('delete');
                });
                item.appendChild(toggleDelete);

                document.querySelector("#list-data").appendChild(item);
            });
        }
    });
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
    goTo("./createcontactable.html");
})

let eLogout = document.getElementById("logout");
logout(eLogout);

let js = document.createElement("script");
js.innerHTML = `
function openImageInNewWindow(e) {
    var newTab = window.open();
    setTimeout(function() {
        newTab.document.body.innerHTML = e.innerHTML;
    }, 500);
    return false;
}`;
document.body.appendChild(js);