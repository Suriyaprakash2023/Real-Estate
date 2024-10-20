import React,{useState,useEffect} from 'react'
import Header from './Header';
import DashboardSideNav from './DashboardSideNav';
import axios from 'axios';
import {Link} from 'react-router-dom';
import API_BASE_URL from '../context/data';
const MyProperties = () => {

    const [properties,useProperties]=useState({})


    useEffect(() => {
        const myPropertydata = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Fetch access token

                const response = await axios.get(`${API_BASE_URL}/my_properties/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 200) { 
                    useProperties(response.data)
                    // Perform some action with the data
                    // Navigate to another page if required
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error (e.g., show error message, redirect to error page)
                if (error.response && error.response.status === 401) {
                    // Token might be expired or invalid, handle accordingly
                } else {
                    // Show a generic error message
                    alert('Error loading properties');
                }
            }
        };

        myPropertydata();
    }, []);
console.log(properties,"properties")
  return (
    <>
      <body className="body bg-surface">
        <div id="wrapper">
            <div id="page" className="clearfix">
                <div className="layout-wrap">

                    <Header/>
                    <DashboardSideNav/>

                    <div className="main-content">
                    <div className="main-content-inner wrap-dashboard-content">
                        <div className="button-show-hide show-mb">
                            <span className="body-1">Show Dashboard</span>
                        </div>
                        <div className="row">
                            <div className=" col-md-3">
                                <fieldset className="box-fieldset">
                                    <label htmlFor="title">
                                        Post Status:<span>*</span>
                                    </label>
                                    <div className="nice-select" tabIndex="0"><span className="current">Select</span>
                                        <ul className="list"> 
                                            <li data-value="1" className="option selected">Select</li>
                                            <li data-value="2" className="option">Publish</li>
                                            <li data-value="3" className="option">Pending</li>
                                            <li data-value="3" className="option">Hidden</li>
                                            <li data-value="3" className="option">Sold</li>
                                        </ul>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="col-md-9">
                                <fieldset className="box-fieldset">
                                    <label htmlFor="title">
                                        Serach Your Properties:<span>*</span>
                                    </label>
                                    <input type="text" className="form-control style-1" placeholder="Search by title"/>
                                </fieldset>
                            </div>
                        </div>
                        
                        <div className="widget-box-2 wd-listing">
                            <h6 className="title">My Properties</h6>
                            <div className="wrap-table">
                                <div className="table-responsive">
                                    <table>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date Published</th>
                                        <th>property Status</th>
                                        <th>property Type</th>
                                        <th>Action</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                       {Array.isArray(properties) && properties.map((property)=>(
                                         <tr className="file-delete" key={property.id}>
                                         <td>
                                             <div className="listing-box">
                                                 <div className="images">
                                                     <img src={`${API_BASE_URL}/${property.images[0].image1}`} alt="images"/>
                                                 </div>
                                                 <div className="content">
                                                     <div className="title">
                                                        <Link  to={`/property_details/${property.id}`} className="link">{property.title}</Link> 
                                                     </div>
                                                     <div className="text-date">{property.description.slice(0, 30)}</div>
                                                     <div className="text-1 fw-7">₹{property.price}</div> 
                                                 </div>
                                             </div>
                                         </td>
                                         <td>
                                             <span>{property.listed_date}</span>
                                         </td>
                                         <td>
                                             <div className="status-wrap">
                                                 <a href="#" className="btn-status">{property.propertyStatus}</a>
                                             </div>
                                         </td>
                                         <td>
                                             <span>{property.propertyType}</span>
                                         </td>
                                         <td>
                                             <ul className="list-action">
                                                 <li><a className="item"><i className="icon icon-edit"></i>Edit</a></li>
                                                 <li><a className="item"><i className="icon icon-sold"></i>Sold</a></li>
                                                 <li><a className="remove-file item"><i className="icon icon-trash"></i>Delete</a></li>
                                             </ul>
                                         </td>
                                     </tr>                

                                       ))} 
                                       
                                     
                                        
                                    </tbody>
                                    </table>
                                </div>

                                <ul className="wd-navigation">
                                    <li><a href="#" className="nav-item active">1</a></li>
                                    <li><a href="#" className="nav-item">2</a></li>
                                    <li><a href="#" className="nav-item">3</a></li>
                                    <li><a href="#" className="nav-item"><i className="icon icon-arr-r"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-dashboard">
                        <p className="text-variant-2">©2024 Homzen. All Rights Reserved.</p>
                    </div>
                </div>

                <div className="overlay-dashboard"></div>       

                

                </div>  
        </div>
        </div>
        
    </body>

    </>
  )
}

export default MyProperties
