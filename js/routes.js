import { getCookie, getCurrentPath, goTo } from "./utils.js";

checkIsUserLogIn();

function checkIsUserLogIn(){
    let currentPath = getCurrentPath();
    if(currentPath === "/login.html") {
        return;
    }
    let userToken = getCookie("tokens");
    if(userToken === undefined) goTo('./login.html');
}