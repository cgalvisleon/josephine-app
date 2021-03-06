import $ from "jquery";
import environment from "../env/env";
import pjson from "../../package.json";
import io from "socket.io-client";
import bsCustomFileInput from "bs-custom-file-input";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";
import getUnixTime from "date-fns/getUnixTime";
import differenceInDays from "date-fns/differenceInDays";
import differenceInMinutes from "date-fns/differenceInMinutes";
import esLA from "../assets/locale/es-la";
import { MSG408 } from "./msg";
import { Actions as Basic } from "../services/actions/sistem";
import { KEY_STORAGE } from "../services/actionTypes";
import store from "../services/store";
const production = environment.production;
const apiUrl = environment.url;
const socketIo = io(apiUrl);

window.addEventListener("offline", () => {
  Basic.online(false);
});

window.addEventListener("online", () => {
  Basic.online(true);
});

export const App = {
  copyright: environment.copyright,
  production: production,
  company: environment.company,
  address: environment.address,
  mobile: environment.mobile,
  app: environment.app,
  version: pjson.version,
  host: window.location.origin,
  mapbox: environment.mapbox
};

export const emptyValue = function(data, fieldName, _default) {
  if (data === undefined || data === null) {
    return _default;
  } else if (
    data[fieldName] === undefined ||
    data[fieldName] === null ||
    data[fieldName] === "" ||
    Object.keys(data[fieldName]).length === 0
  ) {
    return _default;
  } else {
    return data[fieldName];
  }
};

export const getValue = function(data, fieldName, _default) {
  if (data === undefined || data === null) {
    return _default;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    return _default;
  } else {
    return data[fieldName];
  }
};

export const getData = function(result, fieldName, _default) {
  const data = getValue(result, "_data", {});
  return getValue(data, fieldName, _default);
};

export const getDateValue = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, "");
  try {
    if (date === "") {
      return _default;
    } else {
      return new Date(date);
    }
  } catch (err) {
    return date;
  }
};

export const getDateTime = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "yyyy-MM-dd'T'HH:mm:ss");
  } catch (err) {
    return date;
  }
};

export const getDateFormat = function(data, fieldName, _format, _default) {
  _format = _format || "yyyy-MM-dd";
  _default = _default || "";
  const date = getValue(data, fieldName, _default);
  if (date === _default) {
    return date;
  } else {
    try {
      return formatDate(new Date(date), _format);
    } catch (err) {
      return date;
    }
  }
};

export const getTime = function(data, fieldName, _default) {
  _default = _default || new Date();
  const date = getValue(data, fieldName, _default);
  try {
    return formatDate(new Date(date), "HH:mm:ss");
  } catch (err) {
    return date;
  }
};

export const getDateDifference = function(data, fieldDateInt, fieldDateEnd, exclude) {
  const now = new Date();
  exclude = exclude || false;
  const dateInt = getDateValue(data, fieldDateInt, now);
  const dateEnd = getDateValue(data, fieldDateEnd, now);
  try {
    if (exclude) {
      return differenceInMinutes(dateEnd, dateInt);
    } else {
      return differenceInMinutes(dateEnd, dateInt);
    }
  } catch (err) {
    return 0;
  }
};

export const getDifferenceInDays = function(data, fieldName, literal) {
  const now = new Date();
  let value = getValue(data, fieldName, now);
  try {
    value = new Date(value);
    let days = 0;
    if (value > now) {
      days = differenceInDays(new Date(value), now);
    } else {
      days = differenceInDays(now, new Date(value));
    }
    if (literal) {
      return days === 1 ? "1 d??a" : `${days} d??as`;
    } else {
      return days;
    }
  } catch {
    return 0;
  }
};

export const getNumber = function(data, fieldName, _default) {
  const value = getValue(data, fieldName, _default);
  if (typeof value == "number") {
    return formatNumber(value, 2);
  } else {
    return value;
  }
};

export const getMoney = function(data, fieldName, _default) {
  const value = getValue(data, fieldName, _default);
  if (typeof value == "number") {
    return formatMoney(value);
  } else {
    return value;
  }
};

export const getPayload = function(value) {
  const payload = Buffer.from(value, "base64").toString();
  return JSON.parse(payload);
};

export const genId = function(id) {
  id = id || "-1";
  if (id === "-1" || id === "new") {
    return uuidv4();
  } else {
    return id;
  }
};

export const genFileName = function(name, ext, size) {
  const now = new Date();
  const payload = {
    name: name,
    ext: ext,
    size: size,
    iat: getUnixTime(now)
  };
  const result = JSON.stringify(payload);
  return Buffer.from(result, "utf8").toString("base64");
};

