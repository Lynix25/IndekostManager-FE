import { APIGet } from "./utils.js";

APIGet("/room").then(res => {
    let roomList = res.data.data;
    roomList.forEach(data => {
        let room = document.createElement("li");
        room.setAttribute("data", data.id);
        room.classList.add("item", "d-flex", "align-items-center");
        room.innerHTML = `
        <i class="fad ${data.id == "58c4652f-f43a-48da-aad7-c5e461f430ec" ? "fa-door-closed": "fa-door-open"} me-3" style="font-size: 2.2rem;"></i>
        <div>
            <div>${data.name}</div>
            <div>${data.floor}</div>
        </div>`;
        document.querySelector("#room-list").appendChild(room);

        // room.addEventListener("click", e => {
        //     window.location.replace('./roomdetail.html?id=' + e.currentTarget.getAttribute("data"));
        // })
    });


})