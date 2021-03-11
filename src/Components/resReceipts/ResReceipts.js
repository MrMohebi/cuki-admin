import React from 'react';
import ResReceiptsList from "../resReceiptsList/ResReceiptsList";
import NewResReceipt from "../newResReceipt/NewResReceipt";
import ResRPaymentInfo from "../resRPaymentInfo/ResRPaymentInfo";
const ResReceipts = () => {
    return (
        <div>
            <ResRPaymentInfo />
            <NewResReceipt/>
            <ResReceiptsList/>
        </div>
    );
};

export default ResReceipts;
