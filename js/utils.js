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

    // for (item of formData) {
    //     data[item[0]] = item[1] === 'true' ? true : item[1];
    // }
    for (var pair of formData.entries()) {
        data[pair[0]] = pair[1]
    }

    return data;
}