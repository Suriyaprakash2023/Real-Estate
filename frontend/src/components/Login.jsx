import React,{useState  } from 'react';
import {useContext} from 'react';
import {Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Use login from AuthContext
  const navigate = useNavigate();

  // Submit handler with async/await
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);  // Wait for login to complete
      navigate('/dashboard');  // Navigate to dashboard after login
    } catch (err) {
      setPassword('')
      setError(err)
      setError('Login failed. Please check your credentials.');  // Show error message if login fails
    }
  };


  return (
    <>
      <Header />
         {/* Popup Login */}
      
        <div className="d-flex justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-6 my-5 ">
            <div className="flat-account bg-surface">
              <h3 className="title text-center">Log In</h3>
              

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
                <div className="text-variant-1 auth-line">or sign up with</div>
                <div className="login-social">
                  <a className="btn-login-social">
                    <img src="/src/assets/images/logo/fb.jpg" alt="img" />
                    Continue with Facebook
                  </a>
                  <a className="btn-login-social">
                    <img src="/src/assets/images/logo/google.jpg" alt="img" />
                    Continue with Google
                  </a>
                  <a className="btn-login-social">
                    <img src="/src/assets/images/logo/tw.jpg" alt="img" />
                    Continue with Twitter
                  </a>
                </div>
                <button type="submit" className="tf-btn primary w-100">
                  Login
                </button>
                <div className="mt-12 text-variant-1 text-center noti">
                  Not registered yet?
                  <Link
                    to="/register"
                   
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
     
      <Footer />
    </>
  )
}

export default Login
