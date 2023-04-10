import { APIGet, APIPost, getCookie, getFormValue, getFormValueBeta, handleFormSubmited } from "./utils.js";

handleFormSubmited(e => {
    let data = getFormValueBeta(e.target);
    console.log(data);
    APIPost("/user", data, {"Requester-ID" : getCookie("tokens"), "Content-Type": "multipart/form-data"}).then(res => {
        console.log(res);
    }).catch(res => {
        console.log(res);
    })

})

APIGet("/room").then(res => {
    console.log(res.data.data)
    addOptions("#room", res.data.data, "name");
})

APIGet("/account").then(res => {
    addOptions("#account", res.data.data, "username");
})


function addOptions(selector, arrayOfObjectOptions, innerHTMLKey, valueKey = "id") {
    let selection = document.querySelector(selector);

    arrayOfObjectOptions.forEach(object => {
        let option = document.createElement("option");
        option.innerHTML = object[innerHTMLKey];
        option.setAttribute('value', object[valueKey]);
        selection.appendChild(option);
    });
}

document.querySelector("#identityCardImage").addEventListener("change", event => {
    let file = event.target.files[0];
    let reader = new FileReader();
    let loading = document.createElement("i");

    reader.addEventListener("loadend", e => {
        document.querySelector(".fa-spin").setAttribute("hidden", "")
        event.target?.parentElement.querySelector("img").setAttribute("src", reader.result);
    })

    reader.addEventListener("loadstart", e => {
        document.querySelector(".fa-spin").removeAttribute("hidden")
    })

    if (file) {
        reader.readAsDataURL(file);
    }
})