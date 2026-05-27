import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Landing_Page from './Components/Landing_Page/Landing_Page'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar  */}
      <Navbar />

      <Routes>
        {/* Route pour la page d'acceuil */}
        <Route path="/" element={<Landing_Page/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App