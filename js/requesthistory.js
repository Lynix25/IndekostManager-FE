import { APIGet } from "./api.js";
import { PAGE, ServiceURL } from "./config.js";
import { getUserID, goBack, goTo, isOwnerOrAdmin, statusToString, UNIXtimeConverter } from "./utils.js";

/* 
    Pending: Search
*/
let paramGetTask = "";
if (!isOwnerOrAdmin()) paramGetTask = getUserID();

APIGet(ServiceURL.Task.getAll(paramGetTask, "all")).then(res => {
    let data = res.data.data;
    if (data.length > 0) {

        document.querySelector(".no-data").setAttribute("hidden", "");
        data.forEach(service => {
            addRequest(service);
        });
    }
});

function addRequest(data) {

    let taskObject = data.task;
    let userObject = data.user;

    let requestList = document.querySelector("#request-list");
    let task = document.createElement("li");
    task.setAttribute("data", taskObject.id);
    task.classList.add("item-card", "p-3", "item");
    task.setAttribute("style", "cursor: pointer")
    let [color, status] = statusToString(taskObject.status);
    APIGet(ServiceURL.Service.getById(taskObject.service.id)).then(res => {

        let roomInfo = "";
        if (isOwnerOrAdmin())
            roomInfo = `<div><span class="badge-green p-1 small fw-bold rounded" style="font-size: x-small;">${userObject.roomName}</span></div>`;

        task.innerHTML = `
        <div class="row d-flex justify-content-between align-items-center">
            <div class="col-sm-6 p-0">
                <div class="fw-bold mb-2">${res.data.serviceName}: ${res.data.variant}</div>
                <div class="row">
                    <div class="small col-sm-6 p-0">Diajukan pada</div>
                    <div class="small fw-bold col-sm-6 p-0 text-success">${UNIXtimeConverter(taskObject.createdDate, "DD MMMM YYYY hh:mm")}</div>
                </div>
                <div class="row">
                    <div class="small col-sm-6 p-0">Permintaan pengerjaan</div>
                    <div class="small fw-bold col-sm-6 p-0 text-danger">${UNIXtimeConverter(taskObject.taskDate, "DD MMMM YYYY hh:mm")}</div>
                </div>
            </div>
            <div class="col-sm-6 p-2 pe-0 text-end">
                <div><span class="${color} p-1 small fw-bold rounded" style="font-size: x-small;">${status}</span></div>
                ${roomInfo}
            </div>
        </div>
        <hr style="margin: .5rem 0px;">
        <div class="d-flex justify-content-between">
            <div class="d-flex">
                <div class="text-center">
                    <i class="fa fa-list-alt" style="font-size: var(--font-style)"></i>
                </div>
                <div class="mx-2">
                    <div style="font-style: italic">${taskObject.summary}</div>
                </div>
            </div>
        </div>`
        // <div class="">
        //     <button class="btn bg-primary">Komplain</button>
        // </div>
    })
    task.addEventListener("click", e => {
        goTo(PAGE.TASKDETAIL + e.currentTarget.getAttribute("data"));
    });

    requestList.appendChild(task);
}

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});