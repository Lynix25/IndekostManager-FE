import { END_POINT } from "./config.js";
import { getCookie } from "./cookiemanagement.js";

/**
 * 
 * @requires AXIOS
 * @param {*} resource 
 * @param {JSON} requestBody 
 * @returns 
 */

function headers(aditionalConfig) {
    let defaultConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        }
    }

    return Object.assign(defaultConfig, { "headers": aditionalConfig });
}

export function APIPut(resource, requestBody, requestHeader) {
    if (requestBody != null || requestBody != undefined) requestBody.requesterId = getCookie("id");
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            if (axios) {
                clearInterval(intervalId)
                axios.put(END_POINT + resource, requestBody, headers(requestHeader)).then(result => {
                    resolve(result);
                }).catch(result => {
                    reject(result.response);
                })
            }
        })
    })
}

export function APIPost(resource, requestBody, requestHeader) {
    if (requestBody != null || requestBody != undefined) requestBody.requesterId = getCookie("id");
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            if (axios) {
                clearInterval(intervalId);
                axios.post(END_POINT + resource, requestBody, headers(requestHeader)).then(result => {
                    resolve(result)
                }).catch(result => {
                    reject(result.response)
                })
            }
        })
    })
}

export function APIGet(resource) {
    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            if (axios) {
                clearInterval(intervalId);
                axios.get(END_POINT + resource, headers()).then(result => {
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
            if (axios) {
                clearInterval(intervalId);
                axios.delete(END_POINT + resource, headers()).then(result => {
                    resolve(result)
                }).catch(result => {
                    reject(result.response)
                })
            }
        }, 50);
    })
}