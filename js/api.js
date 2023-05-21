import { END_POINT } from "./config.js";
import { getCookie } from "./cookiemanagement.js";

export function APIPut(resource, body, headers) {
    if (body != null || body != undefined) body.requesterId = getCookie("id");
    return request("put", resource, body, undefined, headers);
}

export function APIPost(resource, body, headers) {
    if (body != null || body != undefined) body.requesterId = getCookie("id");
    return request("post", resource, body, undefined, headers);
}

export function APIGet(resource, params) {
    return request("get", resource, undefined, params);
}

export function APIDelete(resource, params) {
    return request("delete", resource, undefined, params);
}

/**
 * 
 * @requires AXIOS
 * @param {String} method
 * @param {*} resource 
 * @param {JSON} body 
 * @param {JSON} params 
 * @param {JSON} headers 
 * @returns 
 */

function request(method = 'get', resource, body, params, headers) {
    let config = {
        method: method,
        url: END_POINT + resource,
        headers: {
            "ngrok-skip-browser-warning": true,
            "Access-Control-Allow-Origin": "*",
        }
    };

    if (method != 'get' || body) config.data = body;
    if (params) config.params = params;
    if (headers) {
        config.headers = Object.assign(config.headers, headers);
    }

    return new Promise((resolve, reject) => {
        let intervalId = setInterval(() => {
            if (axios) {
                clearInterval(intervalId);
                axios(config).then(result => resolve(result)).catch(err => reject(err));
            }
        }, 50);
    })
}