import { APIPost } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValue, goTo, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e?.target);
    console.log
    APIPost(ServiceURL.User.addContactable(getCookie('id')), data).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        setTimeout(function() { goTo('./profile.html') }, 500);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
});