export const genImgBase64 = function(fileName) {
  const file = fs.readFileSync(fileName);
  const ext = path.extname(fileName);
  const base64 = file.toString("base64");
  return `data:image/${ext.split(".").pop()};base64,${base64}`;
};

export const getRow = function(list, index, _default) {
  _default = _default || {};
  if (list === undefined) {
    return _default;
  } else if (list[index] === undefined) {
    return _default;
  } else {
    return list[index];
  }
};

export const getRowValue = function(list, index, fieldName, _default) {
  if (list === undefined) {
    return _default;
  } else if (list[index] === undefined) {
    return _default;
  } else if (list[index][fieldName] === undefined) {
    return _default;
  } else if (list[index][fieldName] === null) {
    return _default;
  } else {
    return list[index][fieldName];
  }
};

export const getRowNumber = function(list, index, fieldName, _default) {
  _default = _default === undefined ? 0 : _default;
  const value = getRowValue(list, index, fieldName, _default);
  if (value === "") {
    return _default;
  } else {
    return formatNumber(value);
  }
};

export const getRowMoney = function(list, index, fieldName, _default) {
  _default = _default === undefined ? 0 : _default;
  const value = getRowValue(list, index, fieldName, _default);
  if (value === "") {
    return _default;
  } else {
    return formatMoney(value);
  }
};

export const getRowData = function(list, row, fieldName, _default) {
  const item = getRow(list, row);
  return getData(item, fieldName, _default);
};

export const validStr = function(val, len) {
  len = len || 0;
  if (val === null) {
    return false;
  } else if (val === undefined) {
    return false;
  } else if (val.length === 0) {
    return false;
  } else if (len > 0) {
    return val.length >= len;
  } else {
    return true;
  }
};

export const validEmail = function(value) {
  return /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(value);
};

export const validCellPhone = function(value) {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value);
};

export const validValue = function(data, fieldName, valid, _default) {
  const value = getValue(data, fieldName, _default);
  if (value === valid) {
    return _default;
  } else {
    return value;
  }
};

export const now = function(_format) {
  const date = new Date();
  _format = _format === undefined ? "dd/MM/yyyy HH:mm:SSSS" : _format;
  return formatDate(date, _format);
};

export const div = function(divisor, dividendo) {
  if (dividendo === 0) {
    return divisor;
  } else {
    return divisor / dividendo;
  }
};

export const number = function(value) {
  value = Number(value);
  if (isNaN(value)) {
    value = 0;
  }
  return value;
};

export const chart = function(str, int) {
  return str.charAt(int);
};

export const formatDateTime = function(value, formato) {
  formato = formato || "dd/MM/yyyy HH:mm a";
  try {
    return format(new Date(value), formato, { locale: esLA });
  } catch {
    return value;
  }
};

export const formatDate = function(value, formato) {
  formato = formato || "dd/MM/yyyy";
  try {
    return formatDateTime(new Date(value), formato);
  } catch {
    return value;
  }
};

export const formatFloat = function(value, precision) {
  precision = precision || 2;
  if (value === undefined) {
    return "0";
  } else {
    value = number(value);
    value = value.toLocaleString("es-us", {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision
    });
    return `${value}`;
  }
};

export const formatNumber = function(value, precision) {
  precision = precision || 2;
  if (value === undefined) {
    return "0";
  } else {
    value = number(value);
    value = value.toLocaleString("es-CO", {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision
    });
    return `${value}`;
  }
};

export const formatInteger = function(value) {
  value = value.toString().split(",")[0];
  return value;
};

export const formatMoney = function(value, precision) {
  precision = precision || 2;
  if (value === undefined) {
    return "$ 0";
  } else {
    value = number(value);
    value = value.toLocaleString("es-CO", {
      maximumFractionDigits: precision,
      minimumFractionDigits: precision
    });
    return `$ ${value}`;
  }
};

export const formatDHM = function(value) {
  let M = Math.trunc(value / 43200);
  let Y = Math.trunc(M / 12);
  let d = Math.trunc((value - M * 43200) / 1440);
  let h = Math.trunc((value - M * 43200 - d * 1440) / 60);
  let m = Math.trunc(value - M * 43200 - d * 1440 - h * 60);
  M = Math.trunc(M - Y * 12);
  return Y > 0 ? `${Y}A ${M}M ${d}D ${h}H ${m}M` : M > 0 ? `${M}M ${d}D ${h}H ${m}M` : `${d}D ${h}H ${m}M`;
};

export const setFocus = function(id, focused) {
  focused = focus === undefined ? true : focused;
  if (focused) {
    setTimeout(() => {
      focus(id);
    }, 1000);
  }
};

