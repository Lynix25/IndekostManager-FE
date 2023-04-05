import { APIGet } from "./api.js";
import { addCustomEventListener, goTo, setAttributes } from "./utils.js";

APIGet("/room").then(res => {
    let roomList = res.data.data;
    
    roomList.forEach(data => {
        let room = document.createElement("li");
        room.classList.add("item", "d-flex", "align-items-center", "justify-content-between");
        room.innerHTML = `
        <div class="d-flex">
            <i class="fad ${data.users.length >= data.quota ? "fa-door-closed" : "fa-door-open"} me-3 my-auto" style="font-size: 2.2rem;"></i>
            <div>
                <div>${data.name}</div>
                <div>${data.floor}</div>
            </div>
        </div>`;
        room.addEventListener("click", e => {
            goTo('./roomdetail.html?id=' + data.id);
        })

        let controlButton = document.createElement("div");
        // controlButton.style.float = "right";

        let editButton = document.createElement("button");
        editButton.setAttribute("type", "edit");
        editButton.innerHTML = `<i class="fad fa-edit"></i>`;
        editButton.classList.add("btn");
        controlButton.appendChild(editButton);

        addCustomEventListener("edit", e => {
            goTo('./editroom.html?id=' + data.id);
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
            document.querySelector("#roomName").innerHTML = data.name;
            document.querySelector("[type='confirm-delete']").setAttribute("data", data.id);
            document.querySelector("[type='confirm-delete']").setAttribute("data-room-name", data.name);
        }, deleteButton);

        room.appendChild(controlButton);
        document.querySelector("#room-list").appendChild(room);
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