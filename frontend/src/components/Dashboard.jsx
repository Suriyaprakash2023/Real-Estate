import React from 'react'
import Header from './Header';
import DashboardSideNav from './DashboardSideNav';
const Dashboard = () => {
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
                        <div className="flat-counter-v2 tf-counter">
                            <div className="counter-box">
                                <div className="box-icon w-68 round">
                                    <span className="icon icon-list-dashes"></span>
                                </div>
                                <div className="content-box">
                                    <div className="title-count">your Listing</div>
                                    <div className="d-flex align-items-end">
                                        <h6 className="number" data-speed="2000" data-to="17" data-inviewport="yes">17</h6>                                   
                                        <span className="fw-7 text-variant-2">/17 remaining</span>
                                    </div>                              

                                </div>
                            </div>
                            <div className="counter-box">
                                <div className="box-icon w-68 round">
                                    <span className="icon icon-clock-countdown"></span>
                                </div>
                                <div className="content-box">
                                    <div className="title-count">Pending</div>
                                    <div className="d-flex align-items-end">
                                        <h6 className="number" data-speed="2000" data-to="0" data-inviewport="yes">0</h6>                                   
                                    </div>                              

                                </div>
                            </div>
                            <div className="counter-box">
                                <div className="box-icon w-68 round">
                                    <span className="icon icon-bookmark"></span>
                                </div>
                                <div className="content-box">
                                    <div className="title-count">Favorite</div>
                                    <div className="d-flex align-items-end">
                                        <h6 className="number" data-speed="2000" data-to="1" data-inviewport="yes">1</h6>                                   
                                    </div>                              

                                </div>
                            </div>
                            <div className="counter-box">
                                <div className="box-icon w-68 round">
                                    <span className="icon icon-review"></span>
                                </div>
                                <div className="content-box">
                                    <div className="title-count">Reviews</div>
                                    <div className="d-flex align-items-end">
                                        <h6 className="number" data-speed="2000" data-to="17" data-inviewport="yes">0</h6>                                   
                                    </div>                              

                                </div>
                            </div>
                        </div>
                        <div className="wrapper-content row">
                            <div className="col-xl-9">
                                <div className="widget-box-2 wd-listing">
                                    <h6 className="title">New Listing</h6>
                                    <div className="wd-filter">
                                        <div className="ip-group">
                                            <input type="text" placeholder="Search"/>
                                        </div>
                                        <div className="ip-group icon">
                                            <input type="text" id="datepicker1" className="ip-datepicker icon" placeholder="From Date"/>
                                        </div>
                                        <div className="ip-group icon">
                                            <input type="text" id="datepicker2" className="ip-datepicker icon" placeholder="To Date"/>
                                        </div>
                                        <div className="ip-group">
                                            <div className="nice-select" tabIndex="0"><span className="current">Select</span>
                                                <ul className="list"> 
                                                    <li data-value="1" className="option selected">Select</li>
                                                    <li data-value="2" className="option">Today</li>
                                                    <li data-value="3" className="option">Yesterday</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-4"><span className="text-primary fw-7">17</span><span className="text-variant-1">Results found</span></div>
                                    <div className="wrap-table">
                                        <div className="table-responsive">

                                            <table>
                                            <thead>
                                            <tr>
                                                <th>Listing</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="file-delete">
                                                    <td>
                                                        <div className="listing-box">
                                                            <div className="images">
                                                                <img src="images/home/house-1.jpg" alt="images" />
                                                            </div>
                                                            <div className="content">
                                                                <div className="title"><a href="property-details-v1.html" className="link">Gorgeous Apartment Building</a> </div>
                                                                <div className="text-date"><p className="fw-5"><span className="fw-4 text-variant-1">Posting date:</span> March 22, 2023</p></div>
                                                                <div className="text-1 fw-7">$5050,00</div> 
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="status-wrap">
                                                            <a href="#" className="btn-status"> Approved</a>
                                                        </div>
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
                                                                <div className="text-date"><p className="fw-5"><span className="fw-4 text-variant-1">Posting date:</span> March 22, 2023</p></div>
                                                                <div className="text-1 fw-7">$5050,00</div> 
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="status-wrap">
                                                            <a href="#" className="btn-status"> Approved</a>
                                                        </div>
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
                                                                <div className="text-date"><p className="fw-5"><span className="fw-4 text-variant-1">Posting date:</span> March 22, 2023</p></div>
                                                                <div className="text-1 fw-7">$5050,00</div> 
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="status-wrap">
                                                            <a href="#" className="btn-status"> Approved</a>
                                                        </div>
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
                                                            <div className="text-date"><p className="fw-5"><span className="fw-4 text-variant-1">Posting date:</span> March 22, 2023</p></div>
                                                            <div className="text-1 fw-7">$5050,00</div> 
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="status-wrap">
                                                        <a href="#" className="btn-status"> Approved</a>
                                                    </div>
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
                                                                <img src="images/home/house-5.jpg" alt="images"/>
                                                            </div>
                                                            <div className="content">
                                                                <div className="title"><a href="property-details-v1.html" className="link">Sunset Heights Estate</a> </div>
                                                                <div className="text-date"><p className="fw-5"><span className="fw-4 text-variant-1">Posting date:</span> March 22, 2023</p></div>
                                                                <div className="text-1 fw-7">$5050,00</div> 
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="status-wrap">
                                                            <a href="#" className="btn-status"> Approved</a>
                                                        </div>
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
                                                                <img src="images/home/house-8.jpg" alt="images"/>
                                                            </div>
                                                            <div className="content">
                                                                <div className="title"><a href="property-details-v1.html" className="link">Casa Lomas de Machalí Machas</a> </div>
                                                                <div className="text-date"><p className="fw-5"><span className="fw-4 text-variant-1">Posting date:</span> March 22, 2023</p></div>
                                                                <div className="text-1 fw-7">$5050,00</div> 
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="status-wrap">
                                                            <a href="#" className="btn-status"> Approved</a>
                                                        </div>
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
                                <div className="widget-box-2 wd-chart">
                                    <h6 className="title">Page Inside</h6>
                                    <div className="wd-filter-date">
                                        <div className="left">
                                            <div className="dates active">Day</div>
                                            <div className="dates">Week</div>
                                            <div className="dates">Month</div>
                                            <div className="dates">Year</div>
                                        </div>
                                        <div className="right">
                                            <div className="ip-group icon">
                                                <input type="text" id="datepicker3" className="ip-datepicker icon" placeholder="From Date"/>
                                            </div>
                                            <div className="ip-group icon">
                                                <input type="text" id="datepicker4" className="ip-datepicker icon" placeholder="To Date"/>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <div className="chart-box">
                                        <canvas id="lineChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3">
                                <div className="widget-box-3 mess-box">
                                    <h6>Messages</h6>
                                    <span className="text-variant-1">No message</span>
                                </div>
                                <div className="widget-box-3 recent-box">
                                    <h6>Recent Reviews</h6>
                                    <div className="box-tes-item">
                                        <div className="box-avt d-flex align-items-center gap-12">
                                            <div className="avatar avt-40 round">
                                                <img src="images/avatar/avt-2.jpg" alt="avatar"/>
                                            </div>
                                            <p>February 18, 2024</p>
                                        </div>
                                        <p className="note p-16">
                                            The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                        </p>
                                        <ul className="list-star">
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                        </ul>
                                        
                                        
                                    </div>
                                    <div className="box-tes-item">
                                        <div className="box-avt d-flex align-items-center gap-12">
                                            <div className="avatar avt-40 round">
                                                <img src="images/avatar/avt-2.jpg" alt="avatar"/>
                                            </div>
                                            <p>February 18, 2024</p>
                                        </div>
                                        <p className="note p-16">
                                            The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                        </p>
                                        <ul className="list-star">
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                        </ul>
                                        
                                        
                                    </div>
                                    <div className="box-tes-item">
                                        <div className="box-avt d-flex align-items-center gap-12">
                                            <div className="avatar avt-40 round">
                                                <img src="images/avatar/avt-2.jpg" alt="avatar"/>
                                            </div>
                                            <p>February 18, 2024</p>
                                        </div>
                                        <p className="note p-16">
                                            The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                        </p>
                                        <ul className="list-star">
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                        </ul>
                                        
                                        
                                    </div>
                                    <div className="box-tes-item">
                                        <div className="box-avt d-flex align-items-center gap-12">
                                            <div className="avatar avt-40 round">
                                                <img src="images/avatar/avt-2.jpg" alt="avatar"/>
                                            </div>
                                            <p>February 18, 2024</p>
                                        </div>
                                        <p className="note p-16">
                                            The housing sector has long been a focal point for investors seeking stability and growth. Understanding the dynamics of housing stocks and effectively trading within this sector can lead to substantial gains.
                                        </p>
                                        <ul className="list-star">
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                            <li className="icon icon-star"></li>
                                        </ul>
                                        
                                        
                                    </div>
                                </div>
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

export default Dashboard
