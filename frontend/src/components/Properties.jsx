import { React,useState,useContext  ,useEffect} from 'react'
import house1 from "../assets/images/home/house-1.jpg"
import avatar6 from "../assets/images/avatar/avt-6.jpg";
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {API_BASE_URL } from '../context/data';

import ShareIcon from '@mui/icons-material/Share';
// import SmoothSharePopup from './SmoothSharePopup';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AuthContext from '../context/AuthContext';
import Swal from 'sweetalert2';
const Properties = () => {
    const [contactsllerssuccessMessage, setContactsllerssuccessMessage] = useState("");
    const [favorites, setFavorites] = useState([]);
    const { isAuthenticated,userData, logout } = useContext(AuthContext);
    const [properties, useProperties] = useState({});
    const [showAlert, setShowAlert] = useState(true); // Initially show the alert
    const accessToken = localStorage.getItem('accessToken');




    
  useEffect(() => {
    const myPropertydata = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/properties/`, {});

        if (response.status === 200) {
          useProperties(response.data);
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
  
      // Toggle favorite status
      const toggleFavorite = (propertyId) => {
        if (favorites.includes(propertyId)) {
            // Unlike (Remove from favorites)
            const response =  axios.delete(`${API_BASE_URL}/favorite_property/${propertyId}`,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Include any necessary authorization headers, e.g.:
                    'Authorization': `Bearer ${accessToken}`
                }})
                if (response.status === 204  ){
                    console.log("fgrggg")
                    
                }else{
                    console.log("fgrggg")
                  
                }
        } else {
            // Like (Add to favorites)
           const response = axios.post(`${API_BASE_URL}/favorite_property/`, { propertyId },{
            headers: {
                'Content-Type': 'multipart/form-data',
                // Include any necessary authorization headers, e.g.:
                'Authorization': `Bearer ${accessToken}`
              }
           })
                if (response.status === 200){
                    console.log("fgrggg")
                    setFavorites([...favorites, propertyId]);
                }else if(response.status === 201){
                    console.log("fgrggg")
                    setFavorites([...favorites, propertyId]);
                }
                
                
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
  

  return (
    <>
    <Header/>
       <section className="flat-section-v6 flat-recommended flat-sidebar">
                <div className="container-fluied">
                    <div className="box-title-listing">
                        <h5>Property listing</h5>
                        <div className="box-filter-tab">
                            <ul className="nav-tab-filter" role="tablist">
                                <li className="nav-tab-item" role="presentation">   
                                    <a href="#gridLayout" className="nav-link-item active" data-bs-toggle="tab"><i className="icon icon-grid"></i></a>
                                </li>
                                <li className="nav-tab-item" role="presentation">
                                    <a href="#listLayout" className="nav-link-item" data-bs-toggle="tab"><i className="icon icon-list"></i></a>
                                </li>
                            </ul>
                            <div className="nice-select list-page" tabIndex="0"><span className="current">12 Per Page</span>
                                <ul className="list">  
                                    <li data-value="1" className="option">10 Per Page</li>                                                        
                                    <li data-value="2" className="option">11 Per Page</li>
                                    <li data-value="3" className="option selected">12 Per Page</li>
                                </ul>
                            </div>
                            <div className="nice-select list-sort" tabIndex="0"><span className="current">Sort by (Default)</span>
                                <ul className="list">  
                                    <li data-value="default" className="option selected">Sort by (Default)</li>                                                        
                                    <li data-value="new" className="option">Newest</li>
                                    <li data-value="old" className="option">Oldest</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 ">
                            <div className="widget-sidebar fixed-sidebar">
                                <div className="flat-tab flat-tab-form widget-filter-search widget-box bg-surface">
                                    <div className="h7 title fw-7">Search</div>
                                   
                                    <div className="tab-content">
                                        <div className="tab-pane fade active show" role="tabpanel">
                                            <div className="form-sl">
                                                <form >
                                                    <div className="wd-filter-select">
                                                        <div className="inner-group inner-filter">
                                                            <div className="form-style">
                                                                <label className="title-select">Keyword</label>
                                                                <input type="text" className="form-control" placeholder="Search Keyword." name="s" title="Search for" required/>
                                                            </div>
                                                            <div className="form-style">
                                                                <label className="title-select">Location</label>
                                                                <div className="group-ip ip-icon">
                                                                    <input type="text" className="form-control" placeholder="Search Location" value="" name="s" title="Search for" required=""/>
                                                                    <a  className="icon-right icon-location"></a>
                                                                </div>
                                                            </div>
                                                            <div className="form-style">
                                                                <label className="title-select">Type</label>
                                                                <div className="group-select">
                                                                    <div className="nice-select" tabIndex="0"><span className="current">All</span>
                                                                        <ul className="list">  
                                                                            <li data-value className="option selected">All</li>                                                        
                                                                            <li data-value="villa" className="option">Villa</li>
                                                                            <li data-value="studio" className="option">Studio</li>
                                                                            <li data-value="office" className="option">Office</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>                                                    
                                                            </div>
                                                            <div className="form-style box-select">
                                                                <label className="title-select">Rooms</label>
                                                                <div className="nice-select" tabIndex="0"><span className="current">2</span>
                                                                    <ul className="list"> 
                                                                        <li data-value="2" className="option">1</li>
                                                                        <li data-value="2" className="option selected">2</li>
                                                                        <li data-value="3" className="option">3</li>
                                                                        <li data-value="4" className="option">4</li>
                                                                        <li data-value="5" className="option">5</li>
                                                                        <li data-value="6" className="option">6</li>
                                                                        <li data-value="7" className="option">7</li>
                                                                        <li data-value="8" className="option">8</li>
                                                                        <li data-value="9" className="option">9</li>
                                                                        <li data-value="10" className="option">10</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="form-style box-select">
                                                                <label className="title-select">Bathrooms</label>
                                                                <div className="nice-select" tabIndex="0"><span className="current">4</span>
                                                                    <ul className="list"> 
                                                                        <li data-value="all" className="option">All</li>
                                                                        <li data-value="1" className="option">1</li>
                                                                        <li data-value="2" className="option">2</li>
                                                                        <li data-value="3" className="option">3</li>
                                                                        <li data-value="4" className="option selected">4</li>
                                                                        <li data-value="5" className="option">5</li>
                                                                        <li data-value="6" className="option">6</li>
                                                                        <li data-value="7" className="option">7</li>
                                                                        <li data-value="8" className="option">8</li>
                                                                        <li data-value="9" className="option">9</li>
                                                                        <li data-value="10" className="option">10</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="form-style box-select">
                                                                <label className="title-select">Bedrooms</label>
                                                                <div className="nice-select" tabIndex="0"><span className="current">4</span>
                                                                    <ul className="list"> 
                                                                        <li data-value="1" className="option">All</li>
                                                                        <li data-value="1" className="option">1</li>
                                                                        <li data-value="2" className="option">2</li>
                                                                        <li data-value="3" className="option">3</li>
                                                                        <li data-value="4" className="option selected">4</li>
                                                                        <li data-value="5" className="option">5</li>
                                                                        <li data-value="6" className="option">6</li>
                                                                        <li data-value="7" className="option">7</li>
                                                                        <li data-value="8" className="option">8</li>
                                                                        <li data-value="9" className="option">9</li>
                                                                        <li data-value="10" className="option">10</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="form-style widget-price">
                                                                <div className="box-title-price">
                                                                    <span className="title-price">Price Range</span>
                                                                        <div className="caption-price">
                                                                            <span>from</span>
                                                                            <span id="slider-range-value1" className="fw-7"></span>
                                                                            <span>to</span>
                                                                            <span id="slider-range-value2" className="fw-7"></span>
                                                                        </div>
                                                                </div>
                                                                <div id="slider-range"></div>
                                                                <div className="slider-labels">
                                                                    <input type="hidden" name="min-value" value=""/>
                                                                    <input type="hidden" name="max-value" value=""/>                                                                                  
                                                                </div>
                                                            </div>
                                                            <div className="form-style widget-price wd-price-2">
                                                                <div className="box-title-price">
                                                                    <span className="title-price">Size Range</span>
                                                                    <div className="caption-price">
                                                                        <span>from</span>
                                                                        <span id="slider-range-value01" className="fw-7"></span>
                                                                        <span>to</span>
                                                                        <span id="slider-range-value02" className="fw-7"></span>
                                                                    </div>
                                                                </div>
                                                                <div id="slider-range2"></div>
                                                                <div className="slider-labels">
                                                                    <input type="hidden" name="min-value2" value=""/>
                                                                    <input type="hidden" name="max-value2" value=""/>      
                                                                </div>
                                                            </div>
                                                            <div className="form-style btn-show-advanced">
                                                                <a className="filter-advanced pull-right">
                                                                     <span className="icon icon-faders"></span> 
                                                                     <span className="text-advanced">Show Advanced</span>                                                                      
                                                                </a>
                                                            </div>
                                                            <div className="form-style wd-amenities">
                                                                <div className="group-checkbox">
                                                                    <div className="text-1">Amenities:</div>
                                                                    <div className="group-amenities">
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb1" checked/> 
                                                                            <label htmlFor="cb1" className="text-cb-amenities">Air Condition</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb2"/> 
                                                                            <label htmlFor="cb2" className="text-cb-amenities">Disabled Access</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb3"/> 
                                                                            <label htmlFor="cb3" className="text-cb-amenities">Ceiling Height</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb4" checked/> 
                                                                            <label htmlFor="cb4" className="text-cb-amenities">Floor</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb5"/> 
                                                                            <label htmlFor="cb5" className="text-cb-amenities">Heating</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb6"/> 
                                                                            <label htmlFor="cb6" className="text-cb-amenities">Renovation</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb7"/> 
                                                                            <label htmlFor="cb7" className="text-cb-amenities">Window Type</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb8"/> 
                                                                            <label htmlFor="cb8" className="text-cb-amenities">Cable TV</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb9" checked/> 
                                                                            <label htmlFor="cb9" className="text-cb-amenities">Elevator</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb10"/> 
                                                                            <label htmlFor="cb10" className="text-cb-amenities">Furnishing</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb11"/> 
                                                                            <label htmlFor="cb11" className="text-cb-amenities">Intercom</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb12"/> 
                                                                            <label htmlFor="cb12" className="text-cb-amenities">Security</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb13"/> 
                                                                            <label htmlFor="cb13" className="text-cb-amenities">Search property</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb14"/> 
                                                                            <label htmlFor="cb14" className="text-cb-amenities">Ceiling Height</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb15"/> 
                                                                            <label htmlFor="cb15" className="text-cb-amenities">Fence</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb16"/> 
                                                                            <label htmlFor="cb16" className="text-cb-amenities">Fence</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb17" checked/> 
                                                                            <label htmlFor="cb17" className="text-cb-amenities">Garage</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb18"/> 
                                                                            <label htmlFor="cb18" className="text-cb-amenities">Parking</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb19"/> 
                                                                            <label htmlFor="cb19" className="text-cb-amenities">Swimming Pool</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb20"/> 
                                                                            <label htmlFor="cb20" className="text-cb-amenities">Construction Year</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb21"/> 
                                                                            <label htmlFor="cb21" className="text-cb-amenities">Fireplace</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb22"/> 
                                                                            <label htmlFor="cb22" className="text-cb-amenities">Garden</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb23"/> 
                                                                            <label htmlFor="cb23" className="text-cb-amenities">Pet Friendly</label>
                                                                        </fieldset>
                                                                        <fieldset className="amenities-item">
                                                                            <input type="checkbox" className="tf-checkbox style-1" id="cb24"/> 
                                                                            <label htmlFor="cb24" className="text-cb-amenities">WiFi</label>
                                                                        </fieldset>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="form-style btn-hide-advanced">
                                                                <a className="filter-advanced pull-right">
                                                                     <span className="icon icon-faders"></span> 
                                                                     <span className="text-advanced">Hide Advanced</span>                                                                      
                                                                </a>
                                                            </div>
                                                            <div className="form-style">
                                                                <button type="submit" className="tf-btn primary" >Find Properties</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                               
                            </div>
                            
                        </div>
                        <div className="col-xl-8 col-lg-8">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="gridLayout" role="tabpanel">
                                <div className="row">
            {Array.isArray(properties) && properties.map((property) => (
                <div className="col-xl-4 col-lg-6" key={property.id}>
                    <div className="homeya-box">
                        <div className="archive-top">
                            <a className="images-group">
                                <div className="images-style">
                                    <img src={`${API_BASE_URL}/${property.images[0].image1}`} alt="img" />
                                </div>
                                <div className="top">
                                    <ul className="d-flex gap-8">
                                        <li className="flag-tag success">For Sale</li>
                                    </ul>
                                    <ul className="d-flex gap-4">
                                        <li className="box-icon w-32" onClick={() => toggleFavorite(property.id)}>
                                            {favorites.includes(property.id) ? (
                                                <FavoriteBorderIcon className="text-white" style={{ color: 'red' }} />
                                            ) : (
                                                <FavoriteBorderIcon className="text-white" />
                                            )}
                                        </li>
                                        <li className="box-icon w-32">
                                            <div onClick={handleShareClick} className="cursor-pointer">
                                                <ShareIcon className="text-white" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bottom">
                                    <span className="flag-tag style-2"> {property.propertyType}</span>
                                </div>
                            </a>
                            <div className="content">
                                <div className="h7 text-capitalize fw-7">
                                    <a className="link">
                                        <Link
                                            to={`/property_details/${property.id}`}
                                            className="link"
                                        >
                                            {property.title.slice(0, 35)}
                                        </Link>
                                    </a>
                                </div>
                                <div className="desc"><i className="fs-16 icon icon-mapPin"></i><p> {property.address}</p></div>
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
                                        <span>{property.propertySqft}SqFT</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="archive-bottom d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-8 align-items-center">
                                <div className="avatar avt-40 round">
                                    <img src={`${API_BASE_URL}${property.seller.profilePicture}`} alt="avt" />
                                </div>
                                <span>{property.seller.full_name}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <h6>₹{property.price}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
                                    <ul className="wd-navigation">
                                        <li><a  className="nav-item active">1</a></li>
                                        <li><a  className="nav-item">2</a></li>
                                        <li><a  className="nav-item">3</a></li>
                                        <li><a  className="nav-item"><i className="icon icon-arr-r"></i></a></li>
                                    </ul>
                                </div>
                               
                            </div> 
                        </div>
                    </div>

                    
                    
                </div>
        </section>
    <Footer/>
    </>
  )
}

export default Properties
