import { APIGet, APIPut } from "./api.js";
import { Constant, PAGE, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getUpdateFormValue, getParamOnURL, handleFormSubmited, goBack, goTo } from "./utils.js";

if(getCookie('role') !== Constant.role.TENANT) {
    document.querySelector(".room").setAttribute("hidden", "");
} else {
    document.querySelector(".room").removeAttribute("hidden");
}

APIGet(ServiceURL.User.getById(getParamOnURL("id"))).then(res => {
    let data = res.data.data;
    reloadData(data)
});

function reloadData(data){

    let user = data.user;
    let room = data.room;

    let nameInput = document.querySelector("#name");
    nameInput.setAttribute("value", user.name);

    let aliasInput = document.querySelector("#alias");
    aliasInput.setAttribute("value", user.alias);

    let emailInput = document.querySelector("#email");
    emailInput.setAttribute("value", user.email);

    let phoneInput = document.querySelector("#phone");
    phoneInput.setAttribute("value", user.phone);

    let genderInput = document.querySelector("#gender");
    setSelected(genderInput, user.gender);

    let statusInput = document.querySelector("#married");
    statusInput.setAttribute("value", user.married == true ? Constant.userAttribute.maritalStatus.MARRIED : Constant.userAttribute.maritalStatus.SINGLE);
    
    let jobInput = document.querySelector("#job");
    jobInput.setAttribute("value", user.job);

    let roleInput = document.querySelector("#role");
    setSelected(roleInput, user.role.name);

    if(getCookie('role') === Constant.role.TENANT) {
        document.querySelector(".card-footer").setAttribute("hidden", "");
    } else {
        if(getCookie('role') === Constant.role.OWNER && user.role.name === Constant.role.OWNER)
            document.querySelector(".card-footer").removeAttribute("hidden", "");
        else {
            if(user.role.name === Constant.role.TENANT)
                document.querySelector(".card-footer").removeAttribute("hidden", "");
            else {
                document.querySelector(".card-footer").setAttribute("hidden", "");
            }
        }
    }

    if(room != null) {
        let roomInput = document.querySelector("#room");
        roomInput.setAttribute("value", room.name);
    }


    let descriptionInput = document.querySelector("#description");
    descriptionInput.innerHTML = (user.description != null ? user.description : "-");

    let image = user.identityCardImage;
    let src;
    if(image == null || image.trim() === "") src = "asset/no_image.png"
    else src = `data:image/png;base64,${image}`;

    let identityCardImageOutput = document.querySelector("#image");
    identityCardImageOutput.setAttribute("src", src);

}

function setSelected(listOption, selectedValue) {
    for(let i=0; i < listOption.options.length; i++) {
        if(listOption.options[i].text === selectedValue) {
            listOption.options[i].selected = true;
        }
    }
}

function setSelectedMarried(listOption, selectedValue) {
    for(let i=0; i < listOption.options.length; i++) {
        if(selectedValue == true) {
            if(listOption.options[i].text === Constant.userAttribute.maritalStatus.MARRIED) {
                listOption.options[i].selected = true;
            }
        } else {
            if(listOption.options[i].text === Constant.userAttribute.maritalStatus.SINGLE) {
                listOption.options[i].selected = true;
            }
        }
    }
}

document.querySelector("#edit").addEventListener("click", e => {
    goTo(PAGE.EDITUSER + getParamOnURL('id'));
});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});