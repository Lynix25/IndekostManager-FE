import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValue, getFormValueV2 } from "./utils.js";


APIGet(ServiceURL.User.getUserSetting(getCookie("id"))).then(res => {
    let userSettings = res.data.data;

    let privateRoomSwitchEl = document.getElementById("privateRoomSwitch");
    privateRoomSwitchEl.checked = userSettings.shareRoom;
    changeSwitchLabel(privateRoomSwitchEl.parentElement);

    let enableNotificationEl = document.getElementById("notificationSwitch");
    enableNotificationEl.checked = userSettings.shareRoom;
    changeSwitchLabel(enableNotificationEl.parentElement);
})

document.querySelector("form").addEventListener("change", e => {
    changeSwitchLabel(e.target.parentElement);
    let formData = get(e.currentTarget);
    console.log(formData);
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