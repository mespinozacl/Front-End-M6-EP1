import React from 'react';
import { Doctor } from '../objects/Doctor';
import { DoctorCard } from './DoctorCard';

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <div>
      <div id="doctor-modal"/>
      <h2>Lista de Doctores</h2>
      <div>
      <React.Fragment>
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} /> 
          ))}
      </React.Fragment>
      </div>
      <div id="doctor-modal" />
    </div>
  );
};

export default DoctorList;