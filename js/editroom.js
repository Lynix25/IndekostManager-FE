import { APIGet, getFormValue, getFormValueBeta, getURLParam, handleFormSubmited } from "./utils.js";

APIGet("/room/" + getURLParam("id")).then(res => {
    let room = res.data.data;
    console.log(room);

    document.getElementById("name").value = room.name;
    document.getElementById("floor").value = room.floor;
    document.getElementById("description").value = room.description;
    // document.getElementById("allotment").value = room.allotment;
    document.getElementById("allotment").setAttribute("value",room.allotment);

})

handleFormSubmited(e => {
    let data = getFormValue(e.target);
    console.log(data);

    // APIPost("/user", data, "admin").then(res => {
    //     console.log(res);
    // }).catch(res => {
    //     console.log(res);
    // })
})