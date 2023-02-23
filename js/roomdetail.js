import { APIGet, getURLParam } from "./utils.js";

console.log(window.history);
// let params = new URLSearchParams(location.search);

APIGet("/room/" + getURLParam("id")).then(res => {
    let room = res.data.data;
    console.log(room);
    document.querySelector(".name").innerHTML = room.name;
    document.querySelector(".allotment").innerHTML = room.allotment;
    document.querySelector(".floor").innerHTML = 'Lantai ' + room.floor;

    room.facilities.forEach(facility => {
        let detail = document.createElement("li");
        detail.innerHTML = `<i class="fad fa-user"></i>
        <div>${facility.name}</div>`
        if(facility.category == "Spesifikasi") document.querySelector(".specifications").appendChild(detail);
        // console.log(facility);
    });
    

    
})