import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import './Login.css'
import { Route } from 'react-router-dom'
import axios from 'axios';

const LoginButton = () => (
  <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { loginUser(history) }}
      class="btn float-right login_btn"
    >
      Login!
    </button>
  )} />
)

function loginUser(history) {
    const user = {
        userName: document.getElementById("user").value,
        password: document.getElementById("password").value
    }
    axios.post('http://localhost:27017/login', user).then((response) => {
        localStorage.setItem('user', user.userName);
        localStorage.setItem('wrongPass', '')
        history.push('/Details');
        }, (error) => {
            window.location.reload();
            localStorage.setItem('wrongPass', 'Wrong credentials! Try again!')
    })
}

function Login() {
    return (
        <div class="Login d-flex justify-content-center" style={{marginLeft: 600,}}>
            <div class="container d-flex justify-content-center">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Sign In</h3>
                </div>
                <div class="card-body">
                    <form>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" id="user" placeholder="username"/>
                            
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control" id="password" placeholder="password"/>
                        </div>
                        <div class="row align-items-center remember">
                            {localStorage.getItem('wrongPass')}
                        </div>
                        <LoginButton></LoginButton>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
    );
}

export default Login;