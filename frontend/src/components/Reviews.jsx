import React, { useState, useEffect } from "react";
import Header from "./Header";
import DashboardSideNav from "./DashboardSideNav";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../context/data";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ReplyIcon from "@mui/icons-material/Reply";
import Swal from "sweetalert2";

const Reviews = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [propertiesPerPage] = useState(5); // Set how many properties per page
  const [isHovered, setIsHovered] = useState(false);
  // Fetch properties on component mount
  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // Fetch access token
        const response = await axios.get(`${API_BASE_URL}/guest_review/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          setProperties(response.data); // Update state with fetched properties
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading properties");
      }
    };

    fetchMyProperties();
  }, []);
  
  // Get current properties for the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

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

  const handleSendMessage = (propertyId, message) => {
    try {
      const response = axios.post(`properties/${propertyId}/replay`, {
        message,
      });

      if (response.status === 200) {
        Swal.fire("Sent!", "Your reply has been sent successfully.", "success");
      } else {
        Swal.fire("Error", "There was a problem sending your reply.", "error");
      }
    } catch {
      console.log("replay not send..!");
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
                <div className="main-content-inner wrap-dashboard-content">
                  <div className="widget-box-2 wd-listing">
                    <h6 className="title">Properties Reviews</h6>
                    <div className="wrap-table">
                      <div className="table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th>Properties</th>
                              <th>Review at</th>
                              <th>Message</th>
                              <th>Sender</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentProperties.map((property) => (
                              <tr className="file-delete" key={property.id}>
                                <td style={{ width: "300px" }}>
                                  <Link
                                    to={`/property_details/${property.id}`}
                                    className="link"
                                  >
                                    <p>
                                      <strong>{property.property.title}</strong>
                                    </p>
                                  </Link>
                                </td>
                                <td>
                                  <span>
                                    {property.created_at.slice(0, 16)}
                                  </span>
                                </td>
                                <td>
                                  <div className="status-wrap">
                                    {property.message.length > 20 ? (
                                      <>
                                        {property.message.slice(0, 20)}...
                                        <button
                                          className="btn btn-link p-0"
                                          style={{
                                            textDecoration: "underline",
                                            color: "blue",
                                          }}
                                          onClick={() =>
                                            Swal.fire({
                                              title: "Full Message",
                                              text: property.message,
                                              iconHtml:
                                                '<i class="fa-solid fa-envelope"></i>', // Custom envelope icon

                                              showCancelButton: true,
                                            })
                                          }
                                        >
                                          Read More
                                        </button>
                                      </>
                                    ) : (
                                      property.message
                                    )}
                                  </div>
                                </td>
                                <td>{property.email}</td>
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
                              width: "30px",
                              height: "30px",
                              border: "none",
                              borderRadius: "35%",
                              padding: "0",
                              backgroundColor: isHovered
                                ? "#FF0000"
                                : "#008000", // Change color on hover
                              color: "white",
                            }}
                          >
                            <SkipPreviousIcon />
                          </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                          <li key={index + 1}>
                            <a
                              href="#"
                              className={`nav-item ${
                                index + 1 === currentPage ? "active" : ""
                              }`}
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
                              width: "30px",
                              height: "30px",
                              border: "none",
                              borderRadius: "35%",
                              padding: "0",
                              backgroundColor: isHovered
                                ? "#FF0000"
                                : "#008000", // Change color on hover
                              color: "white",
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
                  <p className="text-variant-2">
                    ©2024 Homzen. All Rights Reserved.
                  </p>
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

export default Reviews;
