import { getCurrentPath, goTo } from "./utils.js";
import { getCookie } from "./cookiemanagement.js"
import { PAGE } from "./config.js";

const whiteListPage = ["initialdata", "forgotpassword"].map(item => `/${item}.html`)

checkIsUserLogIn();

function checkIsUserLogIn() {
    let currentPath = getCurrentPath();
    if (whiteListPage.includes(currentPath)) {
        return;
    }
    let userToken = getCookie("tokens");
    if (userToken === undefined) {
        goTo(PAGE.LOGIN);
        return;
    }

    if (currentPath === PAGE.LOGIN) {
        goTo(PAGE.HOME);
        return;
    }
}