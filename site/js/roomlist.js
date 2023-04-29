import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { addCustomEventListener, goTo, setAttributes } from "./utils.js";

APIGet(ServiceURL.Room.getAll).then(res => {
    let roomList = res.data.data;
    let count = 0;
    roomList.forEach(data => {        
        if(count !== 0) {
            let separator = document.createElement("hr");
            document.querySelector("#room-list").appendChild(separator);
        }
        let room = document.createElement("li");
        room.classList.add("item", "d-flex", "align-items-center", "justify-content-between");
        room.innerHTML += `
        <div class="d-flex">
            <div class="hover-text">
                <span class="tooltip-text tooltip-top-title">${data.tenantsInRoom >= data.room.quota ? `Kamar penuh (${data.tenantsInRoom}/${data.room.quota})` : `Kamar tersedia (${data.tenantsInRoom}/${data.room.quota})`}</span>
                <span id="back"><a href="#!"><i class="fad ${data.tenantsInRoom >= data.room.quota ? "fa-door-closed" : "fa-door-open"} me-3 my-auto" style="font-size: 2.2rem;"></i></a></span>
            </div>
            <div>
                <button type="edit" class="btn""><i class="fad fa-edit"></i></button>
                <button type="delete" class="btn" data-bs-toggle="modal" data-bs-target="#confirmation"><i class="fad fa-trash"></i></button>
            </div>
        </li>
        `;
        const roomElement = createElementFromString(room);
        addCustomEventListener("click", e => {
            goTo('./roomdetail.html?id=' + data.id);
        }, roomElement)

        addCustomEventListener("edit", e => {
            goTo('./editroom.html?id=' + data.id);
        }, roomElement, ...Array(3), true);

        addCustomEventListener("delete", e => {
            document.querySelector("#room-name").innerHTML = data.name;
            setAttributes(document.querySelector("[type='confirm-delete']"), { "data": data.id, "data-room-name": data.name });
        }, roomElement, ...Array(3), true);

        document.querySelector("#room-list").appendChild(roomElement);
    });
}).catch(e => {
    console.log(e);
})

// const toastTrigger = document.getElementById('liveToastBtn')

// if (toastTrigger) {
//     toastTrigger.addEventListener('click', () => {
//         const toast = new bootstrap.Toast(toastLiveExample)
//         toast.show()
//     })
// }

addCustomEventListener("confirm-delete", e => {
    console.log("Delete asd");
    const toastLiveExample = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
})