import { getCookie, getCurrentPath, goTo } from "./utils.js";

const whiteListPage = ["login", "initialdata"].map(item => `/${item}.html`)

checkIsUserLogIn();

function checkIsUserLogIn(){
    let currentPath = getCurrentPath();
    if(whiteListPage.includes(currentPath)){
        return;
    }
    let userToken = getCookie("tokens");
    if(userToken === undefined && window.location.pathname !== "/forgotpassword.html") 
        goTo('./login.html');
}