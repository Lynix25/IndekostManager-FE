import { APIGet, getURLParam } from "./utils.js";

APIGet("/room/" + getURLParam("id")).then(res => {
    let room = res.data.data;
    console.log(room);

    document.querySelector("#name").value = room.name;
    document.querySelector("#floor").value = room.floor;
    document.querySelector("#description").value = room.description;
    document.querySelector("#allotment").value = room.allotment;

})