import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import AddToCart from './pages/admin/AddToCart';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import ChangePassword from './pages/admin/changepassword';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
import EditProfile from './pages/EditProfile';
import Favorite from './pages/Favorite';
import SearchResults from './pages/SearchResults';
import Payment from './pages/Payment'; // Import the Payment component
import Product from './pages/Product';
import Success from './pages/Success';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element={<UserRoutes />}>
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<EditProfile />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/cart' element={<AddToCart />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/edit/:id' element={<AdminEditProduct />} />
        </Route>
        <Route path='/search' element={<SearchResults />} />
        <Route path='/payment' element={<Payment />} /> {/* Add the Payment route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} /> {/* Add Success route */}
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
