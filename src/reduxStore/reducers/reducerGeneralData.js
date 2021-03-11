import {__init__generalData} from "./__init__Reducers";
import * as actionTypes from '../actionTypes'
import produce from "immer";



export default function reducerGeneralData (state=__init__generalData, action){
    switch (action.type) {
        case actionTypes.SET_RES_RECEIPTS:
            return produce(state, draftState=>{
                draftState.resReceipts = action.payload.resReceipts;
            });
        case actionTypes.SET_RES_List:
            return produce(state, draftState=>{
                draftState.resList = action.payload.resList;
            });
        default:
            return state;
    }
}