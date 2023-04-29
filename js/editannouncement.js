import { APIGet, APIPut, convertImage64ToSrc, getCookie, getFormValue, getFormValueBeta, getUpdateFormValue, getParamOnURL, handleFormSubmited } from "./utils.js";

APIGet("/announcement/" + getParamOnURL("id")).then(res => {
    let announcement = res.data;
    // console.log(announcement)
    reloadData(announcement)
})

function reloadData(announcement){
    let titleInput = document.querySelector("#title");
    titleInput.setAttribute("value", announcement.title);

    let descriptionInput = document.querySelector("#description");
    descriptionInput.setAttribute("value", announcement.description);

    let periodInput = document.querySelector("#period");
    periodInput.setAttribute("value", announcement.period);
}

// handleFormSubmited(e => {
//     let data = getUpdateFormValue(e.target);

//     APIPut("/announcement/" + getParamOnURL("id"), data).then(res => {
//         console.log(res);
//         // reloadData(res.data.data);
//     })
// })

// document.addEventListener("change", e => {
//     e.target.setAttribute("changed", "");
// })