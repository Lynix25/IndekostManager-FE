import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { addCustomEventListener, createElementFromString, goTo, setAttributes } from "./utils.js";

APIGet(ServiceURL.Room.getAll).then(res => {
    let roomList = res.data.data;
    roomList.forEach(data => {
        const room = `
        <li class="item d-flex align-items-center justify-content-between">
            <div class="d-flex">
                <div class="hover-text">
                    <span class="tooltip-text tooltip-top-title">${data.tenant >= data.quota ? "Kamar penuh" : "Kamar tersedia"}</span>
                    <span id="back" class="text-center"><i class="fad ${data.tenant >= data.quota ? "fa-door-closed" : "fa-door-open"} me-3 my-auto" style="font-size: 2.2rem;"></i></span>
                </div>
                <div>
                    <div>${data.name}</div>
                    <div>${data.floor}</div>
                </div>
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