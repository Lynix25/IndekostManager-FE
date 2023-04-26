import { APIGet, APIPost } from "./api.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getFormValue, goTo, handleFormSubmited, numberWithThousandsSeparators } from "./utils.js";
import { MasterService } from "./masterdata/masterservice.js"
import { Toast } from "./component/toast.js";

handleFormSubmited((e) => {
    let data = getFormValue(e.target);
    APIPost(ServiceURL.Service.getAll, data).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        setTimeout(function() { goTo('./service.html') }, Event.timeout);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
})

APIGet(ServiceURL.Service.getAll).then(res => {

    let count = 0;
    MasterService.forEach(masterService => {
        count++;
        let option = document.createElement("option");
        option.innerHTML = masterService.name;
        document.querySelector("#serviceName").appendChild(option);
        document.querySelector(`#category${count}`).innerHTML = masterService.name.toUpperCase();
    });

    let services = res.data.data;

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    services.forEach(service => {
        if(service.serviceName === Constant.serviceCategory.LAUNDRY) {
            count1++;
            let categoryItem = document.createElement("tr");
            categoryItem.innerHTML = `
                <td class="text-truncate">${service.variant}</td>
                <td style="width: 120px">Rp ${numberWithThousandsSeparators(service.price)}</td>
            `;
            document.querySelector("#service-list-category1").appendChild(categoryItem);
        }
        else if(service.serviceName === Constant.serviceCategory.PEMBERSIHAN_KAMAR) {
            count2++;
            let categoryItem = document.createElement("tr");
            categoryItem.innerHTML = `
                <td class="text-truncate">${service.variant}</td>
                <td style="width: 120px">Rp ${numberWithThousandsSeparators(service.price)}</td>
            `;
            document.querySelector("#service-list-category2").appendChild(categoryItem);
        }
        else if(service.serviceName === Constant.serviceCategory.PERBAIKAN_FASILITAS) {
            count3++;
            let categoryItem = document.createElement("tr");
            categoryItem.innerHTML = `
                <td class="text-truncate">${service.variant}</td>
                <td style="width: 120px">Rp ${numberWithThousandsSeparators(service.price)}</td>
            `;
            document.querySelector("#service-list-category3").appendChild(categoryItem);
        }
        else {
            count4++;
            let categoryItem = document.createElement("tr");
            categoryItem.innerHTML = `
                <td class="text-truncate">${service.variant}</td>
                <td style="width: 120px">Rp ${numberWithThousandsSeparators(service.price)}</td>
            `;
            document.querySelector("#service-list-category4").appendChild(categoryItem);
        }
    });

    if(count1 == 0) document.querySelector("#table1").classList.add("invisible");
    if(count2 == 0) document.querySelector("#table2").classList.add("invisible");
    if(count3 == 0) document.querySelector("#table3").classList.add("invisible");
    if(count4 == 0) document.querySelector("#table4").classList.add("invisible");
});