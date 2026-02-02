import { useState, useEffect } from 'react'
import {
  FaUserMd,
  FaGraduationCap,
  FaClock,
  FaCalendarAlt,
  FaStar
} from 'react-icons/fa'
import { getDoctors } from '../data/mockData'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    setDoctors(getDoctors())
  }, [])

  const specialties = ['all', ...new Set(doctors.map(d => d.specialty))]

  const filteredDoctors =
    filter === 'all'
      ? doctors
      : doctors.filter(d => d.specialty === filter)

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>
        Our Medical Professionals
      </h1>

      <p style={{
        textAlign: 'center',
        color: '#7f8c8d',
        maxWidth: '600px',
        margin: '1rem auto 2rem'
      }}>
        Meet our team of experienced doctors available for appointments
      </p>

      {/* Filter */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        {specialties.map(specialty => (
          <button
            key={specialty}
            onClick={() => setFilter(specialty)}
            style={{
              margin: '0.25rem',
              padding: '0.6rem 1.2rem',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor:
                filter === specialty ? '#3498db' : '#ecf0f1',
              color:
                filter === specialty ? 'white' : '#2c3e50'
            }}
          >
            {specialty === 'all' ? 'All' : specialty}
          </button>
        ))}
      </div>

      {/* Doctors */}
      {filteredDoctors.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
          No doctors found
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ color: '#2c3e50' }}>
                {doctor.name}
              </h3>

              <p style={{ color: '#3498db', fontWeight: '600' }}>
                {doctor.specialty}
              </p>

              <div style={{ marginTop: '1rem' }}>
                <p>
                  <FaGraduationCap /> {doctor.qualifications}
                </p>

                <p>
                  <FaStar /> {doctor.yearsExperience} years experience
                </p>

                <p>
                  <FaCalendarAlt /> {doctor.availability?.join(', ')}
                </p>

                <p>
                  <FaClock /> {doctor.workingHours?.start} – {doctor.workingHours?.end}
                </p>
              </div>

              <p style={{
                marginTop: '1rem',
                fontStyle: 'italic',
                color: '#555'
              }}>
                "{doctor.bio}"
              </p>

              <div style={{
                marginTop: '1rem',
                padding: '0.5rem',
                backgroundColor: '#d4edda',
                color: '#155724',
                textAlign: 'center',
                borderRadius: '6px'
              }}>
                Accepting New Patients
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to action */}
      <div style={{
        marginTop: '3rem',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        <h3 style={{ color: '#2c3e50' }}>
          Need an appointment?
        </h3>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <a
            href="/signup"
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px'
            }}
          >
            Sign Up
          </a>

          <a
            href="/login"
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#2ecc71',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px'
            }}
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  )
}

export default Doctors
