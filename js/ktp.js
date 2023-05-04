import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getFormValueV2, addCustomEventListener, convertImage64ToSrc, handleFormSubmited } from "./utils.js";

APIGet(ServiceURL.User.getById(getCookie('id'))).then(res => {
    let user = res.data.data.user;

    document.querySelector("#identity-image").setAttribute("src", convertImage64ToSrc(user.identityCardImage));
});

handleFormSubmited(e => {
    let data = getFormValueV2(e.target);
    console.log(data);
})

document.querySelector("#identityCardImage").addEventListener("change", event => {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.addEventListener("loadend", e => {
        // document.querySelector(".fa-spin").setAttribute("hidden", "")
        document.querySelector("#identity-image").setAttribute("src", reader.result);
    })

    reader.addEventListener("loadstart", e => {
        // document.querySelector(".fa-spin").removeAttribute("hidden")
    })

    if (file) {
        reader.readAsDataURL(file);
    }
})

addCustomEventListener("open-update", e => {
    document.querySelector("form").removeAttribute("hidden");
    e.detail.target.setAttribute("hidden", "");
})