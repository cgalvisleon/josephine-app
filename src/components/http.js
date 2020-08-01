import { getToken, getSession, OutLoading, Loading } from "./utilities";
import environment from "../env/env";
const production = process.env.NODE_ENV !== "development";
const apiUrl = production ? environment.url : environment.url_dev;

const getHeaders = function() {
  const date = new Date();
  const timezone = -1 * (date.getTimezoneOffset() / 60);
  const token = getToken();
  const session = getSession();
  const key = "";
  let result = new Headers();
  result.append("Accept", "application/json");
  result.append("Content-Type", "application/json");
  result.append("language", navigator.language);
  result.append("Timezone", `${timezone}`);
  result.append("Josephine_Key", `${key}`);
  result.append("Authorization", `Bearer ${token}`);
  result.append("Session", session);
  return result;
};

const extractResponse = async function(response) {
  if (response.status === 401) {
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

export const http = async function(method, endpoint, params) {
  Loading("http");
  params = params || {};
  const headers = getHeaders();
  let result = {};
  if (method === "GET") {
    result = await fetch(`${apiUrl}/${endpoint}`, {
      method: "GET",
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "POST") {
    result = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "PUT") {
    result = await fetch(`${apiUrl}/${endpoint}`, {
      method: "PUT",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "PATCH") {
    result = await fetch(`${apiUrl}/${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(params),
      headers: headers
    })
      .then(res => extractResponse(res))
      .catch(error => handleError(error));
  } else if (method === "DELETE") {
    result = await fetch(`${apiUrl}/${endpoint}`, {
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
  const url = `${apiUrl}/${endpoint}`;
  window.open(url, "_blank");
};

export const xls = async function(endpoint) {
  const url = `${apiUrl}/${endpoint}`;
  window.open(url, "_blank");
};
