import { END_POINT } from "./config.js"

/**
 * Get inputvalue from a form
 * 
 * @param {Element} formElement 
 * @returns Object
 */
export function getFormValue(formElement) {
    // Make sure all inputs tag has name attribute
    const formData = new FormData(formElement),
        data = {};
    for (const [key, value] of formData) {
        data[key] = value
    }

    return data;
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
    document.querySelector(formSelector).addEventListener('submit', e => {
        callback(e);
        if (preventDefault) e.preventDefault();
    })
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

function getUserID(){
    return "not implemented userid in cookie";
}

export function APIPost(resource, requestBody, requesterid = true) {
    if (requesterid) requestBody.requesterIdUser = getUserID();
    console.log(requestBody);
    return new Promise((resolve, reject) => {
        axios.post(END_POINT + resource, requestBody, axiosConfig).then(result => {
            resolve(result)
        }).catch(result => {
            reject(result.response)
        })
    })

}

export function APIGet(resource) {
    return new Promise((resolve, reject) => {
        axios.get(END_POINT + resource, axiosConfig).then(result => {
            resolve(result)
        }).catch(result => {
            reject(result.response)
        })
    })

}

export function forEach(objectOrArray, callback) {
    if (Array.isArray(objectOrArray)) {
        objectOrArray.forEach(value => {
            callback(value);
        })
    }
    else if (!(objectOrArray instanceof Function) && objectOrArray instanceof Object) {
        Object.keys(objectOrArray).forEach(key => {
            callback(key, objectOrArray[key])
        })
    }
    else {
        console.log("no object / array given, but given " + typeof (objectOrArray))
    }
}

export function numberWithThousandsSeparators(x, separator=".") {
    if (isNum(x)) x = x.toString();
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function isNum(val) {
    return !isNaN(val);
}

export function UNIXtimeConverter(UNIX_timestamp, format = "MM/DD/YY hh:mm:ss UTZ") {
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
        // YY: year, 
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

