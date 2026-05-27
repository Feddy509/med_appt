import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); 
    const navigate = useNavigate(); 

    const register = async (e) => {
        e.preventDefault(); 

        // Nou mete adrès la dirèkteman la pou evite erè enpòtasyon config lan
        const response = await fetch(`http://localhost:8181/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); 

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            navigate("/");
            window.location.reload(); 
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); 
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="container" style={{marginTop:'5%', maxWidth: '400px'}}>
            <div className="signup-grid">
                <div className="signup-form">
                    <h2>Créer un compte</h2>
                    {showerr && <div className="err" style={{ color: 'red', marginBottom: '10px' }}>{showerr}</div>}
                    
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="form-control" placeholder="Enter your name" required />
                        </div>

                        <div className="form-group" style={{marginTop:'10px'}}>
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" required />
                        </div>

                        <div className="form-group" style={{marginTop:'10px'}}>
                            <label htmlFor="phone">Téléphone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" required />
                        </div>

                        <div className="form-group" style={{marginTop:'10px'}}>
                            <label htmlFor="password">Mot de passe</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" required />
                        </div>

                        <button type="submit" className="btn-submit" style={{marginTop:'20px', width: '100%'}}>S'inscrire</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;