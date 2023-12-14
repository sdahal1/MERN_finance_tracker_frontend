import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const login = e => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login`, {email, password}, {
      withCredentials: true
    })
      .then(res => {
        console.log('res from login',res);
        if(res.data.msg!== "success!") {
          setErrorMessage(res.data.msg);
        } else {
          navigate("/dashboard/expenses")
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ login }>
      <h3>Account Log In</h3>
      <p>Enter your details to track your finances</p>
      <div className="form__input-container">
        {/* <label htmlFor="email">Email:</label> */}
        <input 
          placeholder='Email'
          type="text" 
          name="email" 
          onChange={ e => setEmail(e.target.value) } 
          value={ email }
          id="email"
        />
      </div>
      <div className="form__input-container">
        {/* <label htmlFor="password">Password:</label> */}
        <input 
          placeholder='Password'
          type="password" 
          name="email" 
          onChange={ e => setPassword(e.target.value) } 
          value={ password }
          id="password"
        />
      </div>
      <input type="submit" value="Sign In" className="btn btn-primary" />
      <p className="error-message">{errorMessage ? errorMessage : ""}</p>
      <p>Don't have an account? <Link to="/register">Register Now</Link></p>
    </form>
  );
}

export default Login;