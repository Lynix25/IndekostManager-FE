import { APIGet, APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValue, getFormValueV2 } from "./utils.js";


APIGet(ServiceURL.User.getUserSetting(getCookie("id"))).then(res => {
    let userSettings = res.data.data;

    let privateRoomSwitchEl = document.getElementById("privateRoomSwitch");
    privateRoomSwitchEl.checked = userSettings.shareRoom;
    changeSwitchLabel(privateRoomSwitchEl.parentElement);

    let enableNotificationEl = document.getElementById("notificationSwitch");
    enableNotificationEl.checked = userSettings.enableNotification;
    changeSwitchLabel(enableNotificationEl.parentElement);
})

document.querySelector("form").addEventListener("change", e => {
    changeSwitchLabel(e.target.parentElement);
    let formData = getFormValue(e.currentTarget);
    
    let shareRoom = false;
    let enableNotification = false;

    if(formData != null) {
        shareRoom = formData.shareRoom != undefined && (formData.shareRoom).toLowerCase() === "on" ? true : false;
        enableNotification = formData.enableNotification != undefined &&  (formData.enableNotification).toLowerCase() === "on" ? true : false;
    }

    let data = {
        "shareRoom": shareRoom, 
        "enableNotification": enableNotification
    }

    APIPut(ServiceURL.User.updateUserSetting(getCookie('id')), data).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    })
})

function changeSwitchLabel(parentElement) {
    let isChecked = parentElement.children[0].checked;
    if (isChecked) {
        parentElement.children[1].innerText = "ON";
    }
    else {
        parentElement.children[1].innerText = "OFF";
    }
}