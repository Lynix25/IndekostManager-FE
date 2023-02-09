import { END_POINT } from "./config.js"
import { APIPost, getFormValue, handleFormSubmited } from "./utils.js";

window.addEventListener('load', e => {
    document.querySelector("#password-show-hide").addEventListener("click", e => {
        passwordShowHide("#password", ".fa-eye", ".fa-eye-slash")
    })

    handleFormSubmited(login)
})

function passwordShowHide(inputTarget, showIcon, hideIcon) {
    let inputBox = document.querySelector(inputTarget);
    let showEye = document.querySelector(showIcon);
    let hideEye = document.querySelector(hideIcon);
    hideEye.classList.remove('d-none');
    if (inputBox.type === "password") {
        inputBox.type = "text";
        showEye.style.display = "none";
        hideEye.style.display = "block";
    } else {
        inputBox.type = "password";
        showEye.style.display = "block";
        hideEye.style.display = "none";
    }
}

function login(e) {
    let data = getFormValue(e.target);
    APIPost("/account/login", data).then(response => {
        if (response.status == 200) {
            document.cookie = "tokens="+response.data.data.user.id;
            window.location.replace('./home.html');
        }
    }).catch(response => {
        console.log(response)
    })
}



