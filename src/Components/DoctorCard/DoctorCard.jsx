import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// 🎯 Isit la nou soti pou n al chèche AppointmentForm nan dosye ou te kreye dirèkteman nan Components lan!
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic, careerProfile }) => {
    const [appointmentData, setAppointmentData] = useState(null);

    const handleFormSubmitSuccess = (data) => {
        setAppointmentData(data); // Sove done yo
    };

    const handleCancelAppointment = () => {
        setAppointmentData(null); // Efase randevou a
    };

    return (
        <div className="doctor-card-container">
            <div className="doctor-card-main-content">
                <div className="doctor-card-profile-image">
                    <img 
                        src={profilePic || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop"} 
                        alt={`Dr. ${name}`} 
                    />
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

                    {/* Rezime konplè sou dènye liy lan jan yo te mande l la */}
                    {appointmentData ? (
                        <div className="appointment-booked-info" style={{ textAlign: 'left', marginTop: '15px' }}>
                            <h3 style={{ color: '#94a3b8', fontSize: '1.5rem', fontWeight: 'bold', margin: '10px 0' }}>
                                Appointment Booked!
                            </h3>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>
                                Name: {appointmentData.patientName}
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>
                                Phone Number: {appointmentData.phoneNumber}
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>
                                Appointment Date: {appointmentData.appointmentDate}
                            </p>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: '5px 0' }}>
                                Appointment Time: {appointmentData.appointmentTime}
                            </p>
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
                                    <AppointmentForm 
                                        doctorName={name} 
                                        doctorSpeciality={speciality} 
                                        onSubmitSuccess={(data) => { 
                                            handleFormSubmitSuccess(data); 
                                            close(); 
                                        }} 
                                    />
                                </div>
                            )}
                        </Popup>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;