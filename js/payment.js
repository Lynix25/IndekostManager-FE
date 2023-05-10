import { APIGet, APIPost, APIPut } from "./api.js";
import { PAGE, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { UNIXtimeConverter, createElementFromString, filter, forEach, getFormValueV2, goBack, goTo, handleFormSubmited, numberWithThousandsSeparators } from "./utils.js";

APIGet(ServiceURL.Transaction.unpaid(getCookie("id"))).then(res => {
    let data = res.data;
    let rentItems = data.rentItem;
    let taskItems = data.taskItem;

    if (rentItems.length > 0 || taskItems.length > 0) {

        document.querySelector("#no-payment").setAttribute("hidden", "");

        let unpaidItem = document.querySelector(".cart");
        unpaidItem.removeAttribute("hidden");

        let rentsElements = document.createElement("span");
        rentsElements.setAttribute("group-name", "rentItemIds");
        rentItems.forEach(rent => {
            let itemElement = `
            <li class="border-bottom mb-1">
                <div class="d-flex align-items-center">
                    <input class="form-check-input m-2 fs-4" type="checkbox" name="${rent.id}" value=${rent.price}>
                    <div>
                        <div>Biaya Kos Bulan ${rent.month}</div>
                        <div>Batas bayar: ${UNIXtimeConverter(rent.dueDate, "DD/M/YYYY")}</div>
                    </div>
                </div>
                <div class="text-end">Rp ${numberWithThousandsSeparators(rent.price)}</div>
            </li>
            `
            rentsElements.appendChild(createElementFromString(itemElement));
        });
        unpaidItem.appendChild(rentsElements);

        let tasksElements = document.createElement("span");
        tasksElements.setAttribute("group-name", "taskItemIds");
        taskItems.forEach(taskItem => {
            let task = taskItem.task;
            let service = taskItem.service;
            let taskElement = `
            <li class="border-bottom mb-1">
                <div class="d-flex align-items-center">
                <input class="form-check-input m-2 fs-4" type="checkbox" name="${task.id}" value=${task.charge + task.additionalCharge}>
                    <div>${service.serviceName}: ${service.variant}</div>
                </div>
                <div class="text-end">Rp ${numberWithThousandsSeparators(task.charge + task.additionalCharge)}</div>
            </li>
            `
            tasksElements.appendChild(createElementFromString(taskElement));
        });
        unpaidItem.appendChild(tasksElements);

        unpaidItem.addEventListener("change", e => {
            let totalPrice = parseInt(document.querySelector(".total-price").getAttribute("data-total-price"));
            let totalSelected = parseInt(document.querySelector(".total-item").getAttribute("data-selected"));
            if (e.target.checked) {
                totalPrice += parseInt(e.target.getAttribute("value"));
                totalSelected += 1;

            }
            else {
                totalPrice -= parseInt(e.target.getAttribute("value"));
                totalSelected -= 1;
            }
            document.querySelector(".total-price").setAttribute("data-total-price", totalPrice);
            document.querySelector(".total-price").innerHTML = "Rp. " + numberWithThousandsSeparators(totalPrice);

            document.querySelector(".total-item").setAttribute("data-selected", totalSelected);
            document.querySelector(".total-item").innerHTML = totalSelected;
        });
    }
})

handleFormSubmited(e => {
    let formData = getFormValueV2(e.target);
    let data = { "taskItemIds": [], "rentItemIds": [] };

    forEach(formData, (k, v) => {
        forEach(v, value => {
            forEach(value, (itemId, val) => {
                if(val) data[k].push(itemId);
            })
        })
    })

    APIPost(ServiceURL.Transaction.pay, data).then(res => {
        window.snap.pay(res.data.token, {
            onSuccess: function (result) { alert('success'); console.log(result); goTo(PAGE.HOME)},
            onPending: function (result) { alert('pending'); console.log(result); goTo(PAGE.HOME)},
            onError: function (result) { alert('error'); console.log(result); goTo(PAGE.HOME)},
            onClose: function () { alert('customer closed the popup without finishing the payment'); goTo(PAGE.HOME)}
        });

    })
});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});
