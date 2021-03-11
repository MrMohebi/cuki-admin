import {combineReducers} from "redux";
import reducerAdminInfo from "./reducerAdminInfo";
import reducerGeneralData from "./reducerGeneralData";

export const rootReducer = combineReducers({
    reducerAdminInfo,
    reducerGeneralData
})