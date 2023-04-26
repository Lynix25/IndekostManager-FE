import { APIGet, APIPut } from "./api.js";
import { Toast } from "./component/toast.js";
import { Constant, Event, ServiceURL } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { MasterRole } from "./masterdata/masterrole.js";
import { getUpdateFormValue, getUserID, handleFormSubmited, isOwnerOrAdmin } from "./utils.js";

let userData;
let roleId, roomId;
APIGet(ServiceURL.User.getById(getCookie("id"))).then(res => {
    userData = res.data.data;
    reloadData(userData);
});

function reloadData(currUserData) {
    let nameInput = document.querySelector("#name");
    nameInput.setAttribute("value", currUserData.user.name);

    let aliasInput = document.querySelector("#alias");
    aliasInput.setAttribute("value", 
    (currUserData.user.alias == null || currUserData.user.alias.length == 0) ? "-" : currUserData.user.alias);

    let phoneInput = document.querySelector("#phone");
    phoneInput.setAttribute("value", currUserData.user.phone);
    
    let emailInput = document.querySelector("#email");
    emailInput.setAttribute("value", 
    (currUserData.user.email == null || currUserData.user.email.length == 0) ? "-" : currUserData.user.email);
    
    let genderInput = document.querySelector("#gender");
    genderInput.setAttribute("value", currUserData.user.gender);

    let statusInput = document.querySelector("#married");
    statusInput.setAttribute("value", currUserData.user.married ? 
        Constant.userAttribute.maritalStatus.MARRIED : Constant.userAttribute.maritalStatus.SINGLE);

    let jobInput = document.querySelector("#job");
    jobInput.setAttribute("value", currUserData.user.job);
    
    let descriptionInput = document.querySelector("#description");
    let description = (currUserData.user.description == null || currUserData.user.description == 0) ? "-" : currUserData.user.description;
    descriptionInput.setAttribute("value", description);
    descriptionInput.innerHTML = description;

    let roomInput = document.querySelector("#roomId");
    roomInput.setAttribute("value", (currUserData.room == null) ? "-" : currUserData.room.name);
    if(currUserData.room != null) roomId = currUserData.room.id;

    let roleInput = document.querySelector("#roleId");
    roleInput.setAttribute("value", currUserData.user.role.name);
    roleId = currUserData.user.role.id;

    let identityCardInput = document.querySelector("#identityCardImage");
    let identityCard = document.querySelector("#identityImage");
    if(currUserData.user.identityCardImage == null || currUserData.user.identityCardImage.length == 0) {
        identityCard.remove();
    } else {
        identityCardInput.removeAttribute("required");
        identityCardInput.setAttribute("value", currUserData.user.identityCardImage);
        identityCard.setAttribute("src", `data:image/png;base64,${currUserData.user.identityCardImage}`);
    }

    if(isOwnerOrAdmin()) {
        nameInput.removeAttribute("disabled");
        genderInput.removeAttribute("disabled");
        statusInput.removeAttribute("disabled");
        roleInput.removeAttribute("disabled");
        roomInput.removeAttribute("disabled");
    } else {
        identityCardInput.classList.add("invisible");
    }
}

let countChanges = 0;
document.addEventListener("change", e => {
    countChanges++;
    e.target.setAttribute("changed","");
})

handleFormSubmited(e => {
    let data = getUpdateFormValue(e.target);
    // Filter old key-value to make request input
    let keyToRemove = ['id', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate', 'deleted', 'inActiveSince', 'joinedOn', 'role', 'setting'];
    let oldData = userData.user;
    keyToRemove.forEach(key => {
        // 'identityCardImage' can only be updated by owner or admin
        if(!isOwnerOrAdmin()) {
            delete oldData['identityCardImage'];
        }
        delete oldData[key];
    })

    // Replace old value with change
    if(countChanges > 0) {
        Object.keys(data).forEach(function(key) {
            // '-' value means the data is empty. Translate '-' -> null
            if(data[key] === '-') data[key] = null;
            // 'married' key accepts boolean as input. Translate status -> boolean
            if(key === 'married') {
                if(data[key] === Constant.userAttribute.maritalStatus.MARRIED) data[key] = true;
                else data[key] = false;
            }
            Object.keys(oldData).forEach(function(oldKey) {
                if(oldKey === key) {
                    oldData[oldKey] = data[key];
                }
            });
        });
    }

    // Add additional key-value to request input: roleId & roomId
    /* Code here: Unfinished */

    APIPut(ServiceURL.User.getById(getCookie('id')), userData.user, { 
        "requesterId" : getUserID(), 
        "Content-Type" : "multipart/form-data"
    }).then(response => {
        reloadData(response.data.data);
        Toast(Constant.httpStatus.SUCCESS, response.data.message);
    }).catch(err => {
        Toast(Constant.httpStatus.ERROR, err?.message);
    });
})

document.querySelector("#identityCardImage").addEventListener("change", event => {
    
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