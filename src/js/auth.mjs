import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loginRequest } from "./externalServices.mjs";
import { jwtDecode } from "jwt-decode";

const tokenKey = "so-token";
export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    } catch (err) {
        console.error(err.message.message);
    }
}

function isTokenValid(token) {
    if (token) {
        const decoded = jwtDecode(token);
        let currentDate = new Date();
        // TODO: Set this back to 1000
        if ((decoded.exp + 60) * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            return false;
        }
        console.log("Valid token");
        return true;
    }
    return false;
}

export function checkLogin() {
    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid(token);
    if (!valid) {
        localStorage.removeItem(tokenKey);
        const location = window.location;
        console.log(location);
        window.location = `/login/index.html?redirect=${location.pathname}`;
        return;
    }
    return token;
}

