import React, { useState } from 'react';
import './Sign_Up.css';

const Sign_Up = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignUp = (e) => {
    e.preventDefault();
    let errorMessages = {};

    if (!name.trim()) {
      errorMessages.name = "Le nom est obligatoire.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errorMessages.email = "L'adresse email est obligatoire.";
    } else if (!emailRegex.test(email)) {
      errorMessages.email = "Format d'email invalide.";
    }

    if (!password) {
      errorMessages.password = "Le mot de passe est obligatoire.";
    } else if (password.length < 6) {
      errorMessages.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
    } else {
      setErrors({});
      console.log("Inscription réussie !", { name, email, password });
    }
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Nom</label>
          <input 
            type="text" 
            className="form-control" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.name && <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input 
            type="password" 
            className="form-control" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{errors.password}</span>}
        </div>

        <button type="submit" className="btn-submit" style={{ marginTop: '15px' }}>S'inscrire</button>
      </form>
    </div>
  );
};

export default Sign_Up;