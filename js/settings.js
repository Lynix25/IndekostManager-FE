import { APIGet, getCookie, getFormValue, getFormValueBeta } from "./utils.js";

APIGet(`/user/${getCookie("tokens")}/settings`).then(res => {
    let userSettings = res.data;

    let privateRoomSwitchEl = document.getElementById("privateRoomSwitch");
    privateRoomSwitchEl.checked = userSettings.shareRoom;
    changeSwitchLabel(privateRoomSwitchEl.parentElement);

    let enableNotificationEl = document.getElementById("notificationSwitch");
    enableNotificationEl.checked = userSettings.shareRoom;
    changeSwitchLabel(enableNotificationEl.parentElement);
})

document.querySelector("form").addEventListener("change", e => {
    changeSwitchLabel(e.target.parentElement);
    let formData = getFormValueBeta(e.currentTarget);
    console.log(e.target, e.target.attributes);
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