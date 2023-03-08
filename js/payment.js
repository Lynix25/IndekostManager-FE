import { addCustomEventListener, addCustomEventListenerV2, APIGet, getCookie, getFormValue, getFormValueBeta, numberWithThousandsSeparators, UNIXtimeConverter } from "./utils.js";

APIGet("/transaction/unpaid/" + getCookie("tokens")).then(res => {
    let data = res.data;
    let unpaidItem = document.querySelector(".cart");
    let rentItems = data.rentItem;
    let serviceItems = data.serviceItem;
    
    console.log(data);

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

    serviceItems.forEach(service => {
        let item = document.createElement("li");
        item.classList.add("border-bottom", "mb-1");
        item.innerHTML = `<div class="d-flex align-items-center">
                <input class="form-check-input m-2 fs-4" type="checkbox" name="${service.id}" data-price=${service.price}>
                <div>
                    <div>${service.serviceName}</div>
                    <div>${service.variant}</div>
                </div>
            </div>
        <div class="text-end">Rp ${numberWithThousandsSeparators(service.price)}</div>
        `
        unpaidItem.appendChild(item);
    });

    unpaidItem.addEventListener("change", e => {
        let totalPrice = parseInt(document.querySelector(".total-price").getAttribute("data-total-price"));
        let totalSelected = parseInt(document.querySelector(".total-item").getAttribute("data-selected"));
        if(e.target.checked){
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
    })

    // document.querySelector(".total-price").

})

addCustomEventListenerV2("pay", e => {
    let data = getFormValue(e.target);
    // console.log(document.querySelector(".cart").children[0].children[0].children[0].type);
    console.log(data);
}, document.querySelector("form"), document.querySelector("button[type='pay']"));