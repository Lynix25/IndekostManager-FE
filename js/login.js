import { END_POINT } from "./config.js"
import { getFormValue } from "./utils.js";

window.addEventListener('load', e => {
    const form = document.querySelector('#login_form');
    // form.addEventListener('submit', (event,form) => {
    //     console.log(event)
    //     login(event, form)
    // });
    console.log("Listen");

    form.addEventListener('submit', login)
})

function login(e) {
    let data = getFormValue(e.target);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
    };

    axios.post(END_POINT + "/account/login", data, axiosConfig).then(result => {
        console.log(result.data)
        if (result.status == 200) {
            window.location.replace('./home.html');
        }
    }).catch(result => {
        console.log(result.response.data)
    })

    e.preventDefault();
}



