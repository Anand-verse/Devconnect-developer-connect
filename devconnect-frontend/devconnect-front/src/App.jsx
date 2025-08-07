import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./components/pages/Signup.jsx"
import Login from "./components/pages/Login.jsx"
import Profile from "./components/pages/Profile.jsx"
import ProtectedRoute from "./components/pages/ProtectedRoute.jsx";
import './App.css';



function App() {


  return (
    
     <Router>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/profile" element={
          <ProtectedRoute>
          <Profile />
        </ProtectedRoute>}/>
      </Routes>
     </Router>
    
  )
}

export default App
