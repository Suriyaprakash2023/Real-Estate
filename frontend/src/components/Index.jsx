import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import slider5 from "../assets/images/slider/slider-5.jpg";
import slider51 from "../assets/images/slider/slider-5-1.jpg";
import slider52 from "../assets/images/slider/slider-5-2.jpg";
import slider53 from "../assets/images/slider/slider-5-3.jpg";
import sliderpagi from "../assets/images/slider/slider-pagi.jpg";
import sliderpagi2 from "../assets/images/slider/slider-pagi2.jpg";
import sliderpagi3 from "../assets/images/slider/slider-pagi3.jpg";
import sliderpagi4 from "../assets/images/slider/slider-pagi4.jpg";
import agent1 from "../assets/images/agents/agent-sm-1.jpg";
import agent2 from "../assets/images/agents/agent-sm-2.jpg";
import agent3 from "../assets/images/agents/agent-sm-3.jpg";
import agent4 from "../assets/images/agents/agent-sm-4.jpg";
import blog10 from "../assets/images/blog/blog-10.jpg";
import blog11 from "../assets/images/blog/blog-11.jpg";
import blog12 from "../assets/images/blog/blog-12.jpg";
import blog13 from "../assets/images/blog/blog-13.jpg";
import axios from "axios";
import { API_BASE_URL } from "../context/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Index = () => {
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState({});
  useEffect(() => {
    const myPropertydata = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/properties/`, {});

        if (response.status === 200) {
          setProperties(response.data);
          // Perform some action with the data
          // Navigate to another page if required
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., show error message, redirect to error page)
        if (error.response && error.response.status === 401) {
          // Token might be expired or invalid, handle accordingly
        } else {
          // Show a generic error message
          alert("Error loading properties");
        }
      }
    };

    myPropertydata();
  }, []);
  console.log(properties,"properties")
  const [location, setLocation] = useState({ latitude: null, longitude: null });

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
  console.log(recommendProperty, "recommendProperty");
  return (
    <>
      <Header />

      <section className="flat-slider home-5">
        <div className="wrap-slider-swiper">
          <div className="swiper-container thumbs-swiper-column">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="box-img">
                  <img src={slider5} alt="images" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-img">
                  <img src={slider51} alt="images" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-img">
                  <img src={slider52} alt="images" />
                </div>
              </div>

              <div className="swiper-slide">
                <div className="box-img">
                  <img src={slider53} alt="images" />
                </div>
              </div>
            </div>
          </div>


          <div className="swiper-container thumbs-swiper-column1 swiper-pagination5">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="image-detail">
                  <img src={sliderpagi} alt="images" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="image-detail">
                  <img src={sliderpagi2} alt="images" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="image-detail">
                  <img src={sliderpagi3} alt="images" />
                </div>
              </div>
              <div className="swiper-slide">
                <div className="image-detail">
                  <img src={sliderpagi4} alt="images" />
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="container">
          <div className="row"></div>
        </div>
      </section>

      <section className="flat-filter-search home-5">
        <div className="container">
          <div className="flat-tab flat-tab-form">
            <ul className="nav-tab-form style-3" role="tablist">
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#forRent"
                  className="nav-link-item active"
                  data-bs-toggle="tab"
                >
                  For Rent
                </a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a
                  href="#forSale"
                  className="nav-link-item"
                  data-bs-toggle="tab"
                >
                  For Sale
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane fade active show" role="tabpanel">
                <div className="form-sl">
                  <form method="post">
                    <div className="wd-find-select shadow-st no-left-round">
                      <div className="inner-group">
                        <div className="form-group-1 search-form form-style">
                          <label>Keyword</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Keyword."
                            value=""
                            name="s"
                            title="Search for"
                            required=""
                          />
                        </div>
                        <div className="form-group-2 form-style">
                          <label>Location</label>
                          <div className="group-ip">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search Location"
                              value=""
                              name="s"
                              title="Search for"
                              required=""
                            />
                            <a className="icon icon-location"></a>
                          </div>
                        </div>
                        <div className="form-group-3 form-style">
                          <label>Type</label>
                          <div className="group-select">
                            <div className="nice-select" tabIndex="0">
                              <span className="current">All</span>
                              <ul className="list">
                                <li data-value className="option selected">
                                  All
                                </li>
                                <li data-value="villa" className="option">
                                  Villa
                                </li>
                                <li data-value="studio" className="option">
                                  Studio
                                </li>
                                <li data-value="office" className="option">
                                  Office
                                </li>
                                <li data-value="house" className="option">
                                  House
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="form-group-4 box-filter">
                          <a className="filter-advanced pull-right">
                            <span className="icon icon-faders"></span>
                            <span className="text-1">Advanced</span>
                          </a>
                        </div>
                      </div>
                      <button type="submit" className="tf-btn primary">
                        Search
                      </button>
                    </div>
                    <div className="wd-search-form">
                      <div className="grid-2 group-box group-price">
                        <div className="widget-price">
                          <div className="box-title-price">
                            <span className="title-price">Price Range</span>
                            <div className="caption-price">
                              <span>from</span>
                              <span
                                id="slider-range-value1"
                                className="fw-7"
                              ></span>
                              <span>to</span>
                              <span
                                id="slider-range-value2"
                                className="fw-7"
                              ></span>
                            </div>
                          </div>
                          <div id="slider-range"></div>
                          <div className="slider-labels">
                            <div>
                              <input type="hidden" name="min-value" value="" />
                              <input type="hidden" name="max-value" value="" />
                            </div>
                          </div>
                        </div>

                        <div className="widget-price">
                          <div className="box-title-price">
                            <span className="title-price">Size Range</span>
                            <div className="caption-price">
                              <span>from</span>
                              <span
                                id="slider-range-value01"
                                className="fw-7"
                              ></span>
                              <span>to</span>
                              <span
                                id="slider-range-value02"
                                className="fw-7"
                              ></span>
                            </div>
                          </div>
                          <div id="slider-range2"></div>
                          <div className="slider-labels">
                            <div>
                              <input type="hidden" name="min-value2" value="" />
                              <input type="hidden" name="max-value2" value="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid-2 group-box">
                        <div className="group-select grid-2">
                          <div className="box-select">
                            <label className="title-select text-variant-1">
                              Rooms
                            </label>
                            <div className="nice-select" tabIndex="0">
                              <span className="current">2</span>
                              <ul className="list">
                                <li data-value="1" className="option">
                                  1
                                </li>
                                <li data-value="2" className="option selected">
                                  2
                                </li>
                                <li data-value="3" className="option">
                                  3
                                </li>
                                <li data-value="4" className="option">
                                  4
                                </li>
                                <li data-value="5" className="option">
                                  5
                                </li>
                                <li data-value="6" className="option">
                                  6
                                </li>
                                <li data-value="7" className="option">
                                  7
                                </li>
                                <li data-value="8" className="option">
                                  8
                                </li>
                                <li data-value="9" className="option">
                                  9
                                </li>
                                <li data-value="10" className="option">
                                  10
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="box-select">
                            <label className="title-select text-variant-1">
                              Bathrooms
                            </label>
                            <div className="nice-select" tabIndex="0">
                              <span className="current">2</span>
                              <ul className="list">
                                <li data-value="1" className="option">
                                  1
                                </li>
                                <li data-value="2" className="option selected">
                                  2
                                </li>
                                <li data-value="3" className="option">
                                  3
                                </li>
                                <li data-value="4" className="option">
                                  4
                                </li>
                                <li data-value="5" className="option">
                                  5
                                </li>
                                <li data-value="6" className="option">
                                  6
                                </li>
                                <li data-value="7" className="option">
                                  7
                                </li>
                                <li data-value="8" className="option">
                                  8
                                </li>
                                <li data-value="9" className="option">
                                  9
                                </li>
                                <li data-value="10" className="option">
                                  10
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="group-select grid-2">
                          <div className="box-select">
                            <label className="title-select text-variant-1">
                              Bedrooms
                            </label>
                            <div className="nice-select" tabIndex="0">
                              <span className="current">2</span>
                              <ul className="list">
                                <li data-value="1" className="option">
                                  1
                                </li>
                                <li data-value="2" className="option selected">
                                  2
                                </li>
                                <li data-value="3" className="option">
                                  3
                                </li>
                                <li data-value="4" className="option">
                                  4
                                </li>
                                <li data-value="5" className="option">
                                  5
                                </li>
                                <li data-value="6" className="option">
                                  6
                                </li>
                                <li data-value="7" className="option">
                                  7
                                </li>
                                <li data-value="8" className="option">
                                  8
                                </li>
                                <li data-value="9" className="option">
                                  9
                                </li>
                                <li data-value="10" className="option">
                                  10
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="box-select">
                            <label className="title-select fw-5">Type</label>
                            <div className="nice-select" tabIndex="0">
                              <span className="current">2</span>
                              <ul className="list">
                                <li data-value="1" className="option">
                                  1
                                </li>
                                <li data-value="2" className="option selected">
                                  2
                                </li>
                                <li data-value="3" className="option">
                                  3
                                </li>
                                <li data-value="4" className="option">
                                  4
                                </li>
                                <li data-value="5" className="option">
                                  5
                                </li>
                                <li data-value="6" className="option">
                                  6
                                </li>
                                <li data-value="7" className="option">
                                  7
                                </li>
                                <li data-value="8" className="option">
                                  8
                                </li>
                                <li data-value="9" className="option">
                                  9
                                </li>
                                <li data-value="10" className="option">
                                  10
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-section-v5 flat-service-v5 bg-surface">
        <div className="container">
          <div
            className="box-title text-center wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <div className="text-subtitle text-primary">Our Services</div>
            <h4 className="mt-4">Welcome the Homeya</h4>
          </div>
          <div
            className="row wow fadeInUpSmall"
            data-wow-delay=".4s"
            data-wow-duration="2000ms"
          >
            <div className="box col-lg-4 col-md-6">
              <div className="box-service hover-btn-view style-3">
                <div className="icon-box">
                  <span className="icon icon-buy-home"></span>
                </div>
                <div className="content">
                  <h6 className="title">Buy A New Home</h6>
                  <p className="description">
                    Discover your dream home effortlessly. Explore diverse
                    properties and expert guidance for a seamless buying
                    experience.
                  </p>
                  <a className="btn-view style-1">
                    <span className="text">Learn More</span>{" "}
                    <span className="icon icon-arrow-right2"></span>{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="box col-lg-4 col-md-6">
              <div className="box-service hover-btn-view style-3 active">
                <div className="icon-box">
                  <span className="icon icon-rent-home"></span>
                </div>
                <div className="content">
                  <h6 className="title">Rent a home</h6>
                  <p className="description">
                    Discover your perfect rental effortlessly. Explore a diverse
                    variety of listings tailored precisely to suit your unique
                    lifestyle needs.
                  </p>
                  <a className="btn-view style-1">
                    <span className="text">Learn More</span>{" "}
                    <span className="icon icon-arrow-right2"></span>{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="box col-lg-4 col-md-6">
              <div className="box-service hover-btn-view style-3">
                <div className="icon-box">
                  <span className="icon icon-sale-home"></span>
                </div>
                <div className="content">
                  <h6 className="title">Sell a home</h6>
                  <p className="description">
                    Sell confidently with expert guidance and effective
                    strategies, showcasing your property's best features for a
                    successful sale.
                  </p>
                  <a className="btn-view style-1">
                    <span className="text">Learn More</span>{" "}
                    <span className="icon icon-arrow-right2"></span>{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="flat-section flat-recommended wow fadeInUpSmall"
        data-wow-delay=".2s"
        data-wow-duration="2000ms"
      >
        <div className="container">
          <div className="box-title style-2 text-center">
            <div className="text-subtitle text-primary">
              Featured Properties
            </div>
            <h4 className="mt-4">
              Discover Homeya's Finest Properties for Your Dream Home
            </h4>
          </div>
          <div className="row">
            {Array.isArray(properties) &&
              properties.map((property) => (
                <div className="col-xl-3 col-md-6" key={property.id}>
                  <div className="homeya-box md style-2">
                    <div className="archive-top">
                      <Link className="images-group">
                        <div className="images-style">
                          <img
                            src={`${API_BASE_URL}/${property.images[0].image1}`}
                            alt="img"
                          />
                        </div>
                        <div className="top">
                          <ul className="d-flex gap-8 flex-column">
                            <li className="flag-tag success">Featured</li>
                            <li className="flag-tag style-1">For Sale</li>
                          </ul>
                          <ul className="d-flex gap-4">
                            
                            <li className="box-icon w-32">
                            <FavoriteBorderIcon className="text-white"/>
                              
                            </li>
                            <li className="box-icon w-32">
                            <ShareIcon className="text-white"/>
                            </li>
                          </ul>
                        </div>
                        <div className="bottom">
                          <span className="flag-tag style-2">
                            {property.propertyType}
                          </span>
                        </div>
                      </Link>
                      <div className="content">
                        <div className="text-1 text-capitalize">
                          <Link
                            to={`/property_details/${property.id}`}
                            className="link"
                          >
                            {property.title.slice(0, 27)}
                          </Link>
                        </div>
                        <div className="desc">
                          <i className="fs-16 icon icon-mapPin"></i>
                          <p>{property.address}</p>{" "}
                        </div>
                        <ul className="meta-list">
                          <li className="item">
                            <i className="icon icon-bed"></i>
                            <span>{property.bedrooms}</span>
                          </li>
                          <li className="item">
                            <i className="icon icon-bathtub"></i>
                            <span>{property.bathrooms}</span>
                          </li>
                          <li className="item">
                            <i className="icon icon-ruler"></i>
                            <span>{property.propertySqft} SqFT</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="archive-bottom d-flex justify-content-between align-items-center">
                      <p>Price</p>
                      <div className="d-flex align-items-center">
                        <div className="h7 fw-7">₹{property.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center">
            <Link to="/properties" className="tf-btn primary size-1">
              View All Properties
            </Link>
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
                              <FavoriteBorderIcon />
                              </li>
                              <li className="box-icon w-52">
                              <ShareIcon />
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

      <section className="flat-benefit-v2">
        <div className="container">
          <div className="row wrap-benefit-v2">
            <div
              className="col-lg-4 wow fadeIn"
              data-wow-delay=".2s"
              data-wow-duration="2000ms"
            >
              <div className="box-left">
                <div className="box-title">
                  <div className="text-subtitle text-primary">Our Benifit</div>
                  <h4 className="mt-4 text-white">Why Choose Homeya</h4>
                </div>
                <p className="description text-white body-3">
                  Our seasoned team excels in real estate with years of
                  successful market navigation, offering informed decisions and
                  optimal results.
                </p>
                <div className="box-navigation">
                  <div className="navigation swiper-nav-next nav-next-benefit">
                    <span className="icon icon-arr-l"></span>
                  </div>
                  <div className="navigation swiper-nav-prev nav-prev-benefit">
                    <span className="icon icon-arr-r"></span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-8 wow fadeIn"
              data-wow-delay=".4s"
              data-wow-duration="2000ms"
            >
              <div className="swiper tf-sw-benefit">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="box-right">
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-proven"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>
                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-double-ruler"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>

                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-hand"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>

                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-hand"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>

                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="box-right">
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-proven"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>
                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-double-ruler"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>

                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-hand"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>

                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                      <div className="box-benefit style-1">
                        <div className="icon-box">
                          <span className="icon icon-hand"></span>
                        </div>
                        <div className="content">
                          <h6 className="title">
                            <a className="link">Proven Expertise</a>
                          </h6>

                          <p className="description">
                            Our seasoned team excels in real estate with years
                            of successful market navigation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-section flat-agents-v2">
        <div className="container">
          <div
            className="box-title wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <div className="text-subtitle text-primary">Our Teams</div>
            <h4 className="mt-4">Meet Our Agents</h4>
          </div>
          <div
            className="grid-2 gap-30 wow fadeInUpSmall"
            data-wow-delay=".4s"
            data-wow-duration="2000ms"
          >
            <div className="box-agent style-2 hover-img">
              <div className="box-img img-style">
                <img src={agent1} alt="image-agent" />
                <ul className="agent-social">
                  <li>
                    <a className="icon icon-facebook"></a>
                  </li>
                  <li>
                    <a className="icon icon-linkedin"></a>
                  </li>
                  <li>
                    <a className="icon icon-twitter"></a>
                  </li>
                  <li>
                    <a className="icon icon-instagram"></a>
                  </li>
                </ul>
              </div>
              <div className="content">
                <h6>
                  <a className="link"></a> Jack Halow
                </h6>
                <p className="mt-4 text-variant-1">CEO & Founder</p>
                <ul className="list-info">
                  <li>
                    <span className="icon icon-phone2"></span>+91 9994383121
                  </li>
                  <li>
                    <span className="icon icon-mail"></span>jackhalow@gmail.com
                  </li>
                  <li>
                    <span className="icon icon-mapPinLine"></span>No 101, South ushman Street, T-Nagr. 
                  </li>
                </ul>
                <Link to="/contact" className="tf-btn size-1">
                  Contact Agent
                </Link>
              </div>
            </div>
            <div className="box-agent style-2 hover-img">
              <div className="box-img img-style">
                <img src={agent2} alt="image-agent" />
                <ul className="agent-social">
                  <li>
                    <a className="icon icon-facebook"></a>
                  </li>
                  <li>
                    <a className="icon icon-linkedin"></a>
                  </li>
                  <li>
                    <a className="icon icon-twitter"></a>
                  </li>
                  <li>
                    <a className="icon icon-instagram"></a>
                  </li>
                </ul>
              </div>
              <div className="content">
                <h6>
                  <a className="link"></a> John Smith
                </h6>
                <p className="mt-4 text-variant-1">Property Manager</p>
                <ul className="list-info">
                  <li>
                    <span className="icon icon-phone2"></span>+91 9994383131
                  </li>
                  <li>
                    <span className="icon icon-mail"></span>johnsmith@gmail.com
                  </li>
                  <li>
                    <span className="icon icon-mapPinLine"></span>15/7 Old Post Office Road, Egmore.
                  </li>
                </ul>
                <Link to="/contact" className="tf-btn size-1">
                  Contact Agent
                </Link>
              </div>
            </div>
            <div className="box-agent style-2 hover-img">
              <div className="box-img img-style">
                <img src={agent3} alt="image-agent" />
                <ul className="agent-social">
                  <li>
                    <a className="icon icon-facebook"></a>
                  </li>
                  <li>
                    <a className="icon icon-linkedin"></a>
                  </li>
                  <li>
                    <a className="icon icon-twitter"></a>
                  </li>
                  <li>
                    <a className="icon icon-instagram"></a>
                  </li>
                </ul>
              </div>
              <div className="content">
                <h6>
                  <a className="link"></a> Chris Patt
                </h6>
                <p className="mt-4 text-variant-1">Administrative Staff</p>
                <ul className="list-info">
                  <li>
                    <span className="icon icon-phone2"></span>+91 9994383141
                  </li>
                  <li>
                    <span className="icon icon-mail"></span>chrispatt@gmail.com
                  </li>
                  <li>
                    <span className="icon icon-mapPinLine"></span>7,Krish Appertment, Rayapetta.
                  </li>
                </ul>
                <Link to="/contact" className="tf-btn">
                  Contact Agent
                </Link>
              </div>
            </div>
            <div className="box-agent style-2 hover-img">
              <div className="box-img img-style">
                <img src={agent4} alt="image-agent" />
                <ul className="agent-social">
                  <li>
                    <a className="icon icon-facebook"></a>
                  </li>
                  <li>
                    <a className="icon icon-linkedin"></a>
                  </li>
                  <li>
                    <a className="icon icon-twitter"></a>
                  </li>
                  <li>
                    <a className="icon icon-instagram"></a>
                  </li>
                </ul>
              </div>
              <div className="content">
                <h6>
                  <a className="link"></a> Jack Halow
                </h6>
                <p className="mt-4 text-variant-1">Real Estate Marketer</p>
                <ul className="list-info">
                  <li>
                    <span className="icon icon-phone2"></span>+91 9994383151
                  </li>
                  <li>
                    <span className="icon icon-mail"></span>jackhalow@gmail.com
                  </li>
                  <li>
                    <span className="icon icon-mapPinLine"></span> 56/1 , Appasamy Apartment, Mylapour.
                  </li>
                </ul>
                <Link to="/contact" className="tf-btn size-1">
                  Contact Agent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-section flat-latest-new-v2">
        <div className="container">
          <div
            className="box-title wow fadeInUpSmall"
            data-wow-delay=".2s"
            data-wow-duration="2000ms"
          >
            <div className="text-subtitle text-primary">Latest New</div>
            <h4 className="mt-4">The Most Recent Estate</h4>
          </div>
          <div
            className="row wow fadeInUpSmall"
            data-wow-delay=".4s"
            data-wow-duration="2000ms"
          >
            <div className="box col-lg-3 col-sm-6">
              <a href="" className="flat-blog-item hover-img style-1">
                <div className="img-style">
                  <img src={blog10} alt="img-blog" />
                </div>
                <div className="content-box">
                  <span className="date-post">January 28, 2024</span>
                  <div className="title h7 fw-7 link">
                    Building gains into housing stocks...
                  </div>
                  <div className="post-author">
                    <span className="fw-5">Jerome Bell</span>
                    <span>Furniture</span>
                  </div>
                </div>
              </a>
            </div>
            <div className="box col-lg-3 col-sm-6">
              <a href="" className="flat-blog-item hover-img style-1">
                <div className="img-style">
                  <img src={blog11} alt="img-blog" />
                </div>
                <div className="content-box">
                  <span className="date-post">January 28, 2024</span>
                  <div className="title h7 fw-7 link">
                    92% of millennial home buyers say inflation...
                  </div>
                  <div className="post-author">
                    <span className="fw-5">Jerome Bell</span>
                    <span>Furniture</span>
                  </div>
                </div>
              </a>
            </div>
            <div className="box col-lg-3 col-sm-6">
              <a href="" className="flat-blog-item hover-img style-1">
                <div className="img-style">
                  <img src={blog12} alt="img-blog" />
                </div>
                <div className="content-box">
                  <span className="date-post">January 28, 2024</span>
                  <div className="title h7 fw-7 link">
                    We are hiring moderately, says Compass CEO...
                  </div>
                  <div className="post-author">
                    <span className="fw-5">Jerome Bell</span>
                    <span>Furniture</span>
                  </div>
                </div>
              </a>
            </div>
            <div className="box col-lg-3 col-sm-6">
              <a href="" className="flat-blog-item hover-img style-1">
                <div className="img-style">
                  <img src={blog13} alt="img-blog" />
                </div>
                <div className="content-box">
                  <span className="date-post">January 28, 2024</span>
                  <div className="title h7 fw-7 link">
                    Building gains into housing stocks and how...
                  </div>
                  <div className="post-author">
                    <span className="fw-5">Jerome Bell</span>
                    <span>Furniture</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
