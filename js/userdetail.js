import { APIGet } from "./api.js";
import { getURLParam } from "./utils.js";

APIGet("/user/" + getURLParam("id")).then(res => {
    let user = res.data;
    console.log(user);
})