import { APIPost, getFormValue, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e.target);
    console.log(data);

    APIPost("/room", data).then(res => {
        console.log(res);
    })
})