import React from 'react';
// 🎯 Isit la nou soti nan dosye sa a (..) pou n al jwenn dosye DoctorCard ou te kreye nan Components lan!
import DoctorCard from '../DoctorCard/DoctorCard'; 
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';

const InstantConsultation = () => {
    const doctorsData = [
        { id: 1, name: "Sarah Johnson", speciality: "Dentist", experience: 9, ratings: 4.9, profilePic: "", careerProfile: "Dédiée à des soins dentaires de haute qualité pour toute la famille." },
        { id: 2, name: "Jean Dupont", speciality: "Cardiologist", experience: 12, ratings: 4.8, profilePic: "", careerProfile: "Spécialiste renommé en cardiologie clinique." },
        { id: 3, name: "Marie Paul", speciality: "Dermatologist", experience: 8, ratings: 4.6, profilePic: "", careerProfile: "Experte en soins dermatologiques." }
    ];

    return (
        <div className="instant-consultation-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <FindDoctorSearchIC />
            <h2 style={{ marginTop: '40px', color: '#1e293b', textAlign: 'center' }}>Médecins Disponibles</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
                {doctorsData.map((doctor) => (
                    <DoctorCard 
                        key={doctor.id}
                        name={doctor.name}
                        speciality={doctor.speciality}
                        experience={doctor.experience}
                        ratings={doctor.ratings}
                        profilePic={doctor.profilePic}
                        careerProfile={doctor.careerProfile}
                    />
                ))}
            </div>
        </div>
    );
};

export default InstantConsultation;