import React, { useEffect,useContext , useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../context/data";
import { Fancybox } from "@fancyapps/ui";
import Header from "./Header";
import Footer from "./Footer";
import StarRating from "./StarRating";
import VerifiedIcon from "@mui/icons-material/Verified";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
const PropertieDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [error, setError] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [contactsllerssuccessMessage, setContactsllerssuccessMessage] = useState("");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { isAuthenticated,userData, logout } = useContext(AuthContext);// Get authentication state and logout function 
  const [customerRequest, setCustomerRequest] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    message: "",
  });

  const [guestReview, setGuestReview] = useState({
    name: "",
    email: "",
    message: "",
    property: "",
    rating: 0, // Initial rating set to 0
  });

  const [showAlert, setShowAlert] = useState(true); // Initially show the alert
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setError(null); // Clear any previous error
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []); // Empty dependency array to run only on mount

  const [recommendProperty, setRecommendProperty] = useState({});
  useEffect(() => {
    const getRecommendProperty = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/recommended_property/`,
          location
        );
        if (response.status === 200) {
          setRecommendProperty(response.data);
        } else {
          console.log("location permission not allowed");
        }
      } catch {}
    };
    getRecommendProperty();
  }, []);



  const handleClose = () => {
    setShowAlert(false); // Manually close the alert
  };

  useEffect(() => {
    // Initialize Fancybox (only if needed)
    Fancybox.bind("[data-fancybox='gallery']", {});
  }, []);

  const getReviews = async (e) => {
    const response = await axios.get(`${API_BASE_URL}/guest_review/`, {
      params: { property: property.id },
    });
    if (response.status === 200) {
      setReview(response.data);
      setSuccessMessage("Thank you for sharing your thoughts with us..!");
    } else {
      setError(response.errors);
    }
  };

  useEffect(() => {
    // Fetch the property details from the API using the ID
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/property_details/${id}`
        );
        if (response.status === 200) {
          setProperty(response.data);
          setReview(response.data.reviews);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);
  console.log(property, "prop");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleInputChange = (e) => {
    setCustomerRequest((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomerRequest = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("full_name", customerRequest.full_name);
    formData.append("phone_number", customerRequest.phone_number);
    formData.append("email", customerRequest.email);
    formData.append("message", customerRequest.message);
    formData.append("property", property.id);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/customer_request/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setCustomerRequest({
          full_name: "",
          phone_number: "",
          email: "",
          message: "",
        });
        setShowMessage(true);
        setContactsllerssuccessMessage("Message Sent Successfully..!");
  
        // Hide the message after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      } else {
        setError(response.errors);
      }
    } catch {
      setError("Check the input values");
      console.warn("form not submitted - handleCustomerRequest error");
    }
  };

  console.log(showMessage,"ShowMessage")
  const handleGuestReview = (e) => {
    setGuestReview((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

const submitGuestReview = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", guestReview.name);
  formData.append("message", guestReview.message);
  formData.append("email", guestReview.email);
  formData.append("property", property.id);
  formData.append("rating", guestReview.rating);
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/guest_review/`,
      formData
    );
    if (response.status === 201) {
      setGuestReview({
        name: "",
        email: "",
        message: "",
        rating: 0,
      });
      getReviews();
      setSuccessMessage("Thank you for sharing your thoughts with us..!");
      setShowMessage(true);

      // Hide the message after 5 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } else {
      setError(response.errors);
    }
  } catch {
    setError("Check the input values");
    console.warn("form not submitted - submitGuestReview error");
  }
};


const handleShareClick = () => {
  Swal.fire({
    title: 'Share this Property!',
    html: `
      <button id="facebook-share" class="swal2-styled btn btn text-white" style="background-color: #3b5998;"><i class="fab fa-facebook"></i> Facebook</button>
      <button id="twitter-share" class="swal2-styled btn btn text-white" style="background-color: #1da1f2;"><i class="fa-brands fa-x-twitter"></i> Twitter</button>
      <button id="whatsapp-share" class="swal2-styled  btn btn text-white" style="background-color: #25D366;"><i class="fab fa-whatsapp"></i> WhatsApp</button>
    `,
    showConfirmButton: false,
    didOpen: () => {
      // Facebook Share
      document.getElementById('facebook-share').addEventListener('click', () => {
        window.open('https://www.facebook.com/', '_blank');
      });

      // Twitter Share
      document.getElementById('twitter-share').addEventListener('click', () => {
        window.open('https://twitter.com/', '_blank');
      });

      // WhatsApp Share
      document.getElementById('whatsapp-share').addEventListener('click', () => {
        window.open('https://api.whatsapp.com/', '_blank');
      });
    }
  });
};


const toggleFavorite = (propertyId) => {
  if (!isAuthenticated) {
    // Alert the user and navigate to login
    window.alert('Please log in to add properties to favorites.');
    return;
  }

  const isFavorited = favorites.includes(propertyId);

  if (!isFavorited) {
    setFavorites([...favorites, propertyId]); // Add to favorites
    handleFavoriteClick(propertyId); // Send API request
  } else {
    setFavorites(favorites.filter((id) => id !== propertyId)); // Remove from favorites
  }
};

const handleFavoriteClick = async (propertyId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/favorite_property/`, {
      propertyId}, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Send token in the header
        },
      
    });

    if (response.status === 201) {
      console.log('Property favorited successfully:', response.data);

       // Show SweetAlert notification
       Swal.fire({
        title: 'Favorited!',
        html: '<span style="font-size: 100px;" >💚</span> <br/> Property added to your favorite list!',
        icon: 'success',
        confirmButtonText: 'Awesome!',
        customClass: {
          popup: 'swal-heart-popup' // Optional for custom styling
        }
      });

    }else if (response.status === 200) {

      Swal.fire({
        title: '',
        html: '<span style="font-size: 100px;" >❤️</span> <br/> Property alredy in your favorite list!',
        icon: 'warning',
        confirmButtonText: 'Try Again!',
        customClass: {
          popup: 'swal-heart-popup' // Optional for custom styling
        }
      });

     }    
    else {
      console.error('Failed to favorite the property');
       // Handle error with SweetAlert
    Swal.fire({
      title: 'Error!',
      text: 'Could not add the property to your favorite list.',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
    }
  } catch (error) {
    console.error('Error favoriting the property:', error);
  }
};



console.log(review,"review")
  return (
    <>
      <Header />
      <section className="flat-gallery-single">
        <div className="item1 box-img">
          <img
            src={`${API_BASE_URL}/${property.images[0].image5}`}
            alt="img-gallery"
          />
          <div className="box-btn">
            <a
              href={property.virtual_tour_url}
              data-fancybox="gallery2"
              className="box-icon"
            >
             <PlayCircleIcon style={{ color: 'red', fontSize: '45px' }} />
            </a>
            <a
              href={`${API_BASE_URL}/${property.images[0].image1}`}
              data-fancybox="gallery"
              className="tf-btn primary"
            >
              View All Photos
            </a>
          </div>
        </div>
        <a
          href={`${API_BASE_URL}/${property.images[0].image2}`}
          className="item2 box-img"
          data-fancybox="gallery"
        >
          <img
            src={`${API_BASE_URL}/${property.images[0].image2}`}
            alt="img-gallery"
          />
        </a>
        <a
          href={`${API_BASE_URL}/${property.images[0].image3}`}
          className="item3 box-img"
          data-fancybox="gallery"
        >
          <img
            src={`${API_BASE_URL}/${property.images[0].image3}`}
            alt="img-gallery"
          />
        </a>
        <a
          href={`${API_BASE_URL}/${property.images[0].image4}`}
          className="item4 box-img"
          data-fancybox="gallery"
        >
          <img
            src={`${API_BASE_URL}/${property.images[0].image4}`}
            alt="img-gallery"
          />
        </a>
        <a
          href={`${API_BASE_URL}/${property.images[0].image1}`}
          className="item5 box-img"
          data-fancybox="gallery"
        >
          <img
            src={`${API_BASE_URL}/${property.images[0].image1}`}
            alt="img-gallery"
          />
        </a>
      </section>

      <section className="flat-section-v6 flat-property-detail-v3">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="header-property-detail">
                <div className="content-top d-flex justify-content-between align-items-center">
                  <div className="box-name">
                    {/* {property.propertyStatus === "For Sale"} */}
                    <a
                      href="#"
                      className={`flag-tag ${
                        property.propertyStatus === "For Sale"
                          ? "success"
                          : "primary"
                      }`}
                    >
                      {property.propertyStatus}
                    </a>
                    <h4 className="title link">{property.title}</h4>
                  </div>
                  <div className="box-price d-flex align-items-center">
                    <h4>₹{property.price}</h4>
                    <span className="body-1 text-variant-1"></span>
                  </div>
                </div>
                <div className="content-bottom">
                  <div className="info-box">
                    <div className="label">FEATUREs:</div>
                    <ul className="meta">
                      <li className="meta-item">
                        <span className="icon icon-bed"></span>{" "}
                        {property.bedrooms} Bedroom
                      </li>
                      <li className="meta-item">
                        <span className="icon icon-bathtub"></span>{" "}
                        {property.bathrooms} Bathroom
                      </li>
                      <li className="meta-item">
                        <span className="icon icon-ruler"></span>{" "}
                        {property.propertySqft} SqFT
                      </li>
                    </ul>
                  </div>

                  <ul className="icon-box">
                    
                  <li className="box-icon w-32" onClick={() => toggleFavorite(property.id)}>
                    {favorites.includes(property.id) ? (
                      <FavoriteBorderIcon className="" />
                    ) : (
                      <FavoriteBorderIcon className="" />
                    )}
                      
                    </li>
                    <li className="box-icon w-32">
                    
                    <div onClick={handleShareClick} className=" cursor-pointer">
                    {/* This would be your share icon */}
                    <ShareIcon className=""/>
                    {/* <i className="fas fa-share-alt"></i> */}
                  </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="single-property-element single-property-desc">
                <div className="h7 title fw-7">Description</div>
                <p className="body-2 text-variant-1">
                  Located around an hour away from Paris, between the Perche and
                  the Iton valley, in a beautiful wooded park bordered by a
                  charming stream, this country property immediately seduces
                  with its bucolic and soothing environment.
                </p>
                <p className="mt-8 body-2 text-variant-1">
                  An ideal choice for sports and leisure enthusiasts who will be
                  able to take advantage of its swimming pool (11m x 5m), tennis
                  court, gym and sauna.
                </p>
                <a href="#" className="btn-view">
                  <span className="text">View More</span>{" "}
                </a>
              </div>
              <div className="single-property-element single-property-overview">
                <div className="h7 title fw-7">Overview</div>
                <ul className="info-box">
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-house-line"></i>
                    </a>
                    <div className="content">
                      <span className="label">ID:</span>
                      <span>{property.id}</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-arrLeftRight"></i>
                    </a>
                    <div className="content">
                      <span className="label">Type:</span>
                      <span>{property.propertyType}</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-bed"></i>
                    </a>
                    <div className="content">
                      <span className="label">Bedrooms:</span>
                      <span>{property.bedrooms} Rooms</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-bathtub"></i>
                    </a>
                    <div className="content">
                      <span className="label">Bathrooms:</span>
                      <span>{property.bathrooms} Rooms</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-garage"></i>
                    </a>
                    <div className="content">
                      <span className="label">Garages:</span>
                      <span>{property.garages} Rooms</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-ruler"></i>
                    </a>
                    <div className="content">
                      <span className="label">Property Sqft:</span>
                      <span>{property.propertySqft} SqFt</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-crop"></i>
                    </a>
                    <div className="content">
                      <span className="label">Total Sqft:</span>
                      <span>{property.totalSqft} SqFt</span>
                    </div>
                  </li>
                  <li className="item">
                    <a href="#" className="box-icon w-52">
                      <i className="icon icon-hammer"></i>
                    </a>
                    <div className="content">
                      <span className="label">Year Built:</span>
                      <span>{property.yearBuilt}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="single-property-element single-property-video">
                <div className="h7 title fw-7">Video</div>
                <div className="img-video">
                  <img
                    src={`${API_BASE_URL}/${property.virtual_tour_bg}`}
                    alt="img-video"
                  />
                  <a
                    href={property.virtual_tour_url}
                    data-fancybox="gallery2"
                    className="btn-video"
                  >
                    
                    <PlayCircleIcon style={{ color: 'red', fontSize: '48px' }} />

                  </a>
                </div>
              </div>
              <div className="single-property-element single-property-info">
                <div className="h7 title fw-7">Property Details</div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property ID:</span>
                      <div className="content fw-7">{property.id}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Bedrooms:</span>
                      <div className="content fw-7">{property.bedrooms}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Price:</span>
                      <div className="content fw-7">₹{property.price}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Bathrooms:</span>
                      <div className="content fw-7">{property.bathrooms}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property Size:</span>
                      <div className="content fw-7">
                        {property.propertySqft} SqFt
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Garage:</span>
                      <div className="content fw-7">{property.garages}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Year built:</span>
                      <div className="content fw-7">{property.yearBuilt}</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property Type:</span>
                      <div className="content fw-7">
                        {property.propertyType}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="inner-box">
                      <span className="label">Property Status:</span>
                      <div className="content fw-7">
                        {property.propertyStatus}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="single-property-element single-property-feature">
                <div className="h7 title fw-7">Amenities and features</div>
                <div className="wrap-feature">
                  <div className="box-feature">
                    <div className="fw-7">Home safety:</div>
                    <ul>
                      <li className="feature-item">
                        <span className="icon icon-smoke-alarm"></span>
                        Smoke alarm
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-carbon"></span>
                        Carbon monoxide alarm
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-kit"></span>
                        First aid kit
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-lockbox"></span>
                        Self check-in with lockbox
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-security"></span>
                        Security cameras
                      </li>
                    </ul>
                  </div>
                  <div className="box-feature">
                    <div className="fw-7">Bedroom:</div>
                    <ul>
                      <li className="feature-item">
                        <span className="icon icon-hanger"></span>
                        Hangers
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-bed-line"></span>
                        Bed linens
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-pillows"></span>
                        Extra pillows & blankets
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-iron"></span>
                        Iron
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-tv"></span>
                        TV with standard cable
                      </li>
                    </ul>
                  </div>
                  <div className="box-feature">
                    <div className="fw-7">Kitchen:</div>
                    <ul>
                      <li className="feature-item">
                        <span className="icon icon-refrigerator"></span>
                        Refrigerator
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-microwave"></span>
                        Microwave
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-microwave"></span>
                        Dishwasher
                      </li>
                      <li className="feature-item">
                        <span className="icon icon-coffee"></span>
                        Coffee maker
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="single-property-element single-property-floor">
                <div className="h7 title fw-7">Floor plans</div>
                <ul className="box-floor" id="parent-floor">
                  <li className="floor-item">
                    <div
                      className="floor-header"
                      data-bs-target="#floor-one"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="floor-one"
                    >
                      <div className="inner-left">
                        <i className="icon icon-arr-r"></i>
                        <span className="fw-7">First Floor</span>
                      </div>
                      <ul className="inner-right">
                        <li className="d-flex align-items-center gap-8">
                          <i className="icon icon-bed"></i>
                          {property.bedrooms} Bedroom
                        </li>
                        <li className="d-flex align-items-center gap-8">
                          <i className="icon icon-bathtub"></i>
                          {property.bathrooms} Bathroom
                        </li>
                      </ul>
                    </div>
                    <div
                      id="floor-one"
                      className="collapse show"
                      data-bs-parent="#parent-floor"
                    >
                      <div className="faq-body">
                        <div className="box-img">
                          <img
                            src={`${API_BASE_URL}/${property.floorPlan}`}
                            alt="img-floor"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="single-property-element single-property-attachments">
                <div className="h7 title fw-7">File Attachments</div>
                <div className="row">
                  <div className="col-sm-6">
                    <a href="#" target="_blank" className="attachments-item">
                      <img
                        src={`${API_BASE_URL}/${property.document1}`}
                        alt="file"
                        style={{ height: "300px" }}
                      />
                    </a>
                  </div>
                  <div className="col-sm-6">
                    <a href="#" target="_blank" className="attachments-item">
                      <img
                        src={`${API_BASE_URL}/${property.document2}`}
                        alt="file"
                        style={{ height: "300px" }}
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="single-property-element single-property-nearby">
                <div className="h7 title fw-7">What’s nearby?</div>
                <p className="body-2">
                  Explore nearby amenities to precisely locate your property and
                  identify surrounding conveniences, providing a comprehensive
                  overview of the living environment and the property's
                  convenience.
                </p>
                <div className="grid-2 box-nearby">
                  <ul className="box-left">
                    <li className="item-nearby">
                      <span className="label">School:</span>
                      <span className="fw-7">{property.nearbySchool} km</span>
                    </li>
                    <li className="item-nearby">
                      <span className="label">University:</span>
                      <span className="fw-7">
                        {property.nearbyUniversity} km
                      </span>
                    </li>
                    <li className="item-nearby">
                      <span className="label">Grocery center:</span>
                      <span className="fw-7">{property.nearbyGrocery} km</span>
                    </li>
                    <li className="item-nearby">
                      <span className="label">Market:</span>
                      <span className="fw-7">{property.nearbyMarket} km</span>
                    </li>
                  </ul>
                  <ul className="box-right">
                    <li className="item-nearby">
                      <span className="label">Hospital:</span>
                      <span className="fw-7">{property.nearbyHospital} km</span>
                    </li>
                    <li className="item-nearby">
                      <span className="label">Metro station:</span>
                      <span className="fw-7">{property.nearbyMetro} km</span>
                    </li>
                    <li className="item-nearby">
                      <span className="label">Gym, wellness:</span>
                      <span className="fw-7">{property.nearbyGym} km</span>
                    </li>
                    <li className="item-nearby">
                      <span className="label">Park:</span>
                      <span className="fw-7">{property.nearbyPark} km</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="single-property-element single-property-floor">
                <div className="h7 title fw-7">Guest Reviews</div>
                <ul className="box-floor" id="parent-floor">
                  <li className="floor-item">
                    <div
                      className="floor-header"
                      data-bs-target="#floor-one"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="floor-one"
                    >
                      <div className="inner-left">
                        <i className="icon icon-arr-r"></i>
                        <span className="fw-7">Reviews</span>
                      </div>
                      <ul className="inner-right">
                        <li className="d-flex align-items-center gap-8">
                          <a className="tf-btn">View All Reviews</a>
                        </li>
                      </ul>
                    </div>
                    <div
                      id="floor-one"
                      className="collapse show"
                      data-bs-parent="#parent-floor"
                    >
                      <div className="faq-body">
                        <div className="single-property-element single-wrapper-review">
                          <div className="wrap-review">
                            {review && review.length > 0 ? ( // Check for undefined and array length
                              <ul className="box-review">
                                {review.map((review, index) => (
                                  <li key={index} className="list-review-item">
                                    <div className="content">
                                      {/* Reviewer name */}
                                      <div className="name h7 fw-7 text-black">
                                        {review.name}
                                        <VerifiedIcon
                                          style={{
                                            fontSize: 20,
                                            color: "green",
                                            margin: "2px",
                                          }}
                                        />
                                      </div>

                                      {/* Review Date */}
                                      <span className="mt-4 d-inline-block date body-3 text-variant-2">
                                      {`${new Date(review.created_at).toISOString().slice(0, 10)} ${new Date(review.created_at).toTimeString().slice(0, 5)}`}
                                      </span>

                                      {/* Star Rating */}
                                      <ul className="mt-8 list-star">
                                        {Array(5)
                                          .fill(0)
                                          .map((_, i) => (
                                            <li
                                              key={i}
                                              className={
                                                i < review.rating
                                                  ? "icon-star"
                                                  : "icon-star-filled"
                                              }
                                            ></li>
                                          ))}
                                      </ul>

                                      {/* Review Message */}
                                      <p className="mt-12 body-2 text-black">
                                        {review.message}
                                      </p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <ul className="box-review">
                                <li className="list-review-item">
                                  <h6>No reviews yet..!</h6>
                                </li>
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
                
                
              {showMessage   && (
              <Alert
                variant="filled"
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClose} // Close the alert when clicked
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {successMessage}
              </Alert>
              )}

              <div className="single-property-element single-wrapper-review mt-3">
                <div className="wrap-form-comment">
                  <h6>Leave A comment</h6>
                  <div id="comments" className="comments">
                    <div className="respond-comment">
                      <form
                        onSubmit={submitGuestReview}
                        id="contactform"
                        className="comment-form form-submit"
                        acceptCharset="utf-8"
                      >
                        <div className="form-wg group-ip">
                          <fieldset>
                            <label className="sub-ip">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Your name"
                              value={guestReview.name}
                              onChange={handleGuestReview}
                              required
                            />
                          </fieldset>
                          <fieldset>
                            <label className="sub-ip">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Your email"
                              value={guestReview.email}
                              onChange={handleGuestReview}
                              required
                            />
                          </fieldset>
                        </div>

                        <fieldset className="form-wg">
                          <label className="sub-ip">Review</label>
                          <textarea
                            id="comment-message"
                            name="message"
                            rows="4"
                            tabIndex="4"
                            placeholder="Write comment "
                            aria-required="true"
                            value={guestReview.message}
                            onChange={handleGuestReview}
                            required
                          ></textarea>
                        </fieldset>
                        <fieldset className="form-wg">
                          <label className="sub-ip">Rating</label> <br />
                          <StarRating
                            totalStars={5}
                            initialRating={guestReview.rating}
                            onRatingChange={(newRating) => {
                              setGuestReview((prev) => ({
                                ...prev,
                                rating: newRating,
                              }));
                            }}
                          />
                        </fieldset>

                        <button
                          className="form-wg tf-btn primary"
                          type="submit"
                        >
                          <span>Post Comment</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget-sidebar fixed-sidebar wrapper-sidebar-right">
                <div className="widget-box single-property-contact bg-surface">

                {showMessage   && (
              <Alert
                variant="filled"
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={handleClose} // Close the alert when clicked
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {contactsllerssuccessMessage}
              </Alert>
              )}

                  <div className="h7 title fw-7">Contact Sellers</div>
                  <div className="box-avatar">
                    <div className="avatar avt-100 round">
                      <img
                        src={`${API_BASE_URL}/${property.seller.profilePicture}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="info">
                      <div className="text-1 name">
                        {property.seller.full_name}
                      </div>
                      <span>
                        {property.seller.mobile_number}
                        {property.seller.email}
                      </span>
                    </div>
                  </div>
                  <form
                    onSubmit={handleCustomerRequest}
                    className="contact-form"
                  >
                    <div className="ip-group">
                      <label htmlFor="fullname">Full Name:</label>
                      <input
                        type="text"
                        placeholder="Jony Dane"
                        name="full_name"
                        value={customerRequest.full_name}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="ip-group">
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="text"
                        placeholder="ex 0123456789"
                        name="phone_number"
                        value={customerRequest.phone_number}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="ip-group">
                      <label htmlFor="email">Email Address:</label>
                      <input
                        type="text"
                        placeholder="themesflat@gmail.com"
                        name="email"
                        value={customerRequest.email}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="ip-group">
                      <label htmlFor="message">Your Message:</label>
                      <textarea
                        id="comment-message"
                        name="message"
                        rows="4"
                        tabIndex="4"
                        placeholder="Message"
                        aria-required="true"
                        value={customerRequest.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <button className="tf-btn primary w-100">
                      Send Message
                    </button>
                  </form>
                </div>
                
                <div className="widget-box single-property-whychoose bg-surface">
                  <div className="h7 title fw-7">Why Choose Us?</div>
                  <ul className="box-whychoose">
                    <li className="item-why">
                      <i className="icon icon-secure"></i>
                      Secure Booking
                    </li>
                    <li className="item-why">
                      <i className="icon icon-guarantee"></i>
                      Best Price Guarantee
                    </li>
                    <li className="item-why">
                      <i className="icon icon-booking"></i>
                      Easy Booking Process
                    </li>
                    <li className="item-why">
                      <i className="icon icon-support"></i>
                      Available Support 24/7
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="flat-section flat-property-v3 wow fadeInUpSmall"
        data-wow-delay=".2s"
        data-wow-duration="2000ms"
      >
        <div className="container">
          <div className="box-title text-center">
            <div className="text-subtitle text-primary">Top Properties</div>
            <h4 className="mt-4">Recommended for you</h4>
          </div>

          <div className="wrap-sw-property">
            <Swiper
              modules={[Navigation, Autoplay]} // Add the Swiper modules for autoplay and navigation
              spaceBetween={30} // Space between slides
              slidesPerView={1} // Show one slide at a time
              navigation={{
                // Enable navigation arrows
                nextEl: ".swiper-nav-next",
                prevEl: ".swiper-nav-prev",
              }}
              autoplay={{
                // Enable autoplay and set delay to 5s
                delay: 5000,
                disableOnInteraction: false, // Keep autoplay working after manual interaction
              }}
              loop={true} // Enable infinite loop
              className="tf-sw-property"
            >
              {Array.isArray(recommendProperty) &&
                recommendProperty.map((property, index) => (
                  <SwiperSlide key={index}>
                    <div className="wrap-property-v2 style-1">
                      <div className="box-inner-left">
                        <img
                          src={`${API_BASE_URL}${property.images[0].image1}`}
                          alt="img-property"
                        />
                      </div>
                      <div className="box-inner-right">
                        <div className="content-property">
                          <ul className="box-tag">
                            <li className="flag-tag success">
                              {property.propertyStatus}
                            </li>
                          </ul>
                          <div className="box-name">
                            <h5 className="title">
                              <Link
                                to={`/property_details/${property.id}`}
                                className="link"
                              >
                                {property.title}
                              </Link>
                            </h5>
                            <p className="location">
                              <span className="icon icon-mapPin"></span>
                              {property.address}
                            </p>
                          </div>
                          <ul className="list-info">
                            <li className="item">
                              <span className="icon icon-bed"></span>
                              {property.bedrooms}4 Bed
                            </li>
                            <li className="item">
                              <span className="icon icon-bathtub"></span>
                              {property.bathrooms} bath
                            </li>
                            <li className="item">
                              <span className="icon icon-ruler"></span>
                              {property.propertySqft} SqFT
                            </li>
                          </ul>
                          <div className="box-avatar d-flex gap-12 align-items-center">
                            <div className="avatar avt-60 round">
                              <img
                                src={`${API_BASE_URL}${property.seller.profilePicture}`}
                                alt="avatar"
                              />
                            </div>
                            <div className="info">
                              <p className="body-2 text-variant-1">Agent</p>
                              <div className="mt-4 h7 fw-7">
                                {property.seller.full_name}
                              </div>
                            </div>
                          </div>
                          <div className="pricing-property">
                            <div className="d-flex align-items-center">
                              <h5>₹{property.price}</h5>
                            </div>
                            <ul className="d-flex gap-12">
                              <li className="box-icon w-52">
                                <span className="icon icon-heart"></span>
                              </li>
                              <li className="box-icon w-52">
                                <span className="icon icon-arrLeftRight"></span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation buttons */}
            <div className="box-navigation">
              <div className="navigation swiper-nav-next nav-next-property">
                <span className="icon icon-arr-l"></span>
              </div>
              <div className="navigation swiper-nav-prev nav-prev-property">
                <span className="icon icon-arr-r"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PropertieDetails;
