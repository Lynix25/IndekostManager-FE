import { APIGet, APIPut } from "./api.js";
import { getUpdateFormValue, getURLParam, handleFormSubmited } from "./utils.js";

APIGet("/user/" + getURLParam("id")).then(res => {
    let user = res.data;
    reloadData(user)
    // console.log(user);
    // let nameInput = document.querySelector("#name");
    // nameInput.setAttribute("value", user.name);

    // let aliasInput = document.querySelector("#alias");
    // aliasInput.setAttribute("value", user.alias);

    // let roomInput = document.querySelector("#room");
    // roomInput.setAttribute("value", user.roomId);
    // roomInput.setAttribute("disabled", "");

    // let emailInput = document.querySelector("#email");
    // emailInput.setAttribute("value", user.email);

    // let jobInput = document.querySelector("#job");
    // jobInput.setAttribute("value", user.job);

    // let phoneInput = document.querySelector("#phone");
    // phoneInput.setAttribute("value", user.phone);

    // let genderInput = document.querySelector("#gender");
    // genderInput.setAttribute("value", user.gender == "Male" ? "Laki - laki" : "Perempuan");
    // genderInput.setAttribute("disabled", "");

    // let identityCardShow = document.getElementById("identityCardImageTag");
    // identityCardShow.src = convertImage64ToSrc(user.identityCardImage);
})

function reloadData(user){
    let nameInput = document.querySelector("#name");
    nameInput.setAttribute("value", user.name);

    let aliasInput = document.querySelector("#alias");
    aliasInput.setAttribute("value", user.alias);

    let roomInput = document.querySelector("#room");
    roomInput.setAttribute("value", user.roomId);

    let emailInput = document.querySelector("#email");
    emailInput.setAttribute("value", user.email);

    let jobInput = document.querySelector("#job");
    jobInput.setAttribute("value", user.job);

    let phoneInput = document.querySelector("#phone");
    phoneInput.setAttribute("value", user.phone);

    let genderInput = document.querySelector("#gender");
    genderInput.setAttribute("value", user.gender == "Male" ? "Laki - laki" : "Perempuan");

}

handleFormSubmited(e => {
    let data = getUpdateFormValue(e.target);

    APIPut("/user/" + getURLParam("id"), data).then(res => {
        console.log(res);
        reloadData(res.data.data);
    })
})

document.addEventListener("change", e => {
    e.target.setAttribute("changed", "");
})