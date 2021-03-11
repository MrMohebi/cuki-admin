import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Login from "./Components/signin/Signin";
import Sidebar from "./Components/sidebar/Sidebar";
import ResReceipts from "./Components/resReceipts/ResReceipts";

$("body").css({backgroundColor: '#b7b1c2'})

function App() {
  return (
      <div>
        <Router>
          <Route  path='/*' render={ ( props ) => ( props.location.pathname !== "/" && props.location.pathname !== "/signin") && <Sidebar /> }/>
          <Route exact path='/' component={Login}/>
          <Route path='/resReceipts' component={ResReceipts}/>
        </Router>
      </div>
  );
}

export default App;
