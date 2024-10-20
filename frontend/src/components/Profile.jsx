import React,{useContext } from 'react'
import Header from './Header'
import DashboardSideNav from './DashboardSideNav';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect  } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import API_BASE_URL from '../context/data';


const Profile = () => {
  const navigate = useNavigate();
  const { isAuthenticated,userData, logout } = useContext(AuthContext);// Get authentication state and logout function 
  const [error,setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password,setPassword] = useState({
    new_password:"",
    confirm_password:""
  })
  const [profileData, setProfileData] = useState({
    full_name: '',
    mobile_number: '',
    email: '',
    address: '',
    city: '',
    profilePicture: null
  });


  
  const handleInputChange = (e) => {
    setProfileData({
        ...profileData,
        [e.target.name]:e.target.value
    })
  };

  const handleFileChange = (e)=>{
    setProfileData({
        ...profileData,
        [e.target.name]:e.target.files[0]
    });
  }
  const handlePassword = (e) => {
    setPassword({
        ...password,
        [e.target.name]:e.target.value
    })
  };

  const accessToken = localStorage.getItem('accessToken');

  const handleDataSubmit= async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("full_name",profileData.full_name);
    formData.append("mobile_number",profileData.mobile_number);
    // formData.append("email",profileData.email);
    formData.append("city",profileData.city);
    formData.append("address",profileData.address);
    formData.append("profilePicture",profileData.profilePicture);
        try{
            
            const response = await axios.post(`${API_BASE_URL}/user/`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Include any necessary authorization headers, e.g.:
                    'Authorization': `Bearer ${token}`
                  }
            })
            if (response.status === 200){
                console.log("data updated")
                localStorage.setItem("userName",response.data.full_name)
                setSuccessMessage("Profile Updated Successfully..!")
                setProfileData(response.data);
                navigate('/profile')
            }else{
                setError(response.errors)
            }

        }catch{
            setError("check the input values")
                console.warn("form not submited handlesubmit error")
        }
  }

    const handlePasswordSubmit = async(e)  =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("new_password",password.new_password);
        formData.append("confirm_password",password.confirm_password);
        if (password.new_password === password.confirm_password){
            try{
                const response = await axios.post(`${API_BASE_URL}/change_password/`,formData,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
                })
                if (response.status === 200){
                    setSuccessMessage("Password Updated SuccessFully..!")
                    setPassword({new_password:"",
                        confirm_password:""
                    })
                    
                }
            }catch(error){
                if (error.response && error.response.status === 401) {
                    // Handle 401 Unauthorized error explicitly
                    setError("Invalid email or password. Please try again.");
                } else {
                    console.log("Error during Login!", error);
                    setError("Your Password is Not Valid. Please try again.");
                    setPassword({new_password:"",confirm_password:""})
                    
                }
            }


        }else{
            setError("Password do Not Match..!")
            setPassword({
                new_password:"",
                confirm_password:""})
        }
    }


  return (
    <>
          
     <body className="body bg-surface">
        <div id="wrapper">
            <div id="page" className="clearfix">
                <div className="layout-wrap">

                    <Header/>
                    <DashboardSideNav/>

                        <div className="main-content">
                                        <div className="main-content-inner wrap-dashboard-content-2">
                                            <div className="button-show-hide show-mb">
                                                <span className="body-1">Show Dashboard</span>
                                            </div>
                                            {successMessage && (
                                                <Alert
                                                className='mb-3'
                                                severity="success"
                                                variant="filled"
                                                sx={{ fontSize: '13px' }}
                                                onClose={() => setSuccessMessage('')}
                                                >
                                                {successMessage}
                                                </Alert>
                                            )}

                                            {error && (
                                                <Alert
                                                 className='mb-3'
                                                severity="error"
                                                variant="filled"
                                                sx={{ fontSize: '13px' }}
                                                onClose={() => setError('')}
                                                >
                                                {error}
                                                </Alert>
                                            )}




                                            <div className="widget-box-2">
                                                <form onSubmit={handleDataSubmit}  encType="multipart/form-data">
                                                    <div className="box">
                                                        <h6 className="title">Avatar</h6>
                                                        <div className="box-agent-avt">
                                                            <div className="avatar">
                                                                
                                                                <img  src={`${API_BASE_URL}/${userData.profilePicture}`}  alt="avatar" loading="lazy" width="128" height="128"/>
                                                            </div>
                                                            <div className="content uploadfile">
                                                                <p>Upload a new avatar</p>
                                                                <div className="">
                                                                    <input type="file" className="ip-file form-control" 
                                                                      name='profilePicture' 
                                                                    onChange={handleFileChange} />
                                                                </div>
                                                                <p>JPEG 100x100</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                    <h6 className="title">Information</h6>

                                                    <div className="box grid-2 gap-30">
                                                        <div className="box-fieldset">
                                                            <label htmlFor="old-pass">Full Name:<span>*</span></label>
                                                            <div className="box-password">
                                                                <input type="text" className="form-contact style-1" placeholder="Enter Your FullName" value={userData.full_name|| ""}  name='full_name' onChange={handleInputChange} />
                                                                
                                                            </div>
                                                        </div>
                                                      
                                                        <div className="box-fieldset">
                                                            <label htmlFor="confirm-pass">Mobile Number:<span>*</span></label>
                                                            <div className="box-password">
                                                                <input type="text" value={userData.mobile_number|| ""} name='mobile_number' onChange={handleInputChange}  className="form-contact style-1" />
                                                                
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div className="box box-fieldset">
                                                        <label htmlFor="name">City:<span>*</span></label>
                                                        <input type="text" value={userData.city || ""}  name='city' onChange={handleInputChange} className="form-control style-1"/>
                                                    </div>
                                                    <div className="box box-fieldset">
                                                        <label htmlFor="fb">Address:<span>*</span></label>
                                                        <input type="text" value={userData.address|| ""} name='address' 
                                                        onChange={handleInputChange}   className="form-control style-1" />
                                                    </div>
                                                    
                                                    
                                                    <div className="box">
                                                        <button className='tf-btn primary mb-2' type='submit'>Save & Update</button> 
                                                    </div>
                                                </form>
                                                
                                                <h6 className="title">Change password</h6>
                                                <form onSubmit={handlePasswordSubmit}>
                                                    <div className="box grid-2 gap-30">
                                                    
                                                        <div className="box-fieldset">
                                                            <label htmlFor="new-pass">New Password:<span>*</span></label>
                                                            <div className="box-password">
                                                                <input type="password" className="form-contact style-1 password-field2" placeholder="Password" name="new_password" value={password.new_password} onChange={handlePassword}  required/>
                                                                <span className="show-pass2">
                                                                    <i className="icon-pass icon-eye"></i>
                                                                    <i className="icon-pass icon-eye-off"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="box-fieldset">
                                                            <label htmlFor="confirm-pass">Confirm Password:<span>*</span></label>
                                                            <div className="box-password">
                                                                <input type="password" className="form-contact style-1 password-field3" placeholder="Password" name='confirm_password' value={password.confirm_password} onChange={handlePassword} required/>
                                                                <span className="show-pass3">
                                                                    <i className="icon-pass icon-eye"></i>
                                                                    <i className="icon-pass icon-eye-off"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box">
                                                        <button type='submit' className="tf-btn primary">Update Password</button>
                                                    </div>
                                                </form>
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

export default Profile
