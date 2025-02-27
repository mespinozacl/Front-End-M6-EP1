import axios from 'axios';

const API_URL_DOCTOR = 'https://jsonplaceholder.typicode.com/users';
const API_URL_SECURE = "http://localhost:3001";


import { Doctor } from '../objects/Doctor';
import { SecureData } from '../objects/SecureData';

interface DoctorDataFromAPI {
  id: number;
  name: string;
}

interface SecureDataFromAPI {
  id: number;
  info: string;
  // ... other properties
}

export const fetchDoctors = async (): Promise<Doctor[] | undefined> => {
  try {
    const response = await axios.get(`${API_URL_DOCTOR}/doctores`);
    if (!response) {
      throw new Error('Error fetching doctors');
    }

    const data: DoctorDataFromAPI[] = await response.data; // Tipamos 'data'

    const especialidades = ['Pediatría', 'Cardiología', 'Cirugía', 'Traumatología', 'Goma'];
        
    return data.map(({ id, name }: DoctorDataFromAPI) => ({ // Desestructuramos con el tipo correcto
      id: id,
      nombre: name,
      especialidad: especialidades[Math.floor(Math.random() * especialidades.length)],
      experiencia: Math.floor(Math.random() * 10) + 1,
      descripcion: name+' es especialista .....',
    })) as Doctor[];
  } 
  catch (err) {
    console.error(err); // Usamos console.error para errores
    return undefined; // Retornamos undefined en caso de error
  }
};

export const getSecureData = async (token: any): Promise<SecureData[] | undefined> => {
  try {
    const response = await axios.get(`${API_URL_SECURE}/secure-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: SecureDataFromAPI[] = await response.data; // Tipamos 'data'

    return data.map(({ id, info }: SecureDataFromAPI) => ({ // Desestructuramos con el tipo correcto
      id: id,
      info: info,
    })) as SecureData[];

  } catch (error) {
    console.error("Error al obtener datos protegidos:", error);
    throw error;
  }
};


