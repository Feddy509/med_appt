import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation(); // Sa ap fòse Navbar a re-tcheke chak fwa wout la chanje!

  const handleClick = () => {
    setClick(!click);
  };

  // Tcheke status la chak fwa itilizatè a chanje paj
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const name = sessionStorage.getItem("name");
    
    if (token) {
      setIsLoggedIn(true);
      setUsername(name || 'Utilisateur');
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [location]); // <--- Gwo sekrè a se la! L ap koute "location" kounye a.

  const handleLogout = () => {
    sessionStorage.clear(); // Netwaye tout kach la yon sèl kou
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">
            MedApp StayHealthy 
            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb', display: 'inline-block', marginLeft: '5px', verticalAlign: 'middle' }}>
              <title>Doctor With Stethoscope SVG icon</title>
              <g>
                <g>
                  <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                  <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                  <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44.5,77.2-89.2v-118c-90.5-15.2-160.1-94-160.8-188.9H693.2z"></path>
                </g>
              </g>
            </svg>
          </Link>
          <span>.</span>
        </div>

        <div className="nav__icon" onClick={handleClick}>
          <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
        </div>

        <ul className={`nav__links ${click ? "active" : ""}`}>
          <li className="link">
            <Link to="/">Accueil</Link>
          </li>
          
          {/* Bouton sa a pral mennen dirèkteman sou paj rechèch la nou sot kreye a! */}
          <li className="link">
            <Link to="/instant-consultation">Appointments</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="link" style={{ color: '#3685fb', fontWeight: 'bold', alignSelf: 'center' }}>
                Bienvenue, {username}
              </li>
              <li className="link">
                <button className="btn1" onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
          ) : (
            <>
              <li className="link">
                <Link to="/signup">
                  <button className="btn1">Sign Up</button>
                </Link>
              </li>
              <li className="link">
                <Link to="/login">
                  <button className="btn1">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;