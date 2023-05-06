import { APIGet, APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, ServiceURL } from "./config.js";
import { addCustomEventListener, getParamOnURL, getTicketRequest, isOwnerOrAdmin, numberWithThousandsSeparators, statusToString, UNIXtimeConverter } from "./utils.js";

APIGet(ServiceURL.Task.getById(getParamOnURL("id"))).then(res => {
    let data = res.data.data;
    reloadData(data);
});

function reloadData(dataTask) {

    let data = dataTask.task;
    let dataDetail = dataTask.user;

    console.log(data)

    document.querySelector(".id").innerHTML = `Kode pengajuan: ${getTicketRequest(data.id, data.createdDate)}`;

    let [color, status] = statusToString(data.status);
    document.querySelector(".status").innerHTML = `<div class="badge ${color}">${status}</div>`;
    
    document.querySelector(".requesterUser").innerHTML = dataDetail.userName;
    document.querySelector(".roomUser").innerHTML = dataDetail.roomName;
    document.querySelector(".createdDate").innerHTML = UNIXtimeConverter(data.createdDate, "DD MMMM YYYY hh:mm");
    document.querySelector(".taskDate").innerHTML = UNIXtimeConverter(data.taskDate, "DD MMMM YYYY hh:mm");
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    
    // document.querySelector("#additionalCharge").setAttribute("value", data.additionalCharge);
    // document.querySelector("#additionalCharge").innerHTML = data.additionalCharge;
    document.querySelector("#notes").innerHTML = data.notes;
    document.querySelector("#notes").setAttribute("value", data.notes);
    document.querySelector("#summary").innerHTML = data.summary;
    
    APIGet(ServiceURL.Service.getById(data.serviceId)).then(res => {

        let serviceName = res.data.serviceName;
        if(serviceName === Constant.serviceCategory.LAUNDRY) {
            // document.querySelector("#quantity-container").removeAttribute("hidden");
            document.querySelector(".quantity").innerHTML = data.requestedQuantity;
        } 

        document.querySelector(".service").innerHTML = serviceName;
        document.querySelector(".variant").innerHTML = res.data.variant;
        document.querySelector(".price").innerHTML = `Rp ${numberWithThousandsSeparators(res.data.price)}`;    
        document.querySelector("#final-price").setAttribute("initialValue", numberWithThousandsSeparators(res.data.price));
        document.querySelector("#final-price").innerHTML = `Rp ${numberWithThousandsSeparators(res.data.price)}`;
    });
    
    if(isOwnerOrAdmin()) {
        if(data.status  === Constant.serviceRequestStatus.REJECTED || 
            data.status === Constant.serviceRequestStatus.COMPLETED) {
            // Hide all button. Tandanya, service request closed dan tidak bisa dilakukan update lagi
            document.querySelector(".card-footer").setAttribute("hidden", "");
            document.querySelector("#additionalCharge").setAttribute("disabled", "");
            document.querySelector("#notes").setAttribute("disabled", "");
            document.querySelector("#notes").setAttribute("placeholder", "");
        }  
        else if(data.status === Constant.serviceRequestStatus.SUBMITTED) {
            // Show only button update & process
            document.querySelector("[type='reject']").removeAttribute("hidden", "");
            document.querySelector("[type='update']").setAttribute("hidden", "");
            document.querySelector("[type='process']").removeAttribute("hidden", "");
            document.querySelector("[type='finish']").setAttribute("hidden", "");

            document.querySelector("#additionalCharge").removeAttribute("disabled");
            document.querySelector("#notes").removeAttribute("disabled");
        }
        else if (data.status === Constant.serviceRequestStatus.ACCEPTED) {
            // Show only button update & finish
            document.querySelector("[type='reject']").setAttribute("hidden", "");
            document.querySelector("[type='accept']").setAttribute("hidden", "");
            document.querySelector("[type='update']").removeAttribute("hidden", "");
            document.querySelector("[type='process']").setAttribute("hidden", "");
            document.querySelector("[type='finish']").removeAttribute("hidden", "");
        }
    } else {
        document.querySelector("#additionalCharge").setAttribute("disabled", "");
        document.querySelector(".card-footer").setAttribute("hidden", "");
        if(data.notes == null || data.notes === "")
            document.querySelector("#notes").setAttribute("placeholder", "");
    }
}

document.addEventListener("change", e => {
    e.target.setAttribute("changed","");
    e.target.setAttribute("value", e.target.value);
    // console.log(e.target.value)
})

addCustomEventListener("reject", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.REJECTED,
        "notes": notes.value, 
        "additionalCharge": additionalCharge.value
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        reloadData(response.data.data);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
}, document.querySelector("[type='reject']"));

addCustomEventListener("process", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.ACCEPTED,
        "notes": notes.value,
        "additionalCharge": additionalCharge.value
    }).then(response => {
        reloadData(response.data.data);
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
    }).catch(err => {
        if (err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
        else Toast(Constant.httpStatus.ERROR, err.data.message);
    });
}, document.querySelector("[type='process']"))

addCustomEventListener("update", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.ACCEPTED,
        "notes": notes.value,
        "additionalCharge": additionalCharge.value
    }).then(response => {
        reloadData(response.data.data);
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
    }).catch(err => {
        if (err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
        else Toast(Constant.httpStatus.ERROR, err.data.message);
    });
}, document.querySelector("[type='update']"));

addCustomEventListener("finish", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.COMPLETED,
        "notes": notes.value, 
        "additionalCharge": additionalCharge.value
    }).then(response => {
        reloadData(response.data.data);
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
    }).catch(err => {
        if (err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
        else Toast(Constant.httpStatus.ERROR, err.data.message);
    });
}, document.querySelector("[type='finish']"));

