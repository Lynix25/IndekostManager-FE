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

    for (var pair of formData.entries()) {
        data[pair[0]] = pair[1]
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

export function handleFormSubmited(callback, formSelector = "form") {
    document.querySelector(formSelector).addEventListener('submit', e => {
        callback(e);
        e.preventDefault();
    })
}