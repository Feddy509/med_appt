import React from 'react';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic, careerProfile }) => {
    
    const handleAppointmentClick = () => {
        alert(`Vous avez choisi de prendre rendez-vous avec le Dr. ${name}. (Fonctionnalité à venir dans le prochain exercice !)`);
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-main-content">
                {/* Opsyonèl: Foto Doktè a */}
                <div className="doctor-card-profile-image">
                    <img 
                        src={profilePic || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"} 
                        alt={`Dr. ${name}`} 
                    />
                </div>

                {/* Blòk detay yo mande a avèk klas "doctor-card-details-container" lan */}
                <div className="doctor-card-details-container">
                    <h3 className="doctor-name">Dr. {name}</h3>
                    <p className="doctor-speciality">{speciality}</p>
                    <p className="doctor-experience"><strong>Expérience:</strong> {experience} ans</p>
                    
                    <div className="doctor-ratings">
                        <span className="star-icon">⭐</span>
                        <span className="rating-value">{ratings} / 5</span>
                    </div>

                    {careerProfile && (
                        <p className="doctor-career-profile">
                            {careerProfile}
                        </p>
                    )}

                    {/* ETAP 6: Bouton an ajoute la, sou dènye liy anndan detay yo nèt! 🎉 */}
                    <button className="btn-book-appointment" onClick={handleAppointmentClick}>
                        Prendre un rendez-vous
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;