import { END_POINT, SECRET } from "./config.js"

/**
 * Get inputvalue from a form
 * 
 * @param {FormElement} formElement 
 * @returns Object
 */
export function getFormValue(formElement, groupingConfig) {
    // Make sure all input tag has name attribute

    const formData = new FormData(formElement),
        data = {}, grouping = {};
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

export function getFormValueBeta(element) {
    // Make sure all input tag has name attribute
    function getValue(element) {
        let tag = element.tagName;
        if (tag != 'INPUT')
            return element.getAttribute("value");

        let type = element.type;
        if (type == "checkbox")
            return element.getAttribute("checked");
    }
    let result = {};
    let hasName = element.hasAttribute("name");
    let hasValue = element.hasAttribute("value");

    if (hasName && hasValue) {
        let name = element.getAttribute("name");
        let value = element.getAttribute("value");
        result[name] = value;
        return result;
    }

    if (hasName) {
        let name = element.getAttribute("name");
        if (element.value)
            result[name] = element.value;
        else result[name] = element.innerHTML;
        return result;
    }

    let isGroup = element.hasAttribute("group-name");
    if (isGroup) {
        let groupName = element.getAttribute("group-name");
        result[groupName] = [];
        forEach(element.children, (_, children) => {
            let data = getFormValueBeta(children);
            if (!isObjectEmpty(data)) result[groupName].push(data);
        })
        return result;
    }

    forEach(element.children, (_, children) => {
        let data = getFormValueBeta(children);
        Object.assign(result, data);
    })

    return result;
}

export function getFormValueV2(element) {
    // Make sure all input tag has name attribute
    function getValue(element) {
        let hasValue = element.hasAttribute("name") || element.value ? true : false;
        let valueValue;

        let tag = element.tagName;
        if (tag != 'INPUT')
            return element.getAttribute("value");

        let type = element.type;
        if (type == "checkbox")
            return element.getAttribute("checked");

    }

    function getName(element){
        let hasAttrName = element.hasAttribute("name");
        let nameAttrValue = element.getAttribute("name");

        return [hasAttrName, nameAttrValue];
    }
    let result = {};

    let hasName = element.hasAttribute("name");
    let hasValue = element.hasAttribute("value") || element.value ? true : false;

    if (hasName && hasValue) {
        let name = element.getAttribute("name");
        let value = element.getAttribute("value");
        result[name] = value;
        return result;
    }

    if (hasName) {
        let name = element.getAttribute("name");
        if (element.value)
            result[name] = element.value;
        else result[name] = element.innerHTML;
        return result;
    }

    let isGroup = element.hasAttribute("group-name");
    if (isGroup) {
        let groupName = element.getAttribute("group-name");
        result[groupName] = [];
        forEach(element.children, (_, children) => {
            let data = getFormValueBeta(children);
            if (!isObjectEmpty(data)) result[groupName].push(data);
        })
        return result;
    }

    forEach(element.children, (_, children) => {
        let data = getFormValueBeta(children);
        Object.assign(result, data);
    })

    return result;
}

export function getUpdateFormValue(element) {
    // Make sure all input tag has name attribute
    let result = {};

    let hasName = element.hasAttribute("name");
    let hasValue = element.hasAttribute("value");
    let hasChange = element.hasAttribute("changed");
    if (hasName && hasValue && hasChange) {
        let name = element.name;
        let value = element.value;
        result[name] = value;
        return result;
    }

    if (hasName && hasChange) {
        let name = element.getAttribute("name");
        if (element.value)
            result[name] = element.value;
        else result[name] = element.innerHTML;
        return result;
    }

    let isGroup = element.hasAttribute("group-name");
    if (isGroup) {
        let groupName = element.getAttribute("group-name");
        result[groupName] = [];
        forEach(element.children, (_, children) => {
            let data = getUpdateFormValue(children);
            if (!isObjectEmpty(data)) result[groupName].push(data);
        })
        return result;
    }

    forEach(element.children, (_, children) => {
        let data = getUpdateFormValue(children);
        Object.assign(result, data);
    })

    return result;
}

function getCustomFormValue(customFormElement) {
    {
        details: [
            {
                capacity: "capacity_1",
                price: "price_1"
            }
        ]
        facilities: [
            {
                name: "facility_1"
            },
            {
                name: "facility_2"
            },
        ]
    }
    customFormElement.querySelectorAll("[input]").forEach(element => {
        let key = element.getAttribute("name");
        let value = element.getAttribute("value");
    })
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

function isObject(data) {
    if (!(data instanceof Function) && data instanceof Object) return true;
    return false;
}

function isNum(val) {
    return !isNaN(val);
}

function isObjectEmpty(object) {
    return Object.keys(object).length <= 0 ? true : false;
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

export function addCustomEventListener(eventName, callback, element, eventConfig = {}, triggerEvent = "click") {
    // console.log("Call Custom", eventName);
    const event = new Event(eventName, eventConfig);
    element = element || document.querySelector(`[type=${eventName}]`);
    element.addEventListener(eventName, e => {
        // console.log("execute callback for event " + eventName);
        callback(e);
    })
    element.addEventListener(triggerEvent, e => {
        // console.log("dispatchEvent " + eventName + " because " + triggerEvent, element);
        // if(e.target === e.currentTarget) 
        element.dispatchEvent(event);
        e.preventDefault();
        e.stopPropagation();
    });
    // console.log("finish");
}

export function addCustomEventListenerV2(eventName, callback, element, triggerElement, eventConfig = {}, triggerEvent = "click") {
    // console.log("Call Custom", eventName);
    const event = new Event(eventName, eventConfig);
    element.addEventListener(eventName, e => {
        console.log("Who is Listener ", e, e.target);
        // console.log("execute callback for event " + eventName);
        callback(e);
    })
    triggerElement.addEventListener(triggerEvent, e => {
        console.log("Who is Trigger ", e, e.target);
        // console.log("dispatchEvent " + eventName + " because " + triggerEvent, element);
        // if(e.target === e.currentTarget) 
        element.dispatchEvent(event);
        e.preventDefault();
        e.stopPropagation();
    });
    // console.log("finish");
}

export function addCustomEventListenerV3(eventName, callback, element, triggerElement, eventConfig = {}, triggerEvent = "click") {
    element.addEventListener(eventName, e => {
        callback(e);
    })
    triggerElement.addEventListener(triggerEvent, e => {
        const event = new CustomEvent(eventName, {
            detail: {
                target: triggerElement
            }
        });

        element.dispatchEvent(event);
    });
}

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

export function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; Max-Age=-99999999;';
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
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        // "Content-Type": "multipart/form-data",
        // "responseType": 'blob'
    }
};

export function getUserID() {
    let cookie = getCookie("tokens");
    if(cookie == undefined) return undefined;
    else {
        /*
            [0]: 26da19e0-c540-11ed-821e-00059a3c7a00
            [1]: role
            [2]: Manager
        */
        let splittedCookie = cookie.split(/[\|\=]+/);
        if(splittedCookie[0] === "role") {
            alert("User not registered!");
            return;
        } 
        else return splittedCookie[0].replace(SECRET, '');
    }
    // return getCookie("tokens")
    // return "not implemented userid in cookie";
}

export function getRoleOfUser() {
    let cookie = getCookie("tokens");
    if(cookie == undefined) return undefined;
    else {
        /*
            [0]: 26da19e0-c540-11ed-821e-00059a3c7a00
            [1]: role
            [2]: Manager
        */
        let splittedCookie = cookie.split(/[\|\=]+/);
        return splittedCookie[2];
    }
}

// function APIPost(resource, requestBody, requesterid = true) {
//     if (requesterid === true) requestBody.requesterIdUser = getUserID();
//     else {
//         requestBody.requesterIdUser = requesterid;
//     }
//     console.log(requestBody);
//     return new Promise((resolve, reject) => {
//         axios.post(END_POINT + resource, requestBody, axiosConfig).then(result => {
//             resolve(result)
//         }).catch(result => {
//             reject(result.response)
//         })
//     })
// }

// function APIPut(resource, requestBody, requesterid = true) {
//     if (requesterid === true) requestBody.requesterIdUser = getUserID();
//     else {
//         requestBody.requesterIdUser = requesterid;
//     }
//     console.log(requestBody);
//     return new Promise((resolve, reject) => {
//         axios.put(END_POINT + resource, requestBody, axiosConfig).then(result => {
//             resolve(result)
//         }).catch(result => {
//             reject(result.response)
//         })
//     })
// }

export function APIPut(resource, requestBody, requestHeader, requesterid = true) {
    let headers = { headers: {} }

    if (requesterid === true) requestBody.requesterIdUser = getUserID();
    else {
        requestBody.requesterIdUser = requesterid;
    }

    Object.assign(headers.headers, axiosConfig.headers, requestHeader);
    return new Promise((resolve, reject) => {
        axios.put(END_POINT + resource, requestBody, headers).then(result => {
            resolve(result)
        }).catch(result => {
            reject(result.response)
        })
    })
}

export function APIPost(resource, requestBody, requestHeader, requesterid = true) {
    let headers = { headers: {} }
    
    if (requesterid === true) requestBody.requesterIdUser = getUserID();
    else if (requesterid !== false) {
        requestBody.requesterIdUser = requesterid;
    }

    Object.assign(headers.headers, axiosConfig.headers, requestHeader);
    return new Promise((resolve, reject) => {
        axios.post(END_POINT + resource, requestBody, headers).then(result => {
            resolve(result)
        }).catch(result => {
            reject(result.response)
        })
    })
}

// export function APIPostV2(resource, requestBody, requestHeader) {
//     requestBody.requesterIdUser = getUserID();
//     let headers = { headers: {} }
//     Object.assign(headers.headers, axiosConfig.headers, requestHeader);
//     console.log(requestBody);
//     return new Promise((resolve, reject) => {
//         axios.post(END_POINT + resource, requestBody, headers).then(result => {
//             resolve(result)
//         }).catch(result => {
//             reject(result.response)
//         })
//     })
// }

export function APIGet(resource) {
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            if (axios) {
                clearInterval(intervalId);
                axios.get(END_POINT + resource, axiosConfig).then(result => {
                    resolve(result)
                }).catch(result => {
                    reject(result.response)
                })
            }
        }, 50);
    })
}

