import { APIGet, handleFormSubmited, UNIXtimeConverter } from "./utils.js";


APIGet("/task").then(res => {
    console.log(res);
    res.data.data.forEach(service => {
        addRequest(service);
    });
})

// createdDate: "2023-01-17T05:56:53Z"
// id: "a9418a9c-93ad-4f6f-8c79-b2cbb05f16ab"
// lastModifiedDate: "2023-01-17T05:56:53Z"
// notes: "Notes"
// service_date: 1673934900000
// service_id: "0f475280-e322-4f87-806f-69b5555b3f29"
// summary: "Title"

function addRequest(taskObject) {
    let requestList = document.querySelector("#request-list");
    let task = document.createElement("li");
    task.setAttribute("data", taskObject.id);
    // task.classList.add("border", "rounded", "px-3", "py-1", "m-auto")
    // task.setAttribute("onClick", toTaskDetail(e));
    task.classList.add("item")
    task.innerHTML = `<div class="d-flex justify-content-between align-items-center">
    <div>
        <div class="order-room">${"Nama Kamar"}</div>
        <div class="order-date">${taskObject.createdDate}</div>
    </div>
    <div class="badge ${"badge-blue"}">${"Dalam Pengerjaan"}</div>
</div>
<hr style="margin: .5rem 0px;">
<div class="d-flex justify-content-between">
    <div class="d-flex">
        <div class="text-center">
            <i class="fa-solid ${"fa-task"}"></i>
        </div>
        <div class="">
            <div>${taskObject.summary}</div>
            <div>Permintaan pengerjaan: ${UNIXtimeConverter(taskObject.taskDate, "D/M/YYYY hh:mm")}</div>
        </div>
    </div>
    <div class="">
        <button class="btn bg-primary">Komplain</button>
    </div>
</div>`
    task.addEventListener("click", e => {
        console.log(e.currentTarget.getAttribute("data"));
        window.location.replace('./taskdetail.html?id='+e.currentTarget.getAttribute("data"));
    })
    requestList.appendChild(task);
}

// function toTaskDetail(event){
//     console.log(event)
// }
