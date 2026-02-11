import { patients, doctors } from '../data/mockData'

function Patients() {
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId)
    return doctor ? doctor.name : 'Unknown'
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Patient Records</h1>
      
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Age</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Doctor</th>
            <th style={{ padding: '1rem', textAlign: 'left' }}>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '1rem' }}>{patient.name}</td>
              <td style={{ padding: '1rem' }}>{patient.age}</td>
              <td style={{ padding: '1rem' }}>{getDoctorName(patient.doctorId)}</td>
              <td style={{ padding: '1rem' }}>{patient.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Patients