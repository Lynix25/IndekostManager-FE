import { APIGet, APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValue, getUpdateFormValue, getURLParam, handleFormSubmited } from "./utils.js";

APIGet(ServiceURL.User.getContactable(getCookie('id')) + getURLParam('id')).then(res => {
    let contactablePerson = res.data.data[0];
    reloadData(contactablePerson)
})

function reloadData(contactablePerson){
    let nameInput = document.querySelector("#name");
    nameInput.setAttribute("value", contactablePerson.name);

    let relationInput = document.querySelector("#relation");
    relationInput.setAttribute("value", contactablePerson.relation);

    let phoneInput = document.querySelector("#phone");
    phoneInput.setAttribute("value", contactablePerson.phone);

    let addressInput = document.querySelector("#address");
    addressInput.setAttribute("value", contactablePerson.address);
    addressInput.innerHTML = contactablePerson.address;
}

handleFormSubmited(e => {
    let data = getFormValue(e.target);
    APIPut(ServiceURL.User.editContactable(getCookie('id')) + getURLParam("id"), data).then(response => {
        reloadData(response.data.data);
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
})

document.addEventListener("change", e => {
    e.target.setAttribute("changed", "");
})