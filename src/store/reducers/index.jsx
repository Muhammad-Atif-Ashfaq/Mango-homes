import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./adminReducers";
import authReducer from "./authReducers";
import timerReducer from "./timerReducers";
import quesAnsReducer from "./quesAnsReducers";
import alert_Reducer from "./local_reducer/alert_Reducer";
const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  timer: timerReducer,
  QnA: quesAnsReducer,
  alert: alert_Reducer,
});

export default rootReducer;
