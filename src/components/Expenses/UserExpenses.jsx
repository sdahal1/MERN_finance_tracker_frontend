import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import MultiSelectDropdown from "./MultiSelectDropdown";
import ExpenseChart from '../Expenses/ExpenseChart';

const UserExpenses = () => {
  const [myExpenses, setMyExpenses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]) //new
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateSortStatus, setDateSortStatus] = useState(null)

  // pagination related
  const [currentPage, setCurrentPage] = useState(1);
  const [numResultsPerPage, setNumResultsPerPage] = useState(2);
  const numPages = Math.ceil(myExpenses.length / numResultsPerPage);



  // // Load up the logged in user's expense list and put into state
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getCurrentUserExpenses`, { withCredentials: true })
      .then(response => {
        setMyExpenses(response.data.results);
      })
      .catch(err => console.log(err))
  }, [])



  const deleteExpense = (id) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/expenses/${id}`)
      .then(res => {
        setMyExpenses(myExpenses.filter(exp => {
          return exp._id != id;
        }))
      })
      .catch(err => console.log(err))
  }

  const filterExpensesByCategory = () => {
    if (selectedCategories.length === 0) return myExpenses;
    const expensesThatMatchSelectedCategories = []
    selectedCategories.forEach(selectedObj => {
      const { value: selectedCategory } = selectedObj;
      myExpenses.filter(expenseObj => {
        if (expenseObj.category === selectedCategory) {
          expensesThatMatchSelectedCategories.push(expenseObj)
        }
      })
    })
    return expensesThatMatchSelectedCategories;
  }

  const filterExpensesByDateRange = () => {
    if (!fromDate || !toDate) return filterExpensesByCategory();
    const result = filterExpensesByCategory().filter(expenseObj => {
      const dateOnly = expenseObj.date.slice(0, 10);
      if (dateOnly >= fromDate && dateOnly <= toDate) {
        return expenseObj;
      }
    })
    return result;
  }

  const dateSorter = () => {
    const myExpensesCopy = [...myExpenses]
    if (dateSortStatus === "ascending") {
      myExpensesCopy.sort((expA, expB) => expA.date < expB.date ? -1 : 1)
    } else {
      myExpensesCopy.sort((expA, expB) => expA.date < expB.date ? 1 : -1)
    }
    setMyExpenses(myExpensesCopy);
  }

  useEffect(() => {
    dateSorter();
  }, [dateSortStatus])

  // Calculate total amount of expenses using selected category and selected date
  const calculateTotal = () => {
    const sum = filterExpensesByDateRange().reduce((acc, obj) => { return acc + obj.price }, 0);
    return sum;
  }

  const clearDates = () => {
    setToDate("");
    setFromDate("");
  }

  const generatePaginationPages = () => {
    const numPages = Math.ceil(filterExpensesByDateRange().length / numResultsPerPage);
    const paginationElements = []
    for (let i = 0; i < numPages; i++) {
      paginationElements.push(
        <div key={i} value={i + 1} onClick={(e) => setCurrentPage(Number(e.target.innerText))} className={currentPage === i + 1 ? 'pagination__page active' : 'pagination__page'}>{i + 1}</div>
      )
    }
    return paginationElements;
  }

  const setPreviousPage = () => {
    if (currentPage === 1) {
      setCurrentPage(numPages);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }
  const setNextPage = () => {
    if (currentPage === numPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  const setNumResultsPerPageAndCurrentPage = (e) => {
    setNumResultsPerPage(e.target.value);
    setCurrentPage(1);
  }

  const calculateNumberOfDaysBetweenDates = () => {
    // Define two date objects
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate); // current date

    // Calculate the time difference in milliseconds
    const timeDifference = date2.getTime() - date1.getTime();

    // Calculate the number of days
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
  }

  const showExpenses = () => {
    let sliceEnd = currentPage * numResultsPerPage;
    let sliceStart = sliceEnd - numResultsPerPage;
    // console.log({sliceStart,sliceEnd})

    return filterExpensesByDateRange().slice(sliceStart, sliceEnd).map(expense => {
      return (
        <tr key={expense._id}>
          <th scope="row">{expense.name}</th>
          <td>${expense.price}</td>
          <td>{expense.category}</td>
          <td>{moment.utc(expense.date).format("MMMM DD, YYYY")}</td>
          <td>
            <button onClick={() => deleteExpense(expense._id)} className="btn btn-danger font-weight-bold mx-1"><i className="fa fa-trash-o"></i></button>

            <Link to={`/dashboard/expenses/edit/${expense._id}`} className="btn btn-danger font-weight-bold"><i className="fa fa-edit"></i></Link>
          </td>
        </tr>
      )
    })
  }

  return (
    <div className='my-3'>
      <MultiSelectDropdown setSelectedCategories={setSelectedCategories}></MultiSelectDropdown>
      <div className='my-3'>
        <label htmlFor="from_date">From:</label>
        <input onChange={(e) => { setFromDate(e.target.value) }} type="date" name="from_date" id="from_date" value={fromDate} />
        <label htmlFor="to_date">To:</label>
        <input className="" onChange={(e) => { setToDate(e.target.value) }} type="date" name="to_date" id="to_date" value={toDate} />
        <button className="mx-2 btn btn-light" onClick={clearDates}>Clear Dates</button>
      </div>
      <h3>Total: ${calculateTotal()} spent {fromDate && toDate ? `in the past ${calculateNumberOfDaysBetweenDates()} days.` : "all time."}</h3>
      <Routes>
        <Route exact path="/chart" element={<ExpenseChart myExpenses={filterExpensesByDateRange()} total={calculateTotal()} />} />
      </Routes>
      <label>Show results per page:</label>
      <select name="results_per_page_select" id="" onChange={setNumResultsPerPageAndCurrentPage} defaultValue={2}>
        <option value={myExpenses.length}>All</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <div className='pagination_container'>
        <div className="pagination__previous" onClick={setPreviousPage}>Previous</div>
        {generatePaginationPages()}
        <div className="pagination__next" onClick={setNextPage}>Next</div>
      </div>
      <table className="table table table-bordered mt-3 bg-secondary text-white">
        <thead className='table-dark'>
          <tr>
            <th scope="col">Item Name:</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col" className="sort__container">
              Date
              <span>
                <i onClick={() => setDateSortStatus("descending")} className='bx bxs-up-arrow'></i>
                <i onClick={() => setDateSortStatus("ascending")} className='bx bxs-down-arrow' ></i>
              </span>
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            showExpenses()
          }
        </tbody>
      </table>
    </div>

  );
};

export default UserExpenses;


