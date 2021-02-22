import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";

// signup action
export const signup = (user) => {
  return fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// signin action
export const signin = (user) => {
  return fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// signout action
export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${API}/auth/signout`, { method: "GET" })
    .then((response) => console.log("signout success"))
    .catch((err) => {
      console.log(err.message);
    });
};

// set/remove cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, { expires: 1 });
  }
};

export const removeCookie = (key) => {
  cookie.remove(key, { expires: 1 });
};

// get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

// localstorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// authenticate user
export const authenticate = (data, next) => {
  setCookie("token", data.jwt);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.stringify(localStorage.getItem("user"));
      } else return false;
    }
  }
};
