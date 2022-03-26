import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

var usersServices = {
  usersEndPoint: `${API_HOST_PREFIX}/api/users/`,
  headers: { "content-type": "application/json" },
};

let register = (payload) => {
  const settings = {
    method: "POST",
    url: usersServices.usersEndPoint,
    headers: usersServices.headers,
    crossdomain: true,
    data: payload,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let recoverPassword = (payload) => {
  const settings = {
    method: "GET",
    url: usersServices.usersEndPoint + "recover?email=" + payload.email,
    headers: usersServices.headers,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let resetPassword = (payload) => {
  const settings = {
    method: "PUT",
    url: usersServices.usersEndPoint + "recover/" + payload.token,
    headers: usersServices.headers,
    crossdomain: true,
    data: payload,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let login = (payload) => {
  const settings = {
    method: "POST",
    url: usersServices.usersEndPoint + "login",
    headers: usersServices.headers,
    crossdomain: true,
    //withCredentials: true,
    data: payload,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let GoogleLogin = (payload) => {
  const settings = {
    method: "POST",
    url: usersServices.usersEndPoint + "googlelogin",
    headers: usersServices.headers,
    crossdomain: true,
    data: payload,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let logout = () => {
  const settings = {
    method: "GET",
    url: usersServices.usersEndPoint + "logout",
    headers: usersServices.headers,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let getCurrent = () => {
  const settings = {
    method: "GET",
    url: usersServices.usersEndPoint + "current",
    headers: usersServices.headers,
    withCredentials: true,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let confirmReg = (token) => {
  const settings = {
    method: "GET",
    url: usersServices.usersEndPoint + "confirm/" + token,
    headers: usersServices.headers,
    crossdomain: true,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

let accountPWChange = (payload) => {
  const settings = {
    method: "PUT",
    url: usersServices.usersEndPoint + "changePassword",
    headers: usersServices.headers,
    crossdomain: true,
    withCredentials: true,
    data: payload,
  };
  return axios(settings).then(onGlobalSuccess).catch(onGlobalError);
};

export default {
  register,
  login,
  logout,
  getCurrent,
  confirmReg,
  GoogleLogin,
  accountPWChange,
  recoverPassword,
  resetPassword,
};
