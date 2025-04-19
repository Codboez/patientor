import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import { Patient } from "../types";

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }

    patientService.getOne(id).then(patient => {
      setPatient(patient);
    });
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      gender: {patient.gender}<br/>
      ssn: {patient.ssn}<br/>
      occupation: {patient.occupation}<br/>
      date of birth: {patient.dateOfBirth}<br/>

      <h3>Entries</h3>
      {patient.entries.map(entry => 
        <div key={entry.id}>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes?.map(code => 
              <li key={code}>{code}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientInfoPage;