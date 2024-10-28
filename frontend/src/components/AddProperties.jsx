import React from 'react'
import Header from './Header'
import DashboardSideNav from './DashboardSideNav'
import API_BASE_URL from '../context/data';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AddProperties = () => {
    const navigate = useNavigate();
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
console.log("hi")
  return (
    <>
      <p>fdhfh</p>
    </>
  )
}

export default AddProperties
