import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Landing_Page from './Components/Landing_Page/Landing_Page'
import Sign_Up from './Components/Sign_Up/Sign_Up'
import Login from './Components/Login/Login'
import BookingConsultation from './Components/BookingConsultation'

// 🎯 NOU ENPÒTE NOTIFICATION AN LA POU L KA SÈVI NAN WOUT LA
import Notification from './Components/Notification/Notification'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/login" element={<Login />} />
        
        {/* 🎯 NOUVO WOUT KONSULTASYON AN: 
          Nou vlope BookingConsultation anndan Notification jan laboratwa a mande l la
        */}
        <Route 
          path="/instant-consultation" 
          element={
            <Notification>
              <BookingConsultation />
            </Notification>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App