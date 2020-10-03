import { combineReducers } from "redux";
import sistem from "./reducers/sistem";
import stock from "./reducers/stock";
import talk from "./reducers/talk";

const rootReducer = combineReducers({
  sistem,
  stock,
  talk
});

export default rootReducer;
