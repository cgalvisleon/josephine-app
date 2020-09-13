import { createStore } from "redux";
import reducers from "./reducers";
import { KEY_STORAGE } from "./actionTypes";

function getStorage() {
  const value = localStorage.getItem(KEY_STORAGE);
  if (value === null) {
    return {
      online: true,
      signin: false,
      loading: {
        loading: false,
        tag: ""
      },
      alert: {
        show: false,
        message: "",
        type: ""
      },
      token: "",
      profile: {},
      folders: []
    };
  } else {
    return JSON.parse(value);
  }
}
const preloadState = getStorage();

function handleStore() {
  console.log(store.getState());
  const value = JSON.stringify(store.getState());
  localStorage.setItem(KEY_STORAGE, value);
}

const store = createStore(reducers, preloadState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(handleStore);

export default store;
