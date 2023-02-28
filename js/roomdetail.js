import { APIGet, getURLParam } from "./utils.js";

APIGet("/room/" + getURLParam("id")).then(res => {
    let room = res.data.data;
    console.log(room);
    document.querySelector(".name").innerHTML = room.name;
    document.querySelector(".allotment").innerHTML = room.allotment;
    document.querySelector(".floor").innerHTML = 'Lantai ' + room.floor;

    room.details.forEach(facility => {
        let detail = document.createElement("li");
        detail.classList.add("d-flex");
        detail.innerHTML = `<i class="fad fa-user"></i>
        <div>${facility.name}</div>`
        if(facility.category == "Spesifikasi") document.querySelector(".specifications").appendChild(detail);
        // console.log(facility);
    });
    
})