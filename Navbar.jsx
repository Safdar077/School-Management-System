import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);   // user to check if someone is logged in
  const navigate = useNavigate();           // lets you go to another page

  useEffect(() => {       
    const userObj = localStorage.getItem("user");     // user stored in local storage
    setUser(userObj ? JSON.parse(userObj) : null);    // if user exists, set state
  }, []);   

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    setUser(null);
    navigate("/register");
    window.location.reload(); // reloads the whole page so that navbar updates immediately
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top px-3">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <b>DR.AR.Undre</b>
        </Link>

        {/* Toggler button for smaller screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarResponsive"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {/* Left navigation items */}
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>

            {/* Dropdown menu */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                data-bs-toggle="dropdown" 
                style={{ cursor: "pointer" }}
              >
                Services
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/fees">Fees</Link></li>
                <li><Link className="dropdown-item" to="/admission">Admission</Link></li>
              </ul>
            </li>

            {/* ✅ Admin Panel link (only show if logged in) */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin Panel</Link>
              </li>
            )}
          </ul>

          {/* Right side buttons */}
          <div className="d-flex">
            {!user ? (
              <>
                <Link className="btn btn-outline-light me-2" to="/register">Register</Link>
                <Link className="btn btn-outline-light" to="/login">Login</Link>
              </>
            ) : (
              <button className="btn btn-outline-danger text-white" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
