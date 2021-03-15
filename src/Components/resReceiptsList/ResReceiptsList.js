import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import {Button}  from "@material-ui/core";
import moment from 'moment-jalaali'
import * as actions from "../../reduxStore/actions";
import * as requests from "../../ApiRequests/requests"
import "./css/style.css"
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)



class ResReceiptsList extends Component {
    state ={
        row:[],
    }
    componentDidMount() {
        this.getResReceipts();
    }

    columns = [
        {
            field: 'pay',
            headerName: 'پرداخت',
            sortable: false,
            renderCell:(receipt)=> {
                if(receipt.value['status'] === "created-notPaid")
                    return <Button onClick={()=>{this.props.history.push("/eBank/"+ receipt.value['resEnglishName'] +"__"+receipt.value['resSettlementId'])}} variant="outlined" color="primary" >Pay</Button>;
                else
                    return <Button disabled>Paied</Button>
            }
        },
        { field: 'moreDetails',
            headerName: 'اطلاعات بیشتر',
            sortable: false,
            renderCell:(receipt)=> {
                return <Button onClick={()=>{this.handleMoreDetails(receipt.value)}} variant="outlined" color="primary" >MD</Button>;
            }

        },
        { field: 'date', headerName: 'تاریخ', sortable: false, flex:1},
        { field: 'status', headerName: 'وضعیت', flex:1},
        { field: 'amount', headerName: 'مبلغ', type: 'number', flex:1},
        { field: 'resName', headerName: 'رستوران', width: 250 },
    ];

    getResReceipts = () =>{
        requests.newResReceiptsList((res)=>{
            if(res.statusCode === 200){
                this.setState({
                    row:this.createRows(res.data)
                })
                this.props.setResReceipts(res.data);
            }
        })
    }

    createRows = (resReceiptsList) =>{
        return resReceiptsList.map(eR=>{
            let status = "مشخص نشده" ;
            switch (eR['status']){
                case "created-notPaid":
                    status = "در انتظار پرداخت";
                    break;
                case "paid":
                    status = "پرداخت شده";
                    break;
            }

            return {
                id:eR['resSettlementId'],
                resName:eR['resEnglishName'],
                amount:eR['paidAmount'] > 100 ? eR['paidAmount'] : eR['toPayAmount'],
                status:status,
                date:eR['paidDate'] > 1000 ? moment(new Date(eR['paidDate']*1000)).format('jYYYY/jM/jD HH:mm:ss') : moment(new Date(eR['createdDate']*1000)).format('jYYYY/jM/jD HH:mm:ss'),
                moreDetails:eR,
                pay:eR,
            }
        })
    }

    handleMoreDetails=(receipt)=>{
        let receiptInfo =
            receipt.resEnglishName + '<br/>' +
            "جزئیات: " + receipt.details + '<br/>'+
            "مجموع دریافتی ها انلاین: " + receipt.tOnlineIncomeTillNow + '<br/>' +
            "مجموع دریافتی ها افلاین: " + receipt.tCashIncomeTillNow + '<br/>' +
            "مجموع دریافتی ها انلاین از اخرین فاکتور: " + receipt.tOnlineIncomeFromLastSettlement + '<br/>' +
            "مجموع دریافتی ها افلاین از اخرین فاکتور: " +receipt.tCashIncomeFromLastSettlement + '<br/>' +
            "مجموع فاکتور از تاریخ اخرین فاکتور: " + (parseInt(receipt.tOnlineIncomeFromLastSettlement) + parseInt(receipt.tCashIncomeFromLastSettlement)) + '<br/>'+
            "تاریخ ایجاد: " + moment(new Date(receipt.createdDate*1000)).format('jYYYY/jM/jD HH:mm:ss') + '<br/>';

        if(receipt.status === "created-notPaid"){
            receiptInfo +=
                "مبلغ قابل پرداخت: " + receipt.toPayAmount + '<br/>'+
                "نام ایجاد کننده فاکتور: " + receipt.creatorSupportName + '<br/>' ;
        }else if(receipt.status === "paid"){
            receiptInfo +=
                "تاریخ پرداخت: " + moment(new Date(receipt.paidDate*1000)).format('jYYYY/jM/jD HH:mm:ss') + '<br/>' +
                "مبلغ پرداخت شده: " + receipt.paidAmount + '<br/>' +
                "شماره کارت پرداخت کننده: " + receipt.paidOurABankNum + '<br/>' +
                "شماره کارت رستوران: " + receipt.paidResABankNum + '<br/>' +
                "پیگیری پرداخت: " + receipt.paidBankTrackingId + '<br/>' +
                "نام ایجاد کننده فاکتور: " + receipt.creatorSupportName + '<br/>' +
                "نام پرداخت کننده فاکتور: " + receipt.creatorSupportName + '<br/>' ;
        }

        ReactSwal.fire({
            title: 'جزئیات فاکتور',
            html: receiptInfo,
            icon: 'info',
            confirmButtonText: 'تایید'
        })
    }

    render() {
        return (
            <div className={'container-receipts-list'} >
                <DataGrid rows={this.state.row} columns={this.columns} pageSize={5} hideFooterSelectedRowCount/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resReceiptsList: state.reducerGeneralData.resReceipts,
    };
}

function mapDispatchToProps() {
    return {
        setResReceipts: actions.setResReceipts,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ResReceiptsList);


