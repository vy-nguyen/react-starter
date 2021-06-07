/*
 * Extend from create-react-app.
 */
import React    from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './css/index.css';
import App             from './app/App';
import MainStore       from './stores/MainStore';
import reportWebVitals from './config/reportWebVitals';

// Import jquery
//
window.$ = require('jquery');
window.jQuery = window.$;

class AppSetup extends React.Component {
    render() {
        return (
            <React.Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </React.Suspense>
        );
    }
}

MainStore.initMain();
ReactDOM.render(
    <React.StrictMode>
        <AppSetup/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
