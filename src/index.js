import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import App from './App';
import {store} from "./reduxStore/store";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </Provider>
    ,document.getElementById('root')
);
