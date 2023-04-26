/**
 * Get cookie from a cookies list
 * @param {String} cookieName 
 * @returns value of the cookie 
 */
export function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieList = decodedCookie.split(';');
    for (let i = 0; i < cookieList.length; i++) {
        let cookie = cookieList[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return undefined;
}

export function setCookie(cookieName, cookieValue, expiresIn) {
    const d = new Date();
    // d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    d.setTime(d.getTime() + (1 * expiresIn * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

export function deleteCookie() {
    // document.cookie = cookieName + '=; Max-Age=-99999999;';
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const cookieName = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}