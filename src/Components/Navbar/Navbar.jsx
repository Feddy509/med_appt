import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
      // Nou pran premye pati imèl la (ex: peter@gmail.com -> Peter)
      const namePart = storedEmail.split('@')[0];
      setUsername(namePart.charAt(0).toUpperCase() + namePart.slice(1));
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear(); // Netwaye tou pou tès yo ka rekòmanse fre
    setIsLoggedIn(false);
    setDropdownActive(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MedApp 🏢</Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/instant-consultation">Consultation</Link></li>
        <li><Link to="/reviews">Reviews</Link></li>
        
        {isLoggedIn ? (
          <>
            {/* 🎯 TACHE LABORATWA: "Welcome, Peter" kòm yon zòn ki ka klike pou dropdown */}
            <li className="navbar-dropdown-container">
              <span 
                className="welcome-user-text" 
                onClick={() => setDropdownActive(!dropdownActive)}
              >
                Welcome, {username}
              </span>
              
              {dropdownActive && (
                <ul className="navbar-dropdown-menu">
                  <li>
                    {/* 🎯 TACHE LABORATWA: Dwe rele "Your Profile" egzakteman */}
                    <Link to="/profile" onClick={() => setDropdownActive(false)}>
                      Your Profile
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* 🎯 TACHE LABORATWA: Bouton Logout separe nan yon ti wonn ble bò kote l */}
            <li>
              <button onClick={handleLogout} className="btn-navbar-logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="btn-login">Connexion</Link></li>
            <li><Link to="/signup" className="btn-signup">S'inscrire</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;