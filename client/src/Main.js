import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import Login from './Login/Login'

function Main() {
    return (
        <Router>
            <Route path='/' exact={true} component={Login}></Route>
            <Route path='/details' component={App}></Route>
        </Router>

    );
}

export default Main;