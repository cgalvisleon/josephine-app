import { createStore } from "redux";
import reducers from "./reducers";
import { KEY_STORAGE } from "./actionTypes";

function getStorage() {
  let value = localStorage.getItem(KEY_STORAGE);
  if (value === null) {
    return {};
  } else {
    value = JSON.parse(value);
    value.sistem.loading = { count: 0, show: false, tag: "" };
    value.sistem.alert = { show: false, message: "", type: "" };
    return value;
  }
}

function handleStore() {
  const value = JSON.stringify(store.getState());
  localStorage.setItem(KEY_STORAGE, value);
}

let preloadState = getStorage();
let store = createStore(reducers, preloadState);
store.subscribe(handleStore);

export default store;
