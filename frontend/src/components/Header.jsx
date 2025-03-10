import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../index.css';

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get('authToken');

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate('/signin');
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <p className="logot">Semaphore</p>
        </div>

        <nav className="navbar pl-24 pr-4">
          <Link to="/" className="link-t">
            Home
          </Link>
          <Link to="/about" className="link-t">
            About
          </Link>
          
          {!token ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 mx-2 mr-8 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors" // Added mr-8 for more space
              >
                SignIn
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="link-t">
                Dashboard
              </Link>
              <Link to="/profile" className="px-4 py-2 mx-2 mr-8 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Profile
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header