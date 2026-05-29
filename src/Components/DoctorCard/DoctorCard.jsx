import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic, careerProfile }) => {
    const [appointmentData, setAppointmentData] = useState(null);

    // Tcheke nan localStorage si doktè sa a te deja gen yon randevou ki sove lè paj la chaje
    useEffect(() => {
        const storedAppointment = JSON.parse(localStorage.getItem(name));
        if (storedAppointment) {
            setAppointmentData(storedAppointment);
        }
    }, [name]);

    const handleFormSubmitSuccess = (data) => {
        // 1. Sove enfòmasyon doktè a nan localStorage jan modèl Notification an mande l la
        const doctorInfo = { name, speciality };
        localStorage.setItem('doctorData', JSON.stringify(doctorInfo));

        // 2. Sove enfòmasyon randevou a anba non doktè a
        localStorage.setItem(name, JSON.stringify(data));
        setAppointmentData(data);

        // 3. 🎯 Deklanche evènman pou Notification.jsx ka wè sa epi mete tèt li ajou imedyatman!
        window.dispatchEvent(new Event('appointmentChange'));
    };

    const handleCancelAppointment = () => {
        // 1. 🎯 Efase randevou a nan localStorage pou l pa parèt ankò
        localStorage.removeItem(name);
        setAppointmentData(null);

        // 2. 🎯 Deklanche evènman an pou Notification.jsx kache tèt li (retire l sou paj la) imedyatman!
        window.dispatchEvent(new Event('appointmentChange'));
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-main-content">
                <div className="doctor-card-profile-image">
                    <img src={profilePic || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"} alt={`Dr. ${name}`} />
                </div>

                <div className="doctor-card-details-container">
                    <h3 className="doctor-name">Dr. {name}</h3>
                    <p className="doctor-speciality">{speciality}</p>
                    <p className="doctor-experience">{experience} years experience</p>
                    <div className="doctor-ratings">
                        <span>Ratings: </span>
                        <span style={{ color: '#f59e0b' }}>⭐⭐⭐⭐⭐</span>
                    </div>

                    {careerProfile && <p className="doctor-career-profile">{careerProfile}</p>}

                    <div className="doctor-card-options-container" style={{ marginTop: '15px' }}>
                        {appointmentData ? (
                            <div className="appointment-booked-info" style={{ textAlign: 'left' }}>
                                <h3 style={{ color: '#94a3b8', fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>
                                    Appointment Booked!
                                </h3>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>Name: {appointmentData.patientName}</p>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>Phone Number: {appointmentData.phoneNumber}</p>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>Appointment Date: {appointmentData.appointmentDate}</p>
                                <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>Appointment Time: {appointmentData.appointmentTime}</p>
                                
                                <button onClick={handleCancelAppointment} className="btn-cancel-appointment" style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '12px 20px', width: '100%', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', marginTop: '15px' }}>
                                    Cancel Appointment
                                </button>
                            </div>
                        ) : (
                            <Popup 
                                trigger={<button className="btn-book-appointment">Book Appointment</button>} 
                                modal 
                                nested
                                contentStyle={{ maxWidth: '450px', width: '90%', borderRadius: '12px', padding: '20px' }}
                            >
                                {close => (
                                    <div className="modal">
                                        <button className="close-modal-btn" onClick={close} style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
                                        <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmitSuccess={(data) => { handleFormSubmitSuccess(data); close(); }} />
                                    </div>
                                )}
                            </Popup>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;