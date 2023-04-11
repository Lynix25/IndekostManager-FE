import { ServiceURL } from "./config.js";
import { addCustomEventListener, APIGet, goTo, setAttributes } from "./utils.js";

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
                <span class="tooltip-text tooltip-top-title">${data.tenant >= data.room.quota ? "Kamar penuh" : "Kamar tersedia"}</span>
                <span id="back"><a href="#!"><i class="fad ${data.tenant >= data.room.quota ? "fa-door-closed" : "fa-door-open"} me-3 my-auto" style="font-size: 2.2rem;"></i></a></span>
            </div>
            <div>
                <div>${data.room.name}</div>
                <div>${data.room.floor}</div>
            </div>
        </div>`;
        room.addEventListener("click", e => {
            goTo('./roomdetail.html?id=' + data.room.id);
        })

        let controlButton = document.createElement("div");
        // controlButton.style.float = "right";

        let editButton = document.createElement("button");
        editButton.setAttribute("type", "edit");
        editButton.innerHTML = `<i class="fad fa-edit"></i>`;
        editButton.classList.add("btn");
        controlButton.appendChild(editButton);

        addCustomEventListener("edit", e => {
            goTo('./editroom.html?id=' + data.room.id);
        }, editButton);

        let deleteButton = document.createElement("button");
        setAttributes(deleteButton, {
            "type": "delete",
            "data-bs-toggle": "modal",
            "data-bs-target": "#confirmation",
            "data": data.id
        })
        deleteButton.innerHTML = `<i class="fad fa-trash"></i>`;
        deleteButton.classList.add("btn");
        controlButton.appendChild(deleteButton);

        addCustomEventListener("delete", e => {
            document.querySelector("#room-name").innerHTML = data.room.name;
            document.querySelector("[type='confirm-delete']").setAttribute("data", data.room.id);
            document.querySelector("[type='confirm-delete']").setAttribute("data-room-name", data.room.name);
        }, deleteButton);

        room.appendChild(controlButton);
        document.querySelector("#room-list").appendChild(room);
        count++;
    });
}).catch(e => {
    console.log(e);
})

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    })
}