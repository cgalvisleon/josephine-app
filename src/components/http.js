import store from "../services/store";
import environment from "../env/env";
import { OutLoading, Loading } from "./utilities";
import { Actions as Sistem } from "../services/actions/sistem";
const production = environment.production;

const getHeaders = function() {
  const state = store.getState();
  const date = new Date();
  const timezone = -1 * (date.getTimezoneOffset() / 60);
  const key = "";
  const token = state.sistem.token;
  let result = new Headers();
  result.append("Accept", "application/json");
  result.append("Content-Type", "application/json");
  result.append("language", navigator.language);
  result.append("Timezone", `${timezone}`);
  result.append("Josephine_Key", `${key}`);
  result.append("Authorization", `Bearer ${token}`);
  return result;
};

const extractResponse = async function(response) {
  console.log(response);
  if (response.status === 401) {
    Sistem.signout();
    response = { msg: "401", message: response.statusText, data: {} };
  } else {
    response = response.json();
  }
  OutLoading("http");
  return response;
};

const handleError = function(error) {
  const response = {
    msg: "Error",
    message: error.message
  };
  OutLoading("http");
  return response;
};

export const http = async function(method, endpoint, params, background) {
  background = background === undefined ? false : background;
  params = params || {};
  if (!background) {
    Loading("http");
  }
  const headers = getHeaders();
  let result = {};
  if (method === "GET") {
    result = await fetch(`${endpoint}`, {
      method: "GET",
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "POST") {
    result = await fetch(`${endpoint}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "PUT") {
    result = await fetch(`${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "PATCH") {
    result = await fetch(`${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "DELETE") {
    result = await fetch(`${endpoint}`, {
      method: "DELETE",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else {
    OutLoading("http");
  }
  if (!production) {
    console.log({ method, endpoint, params, result });
  }
  return result;
};

export const pdf = function(endpoint) {
  const url = `${endpoint}`;
  window.open(url, "_blank");
};

export const xls = async function(endpoint) {
  const url = `${endpoint}`;
  window.open(url, "_blank");
};
