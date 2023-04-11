import { ServiceURL } from "./config.js";
import { getFormValue, handleFormSubmited, APIPost, APIGet } from "./utils.js";

handleFormSubmited((e) => {
    let data = getFormValue(e.target);

    APIPost(ServiceURL.Service.getAll, data).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
})

APIGet(ServiceURL.Service.getAll).then(res => {
    let count = 0;
    let services = res.data.data;
    services.forEach(service => {
        let separator;
        let tableColor;
        if(count === 0) separator = "";
        else separator = "<hr>";

        if(count%2===0) tableColor="table-primary"
        else tableColor="table-info"

        let item = document.createElement("li");
        item.innerHTML = `
            ${separator}
            <table class="table ${tableColor} table-striped">
                <tbody>
                    <tr>
                        <td>Nama Service</td>
                        <td>${service.serviceName}</td>
                    </tr>
                    <tr>
                        <td>Variant</td>
                        <td>${service.variant}</td>
                    </tr>
                    <tr>
                        <td>Harga</td>
                        <td>${service.price}</td>
                    </tr>
                </tbody>
            </table>
        `;
        document.querySelector("#service-list").appendChild(item);
        count++;
    })
})