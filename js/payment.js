import { APIGet, APIPost } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { UNIXtimeConverter, filter, getFormValueV2, goBack, handleFormSubmited, numberWithThousandsSeparators } from "./utils.js";

APIGet(ServiceURL.Transaction.unpaid(getCookie("id"))).then(res => {
    let data = res.data;
    let rentItems = data.rentItem;
    let taskItems = data.taskItem;

    if(rentItems.length > 0 || taskItems.length > 0) {

        document.querySelector("#no-payment").setAttribute("hidden", "");

        let unpaidItem = document.querySelector(".cart");
        unpaidItem.removeAttribute("hidden");
    
        rentItems.forEach(rent => {
            let item = document.createElement("li");
            item.classList.add("border-bottom", "mb-1");
            item.innerHTML = `<div class="d-flex align-items-center">
                    <input class="form-check-input m-2 fs-4" type="checkbox" name="${rent.id}" data-price=${rent.price}>
                    <div>
                        <div>Biaya Kos Bulan ${rent.month}</div>
                        <div>Batas bayar: ${UNIXtimeConverter(rent.dueDate, "DD/M/YYYY")}</div>
                    </div>
                </div>
            <div class="text-end">Rp ${numberWithThousandsSeparators(rent.price)}</div>
            `
            unpaidItem.appendChild(item);
        });
    
        taskItems.forEach(taskItem => {
    
            let task = taskItem.task;
            let service = taskItem.service;
            let requestor = taskItem.requestor;
            let item = document.createElement("li");
            item.classList.add("border-bottom", "mb-1");
            item.innerHTML = `<div class="d-flex align-items-center">
                    <input class="form-check-input m-2 fs-4" type="checkbox" name="${task.id}" data-price=${task.charge + task.additionalCharge}>
                    <div>
                        <div>${service.serviceName}: ${service.variant}</div>
                    </div>
                </div>
            <div class="text-end">Rp ${numberWithThousandsSeparators(task.charge + task.additionalCharge)}</div>
            `
            unpaidItem.appendChild(item);
        });
    
        unpaidItem.addEventListener("change", e => {
            let totalPrice = parseInt(document.querySelector(".total-price").getAttribute("data-total-price"));
            let totalSelected = parseInt(document.querySelector(".total-item").getAttribute("data-selected"));
            if (e.target.checked) {
                totalPrice += parseInt(e.target.getAttribute("data-price"));
                totalSelected += 1;
    
            }
            else {
                totalPrice -= parseInt(e.target.getAttribute("data-price"));
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
    let data = filter(getFormValueV2(e.target), (k, v) =>
        v === true ? k : undefined
    );

    APIPost(ServiceURL.Transaction.pay, { "serviceItemIds": data }).then(res => {
        window.snap.pay(res.data, {
            onSuccess: function (result) { alert('success'); console.log(result); },
            onPending: function (result) { alert('pending'); console.log(result); },
            onError: function (result) { alert('error'); console.log(result); },
            onClose: function () { alert('customer closed the popup without finishing the payment'); }
        });
    })
});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});
