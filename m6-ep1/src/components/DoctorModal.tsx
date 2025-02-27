import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { DoctorContext } from '../context/DoctorContext';

interface DoctorModalProps {
  title?: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({
  title = "Info Doctor",
  showModal,
  setShowModal,
}) => {
  const { doctor } = useContext(DoctorContext);
  
  if (!doctor) {
    return null; // Or a loading indicator, or "No doctor selected" message
  }

  const { nombre, especialidad, experiencia, descripcion } = doctor;

return (
  <>
  {showModal && ReactDOM.createPortal(
  <div>
    <h3 className="modal-title" id="staticBackdropLabel">
    {title}
    </h3>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="modal"
      aria-label="Cerrar"
      onClick={() => setShowModal(false)}
    >Cerrar Modal</button>
    <p>Nombre: <strong>{nombre}</strong></p>
    <p>Especialidad: <strong>{especialidad}</strong></p>
    <p>Experiencia: <strong>{experiencia} años</strong></p>
    <p>Descripcion: <strong>{descripcion}</strong></p>
    <br/>
  </div>,
  document.getElementById('doctor-modal') as HTMLElement
  )}
</>
);};
export default DoctorModal;
