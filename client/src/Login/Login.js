import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import './Login.css'
import { Route } from 'react-router-dom'

const LoginButton = () => (
  <Route render={({ history}) => (
    <button
      type='button'
      onClick={() => { history.push('/Details') }}
      class="btn float-right login_btn"
    >
      Login!
    </button>
  )} />
)
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
                            <input type="text" class="form-control" placeholder="username"/>
                            
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control" placeholder="password"/>
                        </div>
                        <div class="row align-items-center remember">
                            <input type="checkbox"/>Remember Me
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