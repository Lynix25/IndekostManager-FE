import { APIGet, forEach, groupingMillisecondsToSameDate, UNIXtimeConverter } from "./utils.js";

APIGet("/task").then(res => {
    let data = res.data.data;
    let grouping = groupingMillisecondsToSameDate(res.data.data, "createdDate", "D MMM YYYY");

    forEach(grouping, (key, value) => {
        let task = document.createElement("li");
        task.classList.add("task");

        let day = document.createElement("div");
        day.classList.add("day");
        day.innerHTML = key;

        let taskList = document.createElement("ul");
        taskList.classList.add("task-list");

        forEach(grouping[key], task => {
            APIGet("/service/" + task.serviceId).then(res => {
                let taskItem = document.createElement("li");
                taskItem.classList.add("task-card", "border", "rounded");
                taskItem.setAttribute("data", task.id);
                taskItem.innerHTML = `<div class="d-flex justify-content-between">
                <div class="title">${res.data.serviceName}</div>
                <span><i class="fa-solid fa-info-circle"></i></span>
            </div>
            <div>
                ${task.notes}
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div class="time">${UNIXtimeConverter(task.taskDate, "hh:mm")}</div>
                <div class="text-end">
                    <button class="btn btn-danger">Cancel</button>
                    <button class="btn btn-success">Finish</button>
                </div>
            </div>`;
                taskItem.addEventListener("click", e => {
                    window.location.replace('./taskdetail.html?id=' + e.currentTarget.getAttribute("data"));
                })
                taskList.appendChild(taskItem);
            })
        })
        task.appendChild(day);
        task.appendChild(taskList);
        document.querySelector(".agenda").appendChild(task);
    }, "ASC");

})