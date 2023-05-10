import { PAGE, TOKENS } from "./config.js";
import { getCookie } from "./cookiemanagement.js";
import { getCurrentPath, goTo } from "./utils.js";

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