import { APIGet } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, PAGE, ServiceURL } from "./config.js";
import { convertDateToMillis, createElementFromString, filter, forEach, getCurrentWeekList, getDateRange, goBack, goTo, groupingMillisecondsToSameDate, isInSameDay, map, map2, UNIXtimeConverter, UNIXtimeRemoveTime } from "./utils.js";

APIGet(ServiceURL.Task.getAll('')).then(res => {
    let data = res.data.data;
    let grouping = groupingMillisecondsToSameDate(data, "taskDate", "DDD, D MMM YYYY");

    let groupingTask = {};
    forEach(data, v => {
        let key = UNIXtimeRemoveTime(v.task.taskDate);
        if (!(key in groupingTask)) groupingTask[key] = [];
        groupingTask[key].push(v);
    })

    showAgenda(groupingTask, +new Date())
    document.addEventListener("change", e => {
        let startDateMillis = convertDateToMillis(document.querySelector("#startDate").value);
        let endDateMillis = convertDateToMillis(document.querySelector("#endDate").value);
        if(e.target.getAttribute("name") === "startDate"){
            document.querySelector("#endDate").setAttribute("min", e.target.value);
        }
        showAgenda(groupingTask, startDateMillis, endDateMillis);
    })
});

function showAgenda(data, startDateMillis, endDateMillis) {
    document.querySelector(".agenda").innerHTML = "";
    let d = getDateRange(startDateMillis, endDateMillis);//.reduce((a, key) => Object.assign(a, { [key]: [] }), {});
    d.forEach(_ => {
        let taskElement = `
        <li class="task card-as-container-static p-3 mb-2">
            <div class="day m-0 px-2">
            ${UNIXtimeConverter(_, "DDD, D MMM YYYY")}
            </div>
            <ul class="task-list">
                ${map2(data[_], v =>
            v ?
                `<li class="task-card border rounded alert alert-info m-0 mb-2 p-3" data="${"id"}">
                        <div>
                            <div class="d-flex justify-content-between row">
                                <div class="title col-sm-6 p-0">${v.task.service.serviceName}: ${v.task.service.variant}</div>
                                <div class="col-sm-6 p-0 info">
                                    <span class="badge badge-green">Nama Kamar</span>
                                    <span class="badge badge-blue">Status</span>
                                </div>
                            </div>
                            <div class="description">${v.task.notes}</div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="time">${UNIXtimeConverter(v.task.taskDate, "hh:mm")}</div>
                                <div class="text-end">
                                    <button type="reject" class="btn btn-sm btn-danger">Tolak</button>
                                    <button type="process" class="btn btn-sm btn-primary">Terima</button>
                                    <button type="update" class="btn btn-sm btn-warning">Perbaharui Info</button>
                                    <button type="finish" class="btn btn-sm btn-success">Selesai</button>
                                </div>
                            </div>
                        </div>
                    </li>`:
                `<li class="task-card alert">
                        <div class="d-flex justify-content-between">
                            <div class="title small">Tidak ada agenda</div>
                        </div>
                    </li>`
        )}
            </ul>
        </li>`
        document.querySelector(".agenda").appendChild(createElementFromString(taskElement));
    })
}

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});