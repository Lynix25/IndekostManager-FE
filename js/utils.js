import { END_POINT } from "./config.js"

/**
 * Get inputvalue from a form
 * 
 * @param {FormElement} formElement 
 * @returns Object
 */
export function getFormValue(formElement, groupingConfig) {
    // Make sure all input tag has name attribute

    const formData = new FormData(formElement),
        data = {}, emptyData = {};
    let isFilled = false;
    for (let [key, value] of formData) {
        addToData(key, value);
    }

    formElement.querySelectorAll("[input]").forEach(element => {
        let key = element.getAttribute("name");
        let value = element.getAttribute("value");
        addToData(key, value);
    })

    function addToData(key, value) {
        // if (value === "") return;
        if (groupingConfig != undefined && key.includes(groupingConfig.separator)) {
            let temp = key.split(groupingConfig.separator, 2);
            key = temp[0];
            let index = temp[1];
            if (!(groupingConfig.name in data)) {
                data[groupingConfig.name] = [];
            }

            let length = index - data[groupingConfig.name].length;

            while (length-- > 0) {
                data[groupingConfig.name].push({});
            }

            data[groupingConfig.name][index - 1][key] = value;
        }
        else data[key] = value;
        isFilled = true;
    }

    return isFilled ? data : null;
}

/**
 * 
 * 
 * @returns Boolean
 */
export function isMobileDevice() {
    let mobileList = /android|iphone|kindle|ipad/i;

    return mobileList.test(navigator.userAgent);
}

/**
 * 
 * @param {*} * 
 * 
 */

export function handleFormSubmited(callback, formSelector = "form", preventDefault = true) {
    let form = document.querySelector(formSelector)
    form.addEventListener('submit', e => {
        callback(e);
        form.reset();
        if (preventDefault) e.preventDefault();
    })
}

export function addCustomEventListener(eventName, callback, element, triggerEvent = "click") {
    // console.log("Call Custom", eventName);
    const event = new Event(eventName);
    element.addEventListener(eventName, e => {
        // console.log("execute callback for event " + eventName);
        callback(e);
    })
    element.addEventListener(triggerEvent, e => {
        // console.log("dispatchEvent " + eventName + " because " + triggerEvent, element);
        element.dispatchEvent(event);
        e.preventDefault();
    })
    // console.log("finish");
}

/**
 * Get cookie from a cookies list
 * @param {String} cname 
 * @returns value of the cookie 
 */
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

/**
 * 
 * @param {String} dateTimelocal 
 * @returns 
 */

export function dateTimeLocalInputToMilliseconds(dateTimelocal) {
    return new Date(dateTimelocal).getTime();
}

/**
 * 
 * @requires AXIOS
 * @param {*} resource 
 * @param {JSON} requestBody 
 * @returns 
 */
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
};

function getUserID() {
    return getCookie("tokens");
    // return "not implemented userid in cookie";
}

export function APIPost(resource, requestBody, requesterid = true) {
    if (requesterid === true) requestBody.requesterIdUser = getUserID();
    else {
        requestBody.requesterIdUser = requesterid;
    }
    console.log(requestBody);
    return new Promise((resolve, reject) => {
        axios.post(END_POINT + resource, requestBody, axiosConfig).then(result => {
            resolve(result)
        }).catch(result => {
            reject(result.response)
        })
    })
}

export function APIPut(resource, requestBody, requesterid = true) {
    if (requesterid === true) requestBody.requesterIdUser = getUserID();
    else {
        requestBody.requesterIdUser = requesterid;
    }
    // console.log(requestBody);
    return new Promise((resolve, reject) => {
        axios.put(END_POINT + resource, requestBody, axiosConfig).then(result => {
            resolve(result)
        }).catch(result => {
            reject(result.response)
        })
    })
}

export function APIGet(resource) {
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            axios.get(END_POINT + resource, axiosConfig).then(result => {
                clearInterval(intervalId);
                resolve(result)
            }).catch(result => {
                clearInterval(intervalId);
                reject(result.response)
            })
        }, 50);
    })

}

export function forEach(objectOrArray, callback, keySort = "none") {
    if (Array.isArray(objectOrArray)) {
        objectOrArray.forEach(value => {
            callback(value);
        })
    }
    else if (isObject(objectOrArray)) {
        // Object.keys(objectOrArray).forEach(key => {
        //     callback(key, objectOrArray[key])
        // })
        let keys = keySort == "ASC" ? Object.keys(objectOrArray).sort() : Object.keys(objectOrArray);
        keys.forEach(key => {
            callback(key, objectOrArray[key])
        })
    }
    else {
        console.log("no object / array given, but given " + typeof (objectOrArray))
    }
}

function isObject(data) {
    if (!(data instanceof Function) && data instanceof Object) return true;
    return false;
}

export function numberWithThousandsSeparators(x, removedSeparator = ".", separator = ".") {
    if (isNum(x)) x = x.toString();
    x = x.replaceAll(removedSeparator, "");
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function isNum(val) {
    return !isNaN(val);
}

export function UNIXtimeConverter(UNIX_timestamp, format = "MM/DD/YYYY hh:mm:ss UTZ") {
    let a = new Date(UNIX_timestamp),
        months = {
            long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        dates = {
            long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"],
            short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        year = a.getFullYear(),
        month = a.getMonth(),
        date = a.getDate(),
        day = a.getDay(),
        hour = a.getHours(),
        min = a.getMinutes(),
        sec = a.getSeconds(),
        tzn = a.toTimeString().substring(9);

    let formatList = {
        DDDD: dates.long[day], //Sunday - Saturday
        DDD: dates.short[day], //Sun - Sat
        DD: date.toString().padStart(2, "0"), //01-31
        D: date, //1-31
        MMMM: months.long[month], //January - Desember
        MMM: months.short[month], //Jan - Des
        MM: (month + 1).toString().padStart(2, "0"), //01-12
        M: month + 1, //1-12
        YYYY: year, //1900-9999
        // YY: year, // 
        hh: hour.toString().padStart(2, "0"), //00-23
        mm: min.toString().padStart(2, "0"), //00-59
        ss: sec.toString().padStart(2, "0"), //00-59
        UTZ: tzn, //XXX+XXXX
    }

    forEach(formatList, (key, value) => {
        format = format.replace(key, value)
    })

    return format;
}

export function logout() {
    deleteCookie("tokens");
}

export function statusToString(statusCode) {
    if (statusCode === -1) {
        return ["badge-color" , "Dibatalkan"];
    }
    if (statusCode === 0) {
        return ["badge-yellow" , "Menunggu Konfirmasi"];
    }
    if (statusCode === 1) {
        return ["badge-color" , "Di Terima"];
    }
    if (statusCode === 2) {
        return ["badge-color" , "Dalam Pengerjaan"];
    }
    if (statusCode === 3) {
        return ["badge-color" , "Selesai"];
    }
    /**
 * Status state
 *
 * -1 rejected
 * 0 submited
 * 1 approved
 * 2 on prosses
 * 3 completed
 */
}

export function groupingMillisecondsToSameDate(arrayData, dateKey, dateFormatKey) {
    let grouped = {}
    arrayData.forEach(data => {
        let date = UNIXtimeConverter(data[dateKey], dateFormatKey);
        if (!(date in grouped)) grouped[date] = [];
        grouped[date].push(data);
    })

    return grouped;
}