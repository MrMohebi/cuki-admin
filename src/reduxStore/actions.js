import * as actionTypes from './actionTypes'
import {store} from './store'

export const setAdminData = (adminData)=>{
    store.dispatch({
        type: actionTypes.SET_ADMIN_DATA,
        payload:{
            adminData
        }
    })
}


export const setResReceipts = (resReceipts)=>{
    store.dispatch({
        type: actionTypes.SET_RES_RECEIPTS,
        payload:{
            resReceipts
        }
    })
}


export const setResList = (resList)=>{
    store.dispatch({
        type: actionTypes.SET_RES_List,
        payload:{
            resList
        }
    })
}



