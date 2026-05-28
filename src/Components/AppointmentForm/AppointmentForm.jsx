import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmitSuccess }) => {
    const [patientName, setPatientName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [errors, setErrors] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let errorMessages = {};

        if (!patientName.trim()) errorMessages.patientName = "Le nom du patient est obligatoire.";
        if (!phoneNumber.trim()) errorMessages.phoneNumber = "Le numéro de téléphone est obligatoire.";
        if (!appointmentDate) errorMessages.appointmentDate = "Veuillez choisir une date.";
        if (!appointmentTime) errorMessages.appointmentTime = "Veuillez choisir un créneau horaire.";

        if (Object.keys(errorMessages).length > 0) {
            setErrors(errorMessages);
        } else {
            setErrors({});
            onSubmitSuccess({
                patientName,
                phoneNumber,
                appointmentDate,
                appointmentTime
            });
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <h3>Prendre Rendez-vous avec Dr. {doctorName}</h3>
            <p className="speciality-sub">{doctorSpeciality}</p>

            <div className="form-group">
                <label htmlFor="patientName">Nom du Patient :</label>
                <input type="text" id="patientName" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Entrez le nom complet" required />
                {errors.patientName && <span className="error-text">{errors.patientName}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Numéro de Téléphone :</label>
                <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Entrez votre numéro" required />
                {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="appointmentDate">Date du Rendez-vous :</label>
                <input type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
                {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="appointmentTime">Créneau Horaire :</label>
                <select id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required>
                    <option value="">-- Choisir un créneau --</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                </select>
                {errors.appointmentTime && <span className="error-text">{errors.appointmentTime}</span>}
            </div>

            <button type="submit" className="btn-submit-appointment">Confirmer le Rendez-vous</button>
        </form>
    );
};

export default AppointmentForm;