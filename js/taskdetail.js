import { APIGet, APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, ServiceURL } from "./config.js";
import { addCustomEventListener, getURLParam, isOwnerOrAdmin, numberWithThousandsSeparators, statusToString, UNIXtimeConverter } from "./utils.js";

APIGet(ServiceURL.Task.getById(getURLParam("id"))).then(res => {
    let data = res.data.data;
    // console.log(data)
    reloadData(data);
});

function reloadData(data) {
    document.querySelector(".id").innerHTML = data.id;

    let [color, status] = statusToString(data.status);
    document.querySelector(".status").innerHTML = `<div class="badge ${color}">${status}</div>`;
    
    APIGet(ServiceURL.User.getById(data.createdBy)).then(response => {
        document.querySelector(".requesterUser").innerHTML = response.data.data.user.name;
    });
    document.querySelector(".createdDate").innerHTML = UNIXtimeConverter(data.createdDate, "DD MMMM YYYY hh:mm");
    document.querySelector(".taskDate").innerHTML = UNIXtimeConverter(data.taskDate, "DD MMMM YYYY hh:mm");
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    
    document.querySelector("#price").setAttribute("value", data.charge);
    document.querySelector("#price").innerHTML = data.charge;
    document.querySelector("#notes").innerHTML = data.notes;
    document.querySelector("#notes").setAttribute("value", data.notes);
    document.querySelector("#summary").innerHTML = data.summary;
    
    APIGet(ServiceURL.Service.getById(data.serviceId)).then(res => {
        // document.querySelector(".category").innerHTML = res.data.serviceName;
        document.querySelector(".service").innerHTML = res.data.serviceName;
        document.querySelector(".variant").innerHTML = res.data.variant;
        document.querySelector(".price").innerHTML = `Rp ${numberWithThousandsSeparators(res.data.price)}`;    
    });

    if(isOwnerOrAdmin()) {
        if(data.status  === Constant.serviceRequestStatus.REJECTED || 
            data.status === Constant.serviceRequestStatus.COMPLETED) {
            // Hide all button. Tandanya, service request closed dan tidak bisa dilakukan update lagi
            document.querySelector(".card-footer").setAttribute("hidden", "");
            document.querySelector("#price").setAttribute("disabled", "");
            document.querySelector("#notes").setAttribute("disabled", "");
            document.querySelector("#notes").setAttribute("placeholder", "");
        }  
        else if(data.status === Constant.serviceRequestStatus.SUBMITTED) {
            // Show only button update & process
            document.querySelector("[type='reject']").removeAttribute("hidden", "");
            document.querySelector("[type='accept']").removeAttribute("hidden", "");
            document.querySelector("[type='update']").setAttribute("hidden", "");
            document.querySelector("[type='process']").setAttribute("hidden", "");
            document.querySelector("[type='finish']").setAttribute("hidden", "");

            document.querySelector("#price").setAttribute("disabled", "");
            document.querySelector("#notes").setAttribute("disabled", "");
            document.querySelector("#notes").setAttribute("placeholder", "");
        }
        else if(data.status === Constant.serviceRequestStatus.ACCEPTED) {
            // Show only button process & reject
            document.querySelector("[type='reject']").removeAttribute("hidden", "");
            document.querySelector("[type='accept']").setAttribute("hidden", "");
            document.querySelector("[type='update']").setAttribute("hidden", "");
            document.querySelector("[type='process']").removeAttribute("hidden", "");
            document.querySelector("[type='finish']").setAttribute("hidden", "");

            document.querySelector("#notes").removeAttribute("disabled", "");
            document.querySelector("#price").removeAttribute("disabled", "");
        } 
        else if (data.status === Constant.serviceRequestStatus.ON_PROCESS) {
            // Show only button update & finish
            document.querySelector("[type='reject']").setAttribute("hidden", "");
            document.querySelector("[type='accept']").setAttribute("hidden", "");
            document.querySelector("[type='update']").removeAttribute("hidden", "");
            document.querySelector("[type='process']").setAttribute("hidden", "");
            document.querySelector("[type='finish']").removeAttribute("hidden", "");
        }
    } else {
        document.querySelector("#price").setAttribute("disabled", "");
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
        "charge": price.value
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        reloadData(response.data.data);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
}, document.querySelector("[type='reject']"));

addCustomEventListener("accept", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.ACCEPTED,
        "notes": notes.value,
        "charge": price.value
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        reloadData(response.data.data);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
}, document.querySelector("[type='accept']"));

addCustomEventListener("process", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.ON_PROCESS,
        "notes": notes.value,
        "charge": price.value
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        reloadData(response.data.data);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
}, document.querySelector("[type='process']"))

addCustomEventListener("update", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.ON_PROCESS,
        "notes": notes.value,
        "charge": price.value
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        reloadData(response.data.data);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
}, document.querySelector("[type='update']"));

addCustomEventListener("finish", e => {
    APIPut(ServiceURL.Task.update(getURLParam('id')), { 
        "status": Constant.serviceRequestStatus.COMPLETED,
        "notes": notes.value, 
        "charge": price.value
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        reloadData(response.data.data);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
}, document.querySelector("[type='finish']"));
