import { APIGet, getCookie } from "./utils.js";

APIGet("/user/" + getCookie('tokens')).then(res => {
    document.querySelector("#name").innerHTML = res.data.name;
    document.querySelector("#gender").innerHTML = res.data.gender + " | ";
    document.querySelector("#job").innerHTML = res.data.job + " | ";
    document.querySelector("#phone").innerHTML = res.data.phone;
    // document.querySelector("#city").innerHTML = res.data.city;
})

