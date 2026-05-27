import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    let errorMessages = {};

    if (!email) {
      errorMessages.email = "L'adresse email est obligatoire.";
    }
    if (!password) {
      errorMessages.password = "Le mot de passe est obligatoire.";
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
    } else {
      setErrors({});
      console.log("Connexion en cours...", { email, password });
    }
  };

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit" className="btn-submit" style={{ marginTop: '15px' }}>Se connecter</button>
      </form>
    </div>
  );
};

export default Login;