import React from 'react';
import logo from "../assets/images/logo/logo-footer@2x.png";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
      
        <footer className="footer">
          <div className="top-footer">
            <div className="container">
              <div className="content-footer-top">
                <div className="footer-logo">
                  <img
                    src={logo}
                    alt="logo-footer"
                    width="174"
                    height="44"
                  />
                </div>
                <div className="wd-social">
                  <span>Follow Us:</span>
                  <ul className="list-social d-flex align-items-center">
                    <li>
                      <a  className="box-icon w-40 social"
                        ><i className="icon icon-facebook"></i
                      ></a>
                    </li>
                    <li>
                      <a  className="box-icon w-40 social"
                        ><i className="icon icon-linkedin"></i
                      ></a>
                    </li>
                    <li>
                      <a  className="box-icon w-40 social">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_748_6323)">
                            <path
                              d="M9.4893 6.77491L15.3176 0H13.9365L8.87577 5.88256L4.8338 0H0.171875L6.28412 8.89547L0.171875 16H1.55307L6.8973 9.78782L11.1659 16H15.8278L9.48896 6.77491H9.4893ZM7.59756 8.97384L6.97826 8.08805L2.05073 1.03974H4.17217L8.14874 6.72795L8.76804 7.61374L13.9371 15.0075H11.8157L7.59756 8.97418V8.97384Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_748_6323">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a  className="box-icon w-40 social"
                        ><i className="icon icon-pinterest"></i
                      ></a>
                    </li>
                   
                    <li>
                      <a  className="box-icon w-40 social">
                        <i className="icon icon-youtube"></i>
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="inner-footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-cl-1">
                    <p className="text-variant-2">
                      Specializes in providing high-class tours for those in
                      need. Contact Us
                    </p>
                    <ul className="mt-12">
                      <li className="mt-12 d-flex align-items-center gap-8">
                        <i
                          className="icon icon-mapPinLine fs-20 text-variant-2"
                        ></i>
                        <p className="text-white">
                          101 E 129th St, Chennai, IN 46312, India                   </p>
                      </li>
                      <li className="mt-12 d-flex align-items-center gap-8">
                        <i className="icon icon-phone2 fs-20 text-variant-2"></i>
                        <a
                          href="tel:1-333-345-6868"
                          className="text-white caption-1"
                          >+91 999435381</a
                        >
                      </li>
                      <li className="mt-12 d-flex align-items-center gap-8">
                        <i className="icon icon-mail fs-20 text-variant-2"></i>
                        <p className="text-white">homzen@gmail.com</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-6">
                  <div className="footer-cl-2">
                    <div className="fw-7 text-white">Categories</div>
                    <ul className="mt-10 navigation-menu-footer">
                      <li>
                        <a  className="caption-1 text-variant-2"
                          >Pricing Plans</a
                        >
                      </li>

                      <li>
                        <a
                          
                          className="caption-1 text-variant-2"
                          >Our Services</a
                        >
                      </li>

                      <li>
                        <Link to="/about" className="caption-1 text-variant-2">
                          About Us
                        </Link>
                      </li>

                      <li>
                        <Link to='/contact' className="caption-1 text-variant-2">
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <div className="footer-cl-3">
                    <div className="fw-7 text-white">Our Company</div>
                    <ul className="mt-10 navigation-menu-footer">
                      <li>
                        <Link to="/properties" className="caption-1 text-variant-2">
                          Property For Sale
                        </Link>
                      </li>

                      <li>
                        <a
                         
                          className="caption-1 text-variant-2"
                          >Property For Rent</a
                        >
                      </li>
                      <li>
                        <a
                         
                          className="caption-1 text-variant-2"
                          >Property For Buy</a
                        >
                      </li>
                      <li>
                        <a
                         
                          className="caption-1 text-variant-2"
                          >Our Agents</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="footer-cl-4">
                    <div className="fw-7 text-white">
                      Newsletter
                    </div>
                    <p className="mt-12 text-variant-2">
                      Your Weekly/Monthly Dose of Knowledge and Inspiration
                    </p>
                    <form
                      className="mt-12"
                      id="subscribe-form"
                      action="#"
                      method="post"
                      data-mailchimp="true"
                    >
                      <div id="subscribe-content">
                        <span className="icon-left icon-mail"></span>
                        <input
                          type="email"
                          name="email-form"
                          id="subscribe-email"
                          placeholder="Your email address"
                        />
                        <button
                          type="button"
                          id="subscribe-button"
                          className="button-subscribe"
                        >
                          <i className="icon icon-send"></i>
                        </button>
                      </div>
                      <div id="subscribe-msg"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-footer">
            <div className="container">
              <div className="content-footer-bottom">
                <div className="copyright">©2024 Homzen. All Rights Reserved.</div>

                <ul className="menu-bottom">
                  <li><a >Terms Of Services</a></li>

                  <li><a>Privacy Policy</a></li>
                  <li><a >Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      
    </>
  )
}

export default Footer
