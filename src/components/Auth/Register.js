import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";


const Register = props => {

  const [firstName, setFirstname] = useState(""); 
  const [lastName, setLastname] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const register = e => {
    e.preventDefault();
    const newUser = {firstName, lastName, email, password, confirm};
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, newUser, {
      withCredentials: true
    })
      .then(res => {
        console.log(res)
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/dashboard/expenses");
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={ register } className='mb-4'>
      <h3>Sign Up</h3>
      <div className="form__input-container">
        {/* <label>First Name:</label> */}
        <input 
          placeholder='First Name'
          type="text" 
          name="firstName" 
          onChange={ e => setFirstname(e.target.value) } 
          value={ firstName }
        />
        {errors.firstName ? <span className='text-danger'>{errors.firstName.message}</span> : ""}
      </div>
      <div className="form__input-container">
        {/* <label>Last Name:</label> */}
        <input 
          placeholder='Last Name'
          type="text" 
          name="lastName" 
          onChange={ e => setLastname(e.target.value) } 
          value={ lastName }
        />
        {errors.lastName ? <span className='text-danger'>{errors.lastName.message}</span> : ""}
      </div>
      <div className="form__input-container">
        {/* <label>Email:</label> */}
        <input 
          placeholder='Email'
          type="text" 
          name="email" 
          onChange={ e => setEmail(e.target.value) } 
          value={ email }
        />
        {errors.email ? <span className='text-danger'>{errors.email.message}</span> : ""}
        {errors.emailTaken ? <span className='text-danger'>{errors.emailTaken}</span> : ""}

      </div>
      <div className="form__input-container">
        {/* <label>Password:</label> */}
        <input 
          placeholder='Password'
          type="password" 
          name="email" 
          onChange={ e => setPassword(e.target.value) } 
          value={ password }
        />
        {errors.password ? <span className='text-danger'>{errors.password.message}</span> : ""}
      </div>
      <div className="form__input-container">
        {/* <label>Confirm:</label> */}
        <input 
          placeholder='Confirm Password'
          type="password" 
          name="confirmpw" 
          onChange={ e => setConfirm(e.target.value) } 
          value={ confirm }
        />
        {errors.confirm ? <span className='text-danger'>{errors.confirm.message}</span> : ""}
      </div>
      <input type="submit" value="Sign Up" className="btn btn-primary" />
      <p>Already have an account? <Link to="/">Login Now</Link></p>
    </form>
  );
}

export default Register;