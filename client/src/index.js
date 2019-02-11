import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './StyleSheets/index.css';

import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));
//registerServiceWorker();
