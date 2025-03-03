import React,{ useEffect, useState }  from "react";
import {Routes, Route } from "react-router-dom";
import SignupPage from "./Pages/authPages/SignUp";
import LoginPage from "./Pages/authPages/LogIn";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Home from "./Pages/Home";
import FormPage from "./Pages/FormPage";
import { requestPermition } from "./Firebase";
import ChatPage from "./Pages/ChatPage";
import './App.css'
import Signature from "./components/Signature";
import AddProperty from "./Pages/OwnerPages/AddProperty";
import ForgotPassword from "./Pages/authPages/ForgotPassword";
import Dashboard from "./Pages/OwnerPages/Dashboard";
import ViewPdf from "./Pages/ViewPdf";
import { LeasePage } from "./components/LeaseCard";
import PropertyDetailPage from "./Pages/PropertyDetailPage";
import UpdateProperty from "./Pages/OwnerPages/UpdateProperty";
import UserProfile from "./Pages/UserProfile";
import PaymentComponent from "./Pages/PaymentComponent";
import Favorite from "./Pages/Favorite";
import OwnerLeaseAgreement from "./Pages/OwnerPages/OwnerLeaseAgreement";
import ReviewRating from "./Pages/ReviewRating";
import Filter from "./components/Filter";

const App = () => {
  const [fcmToken,setFcmToken]=useState(null);
  useEffect(()=>{
    const fetchFCMToken=async()=>{
      try {
       const token = await requestPermition()
       setFcmToken(token);
       console.log("FCMToken",token);
      } catch (error) {
        console.log("getting error FCM Token",error);
      }
    }
    fetchFCMToken();
  })
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/payment" element={<PaymentComponent />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/form" element={<FormPage/>} />
      <Route path="/AddProperty" element={<AddProperty/>}/>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signature" element={<Signature/>} />
      <Route path="/logout" element={<ForgotPassword />}/>
      <Route path="/propertyDetailPage" element={<PropertyDetailPage />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/property" element={<AddProperty />}/>
      <Route path="/view-pdf" element={<ViewPdf/>}/>
      <Route path="/ownerLeaseAgreement" element={<OwnerLeaseAgreement/>}/>
      <Route path="/updateProperty" element={<UpdateProperty />}/>
      <Route path="/profile" element={<UserProfile />}/>
      <Route path="/forgotpassword" element={<ForgotPassword />}/>
      <Route path="/review" element={<ReviewRating/>}/>
      <Route path="/filter" element={<Filter/>}/>
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Favorite />
        </ProtectedRoute>
      }/>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
           <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
