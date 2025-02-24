import {useContext } from 'react';
import {Link} from "react-router-dom";
import AuthContext from '../context/AuthContext';
const DashboardSideNav = () => {

  const { logout,userRole } = useContext(AuthContext);

  return (
    <>
      <div className="sidebar-menu-dashboard">
            <ul className="box-menu-dashboard">
                <li className="nav-menu-item">

                  <Link to='/dashboard' className="nav-menu-link">
                    <span className="icon icon-dashboard"></span> 
                    Dashboards
                  </Link>

                </li>
                <li className="nav-menu-item">
                 
                  { userRole === 'Admin' ?(
                      ''
                  ):
                  (
                    <Link to="/my_properties" className="nav-menu-link" >
                      <span className="icon icon-list-dashes"></span>
                      My Properties
                    </Link>
                  )}

                </li>
                <li className="nav-menu-item">
                  { userRole === 'Admin' ? (''):
                  (
                    <Link to='/my_favorites' className="nav-menu-link" >
                    <span className="icon icon-heart"></span>
                      My Favorites
                  </Link>
                  )}
                  

                </li>
                <li className="nav-menu-item">
                  { userRole === 'Admin' ?(
                    <Link className="nav-menu-link" to='/sellers' >
                    <span className="icon icon-profile"></span>
                    Sellers
                  </Link>
                  ):(
                      <Link className="nav-menu-link" to='/profile' >
                        <span className="icon icon-profile"></span>
                          My Profile
                      </Link>
                    )}
                </li>
                <li className="nav-menu-item">
                  { userRole === 'Admin' ? (''):(
                    <Link className="nav-menu-link" to='/reviews' >
                    <span className="icon icon-review"></span>
                      Review
                    </Link>

                  )}
                    

                </li>
                <li className="nav-menu-item">
                  <Link to="/add_properties" className="nav-menu-link" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 19.5H4.5V4.5H19.5V19.5ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z" fill="#A3ABB0"/>
                    </svg>
                    Add Property</Link></li>
                <li className="nav-menu-item" >
                  <Link  className="nav-menu-link" >
                    <span className="icon icon-sign-out"></span> 
                    <a onClick={logout}>Logout</a>  
                  </Link>
                </li>
            </ul>
      </div>

    </>
  )
  
}

export default DashboardSideNav
