import { APIDelete, APIGet } from "./api.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { showModalConfirmation } from "./component/modal.js";
import { getParamOnURL, goBack, goTo, isOwnerOrAdmin } from "./utils.js";
import { Toast } from "./component/toast.js";

APIGet(ServiceURL.Announcement.getById(getParamOnURL("id"))).then(res => {
    let data = res.data.data;
    let image = data.image;
    let src;
    if(image == null || image.trim() === "") src = "asset/no_image.png"
    else src = `data:image/png;base64,${image}`;
    
    document.querySelector(".title").innerHTML = data.title;
    document.querySelector(".period").innerHTML = `Berlaku pada: ${data.period}`;
    document.querySelector(".description").innerHTML = data.description;
    document.querySelector(".image").setAttribute("src", src)

    if(isOwnerOrAdmin()) {
        document.querySelector(".btn-secondary").setAttribute("hidden", "");
    } else {
        document.querySelector(".btn-primary").setAttribute("hidden", "");
        document.querySelector(".btn-danger").setAttribute("hidden", "");
    }
});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});

document.querySelector("#editAnnouncement").addEventListener("click", e => {
    goTo("/editannouncement.html?id=" + getParamOnURL("id"))
});

document.querySelector("#deleteAnnouncement").addEventListener("click", e => {
    console.log(e.target)
    showModalConfirmation(
        Constant.modalType.DELETECONFIRMATION,
        'Hapus Pengumuman',
        'Anda yakin ingin menghapus pemgumuman?',
        'Hapus', 'Batal',
        () => {
            APIDelete(ServiceURL.Announcement.delete(getParamOnURL('id'))).then(response => {
                Toast(Constant.httpStatus.SUCCESS, response.data.message);
                setTimeout(function () { goTo('./announcementmenu.html') }, Event.timeout);
            }).catch(err => {
                Toast(Constant.httpStatus.ERROR, err?.message);
            });
        }
    );
});

document.querySelector("#exitAnnouncement").addEventListener("click", e => {
    goTo('./announcementmenu.html')
});

//     // function editAnnouncement() {
//     //     document.getElementById("editAnnouncement").addEventListener("click", e => {
//     //         // console.log("???")
//     //         console.log(APIDelete(ServiceURL.Announcement.delete).replace("$1", getParamOnURL("id")))
//     //     })
//     //     // .onclick(e => {
//     //     //     console.log("???")
//     //     //     // console.log(APIDelete(ServiceURL.Announcement.delete).replace("$1", getParamOnURL("id")))
//     //     // })
//     // }


// APIDelete("/announcement/" + getParamOnURL("id")).then(res => {
//     console.log(res.data);
//     document.querySelector("#delete-announcement").addEventListener("click", e => {
//         goTo("./home.html");
//     })
// })