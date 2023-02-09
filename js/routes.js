import { getCookie } from "./utils.js";

checkIsUserLogIn();

function checkIsUserLogIn(){
    let currentPath = window.location.pathname;
    if(currentPath === "/login.html") {
        return;
    }
    let userToken = getCookie("tokens");
    if(userToken === undefined) window.location.replace('./login.html');
}