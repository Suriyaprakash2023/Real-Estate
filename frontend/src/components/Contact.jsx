import React, { useState,useEffect  } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios  from 'axios';
const Contact = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile_number,setMobileNumber] = useState('');
    const [subject,setSubject] = useState('');
    const [message,setMessage] = useState('');
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const handleSubmit = async(e) =>{
        e.preventDefault();

        const formData = {
            name,
            email,
            mobile_number,
            subject,
            message
        }

        try{
            const response = await axios.post("http://localhost:8000/contact",formData);
            console.log("Response",response.data);
            setName('');
            setEmail('');
            setMobileNumber('');
            setSubject('');
            setMessage('');
            setAlert({ show: true, message: 'Message sent successfully!', type: 'success' });
        } catch (error){
            console.error('There was an error sending the message!', error);
            setAlert({ show: true, message: 'Failed to send the message. Please try again later.', type: 'danger' });
        }
    }

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);
  return (
    <>
        <Header/>
            <section className="flat-title-page style-2">
                <div className="container">
                    <ul className="breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li>/ Contact Us</li>
                    </ul>
                    <h2 className="text-center">Contact Us</h2>
                </div>
            </section>
            

            

            <section className="flat-section flat-contact">
                <div className="container">
                    <div className="row">


                    {alert.show && (
                <div
                    className={`alert alert-dismissible fade show text-center`}
                    role="alert"
                    style={{
                        backgroundColor: alert.type === 'success' ? '#198754' : '#dc3545', // Green for success, Red for danger
                        color: 'white',
                        fontSize: '20px',
                        height: '70px',
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="text-center flex-grow-1">{alert.message}</span>
                        <button type="button" className="btn close ml-2" onClick={() => setAlert({ ...alert, show: false })}>
                            <span style={{ color: 'white', fontSize: '20px' }}>&times;</span>
                        </button>
                    </div>
                </div>
            )}





                        <div className="col-lg-8">
                            <div className="contact-content">
                                <h5>Drop Us A Line</h5>
                                <p className="body-2 text-variant-1">Feel free to connect with us through our online channels for updates, news, and more.</p>
                                <form id="contactform" className="form-contact" onSubmit={handleSubmit}>
                                    <div className="box grid-2">
                                        <fieldset>
                                            <label htmlFor="name">Full Name:</label>
                                            <input type="text" className="form-control style-1" placeholder="Name"  value={name} onChange={(e)=>setName(e.target.value)} name="name" id="name" required />
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="email">Email Address:</label>
                                            <input type="text" className="form-control style-1" placeholder="Email" name="email" id="email" 
                                            value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                                        </fieldset>
                                    </div>
                                    <div className="box grid-2">
                                        <fieldset>
                                            <label htmlFor="phone">Phone Numbers:</label>
                                            <input type="text" className="form-control style-1" placeholder="ex 012345678" name="phone" id="phone" value={mobile_number} onChange={(e)=>setMobileNumber(e.target.value)} required/>
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="subject">Subject:</label>
                                            <input type="text" className="form-control style-1" placeholder="Enter Keyword" name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} id="subject"/>
                                        </fieldset>
                                    </div>
                                    <fieldset className="box">
                                        <label htmlFor="message">Your Message:</label>
                                        <textarea name="message" className="form-control" cols="30" rows="10" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} id="message" required></textarea>
                                    </fieldset>
                                    <div className="send-wrap">
                                        <button className="tf-btn primary size-1" type="submit">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="contact-info">
                                <h5>Contact Us</h5>
                                <ul>
                                    <li className="box">
                                        <div className="text-1 title">Address:</div>
                                        <p className="p-16 text-variant-1"> Kannappar Thidal, Periyamet,Chennai 600003
                                          <br />  TamilNadu
                                        </p>
                                    </li>
                                    <li className="box">
                                        <div className="text-1 title">Infomation:</div>
                                        <p className="p-16 text-variant-1">+91 999435381 <br/> homzen@gmail.com</p>
                                    </li>
                                    <li className="box">
                                        <div className="text-1 title">Opentime:</div>
                                        <p className="p-16 text-variant-1">Monay - Friday: 08:00 - 20:00 <br/> Saturday - Sunday: 10:00 - 18:00</p>

                                    </li>
                                    <li className="box">
                                        <div className="text-1 title">Follow Us:</div>
                                         <ul className="box-social">
                                            <li><a  className="item">
                                                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z" fill="#161E2D"/>
                                                </svg>
                                                 </a></li>
                                            <li><a  className="item">
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.00245 4.38427C6.4484 4.38427 4.38828 6.44438 4.38828 8.99844C4.38828 11.5525 6.4484 13.6126 9.00245 13.6126C11.5565 13.6126 13.6166 11.5525 13.6166 8.99844C13.6166 6.44438 11.5565 4.38427 9.00245 4.38427ZM9.00245 11.9983C7.35195 11.9983 6.00264 10.653 6.00264 8.99844C6.00264 7.34392 7.34794 5.99862 9.00245 5.99862C10.657 5.99862 12.0023 7.34392 12.0023 8.99844C12.0023 10.653 10.653 11.9983 9.00245 11.9983ZM14.8816 4.19552C14.8816 4.79388 14.3997 5.27176 13.8054 5.27176C13.207 5.27176 12.7291 4.78986 12.7291 4.19552C12.7291 3.60118 13.211 3.11928 13.8054 3.11928C14.3997 3.11928 14.8816 3.60118 14.8816 4.19552ZM17.9376 5.28782C17.8694 3.84615 17.5401 2.56912 16.4839 1.51697C15.4318 0.46483 14.1547 0.135534 12.7131 0.0632491C11.2272 -0.021083 6.77368 -0.021083 5.28782 0.0632491C3.85016 0.131518 2.57313 0.460815 1.51697 1.51296C0.460815 2.5651 0.135534 3.84213 0.0632491 5.28381C-0.021083 6.76966 -0.021083 11.2232 0.0632491 12.7091C0.131518 14.1507 0.460815 15.4278 1.51697 16.4799C2.57313 17.532 3.84615 17.8613 5.28782 17.9336C6.77368 18.018 11.2272 18.018 12.7131 17.9336C14.1547 17.8654 15.4318 17.5361 16.4839 16.4799C17.5361 15.4278 17.8654 14.1507 17.9376 12.7091C18.022 11.2232 18.022 6.77368 17.9376 5.28782ZM16.0181 14.3033C15.7048 15.0904 15.0985 15.6968 14.3073 16.0141C13.1227 16.4839 10.3116 16.3755 9.00245 16.3755C7.6933 16.3755 4.87821 16.4799 3.69756 16.0141C2.91046 15.7008 2.30407 15.0944 1.98682 14.3033C1.51697 13.1187 1.6254 10.3076 1.6254 8.99844C1.6254 7.68928 1.52099 4.8742 1.98682 3.69355C2.30006 2.90645 2.90645 2.30006 3.69756 1.98281C4.88223 1.51296 7.6933 1.62139 9.00245 1.62139C10.3116 1.62139 13.1267 1.51697 14.3073 1.98281C15.0944 2.29604 15.7008 2.90243 16.0181 3.69355C16.4879 4.87821 16.3795 7.68928 16.3795 8.99844C16.3795 10.3076 16.4879 13.1227 16.0181 14.3033Z" fill="#161E2D"/>
                                                </svg>
                                                    
                                            </a></li>
                                            <li><a  className="item">
                                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.2775 2.16608C19.051 1.31346 18.3839 0.641967 17.5368 0.414086C16.0013 0 9.84445 0 9.84445 0C9.84445 0 3.68759 0 2.15212 0.414086C1.30502 0.642003 0.637857 1.31346 0.411419 2.16608C0 3.71149 0 6.93586 0 6.93586C0 6.93586 0 10.1602 0.411419 11.7056C0.637857 12.5583 1.30502 13.2018 2.15212 13.4296C3.68759 13.8437 9.84445 13.8437 9.84445 13.8437C9.84445 13.8437 16.0013 13.8437 17.5368 13.4296C18.3839 13.2018 19.051 12.5583 19.2775 11.7056C19.6889 10.1602 19.6889 6.93586 19.6889 6.93586C19.6889 6.93586 19.6889 3.71149 19.2775 2.16608ZM7.8308 9.86334V4.00837L12.9767 6.93593L7.8308 9.86334Z" fill="#161E2D"/>
                                                </svg>
                                            
                                            </a></li>
                                            <li><a  className="item">
                                                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.9797 3.83062C16.9917 3.99873 16.9917 4.16688 16.9917 4.33498C16.9917 9.46249 13.089 15.3706 5.95611 15.3706C3.75858 15.3706 1.71719 14.7341 0 13.6294C0.312227 13.6654 0.612403 13.6774 0.936643 13.6774C2.74986 13.6774 4.41904 13.065 5.75196 12.0203C4.04678 11.9843 2.61779 10.8675 2.12545 9.33042C2.36563 9.36643 2.60578 9.39045 2.85798 9.39045C3.20621 9.39045 3.55447 9.3424 3.87868 9.25838C2.10146 8.8981 0.768498 7.33705 0.768498 5.45175V5.40373C1.28483 5.69193 1.8853 5.87205 2.52169 5.89604C1.47697 5.19955 0.792524 4.01075 0.792524 2.66581C0.792524 1.94533 0.984621 1.28487 1.32087 0.70847C3.2302 3.06209 6.10019 4.59912 9.31838 4.76727C9.25835 4.47907 9.22231 4.17889 9.22231 3.87868C9.22231 1.74118 10.9515 0 13.101 0C14.2177 0 15.2264 0.468321 15.9349 1.22484C16.8115 1.05674 17.6521 0.732496 18.3966 0.288201C18.1084 1.18884 17.496 1.94536 16.6915 2.42566C17.472 2.34164 18.2285 2.12545 18.925 1.82527C18.3967 2.59377 17.7362 3.27821 16.9797 3.83062Z" fill="#161E2D"/>
                                                </svg>
                                            </a></li>
                                            <li><a  className="item">
                                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.35713 0C3.65693 0 0 2.4668 0 6.45913C0 8.99806 1.42815 10.4406 2.29369 10.4406C2.65073 10.4406 2.8563 9.44526 2.8563 9.16395C2.8563 8.82856 2.00157 8.11448 2.00157 6.71879C2.00157 3.81922 4.20871 1.76355 7.06501 1.76355C9.52099 1.76355 11.3386 3.15924 11.3386 5.72341C11.3386 7.63843 10.5705 11.2304 8.08202 11.2304C7.18402 11.2304 6.41585 10.5813 6.41585 9.65082C6.41585 8.28759 7.36795 6.96763 7.36795 5.56112C7.36795 3.17366 3.9815 3.60644 3.9815 6.49158C3.9815 7.09747 4.05724 7.76826 4.32772 8.32005C3.83003 10.4623 2.81302 13.654 2.81302 15.8611C2.81302 16.5427 2.91039 17.2135 2.97531 17.8951C3.09793 18.0322 3.03662 18.0178 3.22415 17.9492C5.0418 15.4608 4.97688 14.9739 5.79915 11.7173C6.24274 12.5612 7.38959 13.0156 8.29841 13.0156C12.1284 13.0156 13.8487 9.28297 13.8487 5.91816C13.8487 2.33697 10.7544 0 7.35713 0Z" fill="#161E2D"/>
                                                </svg>     
                                            </a></li>
                                         </ul>   
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="flat-section pt-0">
                <div className="container">
                    <div id="map-contact" className="map-contact"  data-map-zoom="16" data-map-scroll="true"></div>

                </div>
            </section> */}

            <Footer/>
    </>
  )
}

export default Contact
