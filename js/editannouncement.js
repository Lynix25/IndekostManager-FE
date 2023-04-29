import { APIGet, APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getUpdateFormValue, getParamOnURL, goBack, handleFormSubmited, goTo, getUserID, getFormValueV2 } from "./utils.js";

let announcementData;
APIGet(ServiceURL.Announcement.getById(getParamOnURL('id'))).then(res => {
    announcementData = res.data.data;
    reloadData(announcementData)
})

function reloadData(announcement){
    let titleInput = document.querySelector("#title");
    titleInput.setAttribute("value", announcement.title);

    let periodInput = document.querySelector("#period");
    periodInput.setAttribute("value", announcement.period);

    let descriptionInput = document.querySelector("#description");
    descriptionInput.setAttribute("value", announcement.description);
    descriptionInput.innerHTML = announcement.description;

    let addressInput = document.querySelector("#currImage");
    let image = announcement.image;
    if(image === "" || image == null) addressInput.setAttribute("hidden", "");
    else addressInput.setAttribute("src", `data:image/png;base64,${image}`);
}

let countChanges = 0;
document.addEventListener("change", e => {
    e.target.setAttribute("changed", "");
    countChanges++;
});

handleFormSubmited(e => {
    let data = getFormValueV2(e.target);
    
    // // Remove unused key
    // let keyToRemove = ['id', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'image'];
    // let oldData = announcementData;
    // keyToRemove.forEach(key => {
    //     delete oldData[key];
    // })

    // // Replace old value with change
    // if(countChanges > 0) {
    //     Object.keys(data).forEach(function(key) {
    //         Object.keys(oldData).forEach(function(oldKey) {
    //             if(oldKey === key) {
    //                 oldData[oldKey] = data[key];
    //             }
    //             if(key === 'image') {
    //                 oldData[key] = data[key];
    //             }
    //         });
    //     });
    // }

    APIPut(ServiceURL.Announcement.update(getParamOnURL('id')), data, { 
        "requesterId" : getUserID(), 
        "Content-Type" : "multipart/form-data"
    }).then(response => {
        reloadData(response.data.data);
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
        setTimeout(function () { goTo('./announcementdetail.html?id=' + getParamOnURL('id')) }, Event.timeout);
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
    });

    reader.addEventListener("loadstart", e => {
        document.querySelector(".fa-spin").removeAttribute("hidden")
    });

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.querySelector("#back").addEventListener("click", e => {
    goBack();
});