import { getFormValue, handleFormSubmited, APIPost } from "./utils.js";

handleFormSubmited((e) => {
    let data = getFormValue(e.target);
    console.log(data);
    APIPost("/service", data).then(response => {
        console.log(response)
    }).catch(response => {
        console.log(response)
    })
})