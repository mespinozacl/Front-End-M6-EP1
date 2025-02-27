import { Doctor } from '../objects/Doctor';

interface DoctorDataFromAPI {
  id: number;
  name: string;
}

export const fetchDoctors = async (): Promise<Doctor[] | undefined> => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Error fetching doctors');
    }

    const data: DoctorDataFromAPI[] = await response.json(); // Tipamos 'data'

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