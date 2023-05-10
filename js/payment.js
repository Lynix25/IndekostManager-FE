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

        rentItems.forEach(rent => {
            let itemElement = `
            <li class="border-bottom mb-1">
                <div class="d-flex align-items-center">
                    <input class="form-check-input m-2 fs-4" type="checkbox" name="${rent.id}" data-price=${rent.price}>
                    <div>
                        <div>Biaya Kos Bulan ${rent.month}</div>
                        <div>Batas bayar: ${UNIXtimeConverter(rent.dueDate, "DD/M/YYYY")}</div>
                    </div>
                </div>
                <div class="text-end">Rp ${numberWithThousandsSeparators(rent.price)}</div>
            </li>
            `
            unpaidItem.appendChild(createElementFromString(itemElement));
        });

        taskItems.forEach(taskItem => {
            let task = taskItem.task;
            let service = taskItem.service;
            let taskElement = `
            <li class="border-bottom mb-1">
                <div class="d-flex align-items-center">
                <input class="form-check-input m-2 fs-4" type="checkbox" name="${task.id}" data-price=${task.charge + task.additionalCharge}>
                    <div>${service.serviceName}: ${service.variant}</div>
                </div>
                <div class="text-end">Rp ${numberWithThousandsSeparators(task.charge + task.additionalCharge)}</div>
            </li>
            `
            unpaidItem.appendChild(createElementFromString(taskElement));
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
    
    APIPost(ServiceURL.Transaction.pay, { "taskItemIds": data }).then(res => {
        forEach(res.data.taskItems, (v) => {
            APIPut(ServiceURL.Task.update(v.id), {transactionId : res.data.id}).then(e => {
                console.log(e);
            }).catch(err => {
                console.log(err);
            })
        })

        // forEach(res.data.rentItems, (v) => {
        //     APIPut(ServiceURL.Rent.onlyUpdateTransaction(v.id, res.data.id), {}).then(e => {
        //         console.log(e);
        //     })
        // })

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
