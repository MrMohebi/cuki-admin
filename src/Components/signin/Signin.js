import React from "react";
import $ from 'jquery';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import 'animate.css/animate.css'
import * as actions from '../../reduxStore/actions'
import * as requests from '../../ApiRequests/requests'


class Login extends React.Component {

    state = {
        inputClass : "input-group mb-3 ml-5"
    }

    checkUserPass = (response) =>{
        if(response.statusCode === 401 || response.statusCode === 400){
            this.setState({
                inputClass : "input-group mb-3 ml-5 animate__animated animate__headShake"
            })
            setTimeout(()=>this.setState({inputClass : "input-group mb-3 ml-5"}), 3000)
        }else if(response.statusCode === 200){
            console.log(response.data);
            this.props.setAdminData(response.data);
            this.props.history.push('/resReceipts')
            $('.components > li').removeClass('active')
            $('.dashboard').toggleClass('active')
        }

    }

    handleSubmitForm = (elm) =>{
        elm.preventDefault();
        let username = $('#usernameId').val()
        let password = $('#passwordId').val()
        requests.login(username, password, this.checkUserPass)
    }

    render() {
        return(
            <div className="border shadow-sm" style={loginBox}>
                <img className="mt-4 mb-3" src="./img/logo/Cuki Logo(256x256).png" width="230px" height="230px" />
                <form onSubmit={this.handleSubmitForm}>
                    <div style={{width: "250px"}} className={this.state.inputClass}>
                        <input className="form-control text-right" id="usernameId" type="text" placeholder="نام کاربری " />
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                        </div>
                    </div>
                    <div style={{width: "250px", position:"related"}} className={this.state.inputClass}>
                        <input className="form-control text-right" id="passwordId" type="password" placeholder="گذرواژه "/>
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                        </div>
                    </div>

                    <div style={{textAlign:"right", margin:"0 50px 10px 0"}}>
                        <input id="remember_me" type="checkbox" name="remember" defaultChecked/>
                        <label htmlFor="remember_me" className="mr-1 ml-2"> مرا به خاطر بسپار</label>
                    </div>
                    <button className="red_button btn-danger pr-4 pl-4 mb-4 rounded" name="login"><span> ورود </span></button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
    }
}

const mapDispatchToProps = () => {
    return {
        setAdminData: actions.setAdminData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//------------------------------------------ Styles --------------------------------------

let loginBox =  {
    textAlign : "center",
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    right: '0%',
    left: '0%',
    margin: 'auto',
    borderRadius: '10px',
    width: '350px',
    height: 'min-content',
    background: 'rgb(238,211,211) linear-gradient(180deg, rgba(238,211,211,1) 0%, rgba(226,236,237,1) 100%) '
}