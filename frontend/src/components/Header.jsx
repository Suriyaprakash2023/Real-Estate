import React, { useState,useEffect ,useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from "../assets/images/logo/logo@2x.png";
import AuthContext from '../context/AuthContext';
import Alert from '@mui/material/Alert';
import API_BASE_URL from '../context/data';

import MobileNavigation from './MobileNavigation';
import './MobileNavigation.css';
const Header = () => {
  const navigate = useNavigate();
  
  const { isAuthenticated,userData, logout } = useContext(AuthContext);// Get authentication state and logout function 

  const [menuVisible, setMenuVisible] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => {
    console.log("hii")
    setMenuVisible(!menuVisible);
  };

  // Update the body class when the menu visibility changes
  useEffect(() => {
    if (menuVisible) {
      document.body.classList.add("counter-scroll", "mobile-menu-visible");
    } else {
      document.body.classList.remove("counter-scroll", "mobile-menu-visible");
    }

    // Clean up on unmount or when menuVisible changes
    return () => {
      document.body.classList.remove("counter-scroll", "mobile-menu-visible");
    };
  }, [menuVisible]);
  return (
    <>
   
      <header className="main-header fixed-header">
        <div className="header-lower">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-container d-flex justify-content-between align-items-center">
                <div className="logo-box flex">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="logo" width="174" height="44" />
                    </Link>
                  </div>
                </div>
                <div className="nav-outer flex align-center">
                  <nav className="main-menu show navbar-expand-md">
                    <div
                      className="navbar-collapse collapse clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation clearfix">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/Properties">Properties</Link>
                        </li>
                        <li>
                          <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                          <Link to="/about">About</Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="header-account">
                  <div className="register">
                  <ul className="d-flex">
                    {isAuthenticated ? (
                          
                          <div className="header-account">
                            <a href="#" className="box-avatar dropdown-toggle" data-bs-toggle="dropdown">
                                <div className="avatar avt-40 round ms-4" >
                                    <img src={`${API_BASE_URL}/${userData.profilePicture}`} alt="avt" />
                                </div>
                                <h6 className="name" style={{fontSize: '20px'}}>{userData.full_name}</h6>
                                <div className="dropdown-menu">
                                    <Link onClick={()=>{navigate("/my_properties")}} className="dropdown-item" >My Properties</Link>
                                    <Link onClick={()=>{navigate("/my_favorites")}} className="dropdown-item" >My Favorites</Link>
                                    <Link onClick={()=>{navigate("/profile")}} className="dropdown-item" >My Profile</Link>
                                    <Link onClick={()=>{navigate("/add_properties")}}className="dropdown-item" >Add Property</Link>
                                    <Link className="dropdown-item"  >Logout</Link>
                                </div>
                            </a>
                          </div>
                        ) : (
                          <></>
                  )}
                    </ul>
                  </div>
                  
                  
                  {isAuthenticated ? (
                      <div className="flat-bt-top">
                      <button className="tf-btn primary" onClick={logout}>
                       Logout
                      </button>
                    </div> 

                    ) : (
                    
                    <div className="flat-bt-top">
                      <a className="tf-btn primary" >
                       <ul className="d-flex">
                          <li>
                            <Link to='/login' className="text-white">Login</Link>
                          </li>
                          <li>/</li>
                          <li>
                            <Link to='/register' className="text-white">Register</Link>
                          </li>
                      </ul>
                    </a>
                    </div> 
                  )}
                </div>

                
              </div>
            </div>
          </div>
        </div>

        <div className="close-btn">
          <span className="icon flaticon-cancel-1"></span>
        </div>
        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/">
                <img
                  src={logo}
                  alt="nav-logo"
                  width="174"
                  height="44"
                />
              </Link>
            </div>
            <div className="bottom-canvas">
              <div className="login-box flex align-center">
                <a href="#modalLogin" data-bs-toggle="modal">
                  Login
                </a>
                <span>/</span>
                <a href="#modalRegister" data-bs-toggle="modal">
                  Register
                </a>
              </div>
              <div className="menu-outer"></div>
              <div className="button-mobi-sell">
                <Link className="tf-btn primary" to="/submit-property">
                  Submit Property
                </Link>
              </div>
              <div className="mobi-icon-box">
                <div className="box d-flex align-items-center">
                  <span className="icon icon-phone2"></span>
                  <div>1-333-345-6868</div>
                </div>
                <div className="box d-flex align-items-center">
                  <span className="icon icon-mail"></span>
                  <div>themesflat@gmail.com</div>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="mobile-nav-toggler mobile-button" onClick={toggleMenu}><span></span></div>
        <MobileNavigation />
         
                
      </header>

  
     
    </>
  );

};

export default Header;
