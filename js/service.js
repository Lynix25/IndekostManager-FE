import { APIPost } from "./api.js";
import { ServiceURL } from "./config.js";
import { getFormValue, handleFormSubmited } from "./utils.js";

handleFormSubmited((e) => {
    let data = getFormValue(e.target);

    APIPost(ServiceURL.Service.getAll, data).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
})