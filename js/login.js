import { Toast } from "./component/toast.js";
import { Constant, ServiceURL } from "./config.js";
import { APIPost, getFormValue, goTo, handleFormSubmited, setCookie } from "./utils.js";

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
    APIPost(ServiceURL.User.login, data).then(response => {
        if (response.status == 200) {
            let value = response.data.data.token.tokenId + "|role=" + response.data.data.user.role.name;
            setCookie("tokens", value, response.data.data.token.expiresIn);
            Toast(Constant.httpStatus.SUCCESS, response.data.message);
            setTimeout(function() { goTo('./home.html') }, 300);
        }
    }).catch(err => {
        let message = "Unknown Error";
        if((err.data.message).toLowerCase() === "invalid username or password") message = err.data.message;
        else message = "User not registered";

        Toast(Constant.httpStatus.ERROR, message);
    })
}