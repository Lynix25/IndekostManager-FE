import { END_POINT } from "./config.js"
import { APIPost, APIPut, getFormValue, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValue(e.target);

    APIPut("/account/"+"e2401bed-f703-404c-b4e1-9e4086e6c11b",data).then(res => {
        console.log(res);
    })
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