import { DoctorContext, DoctorContextType } from './DoctorContext'; // Import the context and the type
import React, { useState } from 'react';
import { Doctor } from '../objects/Doctor';

const DoctorContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [showModalDoctor, setShowModalDoctor] = useState(false);

    const value: DoctorContextType = { // Type the value
        doctors,
        doctor,
        setDoctor,
        setDoctors,
        showModalDoctor,
        setShowModalDoctor,
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider; // Export the provider
