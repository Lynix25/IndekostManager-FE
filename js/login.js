import { APIGet, APIPost } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getFormValue, goTo, handleFormSubmited } from "./utils.js";
import { getCookie, setCookie } from "./cookiemanagement.js";

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
    
    APIGet(ServiceURL.Account.getByUsername(data.username)).then(res => {
        let currLoginAccount = res.data.data;
        if(currLoginAccount == null) {
            Toast(Constant.httpStatus.ERROR, "User tidak terdaftar");
        } else {
            let currLoginId = currLoginAccount.user.id
            if(document.cookie.length > 0 && currLoginId === getCookie('id')) {
                Toast(Constant.httpStatus.WARNING, "User sudah login");
                setTimeout(function() { goTo('./home.html') }, Event.timeout);
            } else {
                APIPost(ServiceURL.User.login, data).then(response => {
                    if (response.status == 200) {
                        setCookie("tokens", response.data.data.token.tokenId, response.data.data.token.expiresIn);
                        setCookie("id", response.data.data.user.id, response.data.data.token.expiresIn);
                        setCookie("role", response.data.data.user.role.name, response.data.data.token.expiresIn);
            
                        Toast(Constant.httpStatus.SUCCESS, response.data.message);
                        setTimeout(function() { goTo('./home.html') }, Event.timeout);
                    }
                }).catch(err => {
                    if(err.data == undefined) Toast(Constant.httpStatus.UNKNOWN, err?.message);
                    else Toast(Constant.httpStatus.ERROR, err.data.message);
                });
            }
        }
    });
}