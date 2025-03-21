import React, {useEffect, useState} from "react";
import './css/style.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from "react-router-dom";
// import {removeCacheToken} from "../../Stores/cache/cacheData";
// import ResState from "../ResState/ResState";


const NavBar =(props)=> {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })

    const handleScroll=()=> {
        setPrevScrollPos(window.pageYOffset)
        if (window.pageYOffset > prevScrollPos){
            document.getElementById('navBarMainContainer')?document.getElementById('navBarMainContainer').style.marginTop = '-50px':<div/>
        }else{
            document.getElementById('navBarMainContainer')?document.getElementById('navBarMainContainer').style.marginTop = '0px':<div/>
        }
    }

    const handleLogout = () =>{
        // removeCacheToken()
        props.history.push('/')
    }



    return (
        <div id='navBarMainContainer' className='w-100 navBarMainContainer'>
            <div className='navBarRightSide'>
                <Link to={'/resReceipts'}
                      className={'navBarItems ' + (window.location.pathname === '/resReceipts' ? ' navBarActive ' : '')}>
                    رسید ها
                </Link>
                {/*<Link to={'/foods'}*/}
                {/*      className={'navBarItems ' + (window.location.pathname === '/foods' ? ' navBarActive ' : '')}*/}
                {/*>*/}
                {/*    لیست غذا*/}
                {/*</Link>*/}
                {/*<Link to={'/orders'}*/}
                {/*      className={'navBarItems ' + (window.location.pathname === '/orders' ? ' navBarActive ' : '')}*/}
                {/*>*/}
                {/*    لیست سفارشات*/}
                {/*</Link>*/}
                {/*<Link to={'/resinfo'}*/}
                {/*      className={'navBarItems ' + (window.location.pathname === '/resinfo' ? ' navBarActive ' : '')}>*/}
                {/*    اطلاعات رستوران*/}
                {/*</Link>*/}
            </div>
            <div className='navBarLeftSide'>
                <div onClick={handleLogout} className=' logOutNavBar d-flex flex-row justify-content-around align-items-center text-center'>
                    <ExitToAppIcon style={{transform: 'rotate(180deg)', cursor: 'pointer', marginLeft: '10px'}}/>
                    <div style={{marginLeft: '5px'}}>خروج</div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;