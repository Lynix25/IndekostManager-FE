import { Constant, END_POINT, SECRET } from "./config.js"
import { getCookie } from "./cookiemanagement.js";

/**
 * Get inputvalue from a form
 * 
 * @param {FormElement} formElement 
 * @returns Object
 */
export function getFormValue(formElement) {
    // Make sure all input tag has name attribute

    const formData = new FormData(formElement), data = {};
    for (let [key, value] of formData) {
        data[key] = value;
    }

    formElement.querySelectorAll("[input]").forEach(element => {
        let key = element.name;
        let value = element.value;
        data[key] = value;
    })

    return isObjectEmpty(data) ? null : data;
}

export function getFormValueV2(element) {
    // Make sure all input tag has name attribute
    function getValue(element) {
        let hasAttrValue = element.hasAttribute("name") || element.value ? true : false;
        let valueValue = element.value || element.getAttribute("value");

        let tag = element.tagName;
        // if (tag != 'INPUT')
        //     return element.getAttribute("value");

        let type = element.type;
        if (type == "checkbox")
            valueValue = element.checked;

        return [hasAttrValue, valueValue];
    }

    function getName(element) {
        let hasAttrName = element.hasAttribute("name");
        let nameAttrValue = element.getAttribute("name");

        return [hasAttrName, nameAttrValue];
    }
    let result = {};

    let [hasName, name] = getName(element);
    let [hasValue, value] = getValue(element);

    if (hasName && hasValue) {
        result[name] = value;
        return result;
    }

    let isGroup = element.hasAttribute("group-name");
    if (isGroup) {
        let groupName = element.getAttribute("group-name");
        result[groupName] = [];
        forEach(element.children, (_, children) => {
            let data = getFormValueV2(children);
            if (!isObjectEmpty(data)) result[groupName].push(data);
        })
        return result;
    }

    forEach(element.children, (_, children) => {
        let data = getFormValueV2(children);
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

export function addCustomEventListener(eventName, callback, element, triggerElement, eventConfig = {}, triggerEvent = "click", preventDefault = true) {
    element = element || document.querySelector(`[type=${eventName}]`);
    triggerElement = triggerElement || element;
    element.addEventListener(eventName, e => {
        callback(e);
    });
    triggerElement.addEventListener(triggerEvent, e => {
        const event = new CustomEvent(eventName, {
            detail: {
                target: triggerElement
            }
        });
        element.dispatchEvent(event);
        if (preventDefault) e.preventDefault();
    });
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

export function convertImage64ToSrc(imageInBase64, imageExt = "png") {
    return `data:image/${imageExt};base64,` + imageInBase64;
}

export function getCurrentPath() {
    let currentPath = window.location.pathname;
    return currentPath;
}

export function getParamOnURL(paramId) {
    let params = new URLSearchParams(location.search);
    return params.get(paramId);
}

export function getTempID() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function statusToString(statusCode) {
    if (statusCode === Constant.serviceRequestStatus.REJECTED) {
        return ["badge-red", Constant.serviceRequestStatus.REJECTED];
    }
    if (statusCode === Constant.serviceRequestStatus.SUBMITTED) {
        return ["badge-yellow", Constant.serviceRequestStatus.SUBMITTED];
    }
    if (statusCode === Constant.serviceRequestStatus.ACCEPTED) {
        return ["badge-blue", Constant.serviceRequestStatus.ACCEPTED];
    }
    if (statusCode === Constant.serviceRequestStatus.ON_PROCESS) {
        return ["badge-blue", Constant.serviceRequestStatus.ON_PROCESS];
    }
    if (statusCode === Constant.serviceRequestStatus.COMPLETED) {
        return ["badge-green", Constant.serviceRequestStatus.COMPLETED];
    }
}

export function getUserID() {
    let cookie = getCookie("id");
    if (cookie == undefined) return undefined;
    return cookie;
}

export function getRoleOfUser() {
    let cookie = getCookie("role");
    if (cookie == undefined) return undefined;
    return cookie;
}

export function isOwnerOrAdmin() {
    if(getRoleOfUser() === Constant.role.OWNER || getRoleOfUser() === Constant.role.ADMIN) return true;
    else return false;
}

export function getURLParam(paramId) {
    let params = new URLSearchParams(location.search);
    return params.get(paramId);
}

// ====================================== DATE ======================================

export const dayInMillis = 86400000;

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

function getCurrentWeekList(dateFormat) {
    let weekList = {};

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

/**
 * 
 * @param {String} dateTimelocal 
 * @returns 
 */
export function dateTimeLocalInputToMilliseconds(dateTimelocal) {
    return new Date(dateTimelocal).getTime();
}