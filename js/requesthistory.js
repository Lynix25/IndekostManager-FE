import { APIGet } from "./api.js";
import { goTo, statusToString, UNIXtimeConverter } from "./utils.js";


APIGet("/task").then(res => {
    res.data.data.forEach(service => {
        console.log(service);
        addRequest(service);
    });
})

function addRequest(taskObject) {
    let requestList = document.querySelector("#request-list");
    let task = document.createElement("li");
    task.setAttribute("data", taskObject.id);
    // task.classList.add("border", "rounded", "px-3", "py-1", "m-auto")
    task.classList.add("item")
    let [color, status] = statusToString(taskObject.status);
    APIGet("/service/" + taskObject.serviceId).then(res => {
        task.innerHTML = `<div class="d-flex justify-content-between align-items-center">
    <div>
        <div class="order-room">${res.data.serviceName}</div>
        <div class="order-date">${UNIXtimeConverter(taskObject.createdDate, "D/MMM/YYYY hh:mm")}</div>
    </div>
    <div class="badge ${color}">${status}</div>
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
    </div>`
        // <div class="">
        //     <button class="btn bg-primary">Komplain</button>
        // </div>
    })
    task.addEventListener("click", e => {
        goTo('./taskdetail.html?id=' + e.currentTarget.getAttribute("data"));
    })
    requestList.appendChild(task);
}
