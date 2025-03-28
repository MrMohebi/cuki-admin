import React from "react";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router-dom";
import $ from 'jquery';
import * as cookies from "../../reduxStore/cachedData/cachedData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBriefcase,
    faHome,
    faCopy,
    faAlignLeft,
    faImage,
    faQuestion,
    faPlane,
    faAlignJustify
} from '@fortawesome/free-solid-svg-icons'
import 'animate.css/animate.css'
import './css/stylesheet.css'


const Sidebar = props => {

    return(
        <div className="wrapper">
            <div id="content">
                <button onClick={()=>{$('#sidebar').toggleClass('active');}} type="button" id="sidebarCollapse" className="btn" style={{backgroundColor:"#FEC20E"}}>
                    <FontAwesomeIcon icon={faAlignLeft}/>
                </button>
            </div>
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Admins Panel</h3>

                    <strong>AP</strong>
                </div>

                <ul className="list-unstyled components ">
                    <li className=" mb-2 mt-2 dashboard" >
                        <a  onClick={()=>{props.history.push("/dashboard")

                            $('.components > li').removeClass('active')
                            $('.dashboard').toggleClass('active')
                        }} href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="radiusBorder rightAlign">
                            <FontAwesomeIcon icon={faHome}/>
                            <div className='sectorText'>داشبورد</div>
                        </a>
                    </li>

                    <li className=" mb-2 mt-2 dashboard" >
                        <a  onClick={()=>{props.history.push("/resReceipts")
                            $('.components > li').removeClass('active')
                            $('.dashboard').toggleClass('active')
                        }} href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="radiusBorder rightAlign">
                            <FontAwesomeIcon icon={faHome}/>
                            <div className='sectorText'>فاکتور رستوران</div>
                        </a>
                    </li>


                    <li className=' mb-2 mt-2 cotactUs'>
                        <a onClick={()=>{props.history.push("/cotactUs")

                            $('.components > li').removeClass('active')
                            $('.cotactUs').toggleClass('active')
                        }} href="#" className='radiusBorder rightAlign'>
                            <FontAwesomeIcon icon={faPlane}/>
                            <div className='sectorText'>پشتیبانی فنی</div>
                        </a>
                    </li>

                    <li className=' mb-2 mt-2 '>
                        <a onClick={()=>{props.history.push("/?logout")}} href="" className='radiusBorder rightAlign'>
                            <div className='sectorText'>خروج</div>
                        </a>
                    </li>

                </ul>

            </nav>
        </div>
    )
}

export default withRouter(Sidebar)

//------------------------------------------ Styles --------------------------------------