export function APIDelete(resource) {
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            axios.delete(END_POINT + resource, axiosConfig).then(result => {
                clearInterval(intervalId);
                resolve(result)
            }).catch(result => {
                clearInterval(intervalId);
                reject(result.response)
            })
        }, 50);
    })
}

export function setAttributes(element, attribute) {
    Object.entries(attribute).forEach((key) => {
        element.setAttribute(key[0], key[1])
    })
};

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

export function goTo(path) {
    // / Absolute
    // ./ relative
    if (getCurrentPath() == path) return;
    window.location.href = path;
    // window.location.assign(path);
}

export function goBack() {
    history.back();
}

export function numberWithThousandsSeparators(x, removedSeparator = ".", separator = ".") {
    if (isNum(x)) x = x.toString();
    x = x.replaceAll(removedSeparator, "");
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function calculateUNIXTime(UNIXTimestamp, manipulate) {

}

export function UNIXtimeConverter(UNIXTimestamp, format = "MM/DD/YYYY hh:mm:ss UTZ", language = "id") {
    let a = new Date(UNIXTimestamp),
        months = {
            'eng': {
                long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            "id": {
                long: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                short: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]
            }
        },
        dates = {
            'eng': {
                long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"],
                short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            },
            'id': {
                long: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
                short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            }
        },
        year = a.getFullYear(),
        month = a.getMonth(),
        date = a.getDate(),
        day = a.getDay(),
        hour = a.getHours(),
        min = a.getMinutes(),
        sec = a.getSeconds(),
        tzn = a.toTimeString().substring(9);

    let tempFormat = {}
    let tempKey = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "="];

    let formatList = {
        DDDD: dates[language].long[day], //Sunday - Saturday
        DDD: dates[language].short[day], //Sun - Sat
        DD: date.toString().padStart(2, "0"), //01-31
        D: date, //1-31
        d: day, //0-6
        MMMM: months[language].long[month], //January - Desember
        MMM: months[language].short[month], //Jan - Des
        MM: (month + 1).toString().padStart(2, "0"), //01-12
        M: month + 1, //1-12
        YYYY: year, //1900-9999
        // YY: year, // 
        hh: hour.toString().padStart(2, "0"), //00-23
        mm: min.toString().padStart(2, "0"), //00-59
        ss: sec.toString().padStart(2, "0"), //00-59
        UTZ: tzn, //XXX+XXXX
    }

    for (let i = 0; i < Object.keys(formatList).length; i++) {
        let key = Object.keys(formatList)[i]
        tempFormat[key] = tempKey[i];
    }

    forEach(formatList, (key, value) => {
        format = format.replace(key, tempFormat[key])
    })

    forEach(formatList, (key, value) => {
        format = format.replace(tempFormat[key], value)
    })

    return format;
}

