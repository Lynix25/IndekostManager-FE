import { addCustomEventListener, APIGet, getCookie, goTo } from "./utils.js";

APIGet("/user/" + getCookie('tokens')).then(res => {
    let user = res.data;
    console.log(user);
    document.querySelector("#name").innerText = user.name;
    document.querySelector("#alias").innerText = `(${user.alias})`;
    document.querySelector("#email").innerText = user.email;
    document.querySelector("#phone").innerText = user.phone;
    document.querySelector("#domicile").innerText = user.city;
    document.querySelector("#alias").innerText = `(${user.alias})`;

    let alternateContactUser = user.contactAblePeople[0]
    document.querySelector("#alterName").innerText = alternateContactUser.name;
    document.querySelector("#alterPhone").innerText = alternateContactUser.phone;
    document.querySelector("#alterAddress").innerText = alternateContactUser.address;
    document.querySelector("#alterRelation").innerText = alternateContactUser.relation;

    // document.querySelector("#name").innerHTML = user.name;
    // document.querySelector("#gender").innerHTML = user.gender + " | ";
    // document.querySelector("#job").innerHTML = user.job + " | ";
    // document.querySelector("#phone").innerHTML = user.phone;
    // document.querySelector("#city").innerHTML = user.city;
}) 

addCustomEventListener("show-room-info", e => {
    document.getElementById("tenant-information").setAttribute("hidden", "");
    document.getElementById("room-information").removeAttribute("hidden");
});

addCustomEventListener("show-tenant-info", e => {
    document.getElementById("room-information").setAttribute("hidden", "");
    document.getElementById("tenant-information").removeAttribute("hidden");
});