import $ from 'jquery';
import {store} from '../reduxStore/store'

export const BASE_ADMINS_URL = "https://api.cuki.ir/v201/admin/";
export const BASE_API_URL = "https://api.cuki.ir/v201/";

export const login = (username, password, callbackFunction)=>{
    $.post(BASE_ADMINS_URL+'loginAdmin.fetch.php',{username, password}).then(res =>{
        callbackFunction(res)
    })
}


export const getResList = (callbackFunction)=>{
    $.post(BASE_API_URL+'getAllRestaurantNames.fetch.php').then(res =>{
        callbackFunction(res)
    })
}


export const newResReceipt = (resEnglishName, details, callbackFunction)=>{
    let token = store.getState().reducerAdminInfo.token;
    $.post(BASE_ADMINS_URL+'createNewResReceipt.add.php',{token, resEnglishName, details}).then(res =>{
        callbackFunction(res)
    })
}



export const newResReceiptsList = (callbackFunction)=>{
    let token = store.getState().reducerAdminInfo.token;
    $.post(BASE_ADMINS_URL+'getResReceipts.fetch.php',{token}).then(res =>{
        callbackFunction(res)
    })
}

export const submitBankReceiptInfo = (callbackFunction, receiptId, resEnglishName, paidDate, paidAmount, paidResABankNum, paidOurABankNum, paidBankTrackingId)=>{
    let token = store.getState().reducerAdminInfo.token;
    console.log({token, receiptId, resEnglishName, paidDate, paidAmount, paidResABankNum, paidOurABankNum, paidBankTrackingId})
    $.post(BASE_ADMINS_URL+'enterResReceiptPaymentBankInfo.modify.php',{token, receiptId, resEnglishName, paidDate, paidAmount, paidResABankNum, paidOurABankNum, paidBankTrackingId}).then(res =>{
        callbackFunction(res)
    })
}



