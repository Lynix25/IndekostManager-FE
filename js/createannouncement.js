import { Toast } from "./component/toast.js";
import { ServiceURL, Constant} from "./config.js";
import { APIPost, getFormValue, handleFormSubmited, getUserID, goTo } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e?.target);
    if(data.image.size > 200) {
        Toast(Constant.httpStatus.ERROR, "Ukuran file lebih besar dari 2MB");
        return;
    }
    APIPost(ServiceURL.Announcement.create, data, { 
        "requesterIdUser" : getUserID(), 
        "Content-Type" : "multipart/form-data"
    }).then(response => {
        goTo("./announcementmenu.html");
        Toast(Constant.httpStatus.SUCCESS, "Pengumuman berhasil ditambahkan");
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err.data.message);
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
    goTo("./announcementmenu.html");
});