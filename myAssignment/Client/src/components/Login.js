import React from 'react';
import loginPic from '../Assets/Images/loginHeadedr.png';
import Navigation from './Navigation';
import Helmet from "react-helmet";
// import Logo from "../Assets/Images/logo.png";
import Logo from '../Assets/Images/scribble2.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';


const Login = (props) => {

    
//=============================================================================
// Dynamically load favicon
//=============================================================================

useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = {Logo};
  }, []);

 

//   const [userId, setUserId] = useState({
//     activeUser: sessionStorage.getItem('activeUser'),
// });

//=================================================================
//login

const navigate = useNavigate();

let formVals = ["username", "password"];

const [formValues, setFormValues] = useState(formVals);

const getValues = (e) =>{
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
}

const loginUser = (e) => {
    e.preventDefault(); 

    let payload = {
        username: formValues['username'],
        password: formValues['password']
    }

    Axios.post('http://localhost:5000/api/loginUser', payload)
    .then((res)=>{
      console.log(res.data);
      if(!res.data){
        alert('Bad request');
      }else{
        if(res.data.user){
          alert("welcome user");
          sessionStorage.setItem('token', res.data.user);
          navigate("/Home");
        }else{
          alert("Not happening")
        }
      }
    })
    .catch(function(error){
      console.log(error);
    })

}

//============================================
//To register
const toRegister = () =>{
    navigate('/Register')
}




    return (
        <div className='loginPage'>

        <Helmet>
            <title>Login</title>
            <link rel="icon" href={Logo}/>
         </Helmet>

         <Navigation/>
            <div className='login-text'>
                <form onSubmit={loginUser}>
                    <h1>SKY SKATES.</h1>

                    <label>Email
                        <input type="email" name="username" placeholder='beyonce@gmail.com' onChange={getValues}/>
                    </label>

                    <label>Password
                        <input type="Password" name="password" placeholder='******' onChange={getValues}/>
                    </label>

                    <input type="submit" id='login-submit'></input>

                </form>

                <button className='primary-btn' onClick={toRegister}>Register</button>

            </div>

            <div className='login-pic'>

                <img src={loginPic} className="loginPic"/>
                
            </div>
            
        </div>
    );
};

export default Login;