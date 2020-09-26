import { createStore } from "redux";
import reducers from "./reducers";
import { KEY_STORAGE, SCHEME } from "./actionTypes";

function getStorage() {
  const value = localStorage.getItem(KEY_STORAGE);
  if (value === null) {
    return SCHEME;
  } else {
    return JSON.parse(value);
  }
}
const preloadState = getStorage();

function handleStore() {
  const value = JSON.stringify(store.getState());
  localStorage.setItem(KEY_STORAGE, value);
}

const store = createStore(reducers, preloadState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(handleStore);

export default store;
