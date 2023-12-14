import React from 'react';
import Login from './Login';
import Register from './Register';
import logoImage from '../../assets/logo1.png';
import { Routes, Route, Navigate } from 'react-router-dom';




const SignIn = props => {

  return (
    <>
    <img id="logo" src={logoImage} alt="finnaTrak logo" />
    <div className="signin">
      <header>
        <h1>Managing money</h1>
        <i>made simple</i>
      </header>
      <Routes>
        <Route path ="/" element={
        <div className="form_container">
          <Login />
        </div>
        }></Route>
        <Route path="/register" element={
           <div className="form_container">
           <Register />
         </div>
        }>

        </Route>
      </Routes>

       
        
    </div>
    </>
  )

}

export default SignIn;