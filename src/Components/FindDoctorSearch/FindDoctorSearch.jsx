import React from 'react';
import DoctorCard from '../DoctorCardIC/DoctorCard'; // Verifye si chemen an bon selon dosye w la
import './InstantConsultation.css';

const InstantConsultation = () => {
    // 1️⃣ Done pou plizyè doktè (Etap 4 ak 5)
    const doctorsData = [
        {
            id: 1,
            name: "Jean Dupont",
            speciality: "Cardiologist",
            experience: 12,
            ratings: 4.8,
            profilePic: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop",
            careerProfile: "Spécialiste en cardiologie interventionnelle avec plus de 10 ans d'expérience dans les hôpitaux universitaires."
        },
        {
            id: 2,
            name: "Marie Paul",
            speciality: "Dermatologist",
            experience: 8,
            ratings: 4.6,
            profilePic: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=200&auto=format&fit=crop",
            careerProfile: "Experte en dermatologie clinique et esthétique, passionnée par la santé de la peau et la prévention."
        },
        {
            id: 3,
            name: "Pierre Noel",
            speciality: "Pediatrician",
            experience: 15,
            ratings: 4.9,
            profilePic: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop",
            careerProfile: "Dédié aux soins des enfants et des nourrissons, ancien chef de clinique en pédiatrie."
        }
    ];

    return (
        <div className="instant-consultation-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Médecins Disponibles pour une Consultation Instantanée</h2>
            
            <div className="doctors-list-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                {/* 2️⃣ Boukle sou lis la pou afiche chak doktè nan yon DoctorCard (Etap 7) */}
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