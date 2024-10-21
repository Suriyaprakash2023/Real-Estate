import {React,useState,useContext} from 'react'
import {Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import registerimage from '../assets/images/banner/vu.jpg'
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_number,setMobileNumber] = useState('');
     // Handle form submit
     const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      setErrors('');
      setSuccessMessage(''); 
  
      try{
        const response = await axios.post(`${API_BASE_URL}/login/`, { email, password,mobile_number })
        console.log("Success!", response.data)
        setSuccessMessage("Login Successful!")
        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh)
    }
    catch(error){
        console.log("Error during Login!", error.response?.data);
        if(error.response && error.response.data){
            Object.keys(error.response.data).forEach(field => {
                const errorMessages = error.response.data[field];
                if(errorMessages && errorMessages.length > 0){
                    setErrors(errorMessages[0]);
                }
            })
        }
    }
    finally{
      console.log("can not catch this error")
    }
  
  
    };

  return (
    <>
      <Header/>
      {/* popup register --> */}

        <div className="d-flex justify-content-center" style={{
                    backgroundImage: `url(${registerimage})`,
                    backgroundSize: "cover",
                    // Add other styles if needed
                  }}>
          <div className="col-lg-4 col-md-6 col-sm-9 my-5" >
            <div className="flat-account bg-surface" style={{
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
    // Optional: Add padding or box-shadow to make the content pop more against the background
    padding: "20px",
    borderRadius: "8px", // Optional: Smooth out edges with rounded corners
  }}>
              <h3 className="title text-center">Register</h3>
              
              <form  onSubmit={handleRegisterSubmit}>
                <fieldset className="box-fieldset">
                  <label htmlFor="email">
                    Email address<span>*</span>:
                  </label>
                  <input
                  placeholder="Enter Your Email"
                    type="text"
                    className="form-contact style-1"
                    name="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    required 
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                    }}
                  />
                </fieldset>
                <fieldset className="box-fieldset">
                  <label htmlFor="mobile_number">
                    Mobile Number<span>*</span>:
                  </label>
                  <input
                  placeholder="Enter Your Mobile No"
                    type="text"
                    maxLength={10}
                    className="form-contact style-1"
                    name="mobile_number"
                    value={mobile_number}
                    onChange={(e)=>{setMobileNumber(e.target.value)}}
                    required
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                    }}
                  />
                </fieldset>
                {/* <fieldset className="box-fieldset">
                  <label htmlFor="Password">
                    Password<span>*</span>:
                  </label>
                  <div className="box-password">
                    <input
                      type="password"
                      className="form-contact style-1 password-field"
                      placeholder="Password"
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    <span className="show-pass">
                      <i className="icon-pass icon-eye"></i>
                      <i className="icon-pass icon-eye-off"></i>
                    </span>
                  </div>
                </fieldset> */}
                <fieldset className="box-fieldset">
                  <label htmlFor="confirmPassword">
                    Confirm Password<span>*</span>:
                  </label>
                  <div className="box-password">
                    <input
                      type="password"
                      className="form-contact style-1 password-field2"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      required
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                      }}
                    />
                    <span className="show-pass2">
                      <i className="icon-pass icon-eye"></i>
                      <i className="icon-pass icon-eye-off"></i>
                    </span>
                  </div>
                </fieldset>

                {/* {errors.agreeToTerms && (
                <div className="error-message">{errors.agreeToTerms}</div>
                )}

                <button type="submit" className="tf-btn primary w-100">
                  Register
                </button>
                
                {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
              )} */}

<button type="submit" className="tf-btn primary w-100">
                  Register
                </button>
                <div className="mt-12 text-variant-1 text-center noti">
                  Already have an account?
                  <Link
                    to="/login"
                    
                  >
                    Login Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
     
      <Footer/>
    </>
    
  )
}

export default Register
