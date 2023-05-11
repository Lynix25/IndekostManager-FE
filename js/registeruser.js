import { APIGet, APIPost } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, Event, PAGE, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValue, getFormValueV2, getUserID, goBack, goTo, handleFormSubmited } from "./utils.js";

let currRole = document.querySelector("#role");
if(currRole.value !== Constant.role.TENANT)
    document.querySelector(".room").setAttribute("hidden", "");
else 
    document.querySelector(".room").removeAttribute("hidden");

currRole.addEventListener("change", e => {
    let value = e.target.value;

    if(currRole.value !== Constant.role.TENANT)
        document.querySelector(".room").setAttribute("hidden", "");
    else 
        document.querySelector(".room").removeAttribute("hidden");
});


handleFormSubmited(e => {
    let data = getFormValueV2(e.target);
    Object.keys(data).forEach(function(key) {
        if(key === 'married') {
            data[key] = (data[key] === Constant.userAttribute.maritalStatus.MARRIED ? true : false);
        }
        if(data['role'] === Constant.role.ADMIN) {
            data['room'] = null;
        }
        if(data[key] === "" || data[key] == undefined) data[key] = null
    });
    if(data['identityCardImage'] != undefined && data['identityCardImage'] != null && data['identityCardImage'].size/Constant.image.dividersImageSizeByteToMB > Constant.image.maxSize) {
        Toast(Constant.httpStatus.ERROR, `Ukuran file lebih besar dari ${Constant.image.maxSize}MB`);
    } else {
        APIPost(ServiceURL.User.register, data, { 
            "requesterId" : getUserID(), 
            "Content-Type" : "multipart/form-data"
        }).then(response => {
            Toast(Constant.httpStatus.SUCCESS, response.data.message);
            setTimeout(function () { goTo(PAGE.USERLIST)}, Event.timeout);
        }).catch(err => {
            if (err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
            else Toast(Constant.httpStatus.ERROR, err.data.message);
        });
    }
})

if(getCookie('role') !== Constant.role.OWNER) {
    document.querySelector("#adminOption").setAttribute("hidden", "");
    document.querySelector("#role").setAttribute("disabled", "");
}


APIGet(ServiceURL.Room.getAll).then(res => {
    let data = res.data.data;
    addOptions("#room", data, "name");
});

function addOptions(selector, arrayOfObjectOptions, innerHTMLKey, valueKey = "name") {
    let selection = document.querySelector(selector);

    arrayOfObjectOptions.forEach(object_ => {
        let object = (innerHTMLKey === "name" ? object_.room : object_);
        let option = document.createElement("option");
        option.innerHTML = object[innerHTMLKey];
        option.setAttribute('value', object[valueKey]);
        selection.appendChild(option);
    });
}

document.querySelector("#identityCardImage").addEventListener("change", event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    let loading = document.createElement("i");

    reader.addEventListener("loadend", e => {
        document.querySelector(".fa-spin").setAttribute("hidden", "")
        event.target?.parentElement.querySelector("img").setAttribute("src", reader.result);
    })

    reader.addEventListener("loadstart", e => {
        document.querySelector(".fa-spin").removeAttribute("hidden")
    })

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});