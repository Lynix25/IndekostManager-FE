import { APIGet, getURLParam } from "./utils.js";

APIGet("/user/" + getURLParam("id")).then(res => {
    let user = res.data;
    console.log(user);
})