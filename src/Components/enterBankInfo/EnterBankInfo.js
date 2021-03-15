import React, {useState} from 'react';
import  {useParams} from "react-router-dom";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker' ;
import moment from 'jalali-moment';
import * as requests from "../../ApiRequests/requests"

const EnterBankInfo = (props) => {
    let { res__RId } = useParams();
    let [resEnglishName, receiptId] = res__RId.split ("__")

    let [paidDate, setPaidDate] = useState(Math.floor(Date.now() / 1000));
    let [paidDateDatePicker, setPaidDateDatePicker] = useState({day: 1, month: 1, year: 1400});
    let [paidAmount, setPaidAmount] = useState(0);
    let [paidResABankNum, setPaidResABankNum] = useState(0);
    let [paidOurABankNum, setPaidOurABankNum] = useState(0);
    let [paidBankTrackingId, setPaidBankTrackingId] = useState(0);

    let changeDatePicker = (date) =>{
        setPaidDate(moment(date.year+'/'+date.month+'/'+date.day,'jYYYY/jM/jD').unix())
        setPaidDateDatePicker(date);
    }

    const callbackSBankRInfo = function (res){
        console.log(res);
        if(res.hasOwnProperty("statusCode") && res.statusCode === 200){
            console.log(res);
        }
    }

    let handleSubmit = () =>{
        if(paidAmount > 100 && paidResABankNum > 10000 &&  paidOurABankNum > 10000 && paidBankTrackingId > 10)
            requests.submitBankReceiptInfo(callbackSBankRInfo, receiptId, resEnglishName, paidDate, paidAmount, paidResABankNum, paidOurABankNum, paidBankTrackingId)
    }




    return (
        <div>
            <DatePicker value={paidDateDatePicker} onChange={changeDatePicker} locale='fa' shouldHighlightWeekends/><br/>
            مقدار پرداختی
            <input className="m-2 d-block" defaultValue={paidAmount} onChange={(event)=>{setPaidAmount(parseInt(event.target.value > 0 ? event.target.value : 0))}} type="number"/>
            شماره حساب پرداخت کننده
            <input className="m-2 d-block" defaultValue={paidResABankNum} onChange={(event)=>{setPaidResABankNum(parseInt(event.target.value > 0 ? event.target.value : 0))}} type="number"/>
            شماره حساب دریافت کننده
            <input className="m-2 d-block" defaultValue={paidOurABankNum} onChange={(event)=>{setPaidOurABankNum(parseInt(event.target.value > 0 ? event.target.value : 0))}} type="number"/>
            کد پیگیری بانک
            <input className="m-2 d-block" defaultValue={paidBankTrackingId} onChange={(event)=>{setPaidBankTrackingId(parseInt(event.target.value > 0 ? event.target.value : 0))}} type="number"/>

            <button onClick={handleSubmit}>ثبت</button>
        </div>
    );
};

export default EnterBankInfo;