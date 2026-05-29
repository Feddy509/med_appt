import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

const ReviewForm = () => {
    const [consultations, setConsultations] = useState([]);
    const [reviews, setReviews] = useState({});
    const [formData, setFormData] = useState({ name: '', review: '', rating: 5 });

    useEffect(() => {
        // 1. Nou rekiperé randevou ki nan localStorage la (sa ou te simulation an)
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

        // 2. 🎯 NOU AJOUTE 2 LÒT KONSILTASYON ANPLIS DIREKTEMAN LA POU TABLO A GEN 3 LIY
        const extraConsultations = [
            {
                id: 2,
                doctorName: "Jean Dupont",
                speciality: "Cardiologist",
                patientName: "Fednel Charite",
                date: "2026-05-20"
            },
            {
                id: 3,
                doctorName: "Marie Paul",
                speciality: "Dermatologist",
                patientName: "Fednel Charite",
                date: "2026-05-25"
            }
        ];

        // Konbine randevou an dirèk la ak 2 konsiltasyon anplis yo
        setConsultations([...activeAppointments, ...extraConsultations]);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleReviewSubmit = (e, consultationId) => {
        e.preventDefault();
        setReviews({
            ...reviews,
            [consultationId]: {
                reviewText: formData.review,
                ratingStars: parseInt(formData.rating)
            }
        });
        setFormData({ name: '', review: '', rating: 5 });
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
                            <th>Numéro</th>
                            <th>Nom du Docteur</th>
                            <th>Spécialité</th>
                            <th>Donner un avis</th>
                            <th>Votre commentaire</th>
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
                                                {reviews[consultation.id] ? "Avis Donné" : "Click Here"}
                                            </button>
                                        }
                                        modal
                                        nested
                                        contentStyle={{ maxWidth: '450px', width: '90%', borderRadius: '10px', padding: '20px' }}
                                    >
                                        {close => (
                                            <div className="review-modal">
                                                <button className="close-modal-btn" onClick={close}>&times;</button>
                                                <h3>Laisser un avis pour Dr. {consultation.doctorName}</h3>
                                                
                                                <form onSubmit={(e) => { handleReviewSubmit(e, consultation.id); close(); }}>
                                                    <div className="form-group">
                                                        <label>Votre Nom:</label>
                                                        <input type="text" name="name" defaultValue={consultation.patientName} required />
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label>Note (Stars):</label>
                                                        <select name="rating" value={formData.rating} onChange={handleInputChange}>
                                                            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                                                            <option value="4">⭐⭐⭐⭐ (4)</option>
                                                            <option value="3">⭐⭐⭐ (3)</option>
                                                            <option value="2">⭐⭐ (2)</option>
                                                            <option value="1">⭐ (1)</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label>Commentaire:</label>
                                                        <textarea name="review" rows="4" value={formData.review} onChange={handleInputChange} required></textarea>
                                                    </div>
                                                    
                                                    <button type="submit" className="btn-submit-review">Soumettre l'avis</button>
                                                </form>
                                            </div>
                                        )}
                                    </Popup>
                                </td>
                                <td>
                                    {reviews[consultation.id] ? (
                                        <div className="submitted-review">
                                            <span className="stars">{"⭐".repeat(reviews[consultation.id].ratingStars)}</span>
                                            <p>{reviews[consultation.id].reviewText}</p>
                                        </div>
                                    ) : (
                                        <span className="pending-review">Pas encore d'avis</span>
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