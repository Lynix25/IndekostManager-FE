import { APIPut } from "./api.js";
import { END_POINT, ServiceURL } from "./config.js"
import { getFormValue, goTo, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e.target);

    APIPut(ServiceURL.User.changePassword(),data).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
})