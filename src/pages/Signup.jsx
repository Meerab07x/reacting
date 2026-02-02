import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaUserMd, FaEnvelope, FaLock, FaPhone, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'
import { getDoctors } from '../data/mockData'

function Signup() {
  const [userType, setUserType] = useState('patient')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    // Patient specific
    medicalConditions: '',
    allergies: '',
    bloodType: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    // Doctor specific
    specialty: '',
    qualifications: '',
    yearsExperience: '',
    bio: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const assignDoctor = (medicalConditions) => {
    const doctors = getDoctors()
    const conditions = medicalConditions.toLowerCase()
    
    // Simple logic to assign doctor based on conditions
    if (conditions.includes('heart') || conditions.includes('cardio')) {
      return doctors.find(d => d.specialty === 'Cardiology') || doctors[0]
    } else if (conditions.includes('child') || conditions.includes('pediatric')) {
      return doctors.find(d => d.specialty === 'Pediatrics') || doctors[0]
    } else if (conditions.includes('skin') || conditions.includes('derma')) {
      return doctors.find(d => d.specialty === 'Dermatology') || doctors[0]
    } else {
      // Assign to General Practice by default
      return doctors.find(d => d.specialty === 'General Practice') || doctors[0]
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (userType === 'patient') {
      const assignedDoctor = assignDoctor(formData.medicalConditions)
      
      const patientData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        age: new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear(),
        address: formData.address,
        medicalConditions: formData.medicalConditions.split(',').map(c => c.trim()),
        allergies: formData.allergies.split(',').map(a => a.trim()),
        bloodType: formData.bloodType,
        doctorId: assignedDoctor.id,
        assignedDoctor: assignedDoctor.name,
        registrationDate: new Date().toISOString().split('T')[0],
        emergencyContact: {
          name: formData.emergencyContactName,
          relationship: formData.emergencyContactRelationship,
          phone: formData.emergencyContactPhone
        }
      }
      signup(patientData, 'patient')
      navigate('/patient-dashboard')
    } else {
      const doctorData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        specialty: formData.specialty,
        qualifications: formData.qualifications,
        yearsExperience: parseInt(formData.yearsExperience),
        bio: formData.bio,
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        workingHours: { start: '09:00', end: '17:00' }
      }
      signup(doctorData, 'doctor')
      navigate('/doctor-dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '0.5rem',
          textAlign: 'center',
          color: '#2c3e50'
        }}>
          Create Account
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#7f8c8d',
          marginBottom: '2rem'
        }}>
          Join our healthcare system today
        </p>

        {/* User Type Toggle */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            type="button"
            onClick={() => setUserType('patient')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: userType === 'patient' ? '#3498db' : '#ecf0f1',
              color: userType === 'patient' ? 'white' : '#7f8c8d',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <FaUser /> Patient
          </button>
          <button
            type="button"
            onClick={() => setUserType('doctor')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: userType === 'doctor' ? '#2ecc71' : '#ecf0f1',
              color: userType === 'doctor' ? 'white' : '#7f8c8d',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            <FaUserMd /> Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '0.75rem',
              borderRadius: '6px',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          {/* Common Fields */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
              <FaUser style={{ marginRight: '0.5rem' }} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Smith"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid #ecf0f1',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
              <FaEnvelope style={{ marginRight: '0.5rem' }} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid #ecf0f1',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
              <FaLock style={{ marginRight: '0.5rem' }} />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid #ecf0f1',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </div>

          {/* Patient Specific Fields */}
          {userType === 'patient' && (
            <>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  <FaPhone style={{ marginRight: '0.5rem' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="07712345678"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  <FaCalendar style={{ marginRight: '0.5rem' }} />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  <FaMapMarkerAlt style={{ marginRight: '0.5rem' }} />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="123 High Street, London"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Medical Conditions (comma separated)
                </label>
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="e.g., Diabetes, Hypertension"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
                <small style={{ color: '#7f8c8d', fontSize: '0.85rem' }}>
                  A doctor will be automatically assigned based on your conditions
                </small>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Allergies (comma separated)
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="e.g., Penicillin, Peanuts"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
                Emergency Contact
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Contact Name
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  required
                  placeholder="Jane Doe"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Relationship
                </label>
                <input
                  type="text"
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  required
                  placeholder="Spouse, Parent, etc."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  required
                  placeholder="07712345679"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>
            </>
          )}

          {/* Doctor Specific Fields */}
          {userType === 'doctor' && (
            <>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Specialty
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select Specialty</option>
                  <option value="General Practice">General Practice</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Psychiatry">Psychiatry</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Qualifications
                </label>
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  placeholder="e.g., MBBS, MRCGP"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="10"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#2c3e50' }}>
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Tell us about your experience and expertise..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    outline: 'none'
                  }}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: userType === 'patient' ? '#3498db' : '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem',
              marginBottom: '1rem'
            }}
          >
            Create Account
          </button>

          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: userType === 'patient' ? '#3498db' : '#2ecc71',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup