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

 // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      
      {/* <Navbar></Navbar> */}
      
      {/* Render children components */}
      {children}
      
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && showNotification && appointmentData && (
        <>
          <div className="appointment-notification-container">
            {/* Rès kòd notifikasyon an rete la... */}
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;