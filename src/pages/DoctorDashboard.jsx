import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaUserMd, FaCalendarAlt, FaUsers, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaClock, FaStethoscope } from 'react-icons/fa'
import { getAppointments, getPatients, updateAppointmentStatus } from '../data/mockData'

function DoctorDashboard() {
  const { currentUser, userType } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [activeTab, setActiveTab] = useState('appointments') // 'appointments' or 'patients'
  const [filterStatus, setFilterStatus] = useState('all') // 'all', 'pending', 'confirmed', 'completed'

  useEffect(() => {
    if (!currentUser || userType !== 'doctor') {
      navigate('/login')
      return
    }

    // Load appointments for this doctor
    const allAppointments = getAppointments()
    const myAppointments = allAppointments.filter(apt => apt.doctorId === currentUser.id)
    setAppointments(myAppointments)

    // Load patients assigned to this doctor
    const allPatients = getPatients()
    const myPatients = allPatients.filter(p => p.doctorId === currentUser.id)
    setPatients(myPatients)
  }, [currentUser, userType, navigate])

  const handleAppointmentAction = (appointmentId, action, notes = '') => {
    updateAppointmentStatus(appointmentId, action, notes)
    
    // Update local state
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: action, notes: notes }
        : apt
    )
    setAppointments(updatedAppointments)
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

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filterStatus)

  const pendingCount = appointments.filter(apt => apt.status === 'pending').length
  const confirmedCount = appointments.filter(apt => apt.status === 'confirmed').length
  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0])

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
          Welcome, {currentUser.name} 👨‍⚕️
        </h1>
        <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>
          {currentUser.specialty} • {currentUser.qualifications}
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: '#f39c12',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaHourglassHalf style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
            {pendingCount}
          </h3>
          <p style={{ margin: 0 }}>Pending Requests</p>
        </div>

        <div style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaCheckCircle style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
            {confirmedCount}
          </h3>
          <p style={{ margin: 0 }}>Confirmed Appointments</p>
        </div>

        <div style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaCalendarAlt style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
            {todayAppointments.length}
          </h3>
          <p style={{ margin: 0 }}>Today's Appointments</p>
        </div>

        <div style={{
          backgroundColor: '#9b59b6',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <FaUsers style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
            {patients.length}
          </h3>
          <p style={{ margin: 0 }}>Your Patients</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '1rem'
      }}>
        <button
          onClick={() => setActiveTab('appointments')}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: activeTab === 'appointments' ? '#2ecc71' : '#ecf0f1',
            color: activeTab === 'appointments' ? 'white' : '#7f8c8d',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <FaCalendarAlt /> Appointments
        </button>
        <button
          onClick={() => setActiveTab('patients')}
          style={{
            flex: 1,
            padding: '1rem',
            backgroundColor: activeTab === 'patients' ? '#2ecc71' : '#ecf0f1',
            color: activeTab === 'patients' ? 'white' : '#7f8c8d',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <FaUsers /> My Patients
        </button>
      </div>

      {/* Appointments Tab */}
      {activeTab === 'appointments' && (
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
            <h2 style={{ margin: 0, color: '#2c3e50' }}>Appointment Requests</h2>
            
            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setFilterStatus('all')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: filterStatus === 'all' ? '#3498db' : '#ecf0f1',
                  color: filterStatus === 'all' ? 'white' : '#7f8c8d',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: filterStatus === 'pending' ? '#f39c12' : '#ecf0f1',
                  color: filterStatus === 'pending' ? 'white' : '#7f8c8d',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('confirmed')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: filterStatus === 'confirmed' ? '#2ecc71' : '#ecf0f1',
                  color: filterStatus === 'confirmed' ? 'white' : '#7f8c8d',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: filterStatus === 'completed' ? '#95a5a6' : '#ecf0f1',
                  color: filterStatus === 'completed' ? 'white' : '#7f8c8d',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Completed
              </button>
            </div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#7f8c8d'
            }}>
              <FaCalendarAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
              <p>No {filterStatus !== 'all' ? filterStatus : ''} appointments found.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredAppointments.map(apt => (
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
                        <h3 style={{ margin: 0, color: '#2c3e50' }}>{apt.patientName}</h3>
                        {getStatusIcon(apt.status)}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaCalendarAlt style={{ color: '#7f8c8d' }} />
                          <span style={{ color: '#2c3e50', fontWeight: '500' }}>{apt.date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaClock style={{ color: '#7f8c8d' }} />
                          <span style={{ color: '#2c3e50', fontWeight: '500' }}>{apt.time}</span>
                        </div>
                      </div>
                      
                      <p style={{ margin: '0.5rem 0', color: '#2c3e50' }}>
                        <strong>Reason:</strong> {apt.reason}
                      </p>
                      
                      {apt.notes && (
                        <div style={{ 
                          margin: '0.5rem 0', 
                          padding: '0.75rem', 
                          backgroundColor: 'white', 
                          borderRadius: '6px',
                          borderLeft: '3px solid #3498db'
                        }}>
                          <strong>Your Note:</strong> {apt.notes}
                        </div>
                      )}
                    </div>
                    
                    <div style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      backgroundColor: 'white',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      marginLeft: '1rem'
                    }}>
                      {apt.status}
                    </div>
                  </div>

                  {/* Action Buttons for Pending Appointments */}
                  {apt.status === 'pending' && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #ecf0f1',
                      display: 'flex',
                      gap: '1rem'
                    }}>
                      <button
                        onClick={() => {
                          const note = prompt('Add a note for the patient (optional):')
                          handleAppointmentAction(apt.id, 'confirmed', note || 'Appointment confirmed')
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          backgroundColor: '#2ecc71',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <FaCheckCircle /> Confirm Appointment
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Please provide a reason for declining:')
                          if (reason) {
                            handleAppointmentAction(apt.id, 'declined', reason)
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '0.75rem',
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <FaTimesCircle /> Decline
                      </button>
                    </div>
                  )}

                  {/* Mark as Complete for Confirmed Appointments */}
                  {apt.status === 'confirmed' && (
                    <div style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #ecf0f1'
                    }}>
                      <button
                        onClick={() => {
                          const note = prompt('Add consultation notes:')
                          handleAppointmentAction(apt.id, 'completed', note || 'Appointment completed')
                        }}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          backgroundColor: '#95a5a6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === 'patients' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#2c3e50' }}>My Patients</h2>

          {patients.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#7f8c8d'
            }}>
              <FaUsers style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
              <p>No patients assigned yet.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {patients.map(patient => (
                <div
                  key={patient.id}
                  style={{
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid #ecf0f1'
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#3498db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold'
                    }}>
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, color: '#2c3e50' }}>{patient.name}</h3>
                      <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>
                        {patient.age} years old
                      </p>
                    </div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Blood Type:</strong>
                    <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{patient.bloodType}</p>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Medical Conditions:</strong>
                    <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>
                      {patient.medicalConditions?.join(', ') || 'None'}
                    </p>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Allergies:</strong>
                    <p style={{ margin: '0.25rem 0', color: '#e74c3c' }}>
                      {patient.allergies?.join(', ') || 'None'}
                    </p>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Contact:</strong>
                    <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{patient.phone}</p>
                    <p style={{ margin: '0.25rem 0', color: '#2c3e50', fontSize: '0.9rem' }}>
                      {patient.email}
                    </p>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Last Visit:</strong>
                    <p style={{ margin: '0.25rem 0', color: '#2c3e50' }}>{patient.lastVisit || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard