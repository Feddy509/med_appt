import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

// 🎯 FÒM LAN (GiveReviews) - Avèk lojik ak id ki kòrèk nèt
function GiveReviews({ doctorName, onReviewSubmit }) {
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5 // Nou mete l kòm yon chif dirèkteman
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating) {
      setShowWarning(false);
      onReviewSubmit(formData);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div className="review-modal-content">
      <form onSubmit={handleSubmit}>
        <h2>Donner votre avis pour le Dr. {doctorName}</h2>
        
        {showWarning && <p className="warning" style={{ color: 'red' }}>Veuillez remplir tous les champs.</p>}
        
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Note (1-5) :</label>
          <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="review">Avis / Commentaire :</label>
          <textarea 
            id="review" 
            name="review" 
            value={formData.review} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <button type="submit" className="btn-submit-review">Soumettre</button>
      </form>
    </div>
  );
}

// 🎯 KONPOZAN PRENSIPAL LA (ReviewForm)
const ReviewForm = () => {
    const [consultations, setConsultations] = useState([]);
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        const storedDoctor = JSON.parse(localStorage.getItem('doctorData'));
        let activeAppointments = [];
        
        if (storedDoctor) {
            const storedAppointment = JSON.parse(localStorage.getItem(storedDoctor.name));
            if (storedAppointment) {
                activeAppointments.push({
                    id: 1,
                    doctorName: storedDoctor.name,
                    speciality: storedDoctor.speciality,
                    patientName: storedAppointment.patientName,
                    date: storedAppointment.appointmentDate
                });
            }
        }

        const extraConsultations = [
            { id: 2, doctorName: "Jean Dupont", speciality: "Cardiologue", patientName: "Fednel Charite", date: "2026-05-20" },
            { id: 3, doctorName: "Marie Paul", speciality: "Dermatologue", patientName: "Fednel Charite", date: "2026-05-25" }
        ];

        setConsultations([...activeAppointments, ...extraConsultations]);
    }, []);

    const handleSaveReview = (consultationId, submittedData) => {
        setReviews({
            ...reviews,
            [consultationId]: {
                name: submittedData.name,
                reviewText: submittedData.review,
                ratingStars: parseInt(submittedData.rating, 10) // Nou fòse l tounen Integer baz 10
            }
        });
    };

    return (
        <div className="review-form-container">
            <h2 className="review-title">Vos Consultations Passées</h2>
            
            {consultations.length === 0 ? (
                <p className="no-consultation">Aucune consultation disponible pour le moment.</p>
            ) : (
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Doctor Name</th>
                            <th>Doctor Speciality</th>
                            <th>Provide feedback</th>
                            <th>Review Given</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultations.map((consultation, index) => (
                            <tr key={consultation.id}>
                                <td>{index + 1}</td>
                                <td>Dr. {consultation.doctorName}</td>
                                <td>{consultation.speciality}</td>
                                <td>
                                    <Popup
                                        trigger={
                                            <button className="btn-give-review" disabled={!!reviews[consultation.id]}>
                                                {reviews[consultation.id] ? "Avis Transmis" : "Cliquez ici"}
                                            </button>
                                        }
                                        modal
                                        nested
                                        contentStyle={{ maxWidth: '450px', width: '90%', borderRadius: '10px', padding: '20px' }}
                                    >
                                        {close => (
                                            <div className="review-modal">
                                                <button className="close-modal-btn" onClick={close}>&times;</button>
                                                <GiveReviews 
                                                    doctorName={consultation.doctorName} 
                                                    onReviewSubmit={(data) => {
                                                        handleSaveReview(consultation.id, data);
                                                        close();
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </Popup>
                                </td>
                                
                                {/* 🎯 SEKSYON ANBÒDHI WOUJ LA: Lòd la ranje 100% kounye a */}
                                <td>
                                    {reviews[consultation.id] ? (
                                        <div className="submitted-review" style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                            {/* 1. Nom an premye */}
                                            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 'bold', color: '#1e293b' }}>
                                                {reviews[consultation.id].name}
                                            </p>
                                            
                                            {/* 2. Commentaire an dezyèm */}
                                            <p style={{ margin: 0, fontSize: '0.90rem', color: '#475569', fontStyle: 'italic' }}>
                                                "{reviews[consultation.id].reviewText}"
                                            </p>
                                            
                                            {/* 3. Note/Stars anba nèt */}
                                            <span className="stars" style={{ fontSize: '0.90rem', color: '#f59e0b' }}>
                                                {"⭐".repeat(reviews[consultation.id].ratingStars || 5)}
                                            </span>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReviewForm;