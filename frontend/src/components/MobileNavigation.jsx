import React, { useState } from 'react';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>

      {/* <div className="mobile-nav-toggler mobile-button" onClick={toggleMenu}>
        <span className="icon">☰</span>
      </div> */}

      <div className='mobile-menu active'>
        <div className="menu-backdrop" onClick={toggleMenu}></div>
        <nav className="menu-box">
          <div className="close-btn text-primary" onClick={toggleMenu}>
            <span className="icon text-primary" style={{ color: 'red' }}>✕</span>
          </div>
          <div className="nav-logo">
            <a href="">
              <img src="/api/placeholder/174/44" alt="nav-logo" width="174" height="44" />
            </a>
          </div>
          <div className="bottom-canvas">
            <div className="login-box flex align-center">
              <a href="#modalLogin" data-bs-toggle="modal">Login</a>
              <span>/</span>
              <a href="#modalRegister" data-bs-toggle="modal">Register</a>
            </div>
            <div className="menu-outer">
              {/* Add your menu items here */}
            </div>
            <div className="button-mobi-sell">
              <a className="tf-btn primary" href="add-property.html">Submit Property</a>
            </div>
            <div className="mobi-icon-box">
              <div className="box flex items-center">
                <span className="icon">📞</span>
                <div>1-333-345-6868</div>
              </div>
              <div className="box flex items-center">
                <span className="icon">✉️</span>
                <div>themesflat@gmail.com</div>
              </div>
            </div>
          </div>
        </nav>
      </div>
     
    </>
  );
};

export default MobileNavigation;