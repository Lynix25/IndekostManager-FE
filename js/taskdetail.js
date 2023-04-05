import { APIGet, APIPut } from "./api.js";
import { addCustomEventListener, getURLParam, statusToString, UNIXtimeConverter } from "./utils.js";

APIGet("/task/" + getURLParam("id")).then(res => {
    console.log(res);
    document.querySelector(".status").innerHTML = statusToString(res.data.data.status)[1];
    document.querySelector(".id").innerHTML = res.data.data.id;
    document.querySelector(".createdDate").innerHTML = UNIXtimeConverter(res.data.data.createdDate, "MM/DD/YYYY hh:mm");
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    document.querySelector(".requesterUser").innerHTML = res.data.data.createdBy;

    APIGet("/service/" + res.data.data.serviceId).then(res => {
        // document.querySelector(".category").innerHTML = res.data.serviceName;
        document.querySelector(".service").innerHTML = res.data.serviceName;
        document.querySelector(".room").innerHTML = res.data.variant;
        document.querySelector(".price").innerHTML = res.data.price;
    })

})


addCustomEventListener("process", e => {
    APIPut("/task/" + getURLParam('id'), { "status": 1 })
}, document.querySelector("[type='process']"))

addCustomEventListener("cancel", e => {
    APIPut("/task/" + getURLParam('id'), { "status": -1 })
}, document.querySelector("[type='cancel']"))

addCustomEventListener("finish", e => {
    APIPut("/task/" + getURLParam('id'), { "status": 3 })
}, document.querySelector("[type='finish']"))