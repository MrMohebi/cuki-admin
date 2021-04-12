import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Select, MenuItem, FormControl, InputLabel, TextField }  from "@material-ui/core";
import * as requests from "../../ApiRequests/requests"
import * as actions from "../../reduxStore/actions"
import "./css/style.css"
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const ReactSwal = withReactContent(Swal)

class NewResReceipt extends Component {

    state={
        receiptDetails:"",
        selectedResEnglishName:"",
        formClassName:"slider",
        containerClassName:"slider-box"
    }

    componentDidMount() {
        this.getResList();
    }

    getResList = ()=>{
        requests.getResList((res)=>{
            if(res.statusCode === 200){
                this.setState({
                    selectedResEnglishName:res.data[0].englishName
                })
                this.props.setResList(res.data);
            }
        })
    }

    handleSubmitNewResReceipt = (elem) =>{
        elem.preventDefault();
    }

    handleClickNewReceipt = () => {
        if (this.state.formClassName.split(" ").indexOf("open") === -1) {
            this.setState({
                formClassName: " slider open ",
                containerClassName: " slider-box open ",
            });
        } else {
            this.setState({
                formClassName: " slider ",
                containerClassName: " slider-box ",

            })
        }
    }

    handleSubmitNewReceipt = () =>{
        requests.newResReceipt(this.state.selectedResEnglishName, this.state.receiptDetails, (res)=>{
            if(res.statusCode === 200){
                let receiptInfo =
                    res.data.resEnglishName + '<br/>' +
                    "مجموع دریافتی ها انلاین: " + res.data.totalOnlineIncomeAllTime + '<br/>' +
                    "مجموع دریافتی ها افلاین: " + res.data.totalCashIncomeAllTime + '<br/>' +
                    "مجموع دریافتی ها انلاین از اخرین فاکتور: " + res.data.totalOnlineIncomeFromLastSettlementTillNow + '<br/>' +
                    "مجموع دریافتی ها افلاین از اخرین فاکتور: " + res.data.totalCashIncomeFromLastSettlementTillNow + '<br/>' +
                    "مجموع فاکتور از تاریخ اخرین فاکتور: " + (res.data.totalOnlineIncomeFromLastSettlementTillNow + res.data.totalCashIncomeFromLastSettlementTillNow) + '<br/>';

                    ReactSwal.fire({
                    title: '.با موفقیت ثبت شد',
                    html: receiptInfo,
                    icon: 'success',
                    confirmButtonText: 'تایید'
                })
            }else{
                ReactSwal.fire({
                    title: '!ثبت نشد',
                    text: res.details,
                    icon: 'error',
                    confirmButtonText: 'تایید'
                })
            }
        })
    }

    render() {
        return (
            <div className={this.state.containerClassName + " main-container newMainContainer "}>
                <div className="new-receipt-button">
                    <Button onClick={this.handleClickNewReceipt} variant="outlined">ایجاد رسید جدید</Button>
                </div>
                <div className={"res-selector"}>
                    <Select
                        value={this.state.selectedResEnglishName}
                        onChange={(event)=>{this.setState({selectedResEnglishName:event.target.value})}}
                    >
                        {this.props.resList.map(eRes=>{
                            return(
                                <MenuItem key={eRes.restaurantId} value={eRes.englishName}>{eRes.persianName}</MenuItem>
                            );
                        })}
                    </Select>
                </div>
                <div className={this.state.formClassName + " new-receipt-form"}>
                    <form onSubmit={this.handleSubmitNewResReceipt}>
                        <TextField
                            label="جزییات"
                            multiline
                            defaultValue={this.state.receiptDetails}
                            onChange={(event)=>{this.setState({receiptDetails:event.target.value})}}
                            rows={5}
                            variant="outlined"
                            fullWidth={true}
                        />
                        <div className={"form-SB"}>
                            <Button onClick={this.handleSubmitNewReceipt} variant="outlined" color="primary">ثبت</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        resList: state.reducerGeneralData.resList,
    };
}

function mapDispatchToProps() {
    return {
        setResList: actions.setResList,
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewResReceipt);