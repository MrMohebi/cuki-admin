import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import $ from 'jquery';
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Login from "./Components/signin/Signin";
import Sidebar from "./Components/sidebar/Sidebar";
import ResReceiptsList from "./Components/resReceiptsList/ResReceiptsList";
import EnterBankInfo from "./Components/enterBankInfo/EnterBankInfo";
import NewResReceipt from "./Components/newResReceipt/NewResReceipt";
import NavBar from "./Components/navBar/navBar";


$("body").css({backgroundColor: '#b7b1c2'})

function App() {
  return (
      <div>
          <Router>
              {/*<Route  path='/*' render={ ( props ) => ( props.location.pathname !== "/" && props.location.pathname !== "/signin") && <Sidebar /> }/>*/}
              {/*<Route  path='/*' component={NavBar}/>*/}
              {/*<Route path={'resReceipts'} component={NewResReceipt}/>*/}
              <Route exact path='/' component={Login}/>
              <Route path='/resReceipts' component={ResReceiptsList}/>
              <Route path='/eBank/:res__RId' component={EnterBankInfo}/>
              <Route path='/newReceipt' component={NewResReceipt}/>
          </Router>
      </div>
  );
}

export default App;
