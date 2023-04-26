import { APIGet } from "./api.js";
import { getParamOnURL } from "./utils.js";

APIGet("/user/" + getParamOnURL("id")).then(res => {
    let user = res.data;
    console.log(user);
})