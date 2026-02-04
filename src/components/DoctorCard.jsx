import { FaGraduationCap, FaClock, FaCalendarAlt, FaStar, FaUserMd } from 'react-icons/fa'

function DoctorCard({ doctor }) {
  if (!doctor) return null

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
      e.currentTarget.style.borderColor = '#2ecc71'
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
      e.currentTarget.style.borderColor = 'transparent'
    }}
    >
      {/* Doctor Header */}
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
          background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          <FaUserMd />
        </div>

        {/* Name & Specialty */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            marginBottom: '0.4rem',
            color: '#2c3e50',
            fontSize: '1.2rem'
          }}>
            {doctor.name}
          </h3>
          <div style={{
            display: 'inline-block',
            padding: '0.3rem 0.85rem',
            backgroundColor: '#e8f8f0',
            color: '#2ecc71',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}>
            {doctor.specialty}
          </div>
        </div>
      </div>

      {/* Info Rows */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Qualifications */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <FaGraduationCap style={{ color: '#3498db', flexShrink: 0, fontSize: '1.1rem' }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Qualifications</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>{doctor.qualifications}</span>
          </div>
        </div>

        {/* Experience */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <FaStar style={{ color: '#f39c12', flexShrink: 0, fontSize: '1.1rem' }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Experience</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>
              {doctor.yearsExperience} years
            </span>
          </div>
        </div>

        {/* Availability */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <FaCalendarAlt style={{ color: '#9b59b6', flexShrink: 0, fontSize: '1.1rem' }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Available Days</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>
              {doctor.availability?.join(', ')}
            </span>
          </div>
        </div>

        {/* Working Hours */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.6rem 0.75rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <FaClock style={{ color: '#e74c3c', flexShrink: 0, fontSize: '1.1rem' }} />
          <div>
            <span style={{ color: '#7f8c8d', fontSize: '0.8rem', display: 'block' }}>Working Hours</span>
            <span style={{ color: '#2c3e50', fontSize: '0.95rem' }}>
              {doctor.workingHours?.start} - {doctor.workingHours?.end}
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      {doctor.bio && (
        <div style={{
          marginTop: '1.25rem',
          padding: '0.85rem',
          backgroundColor: '#e8f8f0',
          borderRadius: '8px',
          borderLeft: '4px solid #2ecc71'
        }}>
          <p style={{
            margin: 0,
            color: '#2c3e50',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            fontStyle: 'italic'
          }}>
            "{doctor.bio}"
          </p>
        </div>
      )}

      {/* Accepting Badge */}
      <div style={{
        marginTop: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.6rem',
        backgroundColor: '#d4edda',
        color: '#155724',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.9rem'
      }}>
        ✓ Accepting New Patients
      </div>
    </div>
  )
}

export default DoctorCard 