import { APIGet } from "./api.js";
import { PAGE, ServiceURL } from "./config.js";
import { forEach, goBack, goTo, groupingMillisecondsToSameDate, UNIXtimeConverter } from "./utils.js";

APIGet(ServiceURL.Task.getAll('')).then(res => {
    let data = res.data.data;
    let grouping = groupingMillisecondsToSameDate(data, "taskDate", "DDD, D MMM YYYY");
    
    forEach(grouping, (key, value) => {
        let task = document.createElement("li");
        task.classList.add("task", "card-as-container-static", "p-3", "mb-2");

        let day = document.createElement("div");
        day.classList.add("day", "m-0", "px-2");
        day.innerHTML = key;

        let taskList = document.createElement("ul");
        taskList.classList.add("task-list");

        if (value.length > 0)
            forEach(value, taskData => {

                let task = taskData.task;
                APIGet(ServiceURL.Service.getById(task.serviceId)).then(res => {
                    
                    let notes = task.notes == null ? "-" : task.notes;
                    let taskItem = document.createElement("li");
                    taskItem.classList.add("task-card", "border", "rounded", "alert", "alert-info", "m-0", "mb-2", "p-3");
                    taskItem.setAttribute("data", task.id);
                    taskItem.innerHTML =
                        `<div>
                            <div class="d-flex justify-content-between row">
                                <div class="title col-sm-6 p-0">${res.data.serviceName}: ${res.data.variant}</div>
                                <div class="col-sm-6 p-0 info">
                                    <span class="badge badge-green">Nama Kamar</span>
                                    <span class="badge badge-blue">Status</span>
                                </div>
                            </div>
                            <div class="description">${notes}</div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="time">${UNIXtimeConverter(task.taskDate, "hh:mm")}</div>
                                <div class="text-end">
                                    <button type="reject" class="btn btn-sm btn-danger">Tolak</button>
                                    <button type="process" class="btn btn-sm btn-primary">Terima</button>
                                    <button type="update" class="btn btn-sm btn-warning">Perbaharui Info</button>
                                    <button type="finish" class="btn btn-sm btn-success">Selesai</button>
                                </div>
                            </div>
                        </div>`;

                        /* Untuk button yg akan muncul nantinya disesuaikan dengan status task */

                    taskItem.addEventListener("click", e => {
                        goTo(PAGE.TASKDETAIL + e.currentTarget.getAttribute("data"));
                    })
                    taskList.appendChild(taskItem);
                })
            })
        else {
            let taskItem = document.createElement("li");
            taskItem.classList.add("task-card", "alert");
            taskItem.setAttribute("data", task.id);
            taskItem.innerHTML =
                `<div class="d-flex justify-content-between">
                    <div class="title small">Tidak ada agenda</div>
                </div>`;

            taskList.appendChild(taskItem);
        }
        task.appendChild(day);
        task.appendChild(taskList);
        document.querySelector(".agenda").appendChild(task);
    });

});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});