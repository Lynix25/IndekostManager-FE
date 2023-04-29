import { APIPost } from "./api.js";
import { Toast } from "./component/toast.js";
import { ServiceURL, Constant, Event } from "./config.js";
import { getFormValue, handleFormSubmited, getUserID, goBack, goTo } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e?.target);
    // console.log(data)
    if(data.image.size/1000 > 2000) {
        Toast(Constant.httpStatus.ERROR, "Ukuran file lebih besar dari 2MB");
        return;
    }
    APIPost(ServiceURL.Announcement.create, data, { 
        "requesterId" : getUserID(), 
        "Content-Type" : "multipart/form-data"
    }).then(response => {
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        setTimeout(function() { goTo("./announcementmenu.html") }, Event.timeout);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
});

document.querySelector("#image").addEventListener("change", event => {
    
    let file = event.target.files[0];
    let reader = new FileReader();
    let loading = document.createElement("i");

    reader.addEventListener("loadend", e => {
        document.querySelector(".fa-spin").setAttribute("hidden", "")
        event.target?.parentElement.querySelector("img").setAttribute("src", reader.result);
    })

    reader.addEventListener("loadstart", e => {
        document.querySelector(".fa-spin").removeAttribute("hidden")
    })

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById("back").addEventListener("click", e => {
    goBack();
});