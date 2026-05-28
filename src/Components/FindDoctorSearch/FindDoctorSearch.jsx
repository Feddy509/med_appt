import React, { useState } from 'react';
import './FindDoctorSearchIC.css'; // Li ka sèvi ak menm CSS la

const FindDoctorSearch = () => {
    // 1️⃣ Lojik pou jere sa itilizatè a ap tape ak afichaj lis la
    const [searchQuery, setSearchQuery] = useState('');
    const [showList, setShowList] = useState(false);

    // Lis espesyalite yo pou referans lan
    const specialities = [
        'Cardiologist',
        'Dermatologist',
        'General Physician',
        'Gynecologist',
        'Pediatrician'
    ];

    const handleSelectSpeciality = (speciality) => {
        setSearchQuery(speciality);
        setShowList(false); // Kache lis la yon fwa li fin chwazi yonn
    };

    return (
        <div className="find-doctor-search-container">
            <h2>Trouver un médecin et réserver une consultation</h2>
            
            <div className="search-box-container" style={{ position: 'relative', maxWidth: '400px', margin: '20px 0' }}>
                {/* 2️⃣ Champ de saisie ak onFocus ak onBlur jan remak la mande l */}
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Entrez une spécialité (ex: Cardiologist)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowList(true)} // Afiche lis la lè l klike andedan
                    onBlur={() => {
                        // Yon ti dèlè (timeout) pou bay tan pou klike sou yon eleman anvan l kache
                        setTimeout(() => setShowList(false), 200);
                    }}
                />

                {/* 3️⃣ Afichaj lis espesyalite yo si showList la vre */}
                {showList && (
                    <ul className="speciality-list" style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        listStyle: 'none',
                        padding: '5px 0',
                        margin: 0,
                        zIndex: 1000,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        {specialities
                            .filter(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((speciality, index) => (
                                <li 
                                    key={index} 
                                    onMouseDown={() => handleSelectSpeciality(speciality)} // onMouseDown kouri anvan onBlur
                                    style={{
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                        borderBottom: index !== specialities.length - 1 ? '1px solid #eee' : 'none'
                                    }}
                                    className="speciality-item"
                                >
                                    {speciality}
                                </li>
                            ))
                        }
                        {specialities.filter(spec => spec.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <li style={{ padding: '10px 15px', color: '#888' }}>Aucune spécialité trouvée</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FindDoctorSearch;