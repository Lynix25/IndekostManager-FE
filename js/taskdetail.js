import { APIGet } from "./utils.js";

let params = new URLSearchParams(location.search);

APIGet("/task/" + params.get("id")).then(res => {
    console.log(res);
    document.querySelector(".status").innerHTML = res.data.data.status === 0? "Completed":"Not Set";
    document.querySelector(".id").innerHTML = res.data.data.id;
    document.querySelector(".createdDate").innerHTML = res.data.data.createdDate;
    document.querySelector(".requesterUser").innerHTML = res.data.data.createdBy;

    APIGet("/service/" + res.data.data.serviceId).then(res => {
        console.log(res);
        // document.querySelector(".category").innerHTML = res.data.serviceName;
        document.querySelector(".service").innerHTML = res.data.serviceName;
        document.querySelector(".room").innerHTML = res.data.variant;
        document.querySelector(".price").innerHTML = res.data.price;
    })
    

})