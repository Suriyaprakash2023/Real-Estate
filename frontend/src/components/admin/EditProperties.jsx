import Header from '../Header'
import DashboardSideNav from '../DashboardSideNav'
import {API_BASE_URL} from '../../context/data';
import {useState} from 'react';
import { useParams, useLocation,useNavigate } from 'react-router-dom';

import axios from 'axios';
const EditProperties = () => {
  const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); // Provides access to the full URL

  // Use URLSearchParams to extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
    const [selectedFiles, setSelectedFiles] = useState(null);

    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        price: 0.00,
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        latitude: '',
        longitude: '',
        locations: '',
        propertyType: '',
        bedrooms: 0,
        bathrooms: 0,
        garages: 0,
        totalSqft: 0,
        propertySqft: 0,
        yearBuilt: '',
        propertyStatus: '',
        virtual_tour_url: '',
        features: {},
        nearbySchool: '',
        nearbyUniversity: '',
        nearbyGrocery: '',
        nearbyMarket: '',
        nearbyHospital: '',
        nearbyMetro: '',
        nearbyGym: '',
        nearbyPark: '',
        image1:null,
        image2:null,
        image3:null,
        image4:null,
        image5:null,
        floorPlan:null,
        document1:null,
        document2:null,
    });


    const handleInputChange = (e) => {
        const { name, value, type, checked,id } = e.target;
        if (name === 'features') {
            setPropertyData(prevState => ({
                ...prevState,
                features: {
                    ...prevState.features,
                    [id]: checked  // Use the checkbox id as key and its checked state as the value
                }
            }));
        } else {
            setPropertyData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleFileChange = (e)=>{
        setPropertyData({
            ...propertyData,
            [e.target.name]:e.target.files[0]
        });

        
      }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append file data
        formData.append('image1',propertyData.image1);
        formData.append("image2",propertyData.image2);
        formData.append("image3",propertyData.image3);
        formData.append("image4",propertyData.image4);
        formData.append("image5",propertyData.image5);
        formData.append('floorPlan', propertyData.floorPlan);
        formData.append('document1', propertyData.document1);
        formData.append('document2', propertyData.document2);


        // Append other form data
        Object.keys(propertyData).forEach(key => {
            if (key === 'features') {
                formData.append(key, JSON.stringify(propertyData[key]));
            } else {
                formData.append(key, propertyData[key]);
            }
        });

       
        try {
            const accessToken = localStorage.getItem('accessToken'); // Assuming you're storing the token in localStorage

            const response = await axios.post(`${API_BASE_URL}/add_property/`, formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data' 
                }
            });

            if (response.status === 201) {
                console.log('Success:', response.data);
                navigate('/my_properties')
                // Handle success (e.g., show a success message, redirect)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message)
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
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="button-show-hide show-mb">
                                <span className="body-1">Show Dashboard</span>
                            </div>
                            <div className="widget-box-2">

                                <h6 className="title">Upload Images </h6>

                                <div className="box grid-2 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">
                                        Image 1:<span>*</span>
                                        </label>
                                        <input type="file" name='image1' onChange={handleFileChange} className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bathrooms">
                                        Image 2:<span>*</span>
                                        </label>
                                        <input type="file" name='image2' onChange={handleFileChange}  className="form-control style-1" required/> 
                                    </fieldset>

                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">
                                        Image 3:<span>*</span>
                                        </label>
                                        <input type="file" name='image3' onChange={handleFileChange}  className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bathrooms">
                                        Image 4:<span>*</span>
                                        </label>
                                        <input type="file" name='image4' onChange={handleFileChange}  className="form-control style-1" required/> 
                                    </fieldset>
                                   
                                </div>

                                <label htmlFor="bathrooms">
                                        Image 5:
                                        </label>
                                <div className="box-uploadfile text-center">
                                    
                                    <label className="uploadfile style-1">
                                        <span className="icon icon-img-2"></span>
                                        <div className="btn-upload">
                                            <a href="#" className="tf-btn primary">Choose File</a>
                                            <input type="file" name="image5"  onChange={handleFileChange}  className="ip-file" required/>
                                        </div>
                                        <p className="file-name fw-5">Or drop file here to upload</p>
                                    </label>
                                </div>
                                

                            </div>
                            
                            <div className="widget-box-2">
                                <h6 className="title">Information</h6>
                                <div className="box-info-property">
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="title">
                                            Title:<span>*</span>
                                        </label>
                                        <input type="text" className="form-control style-1" name='title' onChange={handleInputChange}   placeholder='Enter Your Property Title' required/>
                                    </fieldset>
                                    <fieldset className="box box-fieldset">
                                        <label htmlFor="desc">Description:</label>
                                        <textarea className="textarea-tinymce"  name='description' onChange={handleInputChange} required>
                                        </textarea>
                                    </fieldset>
                                    <div className="box grid-3 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="address">
                                                Full Address:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" name='address'  onChange={handleInputChange}  placeholder="Enter property full address" required/>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="city">
                                                City:<span>*</span>
                                            </label>
                                            <input type="city"  className="form-control style-1" name='city' onChange={handleInputChange}  placeholder="Enter property city" required/>
                                        </fieldset>

                                        <fieldset className="box-fieldset">
                                            <label htmlFor="zip">
                                                Zip Code:<span>*</span>
                                            </label>
                                            <input type="number"  className="form-control style-1" name='zipCode' onChange={handleInputChange}  placeholder="Enter property zip code" required/>
                                        </fieldset>
                                        
                                    </div>
                                    <div className="box grid-3 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="state">
                                               State:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" name='state' onChange={handleInputChange}  placeholder="Enter state" required/>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="neighborhood">
                                            Locations:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" name='locations' onChange={handleInputChange}  placeholder="Enter property locations" required/>
                                        </fieldset>

                                        <fieldset className="box-fieldset">
                                            <label htmlFor="country">
                                                Country:<span>*</span>
                                            </label>
                                            <select  className="nice-select form-control style-1" name='country' onChange={handleInputChange} defaultValue='India' required>
                                                <option  value='India' className="option ">India</option>
                                                <option   value='United States' className="option ">United States</option>
                                                <option  value='United Kingdom' className="option">United Kingdom</option>
                                                <option  value='Russia' className="option">Russia</option>
                                            
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="box grid-2 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="state">
                                            Latitude:<span>*</span>
                                            </label>
                                            <input type="number" className="form-control style-1" name='latitude' onChange={handleInputChange}  placeholder="Enter property Latitude" required/>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="neighborhood">
                                            Longitude:<span>*</span>
                                            </label>
                                            <input type="number" className="form-control style-1" name='longitude' onChange={handleInputChange}  placeholder="Enter property Longitude" required/>
                                        </fieldset>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Price</h6>
                                <div className="box-price-property">
                                    <div className="box grid-2 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price">
                                                Price:<span>*</span>
                                            </label>
                                            <input type="number" name='price' className="form-control style-1"  onChange={handleInputChange}  placeholder="Example value: 12345.67" required/>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                           
                                            <label htmlFor="price">
                                                1 Sqft Price:<span>*</span>
                                            </label>
                                            <input type="number"  className="form-control style-1"  onChange={handleInputChange}  placeholder="Example value: 12345.67" required/>
                                        </fieldset>
                                    </div>
                                    <div className="grid-2 gap-30">
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price">
                                            Property Sqft:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" name="propertySqft" onChange={handleInputChange}   placeholder="Enter Property Sqft" required/>
                                        </fieldset>
                                        <fieldset className="box-fieldset">
                                            <label htmlFor="price">
                                            Total Sqft:<span>*</span>
                                            </label>
                                            <input type="text" className="form-control style-1" name="totalSqft" onChange={handleInputChange}  placeholder="Enter Property Total Sqft" required/>
                                        </fieldset>
                                        
                                    </div>
                                   
                                </div>
                            </div>
                            <div className="widget-box-2">
                                <h6 className="title">Addtional Information</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="type">
                                            Property Type:<span>*</span>
                                        </label>
                                        <select className="form-control nice-select" name='propertyType' onChange={handleInputChange} defaultValue="Apartment" required>
                                            <option value="Apartment" className="option">Apartment</option>
                                            <option value="Villa" className="option">Villa</option>
                                            <option value="Studio" className="option">Studio</option>
                                            <option value="Studio" className="option">Studio</option>
                                            <option value="Office" className="option">Office</option>
                                            <option value="Townhouse" className="option">Townhouse</option>
                                        
                                        </select>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="yearBuilt">
                                        year Of Built:<span>*</span>
                                        </label>
                                        <select
                                        name="yearBuilt"
                                        onChange={handleInputChange}
                                        className="form-control style-1"
                                        required
                                        >
                                        {[...Array(2024 - 2000 + 1)].map((_, index) => (
                                            <option key={index} value={2000 + index}>
                                            {2000 + index}
                                            </option>
                                        ))}
                                        </select>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="propertyStatus">
                                            Property Status:<span>*</span>
                                        </label>
                                        <select  className="nice-select form-control style-1" name='propertyStatus' onChange={handleInputChange} defaultValue='For Sale' required>
                                                <option value='For Sale' className="option">For Sale</option>
                                                <option value='For Rent' className="option">For Rent</option>
                                            </select>
                                    </fieldset>
                                    
                                </div>
                               
                                <div className="box grid-3 gap-30">
                                    
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">
                                            Bedrooms:<span>*</span>
                                        </label>
                                        <input type="text" name='bedrooms' onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bathrooms">
                                            Bathrooms:<span>*</span>
                                        </label>
                                        <input type="text" name='bathrooms' onChange={handleInputChange}  className="form-control style-1" required/> 
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="garages">
                                            Garages:<span>*</span>
                                        </label>
                                        <input type="text" name='garages'  onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                </div>
                                
                            </div>


                            <div className="widget-box-2">
                                <h6 className="title">NearBy</h6>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbySchool">
                                       School:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbySchool' onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyUniversity">
                                        University:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyUniversity' onChange={handleInputChange}  className="form-control style-1" required/> 
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyGrocery">
                                        Grocery:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyGrocery'  onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                </div>
                                <div className="box grid-3 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyMarket">
                                        Market:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyMarket' onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyHospital">
                                        Hospital:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyHospital' onChange={handleInputChange}  className="form-control style-1" required/> 
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyMetro">
                                        Metro:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyMetro'  onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                </div>

                                <div className="box grid-2 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyGym">
                                        Gym:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyGym' onChange={handleInputChange}  className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="nearbyPark">
                                        Park:<span>*</span>
                                        </label>
                                        <input type="text" name='nearbyPark' onChange={handleInputChange}  className="form-control style-1" required/> 
                                    </fieldset>
                                   
                                </div>
                                
                            </div>


                            <div className="widget-box-2">
                                <h6 className="title">Features<span>*</span></h6>
                                <div className="box-amenities-property">
                                    <div className="box-amenities">
                                        <div className="title-amenities fw-7">Home safety:</div>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox"  name='features' id="cb1"  checked={!!propertyData.features['cb1']} onChange={handleInputChange}  className="tf-checkbox style-1 primary"  /> 
                                            <label htmlFor="cb1" className="text-cb-amenities">Smoke alarm</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}   checked={!!propertyData.features['cb2']} className="tf-checkbox style-1 primary" id="cb2"/> 
                                            <label htmlFor="cb2" className="text-cb-amenities">Carbon monoxide alarm</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb3']}  className="tf-checkbox style-1 primary" id="cb3" /> 
                                            <label htmlFor="cb3" className="text-cb-amenities">First aid kit</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb4']} className="tf-checkbox style-1 primary" id="cb4" /> 
                                            <label htmlFor="cb4" className="text-cb-amenities">Self check-in with lockbox</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb5']} className="tf-checkbox style-1 primary" id="cb5"/> 
                                            <label htmlFor="cb5" className="text-cb-amenities">Security cameras</label>
                                        </fieldset>
                                    </div>
                                    <div className="box-amenities">
                                        <div className="title-amenities fw-7">Bedroom:</div>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb6']} className="tf-checkbox style-1 primary" id="cb6"/> 
                                            <label htmlFor="cb6" className="text-cb-amenities">Hangers</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb7']} className="tf-checkbox style-1 primary" id="cb7" /> 
                                            <label htmlFor="cb7" className="text-cb-amenities">Bed linens</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb8']} className="tf-checkbox style-1 primary" id="cb8"/> 
                                            <label htmlFor="cb8" className="text-cb-amenities">Extra pillows & blankets</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb9']} className="tf-checkbox style-1 primary" id="cb9"/> 
                                            <label htmlFor="cb9" className="text-cb-amenities">Iron</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox"  name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb10']} className="tf-checkbox style-1 primary" id="cb10" /> 
                                            <label htmlFor="cb10" className="text-cb-amenities">TV with standard cable</label>
                                        </fieldset>
                                    </div>
                                    <div className="box-amenities">
                                        <div className="title-amenities fw-7">Kitchen:</div>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb11']}  className="tf-checkbox style-1 primary" id="cb11"/> 
                                            <label htmlFor="cb11" className="text-cb-amenities">Refrigerator</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb12']}  className="tf-checkbox style-1 primary" id="cb12"/> 
                                            <label htmlFor="cb12" className="text-cb-amenities">Microwave</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb13']}  className="tf-checkbox style-1 primary" id="cb13"/> 
                                            <label htmlFor="cb13" className="text-cb-amenities">Dishwasher</label>
                                        </fieldset>
                                        <fieldset className="amenities-item">
                                            <input type="checkbox" name='features' onChange={handleInputChange}  checked={!!propertyData.features['cb14']} className="tf-checkbox style-1 primary" id="cb14"/> 
                                            <label htmlFor="cb14" className="text-cb-amenities">Coffee maker</label>
                                        </fieldset>
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="widget-box-2">

                                <h6 className="title">File Attachments</h6>

                                <div className="box grid-2 gap-30">
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bedrooms">
                                        Document 1:<span>*</span>
                                        </label>
                                        <input type="file" name='document1' onChange={handleFileChange}  className="form-control style-1" required/>
                                    </fieldset>
                                    <fieldset className="box-fieldset">
                                        <label htmlFor="bathrooms">
                                        Document 2:<span>*</span>
                                        </label>
                                        <input type="file" name='document2' onChange={handleFileChange}  className="form-control style-1" required/> 
                                    </fieldset>
                                   
                                </div>

                                <label htmlFor="floorPlan">
                                        Floor Plan:<span>*</span>
                                        </label>
                                <div className="box-uploadfile text-center">
                                    
                                    <label className="uploadfile style-1">
                                        <span className="icon icon-img-2"></span>
                                        <div className="btn-upload">
                                            <a href="#" className="tf-btn primary">Choose File</a>
                                            <input type="file" name="floorPlan"  onChange={handleFileChange}  className="ip-file" required/>
                                        </div>
                                        <p className="file-name fw-5">Or drop file here to upload</p>
                                    </label>
                                </div>
                                

                            </div>
                           
                            <div className="widget-box-2">
                                <h6 className="title">Videos</h6>
                                
                                <label htmlFor="virtual_tour_bg">
                                Virtual Tour bg:<span style={{color:'red'}}>*</span>
                                        </label>
                                <div className="box-uploadfile text-center mb-2">
                                    
                                    <label className="uploadfile style-1">
                                        <span className="icon icon-img-2 "></span>
                                        <div className="btn-upload">
                                            <a href="#" className="tf-btn primary">Choose File</a>
                                            <input type="file" name="virtual_tour_bg"  onChange={handleFileChange}  className="ip-file" required/>
                                        </div>
                                        <p className="file-name fw-5" >Or drop file here to upload</p>
                                    </label>
                                </div>
                                <fieldset className="box-fieldset">
                                    <label htmlFor="video">Video URL:</label>
                                    <input type="text" onChange={handleInputChange} name='virtual_tour_url'  className="form-control style-1" placeholder="Youtube, vimeo url" required/>
                                </fieldset>
                            </div>
                           
                            
                            <button type='submit'  className="tf-btn primary">Add Property</button>
                        </form>
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

export default EditProperties

