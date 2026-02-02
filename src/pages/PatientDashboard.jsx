import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaCalendarAlt, FaStethoscope, FaPhone, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa'
import { getAppointments, getDoctors, saveAppointment } from '../data/mockData'

function PatientDashboard() {
  const { currentUser, userType } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [bookingData, setBookingData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  })

  useEffect(() => {
    if (!currentUser || userType !== 'patient') {
      navigate('/login')
      return
    }

    // Load appointments for this patient
    const allAppointments = getAppointments()
    const myAppointments = allAppointments.filter(apt => apt.patientId === currentUser.id)
    setAppointments(myAppointments)

    // Load all doctors
    setDoctors(getDoctors())
  }, [currentUser, userType, navigate])

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    
    const selectedDoctor = doctors.find(d => d.id === parseInt(bookingData.doctorId))
    
    const newAppointment = {
      id: Date.now(),
      patientId: currentUser.id,
      patientName: currentUser.name,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: bookingData.date,
      time: bookingData.time,
      reason: bookingData.reason,
      status: 'pending',
      notes: ''
    }

    saveAppointment(newAppointment)
    
    // Update state
    setAppointments([...appointments, newAppointment])
    
    // Reset form
    setBookingData({ doctorId: '', date: '', time: '', reason: '' })
    setShowBookingForm(false)
    
    alert('Appointment request submitted! The doctor will review it soon.')
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed':
        return <FaCheckCircle style={{ color: '#2ecc71' }} />
      case 'declined':
        return <FaTimesCircle style={{ color: '#e74c3c' }} />
      case 'pending':
        return <FaHourglassHalf style={{ color: '#f39c12' }} />
      case 'completed':
        return <FaCheckCircle style={{ color: '#95a5a6' }} />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#d4edda'
      case 'declined': return '#f8d7da'
      case 'pending': return '#fff3cd'
      case 'completed': return '#e2e3e5'
      default: return '#f8f9fa'
    }
  }

  // Get working days (Monday-Friday)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const assignedDoctor = doctors.find(d => d.id === currentUser?.doctorId)

  if (!currentUser) return null

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
          Welcome back, {currentUser.name}! 👋
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          Manage your appointments and health records
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaCalendarAlt style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
            {appointments.filter(a => a.status !== 'completed').length}
          </h3>
          <p style={{ margin: 0 }}>Upcoming Appointments</p>
        </div>

        <div style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaStethoscope style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
            {assignedDoctor?.name || 'Not Assigned'}
          </h3>
          <p style={{ margin: 0 }}>Your Doctor</p>
        </div>

        <div style={{
          backgroundColor: '#9b59b6',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaUser style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>
            {currentUser.bloodType}
          </h3>
          <p style={{ margin: 0 }}>Blood Type</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Personal Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            Personal Information
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Email:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{currentUser.email}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Phone:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{currentUser.phone}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Date of Birth:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{currentUser.dateOfBirth}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Address:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{currentUser.address}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Medical Conditions:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>
              {currentUser.medicalConditions?.join(', ') || 'None'}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Allergies:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>
              {currentUser.allergies?.join(', ') || 'None'}
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>
            Emergency Contact
          </h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Name:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>
              {currentUser.emergencyContact?.name}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Relationship:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>
              {currentUser.emergencyContact?.relationship}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <strong style={{ color: '#7f8c8d' }}>Phone:</strong>
            <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>
              <FaPhone style={{ marginRight: '0.5rem' }} />
              {currentUser.emergencyContact?.phone}
            </p>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#e8f4f8',
            borderRadius: '8px',
            borderLeft: '4px solid #3498db'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '1.1rem' }}>
              Assigned Doctor
            </h3>
            <p style={{ margin: '0.25rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
              {assignedDoctor?.name}
            </p>
            <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>
              {assignedDoctor?.specialty}
            </p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#7f8c8d' }}>
              {assignedDoctor?.qualifications}
            </p>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>My Appointments</h2>
          <button
            onClick={() => setShowBookingForm(!showBookingForm)}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {showBookingForm ? 'Cancel' : '+ Book New Appointment'}
          </button>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <form onSubmit={handleBookingSubmit} style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Request New Appointment</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Select Doctor
              </label>
              <select
                value={bookingData.doctorId}
                onChange={(e) => setBookingData({...bookingData, doctorId: e.target.value})}
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
                <option value="">Choose a doctor...</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  min={getMinDate()}
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
                <small style={{ color: '#7f8c8d' }}>Monday - Friday only</small>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Preferred Time
                </label>
                <select
                  value={bookingData.time}
                  onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
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
                  <option value="">Select time...</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Reason for Visit
              </label>
              <textarea
                value={bookingData.reason}
                onChange={(e) => setBookingData({...bookingData, reason: e.target.value})}
                required
                rows="3"
                placeholder="Please describe your symptoms or reason for visit..."
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

            <button
              type="submit"
              style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Submit Request
            </button>
          </form>
        )}

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#7f8c8d'
          }}>
            <FaCalendarAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
            <p>No appointments yet. Book your first appointment above!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appointments.map(apt => (
              <div
                key={apt.id}
                style={{
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  backgroundColor: getStatusColor(apt.status)
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0, color: '#2c3e50' }}>{apt.doctorName}</h3>
                      {getStatusIcon(apt.status)}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaCalendarAlt style={{ color: '#7f8c8d' }} />
                        <span style={{ color: '#2c3e50' }}>{apt.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FaClock style={{ color: '#7f8c8d' }} />
                        <span style={{ color: '#2c3e50' }}>{apt.time}</span>
                      </div>
                    </div>
                    
                    <p style={{ margin: '0.5rem 0', color: '#7f8c8d' }}>
                      <strong>Reason:</strong> {apt.reason}
                    </p>
                    
                    {apt.notes && (
                      <p style={{ margin: '0.5rem 0', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px' }}>
                        <strong>Doctor's Note:</strong> {apt.notes}
                      </p>
                    )}
                  </div>
                  
                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem'
                  }}>
                    {apt.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientDashboard