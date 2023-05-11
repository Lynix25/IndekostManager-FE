import { APIGet, APIPost } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValue, getFormValueV2, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValueV2(e.target);
    
    APIPost(ServiceURL.User.register, data, {"Requester-ID" : getCookie("id"), "Content-Type": "multipart/form-data"}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

})

APIGet("/room").then(res => {
    console.log(res.data.data)
    addOptions("#room", res.data.data, "name");
})

function addOptions(selector, arrayOfObjectOptions, innerHTMLKey, valueKey = "id") {
    let selection = document.querySelector(selector);

    arrayOfObjectOptions.forEach(object => {
        let option = document.createElement("option");
        option.innerHTML = object.room.name;
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
})