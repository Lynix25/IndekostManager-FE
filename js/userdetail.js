import { APIGet } from "./api.js";
import { ServiceURL } from "./config.js";
import { UNIXtimeConverter, addCustomEventListener, getParamOnURL } from "./utils.js";

APIGet(ServiceURL.User.getById(getParamOnURL("id"))).then(res => {
    let user = res.data.data.user;
    console.log(user, user.joinOn);

    document.querySelector(".name").innerHTML = user.name;
    document.querySelector(".alias").innerHTML = user.alias;
    document.querySelector(".email").innerHTML = user.email;
    document.querySelector(".gender").innerHTML = user.gender;
    document.querySelector(".roomName").innerHTML = user.name;
    document.querySelector(".joinDate").innerHTML = UNIXtimeConverter(user.joinedOn,  "DD MMMM YYYY");
})

addCustomEventListener("edit-user", e => {

})