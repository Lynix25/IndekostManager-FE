import { APIGet, statusToString, UNIXtimeConverter } from "./utils.js";

let params = new URLSearchParams(location.search);

APIGet("/task/" + params.get("id")).then(res => {
    console.log(res);
    document.querySelector(".status").innerHTML = statusToString(res.data.data.status)[1];
    document.querySelector(".id").innerHTML = res.data.data.id;
    document.querySelector(".createdDate").innerHTML = UNIXtimeConverter(res.data.data.createdDate, "MM/DD/YYYY hh:mm");
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    document.querySelector(".requesterUser").innerHTML = res.data.data.createdBy;

    APIGet("/service/" + res.data.data.serviceId).then(res => {
        console.log(res);
        // document.querySelector(".category").innerHTML = res.data.serviceName;
        document.querySelector(".service").innerHTML = res.data.serviceName;
        document.querySelector(".room").innerHTML = res.data.variant;
        document.querySelector(".price").innerHTML = res.data.price;
    })
    
})