export const msg = function(code) {
  const data = {
    "MSG-CHANGE": "??Tienes cambios pendiente por guardar!",
    "MSG-FIRST-ROW": "??Llegaste al primer registro!",
    "MSG-END-ROW": "??Llegaste al ultimo registro!"
  };
  return getValue(data, code, `Mensaje no definido - ${code}`);
};

export const appendStr = function(str, add, space) {
  str = str || "";
  add = add || "";
  space = space || " ";
  if (add.length === 0) {
    return str;
  } else if (str.length === 0) {
    return add;
  } else {
    return `${str}${space}${add}`;
  }
};

export const setValue = function(data, fieldName, value) {
  if (data === undefined || data === null) {
    data = {};
    data[fieldName] = value;
  } else if (data[fieldName] === undefined || data[fieldName] === null) {
    data[fieldName] = value;
  } else {
    data[fieldName] = value;
  }
  return data;
};

export const removeStorage = function() {
  localStorage.removeItem(KEY_STORAGE);
};

export const getStorage = function(attr, _default) {
  let store = localStorage.getItem(KEY_STORAGE);
  if (!store) {
    return _default;
  } else {
    store = JSON.parse(store);
    return getValue(store, attr, _default);
  }
};

export const setStorage = function(attr, val) {
  let store = localStorage.getItem(KEY_STORAGE);
  if (!store) {
    store = {};
  } else {
    store = JSON.parse(store);
  }
  store = setValue(store, attr, val);
  localStorage.setItem(KEY_STORAGE, JSON.stringify(store));
  return val;
};

export const Socket = {
  themes: {},
  subscribe: function(theme, callback) {
    if (!this.themes[theme]) this.themes[theme] = [];
    this.themes[theme].push(callback);
    socketIo.on(theme, message => {
      "function" === typeof callback && callback(message);
    });
  },
  unSubscribe: function(theme, callback) {
    socketIo.off(theme, callback);
    if (!this.themes[theme]) return;
    const i = this.themes[theme].indexOf(callback);
    this.themes[theme].splice(i, 1);
  }
};

export const EventEmitter = {
  events: {},
  emitter: function(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => "function" === typeof callback && callback(data));
  },
  subscribe: function(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  unSubscribe: function(event, data) {
    if (!this.events[event]) return;
    const i = this.events[event].indexOf(data);
    this.events[event].splice(i, 1);
  }
};

export const isOnLine = function() {
  return navigator.onLine;
};

export const Emitter = function(event, data) {
  EventEmitter.emitter(event, data);
};

export const Event = function(event, callback) {
  EventEmitter.subscribe(event, callback);
};

export const EventUnSubscribe = function(event, callback) {
  EventEmitter.unSubscribe(event, callback);
};

export const Subscribe = function(theme, callback) {
  Socket.subscribe(theme, callback);
};

export const UnSubscribe = function(theme, callback) {
  Socket.unSubscribe(theme, callback);
};

export const Loading = function(tag) {
  tag = tag || "";
  const state = store.getState();
  const count = Number(state.sistem.loading.count) + 1;
  Basic.loading(tag, count);
  if (tag === "") {
    setTimeout(() => {
      OutLoading("");
    }, 500);
  }
};

export const OutLoading = function(tag) {
  const state = store.getState();
  const count = Number(state.sistem.loading.count) - 1;
  if (count <= 0) {
    setTimeout(() => {
      Basic.outLoading();
    }, 500);
  } else {
    Basic.loading(tag, count);
  }
};

export const ShowAlert = function(message) {
  if (message !== "") {
    Basic.showAlert(message);
  }
};

export const ShowDanger = function(message) {
  if (message !== "") {
    Basic.showDanger(message);
  }
};

export const ShowWarning = function(message) {
  if (message !== "") {
    Basic.showWarning(message);
  }
};

export const ShowInfo = function(message) {
  if (message !== "") {
    Basic.showInfo(message);
  }
};

export const ShowOffLine = function() {
  ShowAlert(MSG408.message);
  return MSG408;
};

export const focus = function(id) {
  $(`#${id}`).focus();
};

export const toggle = function(id) {
  $(`#${id}`).toggle();
};

export const dropDown = function(id, down) {
  $(`#${id}`).toggle();
  if (down) {
    $(`#${id}_icon`).removeClass("fa-chevron-right");
    $(`#${id}_icon`).addClass("fa-chevron-down");
  } else {
    $(`#${id}_icon`).removeClass("fa-chevron-down");
    $(`#${id}_icon`).addClass("fa-chevron-right");
  }
};

export const style = function(id, attr, value) {
  $(`#${id}`).css(attr, value);
};

export const showModal = function(id) {
  $(`#${id}`).modal({
    backdrop: "static",
    keyboard: false,
    show: true
  });
};

export const hideModal = function(id) {
  $(`#${id}`).modal("hide");
};

