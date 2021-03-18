import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store, {RootStateType} from "./Redux/State";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

let rerenderEntireTree = (state:RootStateType) => {


    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App state={state} dispatch={store.dispatch.bind(store)}/>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    )
}
rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
