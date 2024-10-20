import React from 'react'
import Header from './Header'
import DashboardSideNav from './DashboardSideNav'

const MyFavorites = () => {
  return (
    <>
               
     <body className="body bg-surface">
        <div id="wrapper">
            <div id="page" className="clearfix">
                <div className="layout-wrap">

                    <Header/>
                    <DashboardSideNav/>

                    <div className="main-content">
                    <div className="main-content-inner">
                        <div className="button-show-hide show-mb">
                            <span className="body-1">Show Dashboard</span>
                        </div>
                        <div className="widget-box-2 wd-listing">
                            <h6 className="title">My Favorites</h6>
                            <div className="wrap-table">
                                <div className="table-responsive">
                                    <table>
                                    <thead>
                                    <tr>
                                        <th>LISTING TITLE</th>
                                        <th>Date Published</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="file-delete">
                                            <td>
                                                <div className="listing-box">
                                                    <div className="images">
                                                        <img src="images/home/house-1.jpg" alt="images"/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="title"><a href="property-details-v1.html" className="link">Gorgeous Apartment Building</a> </div>
                                                        <div className="text-date">12 Lowell Road, Port Washington</div>
                                                        <div className="text-1 fw-7">$5050,00</div> 
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>April 9, 2024</span>
                                            </td>
                                           
                                            <td>
                                                <ul className="list-action">
                                                    <li><a className="item"><i className="icon icon-edit"></i>Edit</a></li>
                                                    <li><a className="item"><i className="icon icon-sold"></i>Sold</a></li>
                                                    <li><a className="remove-file item"><i className="icon icon-trash"></i>Delete</a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                      
                                        <tr className="file-delete">
                                            <td>
                                                <div className="listing-box">
                                                    <div className="images">
                                                        <img src="images/home/house-2.jpg" alt="images"/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="title"><a href="property-details-v1.html" className="link">Mountain Mist Retreat, Aspen</a> </div>
                                                        <div className="text-date">Brian Drive, Montvale, New Jersey</div>

                                                        <div className="text-1 fw-7">$5050,00</div> 
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>April 9, 2024</span>
                                            </td>
                                            
                                            <td>
                                                <ul className="list-action">
                                                    <li><a className="item"><i className="icon icon-edit"></i>Edit</a></li>
                                                    <li><a className="item"><i className="icon icon-sold"></i>Sold</a></li>
                                                    <li><a className="remove-file item"><i className="icon icon-trash"></i>Delete</a></li>
                                                </ul>
                                            </td>
                                        </tr>
                                 
                                        <tr className="file-delete">
                                            <td>
                                                <div className="listing-box">
                                                    <div className="images">
                                                        <img src="images/home/house-3.jpg" alt="images"/>
                                                    </div>
                                                    <div className="content">
                                                        <div className="title"><a href="property-details-v1.html" className="link">Lakeview Haven, Lake Tahoe</a> </div>
                                                        <div className="text-date">12 Lowell Road, Port Washington</div>

                                                        <div className="text-1 fw-7">$5050,00</div> 
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span>April 9, 2024</span>
                                            </td>
                                            
                                            <td>
                                                <ul className="list-action">
                                                    <li><a className="item"><i className="icon icon-edit"></i>Edit</a></li>
                                                    <li><a className="item"><i className="icon icon-sold"></i>Sold</a></li>
                                                    <li><a className="remove-file item"><i className="icon icon-trash"></i>Delete</a></li>
                                                </ul>
                                            </td>
                                        </tr>
                               
                                        <tr className="file-delete">
                                        <td>
                                            <div className="listing-box">
                                                <div className="images">
                                                    <img src="images/home/house-4.jpg" alt="images"/>
                                                </div>
                                                <div className="content">
                                                    <div className="title"><a href="property-details-v1.html" className="link">Coastal Serenity Cottage</a> </div>
                                                    <div className="text-date">Brian Drive, Montvale, New Jersey</div>
                                                    <div className="text-1 fw-7">$5050,00</div> 
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span>April 9, 2024</span>
                                        </td>
                                       
                                        <td>
                                            <ul className="list-action">
                                                <li><a className="item"><i className="icon icon-edit"></i>Edit</a></li>
                                                <li><a className="item"><i className="icon icon-sold"></i>Sold</a></li>
                                                <li><a className="remove-file item"><i className="icon icon-trash"></i>Delete</a></li>
                                            </ul>
                                        </td>
                                        </tr>
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

export default MyFavorites
