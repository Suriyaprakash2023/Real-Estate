
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Index from './components/Index.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Properties from './components/Properties.jsx';
import Profile from './components/Profile.jsx';
import MyFavorites from './components/MyFavorites.jsx';
import MyProperties from './components/MyProperties.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddProperties from './components/AddProperties.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import Reviews from './components/Reviews.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import Sellers from './components/admin/Sellers.jsx';

import { AuthProvider} from './context/AuthContext.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import SoldProperties from './components/admin/SoldProperties.jsx';
function App() {

  return (
 
      <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<Index/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/Properties' element={<Properties/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/contact' element={<Contact/>} /> 
              <Route path="/profile" element={<Profile/>} />
              <Route path="/my_favorites" element={<MyFavorites/>} />
              <Route path="/my_properties" element={<MyProperties/>} />
              <Route path="/property_details/:id" element={<PropertyDetails />} />
              <Route path="/admin_dashboard" element={<ProtectedRoute requiredRole="Admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute requiredRole="Seller"><Dashboard /></ProtectedRoute>} />

              <Route path="/reviews" element={<ProtectedRoute  requiredRole="Seller"><Reviews/></ProtectedRoute>} />

              <Route path="/add_properties" element={<AddProperties/>} />
              <Route path='/sold_properties' element={<SoldProperties/>}/>
              <Route path='/sellers' element={<Sellers/>}/>
            </Routes>
          </AuthProvider>
      </BrowserRouter>
   
  )
}

export default App
