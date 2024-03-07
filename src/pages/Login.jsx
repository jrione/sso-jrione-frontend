import React, {useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/index.css";

import {useNavigate} from "react-router-dom";

const Login = () => {
    if (Cookies.get("access_token") == 'undefined' && Cookies.get('refresh_token') == 'undefined') {
        window.location.href = process.env.VITE_BASE_URL
    }
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const submitLogin = async (e) => {
        e.preventDefault();
        const user = {
        username : username,
        password: password
        }
        await axios.post(process.env.VITE_SSO_URL+"auth/login", user)
        .then((response) => {
            Cookies.set('access_token', response.data.AccessToken);
            Cookies.set('refresh_token', response.data.RefreshToken);
            window.location.href = process.env.VITE_BASE_URL
        }).catch( (error) =>{
            console.log(error)  
        })
    }

    return(
        <div className="Auth-form-container container-fluid">
            <form className="Auth-form" onSubmit={submitLogin}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Single Sign-On</h3>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input className="form-control mt-1" 
                        placeholder="Enter Username" 
                        name='username'  
                        type='text' value={username}
                        required 
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input 
                        name='password' 
                        type="password"     
                        className="form-control mt-1"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
              </div>
            </div>
            </form>
       </div>
    )
};

export default Login;