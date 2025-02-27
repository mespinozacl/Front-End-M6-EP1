import { createContext} from 'react';
import { Doctor } from '../objects/Doctor';

export interface DoctorContextType {
    doctors: Doctor[];
    doctor: Doctor | null;
    setDoctor: (doctor: Doctor | null) => void;
    setDoctors: (doctor: Doctor[]) => void;
    showModalDoctor: boolean;
    setShowModalDoctor: (show: boolean) => void;
  }

export const DoctorContext = createContext<DoctorContextType>({
    doctors: [],
    doctor: null, // Initialize to null
    setDoctor: () => {}, // No-op function
    setDoctors: () => {}, // No-op function
    showModalDoctor: false,
    setShowModalDoctor: () => {}, // No-op function
});