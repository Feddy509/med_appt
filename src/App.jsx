import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Landing_Page from './Components/Landing_Page/Landing_Page'
import Sign_Up from './Components/Sign_Up/Sign_Up'
import Login from './Components/Login/Login'
import ReviewForm from './Components/ReviewForm/ReviewForm';

// Importation de tes deux composants de consultation
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'
import BookingConsultation from './Components/BookingConsultation'

// Importation du composant Notification
import Notification from './Components/Notification/Notification'

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* La Navbar reste visible partout en haut */}
        <Navbar />

        {/* 🎯 TÂCHE : Notification enveloppe TOUTES les Routes du site */}
        <Notification>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Sign_Up />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/reviews" element={<ReviewForm />} />
            {/* 🎯 TÂCHE : Remplacement de <component_route> par ton composant personnalisé */}
            <Route path="/booking-consultation" element={<BookingConsultation />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  )
}

export default App