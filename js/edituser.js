import { APIGet, APIPut, convertImage64ToSrc, getCookie, getFormValue, handleFormSubmited } from "./utils.js";

APIGet("/user/" + getCookie("tokens")).then(res => {
    let user = res.data;
    console.log(user);
    let nameInput = document.querySelector("#name");
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

    // let identityCardShow = document.getElementById("identityCardImageTag");
    // identityCardShow.src = convertImage64ToSrc(user.identityCardImage);
})

handleFormSubmited(e => {
    let data = getFormValue(e.target);
    let imageData = { "image": data.identityCardImage };
    // delete data.identityCardImage;
    APIPut("/user/" + getCookie("tokens"), data).then(res => {
        console.log(res);
        location.reload();
    })

    // APIPut("/user/image/" + getCookie("tokens"), imageData).then(res => {
    //     console.log(res);
    // })

    // console.log(data);
})