export function logout() {
    deleteCookie("tokens");
}

export function statusToString(statusCode) {
    if (statusCode === -1) {
        return ["badge-red", "Dibatalkan"];
    }
    if (statusCode === 0) {
        return ["badge-yellow", "Menunggu Konfirmasi"];
    }
    if (statusCode === 2) {
        return ["badge-blue", "Diterima"];
    }
    if (statusCode === 1) {
        return ["badge-blue", "Dalam Pengerjaan"];
    }
    if (statusCode === 3) {
        return ["badge-color", "Selesai"];
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
    let grouped = getCurrentWeekList(dateFormatKey);

    arrayData.forEach(data => {
        let date = UNIXtimeConverter(data[dateKey], dateFormatKey);
        if (date in grouped) {
            grouped[date].push(data);
        }
    })

    return grouped;
}

export function getURLParam(paramId) {
    let params = new URLSearchParams(location.search);
    return params.get(paramId);
}

export function convertImage64ToSrc(imageInBase64, imageExt = "png") {
    return `data:image/${imageExt};base64,` + imageInBase64;
}

export function getCurrentPath() {
    let currentPath = window.location.pathname;
    return currentPath;
}

export function getTempID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getCurrentWeekList(dateFormat) {
    let weekList = {};

    let dayInMillis = 86400000;

    let currentMillis = +new Date();
    // let currentMillis = 1675728001000;
    let currentDate = new Date(currentMillis);
    let currentDay = currentDate.getDay();

    for (let i = 0; i < 7; i++) {
        let offset = i - currentDay;
        let temp = currentMillis + (offset * dayInMillis);
        weekList[UNIXtimeConverter(temp, dateFormat)] = [];
    }

    return weekList;
}