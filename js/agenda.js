import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { forEach, goTo, groupingMillisecondsToSameDate, UNIXtimeConverter } from "./utils.js";

APIGet(ServiceURL.Task.getAll('')).then(res => {
    let data = res.data.data;
    let grouping = groupingMillisecondsToSameDate(data, "taskDate", "DDD, D MMM YYYY");
    
    forEach(grouping, (key, value) => {
        let task = document.createElement("li");
        task.classList.add("task");

        let day = document.createElement("div");
        day.classList.add("day");
        day.innerHTML = key;

        let taskList = document.createElement("ul");
        taskList.classList.add("task-list");

        if (value.length > 0)
            forEach(value, task => {
                APIGet(ServiceURL.Service.getById(task.serviceId)).then(res => {
                    
                    let notes = task.notes == null ? "-" : task.notes;

                    let taskItem = document.createElement("li");
                    taskItem.classList.add("task-card", "border", "rounded");
                    taskItem.setAttribute("data", task.id);
                    taskItem.innerHTML =
                        `<div>
                        <div class="d-flex justify-content-between">
                            <div class="title">${res.data.serviceName}</div>
                            <span><i class="fa-solid fa-info-circle"></i></span>
                        </div>
                        <div>
                            ${notes}
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="time">${UNIXtimeConverter(task.taskDate, "hh:mm")}</div>
                            <div class="text-end">
                                <button class="btn btn-danger">Cancel</button>
                                <button class="btn btn-success">Finish</button>
                            </div>
                        </div>
                    </div>`;

                    taskItem.addEventListener("click", e => {
                        goTo('./taskdetail.html?id=' + e.currentTarget.getAttribute("data"));
                    })
                    taskList.appendChild(taskItem);
                })
            })
        else {
            let taskItem = document.createElement("li");
            taskItem.classList.add("task-card", "border", "rounded");
            taskItem.setAttribute("data", task.id);
            taskItem.innerHTML =
                `<div class="d-flex justify-content-between">
                <div class="title">Tidak ada agenda</div>
            </div>`;

            taskList.appendChild(taskItem);
        }
        task.appendChild(day);
        task.appendChild(taskList);
        document.querySelector(".agenda").appendChild(task);
    });

})