import { END_POINT } from "./config.js"
import { getFormValue } from "./utils.js";

window.addEventListener('load', e => {
    const form = document.querySelector('#change_password_form');
    // form.addEventListener('submit', (event,form) => {
    //     console.log(event)
    //     login(event, form)
    // });
    
    form.addEventListener('submit', changePassword)
})

function changePassword(e) {
    let data = getFormValue(e.target);
    data.id = "f6405cb7-bc77-4d5f-8d33-57ae2d2f1bc8"
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    };

    axios.post(END_POINT + "/account/password", data, axiosConfig).then(result => {
        console.log(result.data)
        if (result.status == 200) {
            window.location.replace('./profile.html');
        }
    }).catch(result => {
        console.log(result.response.data)
    })

    e.preventDefault();
}