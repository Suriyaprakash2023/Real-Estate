import React,{useState,useEffect} from 'react'
import Header from './Header';
import axios from 'axios';
import {Link } from 'react-router-dom';
import {API_BASE_URL } from '../context/data';
import DashboardSideNav from './DashboardSideNav';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Swal from 'sweetalert2'; // Import SweetAlert2
const Dashboard = () => {
    const [customerRequest,setCustomerRequest] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customerRequestsPerPage] = useState(3);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        const featchCustomerRequest = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Fetch access token
                const response = await axios.get(`${API_BASE_URL}/customer_request/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 200) {
                    setCustomerRequest(response.data); // Update state with fetched properties
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error loading properties');
            }
        };

        featchCustomerRequest();
    }, []);
    console.log(customerRequest,"customerRequest")

       // Get the properties for the current page
       const indexOfLastCustomerRequests = currentPage * customerRequestsPerPage;
       const indexOfFirstCustomerRequests = indexOfLastCustomerRequests - customerRequestsPerPage;
       const currentCustomerRequests = customerRequest.slice(indexOfFirstCustomerRequests, indexOfLastCustomerRequests);
   
       // Total pages
       const totalPages = Math.ceil(customerRequest.length / customerRequestsPerPage);
   
       // Pagination Handlers
       const nextPage = () => {
           if (currentPage < totalPages) {
               setCurrentPage(currentPage + 1);
           }
       };
   
       const prevPage = () => {
           if (currentPage > 1) {
               setCurrentPage(currentPage - 1);
           }
       };

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
                                <AddHomeWorkIcon  className="icon icon" />
                                </div>
                                <div className="content-box">
                                    <div className="title-count">Sold Property</div>
                                    <div className="d-flex align-items-end">
                                        <h6 className="number" data-speed="2000" data-to="1" data-inviewport="yes">1</h6>                                   
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
                            <div className="col-xl-12">
                                <div className="widget-box-2 wd-listing">
                                    <h6 className="title">New Requests</h6>
                                   
                                    <div className="d-flex gap-4"><span className="text-primary fw-7">{customerRequest.length}</span><span className="text-variant-1">Results found</span></div>
                                    <div className="wrap-table">
                                        <div className="table-responsive">

                                            <table>
                                            <thead>
                                            <tr>
                                                <th>Property</th>
                                                <th>message</th>
                                                <th>user INfo</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {currentCustomerRequests.map((customerRequests) => (
                                                <tr className="file-delete"  key={customerRequests.id}>
                                                    <td>
                                                        <div className="listing-box">
                                                                <div className="images">
                                                                    <img src={`${API_BASE_URL}/${customerRequests.property.images[0].image1}`} alt="images" />
                                                                </div>
                                                                <div className="content">
                                                                    <div className="title">
                                                                        <Link to={`/property_details/${customerRequests.property.id}`} className="link">{customerRequests.property.title}</Link>
                                                                    </div>
                                                                    <div className="text-date">{customerRequests.property.description.slice(0, 30)}</div>
                                                                    <div className="text-1 fw-7">₹{customerRequests.property.price}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    <td>
                                                    <div className="status-wrap">
                                                                {customerRequests.message.length > 20 ? (
                                                                    <>
                                                                        {customerRequests.message.slice(0, 20)}...
                                                                        <button 
                                                                            className="btn btn-link p-0" 
                                                                            style={{ textDecoration: 'underline', color: 'blue' }}
                                                                            onClick={() => Swal.fire({
                                                                                title: 'Full Message',
                                                                                text: customerRequests.message,
                                                                                iconHtml: '<i class="fa-solid fa-envelope"></i>', // Custom envelope icon
                                                                               
                                                                                showCancelButton: true,
                                                                               
                                                                            })}
                                                                        >
                                                                            Read More
                                                                        </button>
                                                                    </>
                                                                ) : (
                                                                    customerRequests.message
                                                                )}
                                                            </div>
                                                    </td>
                                                    
                                                    <td>
                                                        <ul className="list-action">
                                                            <li><a className="item"><strong >Name :</strong> {customerRequests.full_name}</a></li>
                                                            <li><a className="item">Ph No : {customerRequests.phone_number}</a></li>
                                                            <li><a className="remove-file item">Email : {customerRequests.email}</a></li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        <ul className="wd-navigation">
                                                <li>
                                                    <button
                                                        onClick={prevPage}
                                                        disabled={currentPage === 1}
                                                        className="nav-item btn btn"
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            border: 'none',
                                                            borderRadius: '35%',
                                                            padding: '0',
                                                            backgroundColor: isHovered ? '#FF0000' : '#008000',
                                                            color: 'white',
                                                        }}
                                                    >
                                                      <SkipPreviousIcon/>
                                                    </button>
                                                </li>

                                                {[...Array(totalPages)].map((_, index) => (
                                                    <li key={index + 1}>
                                                        <a
                                                            href="#"
                                                            className={`nav-item ${index + 1 === currentPage ? 'active' : ''}`}
                                                            onClick={() => setCurrentPage(index + 1)}
                                                        >
                                                            {index + 1}
                                                        </a>
                                                    </li>
                                                ))}

                                                <li>
                                                    <button
                                                        onClick={nextPage}
                                                        disabled={currentPage === totalPages}
                                                        onMouseEnter={() => setIsHovered(true)}
                                                        onMouseLeave={() => setIsHovered(false)}
                                                        style={{
                                                            width: '30px',
                                                            height: '30px',
                                                            border: 'none',
                                                            borderRadius: '35%',
                                                            padding: '0',
                                                            backgroundColor: isHovered ? '#FF0000' : '#008000',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        <SkipNextIcon />
                                                    </button>
                                                </li>
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
