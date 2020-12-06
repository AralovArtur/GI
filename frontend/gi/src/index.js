import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import GI from './GI';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <GI/>
    </Router>,
    document.getElementById('root')
);

reportWebVitals();
