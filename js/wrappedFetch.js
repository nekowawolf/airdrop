import { get as getFromProcess } from "https://bukulapak.github.io/api/process.js";

export function get(url) {
    return new Promise((resolve, reject) => {
        getFromProcess(url, (response) => {
            if (response) {
                resolve(response); 
            } else {
                reject(new Error('Data fetching error'));
            }
        });
    });
}
