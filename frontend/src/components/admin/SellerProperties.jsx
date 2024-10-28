import { useState, useEffect } from 'react';
import Header from '../Header';
import DashboardSideNav from '../DashboardSideNav';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import API_BASE_URL from '../../context/data';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import Swal from 'sweetalert2'; // Import SweetAlert2
const SellerProperties = () => {
    const { id } = useParams();
    const [properties, setProperties] = useState([]);
    const [userInfo,setUserInfo]= useState();
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [propertiesPerPage] = useState(3); // Set how many properties per page
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
      // Fetch the property details from the API using the ID
      const fetchPropertyDetails = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/sellers/${id}`
          );
          if (response.status === 200) {
            setProperties(response.data.properties)
            setUserInfo(response.data.seller)
          }
        } catch (error) {
          console.error("Error fetching property details:", error);
          
        }
      };
  
      fetchPropertyDetails();
    }, [id]);


    useEffect(() => {
        const fetchMyProperties = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Fetch access token
                const response = await axios.get(`${API_BASE_URL}/my_properties/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 200) {
                    setProperties(response.data); // Update state with fetched properties
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error loading properties');
            }
        };

        fetchMyProperties();
    }, []);

    // Get current properties for the current page
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Total number of pages
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    // Change page function
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Go to next page
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Go to previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };



        // Delete a property with confirmation
        const deleteProperty = async (propertyId) => {
            // Show SweetAlert confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure..😣',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });
    
            if (result.isConfirmed) {
                try {
                   const accessToken = localStorage.getItem('accessToken');
                   const response = await axios.delete(`${API_BASE_URL}/properties/${propertyId}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                    });
                    if (response.status===204){
                        setProperties(properties.filter(property => property.id !== propertyId));
    
                    // Show success message
                    Swal.fire('Deleted!', 'Your property has been deleted.', 'success');
                    }
                    
                    // Update state after successful deletion
                    
                } catch (error) {
                    console.error('Error deleting property:', error);
                    Swal.fire('Error!', 'Failed to delete the property.', 'error');
                }
            }
        };
        // Delete a property with confirmation
        const soldProperty = async (propertyId) => {
            // Show SweetAlert confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure..😍',
                text: "You won't be able to sold this!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#008000',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, sold it!'
            });
    
            if (result.isConfirmed) {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    console.log(accessToken,"myaccessToken")
                   const response = await axios.post(`${API_BASE_URL}/my_properties/`,{propertyId}, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                    });
                    if (response.status===200){
    
                    // Show success message
                    Swal.fire('Solded!', 'Your property has been Sold.', 'success');
                    }
                    
                    // Update state after successful deletion
                    
                } catch (error) {
                    console.error('Error sold property:', error);
                    Swal.fire('Error!', 'Failed to sold the property.', 'error');
                }
            }
        };
        console.log(properties,"properties")
    return (
        <>
            <body className="body bg-surface">
                <div id="wrapper">
                    <div id="page" className="clearfix">
                        <div className="layout-wrap">
                            <Header />
                            <DashboardSideNav />
                            <div className="main-content">
                                <div className="main-content-inner wrap-dashboard-content">
                                    <div className="row">
                                        
                                        <div className="col-md-9">
                                            <fieldset className="box-fieldset">
                                                <label htmlFor="title">
                                                    Search Your Properties:<span>*</span>
                                                </label>
                                                <input type="text" className="form-control style-1" placeholder="Search by title" />
                                            </fieldset>
                                        </div>
                                        <div className="col-1"></div>
                                        <div className="col-1">
                                          <fieldset className="box-fieldset">
                                                  <label htmlFor="title">
                                                      Submit:<span>*</span>
                                                  </label>
                                                
                                          </fieldset>
                                          <button className='btn btn-info text-white'>search</button>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>

                                    <div className="widget-box-2 wd-listing">
                                        <h6 className="title">Seller Properties</h6>
                                        <div className="wrap-table">
                                            <div className="table-responsive">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Date Published</th>
                                                            <th>Property Status</th>
                                                            <th>Property Type</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentProperties.map((property) => (
                                                            <tr className="file-delete" key={property.id}>
                                                                <td>
                                                                    <div className="listing-box">
                                                                        <div className="images">
                                                                            <img src={`${API_BASE_URL}/${property.images[0].image1}`} alt="images" />
                                                                        </div>
                                                                        <div className="content">
                                                                            <div className="title">
                                                                                <Link to={`/property_details/${property.id}`} className="link">{property.title.slice(0, 33)}...</Link>
                                                                            </div>
                                                                            <div className="text-date">{property.description.slice(0, 33)}...</div>
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
                                                                        <li>
                                                                          <Link className="btn btn-warning text-white"
                                                                           to={`/edit_property/${property.id}?email=${userInfo.email}`} >
                                                                            <i className="icon icon-edit"></i> Edit 
                                                                          </Link>
                                                                        </li>
                                                                        <li>
                                                                          <a className="btn btn-success" onClick={() => soldProperty(property.id)}><i className="icon icon-sold"></i>Sold</a></li>
                                                                        <li>
                                                                            <button
                                                                                className="btn btn-danger"
                                                                                onClick={() => deleteProperty(property.id)}
                                                                            >
                                                                                <i className="icon icon-trash"></i> Remove
                                                                            </button>
                                                                        </li>
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
                                                            backgroundColor: isHovered ? '#FF0000' : '#008000', // Change color on hover
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
                                                            onClick={() => paginate(index + 1)}
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
                                                backgroundColor: isHovered ? '#FF0000' : '#008000', // Change color on hover
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
                                <div className="footer-dashboard">
                                    <p className="text-variant-2">©2024 Homzen. All Rights Reserved.</p>
                                </div>
                            </div>
                        </div>
                        <div className="overlay-dashboard"></div>
                    </div>
                </div>
            </body>
        </>
    );
};

export default SellerProperties;
