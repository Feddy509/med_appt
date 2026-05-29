import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
  // 🎯 TACHE: Ajoute yon "variable state" pou jere afichaj notifikasyon an
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  
  // Lojik pou kontwole si pou l parèt oswa non sou paj la
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const loadStorageData = () => {
      const storedUsername = sessionStorage.getItem('email');
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      }

      if (storedDoctorData) {
        setDoctorData(storedDoctorData);
      }

      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
        setShowNotification(true); // Gen randevou, nou mete eta a sou true
      } else {
        setAppointmentData(null);
        setShowNotification(false); // Pa gen randevou oswa li anile, nou kache l
      }
    };

    loadStorageData();

    const handleAppointmentChange = () => {
      loadStorageData();
    };

    window.addEventListener('appointmentChange', handleAppointmentChange);
    window.addEventListener('storage', handleAppointmentChange);

    return () => {
      window.removeEventListener('appointmentChange', handleAppointmentChange);
      window.removeEventListener('storage', handleAppointmentChange);
    };
  }, []);

  return (
    <div>
      <Navbar />
      {children}
      
      {/* 🎯 TACHE: Itilize variable state la ak appointmentData pou afiche notifikasyon an */}
      {isLoggedIn && showNotification && appointmentData && (
        <div className="appointment-notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              
              {/* 🎯 TACHE: Enkòpore detay anplis yo (Nom, Date, Heure) pou yo afiche byen pwòp */}
              <p className="appointment-card__message">
                <strong>Doctor:</strong> Dr. {doctorData?.name} <br />
                <strong>Patient Name:</strong> {appointmentData?.patientName} <br />
                <strong>Appointment Date:</strong> {appointmentData?.appointmentDate} <br />
                <strong>Appointment Time:</strong> {appointmentData?.appointmentTime}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;