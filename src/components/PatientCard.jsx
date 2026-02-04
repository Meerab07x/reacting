import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat, FaAllergies, FaUserMd, FaCalendarAlt } from 'react-icons/fa'

function PatientCard({ patient, doctorName }) {
  if (!patient) return null

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s',
      border: '2px solid transparent',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)'
      e.currentTarget.style.borderColor = '#3498db'
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
      e.currentTarget.style.borderColor = 'transparent'
    }}
    >
      {/* Patient Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        paddingBottom: '1.5rem',
        borderBottom: '2px solid #ecf0f1'
      }}>
        {/* Avatar */}
        <div style={{
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          {patient.name?.charAt(0)}
        </div>

        {/* Name & Age */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            marginBottom: '0.4rem',
            color: '#2c3e50',
            fontSize: '1.2rem'
          }}>
            {patient.name}
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              backgroundColor: '#e3f2fd',
              color: '#3498db',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              Age: {patient.age}
            </div>
            <div style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              backgroundColor: patient.bloodType ? '#fce4ec' : '#f8f9fa',
              color: patient.bloodType ? '#e74c3c' : '#7f8c8d',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              {patient.bloodType || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ marginBottom: '1.25rem' }}>
        <strong style={{
          color: '#2c3e50',
          fontSize: '0.95rem',
          display: 'block',
          marginBottom: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #ecf0f1'
        }}>
          Contact Information
        </strong>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '0.5rem'
        }}>
          <FaPhone style={{ color: '#2ecc71', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Phone</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>{patient.phone || 'N/A'}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '0.5rem'
        }}>
          <FaEnvelope style={{ color: '#3498db', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Email</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>{patient.email || 'N/A'}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <FaMapMarkerAlt style={{ color: '#9b59b6', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Address</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>{patient.address || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Medical Info */}
      <div style={{ marginBottom: '1.25rem' }}>
        <strong style={{
          color: '#2c3e50',
          fontSize: '0.95rem',
          display: 'block',
          marginBottom: '0.75rem',
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #ecf0f1'
        }}>
          Medical Information
        </strong>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          marginBottom: '0.5rem'
        }}>
          <FaHeartbeat style={{ color: '#e74c3c', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Medical Conditions</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>
              {patient.medicalConditions?.length > 0 
                ? patient.medicalConditions.join(', ') 
                : 'None recorded'}
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#ffebee',
          borderRadius: '8px'
        }}>
          <FaAllergies style={{ color: '#e74c3c', flexShrink: 0 }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Allergies</span>
            <span style={{ color: '#e74c3c', fontSize: '0.95rem', fontWeight: '600' }}>
              {patient.allergies?.length > 0 
                ? patient.allergies.join(', ') 
                : 'None recorded'}
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      {patient.emergencyContact && (
        <div style={{ marginBottom: '1.25rem' }}>
          <strong style={{
            color: '#2c3e50',
            fontSize: '0.95rem',
            display: 'block',
            marginBottom: '0.75rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #ecf0f1'
          }}>
            Emergency Contact
          </strong>

          <div style={{
            padding: '0.75rem',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            borderLeft: '4px solid #3498db'
          }}>
            <p style={{ margin: 0, color: '#2c3e50', fontWeight: '600' }}>
              {patient.emergencyContact.name}
            </p>
            <p style={{ margin: '0.25rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
              {patient.emergencyContact.relationship}
            </p>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50', fontSize: '0.9rem' }}>
              <FaPhone style={{ marginRight: '0.5rem', color: '#2ecc71' }} />
              {patient.emergencyContact.phone}
            </p>
          </div>
        </div>
      )}

      {/* Assigned Doctor */}
      <div style={{
        marginTop: 'auto',
        padding: '0.85rem',
        backgroundColor: '#e8f8f0',
        borderRadius: '8px',
        borderLeft: '4px solid #2ecc71',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <FaUserMd style={{ color: '#2ecc71', fontSize: '1.3rem', flexShrink: 0 }} />
        <div>
          <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>
            Assigned Doctor
          </span>
          <span style={{ color: '#2c3e50', fontSize: '0.95rem', fontWeight: '600' }}>
            {doctorName || patient.assignedDoctor || 'Not Assigned'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PatientCard 