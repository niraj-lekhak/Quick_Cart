import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; 

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        // some fancy firebase login shitttt
        const authInstance = getAuth();
        signInWithEmailAndPassword(authInstance,email,password)
        .then(userCredential =>{
            navigate("/", { replace: true })
        })
        .catch(error => alert(error.message))
    }

    const register = e =>{
        e.preventDefault();
        
        const authInstance = getAuth();
        createUserWithEmailAndPassword(authInstance,email, password)
        .then((userCredential) => {
            // it successfully created a new user with email and password
            if(userCredential) {
                navigate("/", { replace: true })
            }
        })
        .catch(error => alert(error.message))

        // some fancy firebase stuff
    }


  return (
    <div className='login'>
        <Link to='/'>
            <img className='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='' />
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>Email</h5>
                <input type='text' value={email} onChange={e =>setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>

                <button    onClick ={signIn}className='login__signInButton'>Sign In</button>
            </form>
            <p>By signing-in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>

            <button onClick={register}className='login__registerButton'>Create your Amazon Account</button>
        </div>

    </div>
  )
}

export default Login
