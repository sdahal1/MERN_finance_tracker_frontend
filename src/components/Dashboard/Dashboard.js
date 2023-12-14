import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import UserExpenses from '../Expenses/UserExpenses';
import ExpenseForm from '../Expenses/ExpenseForm';
import NavBar from './NavBar';

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null)
  // const [myExpenses, setMyExpenses] = useState([]); 


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getloggedinuser`, { withCredentials: true })
      .then(res => {
        console.log("res from checking getLoggedinuser", res)
        setUser(res.data.results)
      })
      .catch(err => {
        // console.log("err", err)
        navigate("/")
      })
  }, [])

  

  return (
    user && (<div>
      <NavBar></NavBar>
      <h3>Welcome to Finance Tracker, {user.firstName}</h3>
      <Link to="expenses" className='btn btn-info me-3'>View My Expenses</Link>
      <Link to="expenses/new" className='btn btn-success me-3'>Add a new expense</Link>
      <Link to ="expenses/chart" className='btn btn-warning'>View Chart</Link>
      <Routes>
        <Route path = "/expenses/*" element = {<UserExpenses/>}/>
        <Route exact path = "/expenses/new" element = {<ExpenseForm/>}/>
        <Route path = "/expenses/edit/:expense_id" element = {<ExpenseForm/>}/>
      </Routes>
    </div>)
  );
};

export default Dashboard;