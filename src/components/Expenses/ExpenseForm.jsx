import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import moment from 'moment';

const ExpenseForm = () => {
  // console.log("props", props)
  const navigate = useNavigate();
  const {expense_id} = useParams();
  const [expenseInfo, setExpenseInfo] = useState(null)
  // console.log("expense_id", expense_id) 

  const categoriesOptions = [
    "rent_and_utilities",
    "investing",
    "grocery",
    "gas",
    "dining",
    "car",
    "social",
    "education",
    "health",
    "transportation",
    "travel",
    "entertainment",
    "insurance",
    "style",
    "other",
  ]

  let [formData, setFormData] = useState({
    name:"",
    price:"",
    date:"",
    category:"",
    description:""
  });
  let [errors, setErrors] = useState({});

  //if the expense_id is present in the params of the route, that means its an edit form that we want. If so, load up the current expense to be edited so we can pre-populate the form.
  useEffect(()=>{
    if(expense_id){
      axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/expenses/${expense_id}`)
        .then((response)=>{
          // console.log("response", response.data.results[0])
          setFormData({...response.data.results[0], date: moment(response.data.results[0].date).format('YYYY-MM-DD')});
        })
    }
  },[])


  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const createExpense = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/expenses`, formData, { withCredentials: true })
      .then(response => {
        // console.log(response)
        if (response.data.errors) {
          setErrors(response.data.errors);
        } else {
          navigate("/dashboard/expenses")
        }
      })
      .catch(err => console.log(err))
  }

  const updateExpense = (e) => {
    e.preventDefault();
    console.log('updating')
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/expenses/${expense_id}`, formData, {withCredentials:true})
      .then(response => {
        navigate("/dashboard/expenses")
      })
      .catch(err=>{
        console.log('rd',err.response.data)
        setErrors(err.response.data.errors);
      })
  }


  return (
    <div>
      <h4>Add your expense below</h4>
      <form onSubmit={expense_id? updateExpense: createExpense}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" className="form-control" onChange={changeHandler} placeholder={formData.name} value = {formData.name}/>
          <p className="text-danger">{errors.name?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" id="price" step="0.01" className="form-control" onChange={changeHandler} placeholder={formData.price} value={formData.price}/>
          <p className="text-danger">{errors.price?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="price">Date:</label>
          <input type="date" name="date" id="date" className="form-control" onChange={changeHandler} value={formData.date}/>
          <p className="text-danger">{errors.date?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="price">Category:</label>
          <select value = {formData.category} name="category" id="category" className='form-select' onChange={changeHandler} >
            <option disabled value="">Please Select a Category</option>
            {
              categoriesOptions.map((cat, i) => {
                return <option key={i} value={cat}>{cat}</option>
              })
            }
          </select>
          <p className="text-danger">{errors.category?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea className="form-control" onChange={changeHandler} name="description" id="description" rows="4" placeholder={ formData.description} value = {formData.description}></textarea>
        </div>
        <input type="submit" value="Submit" className="btn btn-success m-2" />
        <Link to="/dashboard/expenses" className="btn btn-info m-2">Cancel</Link>
      </form>
    </div>
  );
};

export default ExpenseForm;