export const minicount = function(value) {
  if (value > 999999999) {
    const v = value / 1000000000;
    const i = v.toString().split(".")[0];
    //const d = (v.toString().split(".")[1] || 0).toString().substring(0, 1) || 0;
    return `${i}B`;
  } else if (value > 999999) {
    const v = value / 1000000;
    const i = v.toString().split(".")[0];
    return `${i}M`;
  } else if (value > 999) {
    const v = value / 1000;
    const i = v.toString().split(".")[0];
    return `${i}K`;
  } else if (value <= 0 || !value) {
    return "";
  } else {
    return formatInteger(value);
  }
};

export const menuToogle = function() {
  if ($("#__sidebarMenu").css("display") === "block") {
    $("#__sidebarMenu").css("display", "none");
    $("#__sidebarTopMenu").css("marginLeft", "0px");
  } else {
    $("#__sidebarTopMenu").css("marginLeft", "240px");
    $("#__sidebarMenu").css("display", "block");
  }
};

export const show = function(id, value) {
  if (value) {
    $(`#${id}`).css("display", "block");
  } else {
    $(`#${id}`).css("display", "none");
  }
};

export const css = function(id, attr, value) {
  $(`#${id}`).css(attr, value);
};

export const fileUpload = function() {
  $(document).ready(function() {
    bsCustomFileInput.init();
  });
};

export const toolTip = function() {
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
};

export const onClick = function(id, callback) {
  $(function() {
    $(`#${id}`).on("click", callback);
  });
};

export const section = function(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitalize = function(s) {
  if (typeof s !== "string") return "";
  return s.replace(/(?:^|\s)\S(?!^|\s)/g, function(a) {
    return a.toUpperCase();
  });
};

export const phone = function(s) {
  let cleaned = ("" + s).replace(/\D/g, "");
  let match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return ["(+", match[1], ") ", match[2], "-", match[3]].join("");
  } else {
    match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return ["(", match[1], ") ", match[2], "-", match[3]].join("");
    }
  }
  return cleaned;
};

export const float = function(s) {
  s = s.toString();
  const a = s.split(".");
  if (a.length > 1) {
    s = `${a[0]}.${a[1]}`;
  }
  s = s.replace(/[a-zA-Z-*+/=<>,:;?^${}()|[\]\\`~!@#%&]/g, "");
  return s;
};

export const clone = function(json) {
  return JSON.parse(JSON.stringify(json));
};

export const join = function(list, add, key) {
  list = list || [];
  let result = list;
  add.map(function(item) {
    const index = list.findIndex(element => element[key] === item[key]);
    if (index === -1) {
      result.push(item);
    }
    return result;
  });
  return result;
};

export const updateList = function(data, item) {
  const filter = select => select._id === item._id;
  const result = data;
  const index = result.list.findIndex(filter);
  if (index === -1) {
    if (item._state === result.state || !result.state || result.state === "ALL") {
      result.all = result.all + 1;
      result.end = result.end + 1;
      result.rows = result.rows + 1;
      result.count = result.count + 1;
      result.list.unshift(item);
    }
  } else {
    if (result.state === "ALL") {
      result.list[index] = item;
    } else if (!item._state) {
      result.list[index] = item;
    } else if (item._state !== result.state) {
      result.all = result.all - 1;
      result.end = result.end - 1;
      result.rows = result.rows - 1;
      result.count = result.count - 1;
      result.list[index] = item;
      result.list[index].delete = true;
    } else if (result.list[index].delete) {
      result.all = result.all + 1;
      result.end = result.end + 1;
      result.rows = result.rows + 1;
      result.count = result.count + 1;
      result.list[index] = item;
    } else {
      result.all = result.all - 1;
      result.end = result.end - 1;
      result.rows = result.rows - 1;
      result.count = result.count - 1;
      result.list[index] = item;
      result.list[index].delete = true;
    }
  }
  return result;
};

export const deleteList = function(data, item) {
  const filter = select => select._id === item._id;
  const result = data;
  const index = result.list.findIndex(filter);
  if (index !== -1) {
    result.all = result.all - 1;
    result.end = result.end - 1;
    result.rows = result.rows - 1;
    result.count = result.count - 1;
    result.list.splice(index, 1);
  }
  return result;
};

export const notityList = function(list, item) {
  const filter = select => select._id === item._id;
  const result = list;
  const index = result.list.findIndex(filter);
  if (index !== -1) {
    if (item._state !== result.list[index]._state) {
      result.list[index].isFind = true;
      result.list[index]._state = item._state;
    }
  }
  return result;
};

export const normalizeName = function(str) {
  return str.replace(/ /g, "_").toLowerCase();
};

export const charCode = function(str) {
  let result = "";
  for (var i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    result = `${result}${c}`;
  }
  return result;
};
