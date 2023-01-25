import { APIGet, APIPost, getFormValue, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e.target);

    APIPost("/user", data, "admin").then(res => {
        console.log(res);
    }).catch(res => {
        console.log(res);
    })

    // {
    //     name: "Paul Eric"
    //     email: "pauleric22524@gmail.com"
    //     alias: ""
    //     phone: "012345678910"
    //     job: "Mahasiswa"
    //     gender: ""
    //     room: ""
    // }

    // {
    //     "name" : "Paul Eric"
    //     "email" : "pauleric22524@gmail.com"
    //     "alias" : "Paul"
    //     "phone" : "085887021660"
    //     "job" : "Mahasiswa"
    //     "gender" : "Male"
    //     "description" : ""
    //     "role_id" : "Tenant"
    //     "created_by" : "asd"
    //     "last_modified_by" : "asd"
    // }
})

APIGet("/room").then(res => {
    addOptions("#room", res.data.data, "name");
})

APIGet("/account").then(res => {
    addOptions("#account", res.data.data, "username");
})


function addOptions(selector, arrayOfObjectOptions, innerHTMLKey, valueKey = "id"){
    let selection = document.querySelector(selector);

    arrayOfObjectOptions.forEach(object => {
        let option = document.createElement("option");
        option.innerHTML = object[innerHTMLKey];
        option.setAttribute('value', object[valueKey]);
        selection.appendChild(option);
    });
}