import {__init__adminInfo} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer";



export default function reducerAdminInfo (state=__init__adminInfo, action){
    switch (action.type) {
        case actionTypes.SET_ADMIN_DATA:
            return produce(state, draftState=>{
                draftState.name = action.payload.adminData.name;
                draftState.token = action.payload.adminData.token;
                draftState.position = action.payload.adminData.position;
                draftState.phone = action.payload.adminData.phone;
                draftState.promotedBy = action.payload.adminData.promotedBy;
                draftState.lastLogin = action.payload.adminData.lastLogin;
                draftState.status = action.payload.adminData.status;
            })
        default:
            return state;
    }
}