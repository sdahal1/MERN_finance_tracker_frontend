import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import UserExpenses from './components/Expenses/UserExpenses';

// import NavBar from './components/oldVersion/NavBar';
// import ExpenseForm from './components/oldVersion/ExpenseForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/*" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
