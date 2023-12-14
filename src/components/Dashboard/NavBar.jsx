import React from 'react';
import logoImage from '../../assets/logo1.png';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const navigate = useNavigate();
  // console.log("logging user from navbar", user);

  const logout = () => {
    console.log("logging out")
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/logout`, { withCredentials: true })
      .then(res => {
        // console.log("res logging out", res)
        navigate("/")
      })
      .catch(err => console.log("err logging out", err))
  }


  return (
    <div className='nav-bar'>
      <Link to={"/"}>
        <img className='nav-left' id="logo" src={logoImage} alt="finnaTrak logo" />
      </Link>
      <ul className="nav-right">
        <li><Link to="/" onClick={logout}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default NavBar;