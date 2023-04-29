import { forEach, getCurrentPath, goTo } from "./utils.js";
import { getCookie, setCookie } from "./cookiemanagement.js"
import { Constant, PAGE, ServiceURL, TOKENS } from "./config.js";
import { APIPost } from "./api.js";
import { Toast } from "./component/toast.js";

roustes();

function roustes() {
    let currentPath = getCurrentPath();

    if (isUserAlreadyLogin()) return;

    if (!allowedPageNoLogin(currentPath)) { goTo(PAGE.LOGIN); return; }
}

function isUserAlreadyLogin() {
    if (getCookie(TOKENS.USERID)) return true;

    return false;
}

function allowedPageNoLogin(page) {
    const whiteListPage = ["initialdata", "forgotpassword"].map(item => `/${item}.html`)
    if (whiteListPage.includes(page)) return true;

    return false;
}