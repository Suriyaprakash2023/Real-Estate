import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import imgvideo from "../assets/images/banner/img-video.jpg";
import avatar5 from "../assets/images/avatar/avt-5.jpg"; 
import avatar7 from "../assets/images/avatar/avt-7.jpg"; 
import agent1 from "../assets/images/agents/agent-lg-1.jpg"; 
import agent2 from "../assets/images/agents/agent-lg-2.jpg";
import agent3 from "../assets/images/agents/agent-lg-3.jpg"; 
import banner from "../assets/images/banner/banner.png";
const About = () => {
  return (
    <>
      <Header />
      <section className="flat-title-page style-2">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>/ About Us</li>
          </ul>
          <h2 className="text-center">About The Homzen</h2>
        </div>
      </section>

      <section className="flat-section flat-banner-about">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h3>
                Welcome To The <br />
                Homzen
              </h3>
            </div>
            <div className="col-md-7 hover-btn-view">
              <p className="body-2 text-variant-1">
                Welcome to Homeya, where we turn houses into homes and dreams
                into reality. At Homeya, we understand that a home is more than
                just a physical space; it's a place where memories are created,
                families grow, and life unfolds.
              </p>
              <a href="#" className="btn-view style-1">
                <span className="text">Learn More</span>
                <span className="icon icon-arrow-right2"></span>
              </a>
            </div>
          </div>
          <div className="banner-video">
            <img src={imgvideo} alt="img-video" />
            <a
              href="https://youtu.be/MLpWrANjFbI"
              data-fancybox="gallery2"
              className="btn-video"
            >
              <span className="icon icon-play"></span>
            </a>
          </div>
        </div>
      </section>

      <section className="flat-section-v3 flat-service-v2 bg-surface">
        <div className="container">
          <div className="row wrap-service-v2">
            <div className="col-lg-6">
              <div className="box-left">
                <div className="box-title">
                  <div className="text-subtitle text-primary">
                    Why Choose Us
                  </div>
                  <h4 className="mt-4">
                    Discover What Sets Our Real Estate Expertise Apart
                  </h4>
                </div>
                <p>
                  At Homeya, our unwavering commitment lies in crafting
                  unparalleled real estate journeys. Our seasoned professionals,
                  armed with extensive market knowledge, walk alongside you
                  through every phase of your property endeavor. We prioritize
                  understanding your unique aspirations, tailoring our expertise
                  to match your vision.
                </p>
                <ul className="list-view">
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z"
                        fill="#198754"
                      />
                      <path
                        d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z"
                        fill="white"
                      />
                    </svg>
                    Transparent Partnerships
                  </li>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z"
                        fill="#198754"
                      />
                      <path
                        d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z"
                        fill="white"
                      />
                    </svg>
                    Proven Expertise
                  </li>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z"
                        fill="#198754"
                      />
                      <path
                        d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z"
                        fill="white"
                      />
                    </svg>
                    Customized Solutions
                  </li>
                  <li>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 15.9947C12.4183 15.9947 16 12.4154 16 8C16 3.58462 12.4183 0.00524902 8 0.00524902C3.58172 0.00524902 0 3.58462 0 8C0 12.4154 3.58172 15.9947 8 15.9947Z"
                        fill="#198754"
                      />
                      <path
                        d="M7.35849 12.2525L3.57599 9.30575L4.65149 7.9255L6.97424 9.735L10.8077 4.20325L12.2462 5.19975L7.35849 12.2525Z"
                        fill="white"
                      />
                    </svg>
                    Local Area Knowledge
                  </li>
                </ul>
                <a href="contact.html" className="btn-view">
                  <span className="text">Contact Us</span>
                  <span className="icon icon-arrow-right2"></span>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="box-right">
                <div className="box-service style-1 hover-btn-view">
                  <div className="icon-box">
                    <span className="icon icon-buy-home"></span>
                  </div>
                  <div className="content">
                    <h6 className="title">Buy A New Home</h6>
                    <p className="description">
                      Explore diverse properties and expert guidance for a
                      seamless buying experience.
                    </p>
                    <a href="#" className="btn-view style-1">
                      <span className="text">Learn More</span>
                      <span className="icon icon-arrow-right2"></span>
                    </a>
                  </div>
                </div>
                <div className="box-service style-1 hover-btn-view">
                  <div className="icon-box">
                    <span className="icon icon-rent-home"></span>
                  </div>
                  <div className="content">
                    <h6 className="title">Rent a home</h6>
                    <p className="description">
                      Explore a diverse variety of listings tailored precisely
                      to suit your unique lifestyle needs.
                    </p>
                    <a href="#" className="btn-view style-1">
                      <span className="text">Learn More</span>
                      <span className="icon icon-arrow-right2"></span>
                    </a>
                  </div>
                </div>
                <div className="box-service style-1 hover-btn-view">
                  <div className="icon-box">
                    <span className="icon icon-sale-home"></span>
                  </div>
                  <div className="content">
                    <h6 className="title">Sell a home</h6>
                    <p className="description">
                      Showcasing your property's best features for a successful
                      sale.
                    </p>
                    <a href="#" className="btn-view style-1">
                      <span className="text">Learn More</span>
                      <span className="icon icon-arrow-right2"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-section-v3 flat-slider-contact">
        <div className="container">
          <div className="row content-wrap">
            <div className="col-lg-7">
              <div className="content-left">
                <div className="box-title">
                  <div className="text-subtitle text-white">Contact Us</div>
                  <h4 className="mt-4 fw-6 text-white">
                    We're always eager to hear from you!
                  </h4>
                </div>
                <p className="body-2 text-white">
                  Sed ullamcorper nulla egestas at. Aenean eget tortor nec elit
                  sagittis molestie. Pellentesque tempus massa in.r nulla
                  egestas at. Aenean eget tortor nec elit sagittis mole
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <form action="#" className="box-contact-v2">
                <div className="box">
                  <label htmlFor="name" className="label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value="Tony Nguyen |"
                  />
                </div>
                <div className="box">
                  <label htmlFor="email" className="label">
                    Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value="hi.themesflat@mail.com"
                  />
                </div>
                <div className="box">
                  <label htmlFor="message" className="label">
                    Message:
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    cols="30"
                    rows="10"
                    placeholder="Write comment"
                  ></textarea>
                </div>
                <div className="box">
                  <button className="tf-btn primary">Contact US</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </section>

      <section className="flat-section flat-agents">
        <div className="container">
          <div className="box-title text-center">
            <div className="text-subtitle text-primary">Our Teams</div>
            <h4 className="mt-4">Meet Our Agents</h4>
          </div>
          <div className="row">
            <div className="box col-lg-4 col-sm-6">
              <div className="box-agent style-1 hover-img">
                <div className="box-img img-style">
                  <img src={agent1} alt="image-agent" />
                  <ul className="agent-social">
                    <li>
                      <a href="#" className="icon icon-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-linkedin"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-instagram"></a>
                    </li>
                  </ul>
                </div>
                <a href="#" className="content">
                  <div className="info">
                    <h6 className="link">Jack Halow</h6>
                    <p className="mt-4 text-variant-1">CEO & Founder</p>
                  </div>
                  <span className="icon-phone"></span>
                </a>
              </div>
            </div>
            <div className="box col-lg-4 col-sm-6">
              <div className="box-agent style-1 hover-img">
                <div className="box-img img-style">
                  <img src={agent2} />
                  <ul className="agent-social">
                    <li>
                      <a href="#" className="icon icon-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-linkedin"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-instagram"></a>
                    </li>
                  </ul>
                </div>
                <a href="#" className="content">
                  <div className="info">
                    <h6 className="link">John Smith</h6>
                    <p className="mt-4 text-variant-1">Property Manager</p>
                  </div>
                  <span className="icon-phone"></span>
                </a>
              </div>
            </div>
            <div className="box col-lg-4 col-sm-6">
              <div className="box-agent style-1 hover-img">
                <div className="box-img img-style">
                  <img src={agent3} alt="image-agent" />
                  <ul className="agent-social">
                    <li>
                      <a href="#" className="icon icon-facebook"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-linkedin"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="icon icon-instagram"></a>
                    </li>
                  </ul>
                </div>
                <a href="#" className="content">
                  <div className="info">
                    <h6 className="link">Chris Patt</h6>
                    <p className="mt-4 text-variant-1">Administrative Staff</p>
                  </div>
                  <span className="icon-phone"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-section pt-0 flat-banner">
        <div className="container">
          <div className="wrap-banner bg-surface">
            <div className="box-left">
              <div className="box-title">
                <div className="text-subtitle text-primary">
                  Become Partners
                </div>
                <h4 className="mt-4">
                  List your Properties on Homeya, join Us Now!
                </h4>
              </div>
              <a href="#" className="tf-btn primary size-1">
                Become A Hosting
              </a>
            </div>
            <div className="box-right">
              <img src={banner}alt="image" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
