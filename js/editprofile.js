import { APIGet, APIPut } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getUpdateFormValue, handleFormSubmited } from "./utils.js";

APIGet(ServiceURL.User.getById(getCookie("id"))).then(res => {
    let user = res.data.data.user;

    let nameInput = document.querySelector("#name");
    nameInput.setAttribute("disabled", "");
    nameInput.setAttribute("value", user.name);

    let aliasInput = document.querySelector("#alias");
    aliasInput.setAttribute("value", user.alias);

    let roomInput = document.querySelector("#room");
    roomInput.setAttribute("value", user.roomId);
    roomInput.setAttribute("disabled", "");
    
    let emailInput = document.querySelector("#email");
    emailInput.setAttribute("value", user.email);

    let jobInput = document.querySelector("#job");
    jobInput.setAttribute("value", user.job);

    let phoneInput = document.querySelector("#phone");
    phoneInput.setAttribute("value", user.phone);

    let genderInput = document.querySelector("#gender");
    genderInput.setAttribute("value", user.gender == "Male" ? "Laki - laki" : "Perempuan");
    genderInput.setAttribute("disabled", "");
})

document.addEventListener("change", e => {
    e.target.setAttribute("changed","");
    console.log(e.target);
})

handleFormSubmited(e => {
    let data = getUpdateFormValue(e.target);
    
    APIPut(ServiceURL.User.getById(getCookie("id")), data).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
})