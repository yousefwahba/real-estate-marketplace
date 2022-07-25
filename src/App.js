import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Explore from "./pages/Explore";
import Category from "./pages/Category";
import ForegetPassword from "./pages/ForgetPassword";
import SignIN from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Offers from "./pages/Offers";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/sign-in' element={<SignIN />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forget-password' element={<ForegetPassword />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/offers' element={<Offers />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/contact/:landlordId' element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
