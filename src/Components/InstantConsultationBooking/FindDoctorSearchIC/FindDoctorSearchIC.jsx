import React, { useState } from 'react';
import './FindDoctorSearchIC.css';

const FindDoctorSearchIC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showList, setShowList] = useState(false);

    const specialities = ['Cardiologist', 'Dermatologist', 'General Physician', 'Gynecologist', 'Pediatrician'];

    const handleSelectSpeciality = (speciality) => {
        setSearchQuery(speciality);
        setShowList(false);
    };

    return (
        <div className="find-doctor-search-container">
            <h2>Trouver un médecin et réserver une consultation</h2>
            <div className="search-box-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Entrez une spécialité (ex: Cardiologist)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowList(true)}
                    onBlur={() => { setTimeout(() => setShowList(false), 200); }}
                />

                {showList && (
                    <ul className="speciality-list">
                        {specialities
                            .filter(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((speciality, index) => (
                                <li key={index} onMouseDown={() => handleSelectSpeciality(speciality)} className="speciality-item">
                                    {speciality}
                                </li>
                            ))
                        }
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FindDoctorSearchIC;