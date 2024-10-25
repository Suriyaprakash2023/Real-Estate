import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import loginimage from "../assets/images/banner/danie.jpg";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Alert from '@mui/material/Alert';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Submit handler with async/await
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Wait for login to complete
  
      // Retrieve user role from localStorage
      const userRole = localStorage.getItem('userRole');
  
      // Redirect based on role
      if (userRole === 'admin') {
        navigate("/admin_dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setPassword("");
      setErrors(err.message || "Login failed. Please check your credentials."); // Show error message if login fails
    }
  };
  
  return (
    <>
      <Header />
      {/* Popup Login */}

      <div
        className="d-flex justify-content-center"
        style={{
          backgroundImage: `url(${loginimage})`,
          backgroundSize: "cover",
          // Add other styles if needed
        }}
      >
        <div className="col-lg-4 col-md-6 col-sm-6 my-5 ">
          <div
            className="flat-account bg-surface"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
              // Optional: Add padding or box-shadow to make the content pop more against the background
              padding: "20px",
              borderRadius: "8px", // Optional: Smooth out edges with rounded corners
            }}
          >
            <h3 className="title text-center">Log In</h3>
            {errors && <Alert severity="error"  variant="filled">{errors}</Alert>}
            {successMessage && <Alert severity="success"  variant="filled">{successMessage}</Alert>}
            <form onSubmit={handleSubmit} className="mt-2">
              <fieldset className="box-fieldset">
                <label htmlFor="email">
                  Your Email<span>*</span>:
                </label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-contact style-1"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
                  }}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label htmlFor="password">
                  Password<span>*</span>:
                </label>
                <div className="box-password">
                  <input
                    type="password"
                    className="form-contact style-1 password-field2"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <div className="d-flex justify-content-between flex-wrap gap-12">
                <Link className="caption-1 text-primary" to="#">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="tf-btn primary w-100">
                Login
              </button>
              <div className="mt-12 text-variant-1 text-center noti">
                Not registered yet?
                <Link to="/register">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
