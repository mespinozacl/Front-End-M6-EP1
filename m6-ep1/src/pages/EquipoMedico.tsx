import { useState, useEffect, useContext } from 'react';
import MainLayout from "../layouts/MainLayout";
import { fetchDoctors } from '../services/DoctorAPI';
import DoctorList from '../components/DoctorList';
import DoctorContextProvider  from '../context/DoctorContextProvider';
import { DoctorContext }  from '../context/DoctorContext';
import { Doctor } from '../objects/Doctor';
import { useDebounce } from 'use-debounce';

export default function EquipoMedico() {
  const [isLoading, setIsLoading] = useState(true);
  const { doctors, setDoctors } = useContext(DoctorContext);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce search term

  const [initialLoad, setInitialLoad] = useState(false); // Flag for initial load


  const filterBySpec = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    if (!doctors || !debouncedSearchTerm) {
        setFilteredDoctors(doctors);
        return;
    }

    const lowerCaseTerm = debouncedSearchTerm.toLowerCase()
        .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
        .replace(/ó/g, 'o').replace(/ú/g, 'u');

    const filtered = doctors.filter((doctor) =>
        doctor.especialidad.toLowerCase()
            .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
            .replace(/ó/g, 'o').replace(/ú/g, 'u')
            .includes(lowerCaseTerm)
    );
    setFilteredDoctors(filtered);
  }, [doctors, debouncedSearchTerm]);

  const getAllDoctors = async () => {
    setIsLoading(true);
    try {
        const data = await fetchDoctors();
        if (data) {
            const doctorObjects = data.map(doctor => new Doctor(doctor));
            setDoctors(doctorObjects);
            setFilteredDoctors(doctorObjects);
        } else {
            console.warn("fetchDoctors returned no data.");
            setDoctors([]);
            setFilteredDoctors([]);
            alert("No se encontraron médicos.");
        }
    } catch (error) {
        console.error('Error fetching doctors:', error);
        alert('Error al obtener los medicos'); // Consider a better error message
    } finally {
        setIsLoading(false);
        setInitialLoad(true); // Set initial load to true after fetching
    }
};

useEffect(() => {
  if (!initialLoad) { // Check if it is the initial load
    getAllDoctors();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [initialLoad]); // Add initialLoad to the dependency array

return (
  <DoctorContextProvider> {/* Wrap with the Provider */}
      <MainLayout>
          <main>
              <section className="medical-team-section">
                  <h1>Nuestro Gran Equipo</h1>
                  <p className="fs-4">
                      Somos profesionales del mejor país de Chile.
                      Somos excelentes carniceros,
                      formados en las mejores carnicerias del mundo mundial.
                  </p>
              </section>
              <section>
                  <h2>Equipo de Carniceros</h2>
                  <button className="btn btn-primary" onClick={getAllDoctors}>
                      Recargar Lista
                  </button>
                  <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Filtrar por especialidad"
                      value={searchTerm}
                      onChange={(e) => filterBySpec(e.target.value)}
                  />
                  {isLoading ? <p>Cargando...</p> : <DoctorList doctors={filteredDoctors} />}
              </section>
          </main>
      </MainLayout>
  </DoctorContextProvider>
);

}
