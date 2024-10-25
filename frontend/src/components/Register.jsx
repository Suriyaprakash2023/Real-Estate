import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import registerimage from "../assets/images/banner/vu.jpg";
import {API_BASE_URL} from '../context/data';
import Alert from '@mui/material/Alert';


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrors("Passwords do not match!");
      return;
    }

    if (!/^\d{10}$/.test(mobile_number)) {
      setErrors("Invalid mobile number! Must be 10 digits.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        email,
        password,
        mobile_number,
      });

      if (response.status === 201) {
        setSuccessMessage("Account Created Successfully..😍");
       // Wait for 5 seconds before navigating to login
      setTimeout(() => {
        navigate("/login");
      }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        setErrors("Please try again!");
      }
    } catch (error) {
      setErrors("Registration failed! " + (error.response?.data?.message || ""));
    }
  };

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center"
        style={{
          backgroundImage: `url(${registerimage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="col-lg-4 col-md-6 col-sm-9 my-5">
          <div className="flat-account bg-surface" style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
              // Optional: Add padding or box-shadow to make the content pop more against the background
              padding: "20px",
              borderRadius: "8px", // Optional: Smooth out edges with rounded corners
            }}>
            <h3 className="title text-center">Register</h3>

            {errors && <Alert severity="error"  variant="filled">{errors}</Alert>}
            {successMessage && <Alert severity="success"  variant="filled">{successMessage}</Alert>}

            <form onSubmit={handleRegisterSubmit}>
              <fieldset className="box-fieldset">
                <label htmlFor="email">Email address<span>*</span>:</label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="form-contact style-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                  }}
                  required
                />
              </fieldset>

              <fieldset className="box-fieldset">
                <label htmlFor="mobile_number">Mobile Number<span>*</span>:</label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Enter Your Mobile No"
                  className="form-contact style-1"
                  value={mobile_number}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                  }}
                  required
                />
              </fieldset>

              <fieldset className="box-fieldset">
                <label htmlFor="password">Password<span>*</span>:</label>
                <div className="box-password">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="form-contact style-1 password-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                    }}
                    required
                  />
                  <span className="show-pass" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ? <i className="icon-pass icon-eye-off"></i> : <i className="icon-pass icon-eye"></i>}
                  </span>
                </div>
              </fieldset>

              <fieldset className="box-fieldset">
                <label htmlFor="confirmPassword">Confirm Password<span>*</span>:</label>
                <div className="box-password">
                  <input
                    type="password"
                    className="form-contact style-1 password-field2"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                    }}
                    required
                  />
                </div>
              </fieldset>

              <button type="submit" className="tf-btn primary w-100">Register</button>
              <div className="mt-12 text-variant-1 text-center noti">
                Already have an account? <Link to="/login">Login Here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
