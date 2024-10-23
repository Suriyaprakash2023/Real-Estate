import React, { useEffect, useState } from 'react';
import Header from './Header';
import DashboardSideNav from './DashboardSideNav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../context/data';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Swal from 'sweetalert2'; // Import SweetAlert2

const MyFavorites = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(3);
    const [isHovered, setIsHovered] = useState(false);

    // Fetch the favorite properties
    useEffect(() => {
        const accessTokennew = localStorage.getItem('accessToken');
        console.log(accessTokennew,"accessTokennew")
        const fetchFavorites = async () => {

            try {
                
                const response = await axios.get(`${API_BASE_URL}/favorite_property/`, {
                    headers: {
                        'Authorization': `Bearer ${accessTokennew}`,
                    }
                });

                if (response.status === 200) {
                    setProperties(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error loading properties');
            }
        };

        fetchFavorites();
    }, []);

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
               const response = await axios.delete(`${API_BASE_URL}/favorite_property/${propertyId}/`, {
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

    // Get the properties for the current page
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Total pages
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

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

                            <Header />
                            <DashboardSideNav />

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
                                                                                <Link to={`/property_details/${property.id}`} className="link">{property.title}</Link>
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

export default MyFavorites;
