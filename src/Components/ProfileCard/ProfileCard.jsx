import React, { useState, useEffect } from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Fednel Charite',
    email: '',
    phone: '46536347',
    address: 'Port-au-Prince, Haïti'
  });

  useEffect(() => {
    // Rekiperé imèl itilizatè ki konekte a
    const storedEmail = sessionStorage.getItem('email') || 'user@example.com';
    
    // Tcheke si gen done profil ki te deja sove
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (savedProfile) {
      setProfileData(savedProfile);
    } else {
      setProfileData(prevState => ({ ...prevState, email: storedEmail }));
    }
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Sove nouvo enfòmasyon yo nan localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
  };

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {profileData.name.charAt(0).toUpperCase()}
          </div>
          <h2>{profileData.name}</h2>
          <p className="profile-role">Patient</p>
        </div>

        <hr className="profile-divider" />

        {!isEditing ? (
          // 🎯 MÒD AFICHAJ (Format Carte)
          <div className="profile-details">
            <div className="detail-group">
              <strong>Nom Complet:</strong>
              <span>{profileData.name}</span>
            </div>
            <div className="detail-group">
              <strong>Adresse Électronique:</strong>
              <span>{profileData.email}</span>
            </div>
            <div className="detail-group">
              <strong>Numéro de Téléphone:</strong>
              <span>{profileData.phone}</span>
            </div>
            <div className="detail-group">
              <strong>Adresse Résidentielle:</strong>
              <span>{profileData.address}</span>
            </div>
            <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
              Modifier le Profil
            </button>
          </div>
        ) : (
          // 🎯 MÒD EDISYON (Formulaire)
          <form onSubmit={handleSave} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Nom Complet:</label>
              <input type="text" id="name" name="name" value={profileData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={profileData.email} disabled />
              <small>L'adresse email ne peut pas être modifiée.</small>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone:</label>
              <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adresse:</label>
              <input type="text" id="address" name="address" value={profileData.address} onChange={handleChange} required />
            </div>
            <div className="profile-form-buttons">
              <button type="submit" className="btn-save-profile">Enregistrer</button>
              <button type="button" className="btn-cancel-profile" onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;