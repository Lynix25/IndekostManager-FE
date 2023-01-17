import { APIPost, getFormValue, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e.target);
    data.alias = "";
    data.description = "";
    data.role_id = "Tenant";

    APIPost("/user/register", data).then(res => {
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