import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import PatientCard from '../components/PatientCard'
import { FaUserMd, FaCalendarAlt, FaUsers, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaClock } from 'react-icons/fa'
import { getAppointments, getPatients, updateAppointmentStatus } from '../data/mockData'

function DoctorDashboard() {
  const { currentUser, userType } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [activeTab, setActiveTab] = useState('appointments')
  const [filterStatus, setFilterStatus] = useState('all')
  const [notes, setNotes] = useState({})

  useEffect(() => {
    if (!currentUser || userType !== 'doctor') {
      navigate('/login')
      return
    }

    const allAppointments = getAppointments()
    const myAppointments = allAppointments.filter(apt => apt.doctorId === currentUser.id)
    setAppointments(myAppointments)

    const allPatients = getPatients()
    const myPatients = allPatients.filter(p => p.doctorId === currentUser.id)
    setPatients(myPatients)
  }, [currentUser, userType, navigate])

  const handleAppointmentAction = (appointmentId, action) => {
    const note = notes[appointmentId] || (action === 'confirmed' ? 'Appointment confirmed' : '')
    updateAppointmentStatus(appointmentId, action, note)

    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, status: action, notes: note }
          : apt
      )
    )
    // Clear the note after action
    setNotes(prev => ({ ...prev, [appointmentId]: '' }))
  }

  const handleNoteChange = (appointmentId, value) => {
    setNotes(prev => ({ ...prev, [appointmentId]: value }))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <FaCheckCircle style={{ color: '#2ecc71' }} />
      case 'declined': return <FaTimesCircle style={{ color: '#e74c3c' }} />
      case 'pending': return <FaHourglassHalf style={{ color: '#f39c12' }} />
      case 'completed': return <FaCheckCircle style={{ color: '#95a5a6' }} />
      default: return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#d4edda'
      case 'declined': return '#f8d7da'
      case 'pending': return '#fff3cd'
      case 'completed': return '#e2e3e5'
      default: return '#f8f9fa'
    }
  }

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'confirmed': return '#155724'
      case 'declined': return '#721c16'
      case 'pending': return '#856404'
      case 'completed': return '#383d41'
      default: return '#2c3e50'
    }
  }

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filterStatus)

  const pendingCount = appointments.filter(a => a.status === 'pending').length
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length
  const completedCount = appointments.filter(a => a.status === 'completed').length
  const todayCount = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length

  if (!currentUser) return null

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
        color: 'white',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', margin: 0, marginBottom: '0.5rem' }}>
            Welcome, {currentUser.name}
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            {currentUser.specialty} • {currentUser.qualifications}
          </p>
        </div>
        <FaUserMd style={{ fontSize: '3.5rem', opacity: 0.3 }} />
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {[
          { label: 'Pending Requests', count: pendingCount, color: '#f39c12', icon: <FaHourglassHalf style={{ fontSize: '1.8rem' }} /> },
          { label: 'Confirmed', count: confirmedCount, color: '#2ecc71', icon: <FaCheckCircle style={{ fontSize: '1.8rem' }} /> },
          { label: 'Completed', count: completedCount, color: '#3498db', icon: <FaCheckCircle style={{ fontSize: '1.8rem' }} /> },
          { label: 'My Patients', count: patients.length, color: '#9b59b6', icon: <FaUsers style={{ fontSize: '1.8rem' }} /> }
        ].map((stat, index) => (
          <div key={index} style={{
            backgroundColor: stat.color,
            color: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              padding: '0.75rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2rem' }}>{stat.count}</h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '0.75rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <button
          onClick={() => setActiveTab('appointments')}
          style={{
            flex: 1,
            padding: '0.85rem',
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
            gap: '0.5rem',
            transition: 'all 0.3s'
          }}
        >
          <FaCalendarAlt /> Appointments
          {pendingCount > 0 && (
            <span style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              width: '22px',
              height: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}>
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('patients')}
          style={{
            flex: 1,
            padding: '0.85rem',
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
            gap: '0.5rem',
            transition: 'all 0.3s'
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
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ margin: 0, color: '#2c3e50' }}>Appointment Requests</h2>

            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { value: 'all', label: 'All', color: '#3498db' },
                { value: 'pending', label: 'Pending', color: '#f39c12' },
                { value: 'confirmed', label: 'Confirmed', color: '#2ecc71' },
                { value: 'completed', label: 'Completed', color: '#95a5a6' },
                { value: 'declined', label: 'Declined', color: '#e74c3c' }
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: filterStatus === filter.value ? filter.color : '#ecf0f1',
                    color: filterStatus === filter.value ? 'white' : '#7f8c8d',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Appointments List */}
          {filteredAppointments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#7f8c8d'
            }}>
              <FaCalendarAlt style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '1.1rem' }}>No {filterStatus !== 'all' ? filterStatus : ''} appointments found.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredAppointments.map(apt => (
                <div
                  key={apt.id}
                  style={{
                    border: '2px solid #ecf0f1',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Status Bar at top */}
                  <div style={{
                    backgroundColor: getStatusColor(apt.status),
                    padding: '0.5rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {getStatusIcon(apt.status)}
                      <span style={{
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        color: getStatusTextColor(apt.status)
                      }}>
                        {apt.status}
                      </span>
                    </div>
                    <span style={{ color: '#7f8c8d', fontSize: '0.85rem' }}>
                      Request #{apt.id}
                    </span>
                  </div>

                  {/* Appointment Details */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '1rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      {/* Patient Info */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          flexShrink: 0
                        }}>
                          {apt.patientName?.charAt(0)}
                        </div>
                        <div>
                          <h3 style={{ margin: 0, color: '#2c3e50' }}>{apt.patientName}</h3>
                          <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>Patient</p>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px'
                        }}>
                          <FaCalendarAlt style={{ color: '#3498db' }} />
                          <span style={{ color: '#2c3e50', fontWeight: '500' }}>{apt.date}</span>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '8px'
                        }}>
                          <FaClock style={{ color: '#9b59b6' }} />
                          <span style={{ color: '#2c3e50', fontWeight: '500' }}>{apt.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div style={{
                      padding: '0.85rem',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      borderLeft: '4px solid #3498db'
                    }}>
                      <strong style={{ color: '#2c3e50', fontSize: '0.9rem' }}>Reason for Visit:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#7f8c8d' }}>{apt.reason}</p>
                    </div>

                    {/* Existing Notes */}
                    {apt.notes && (
                      <div style={{
                        padding: '0.85rem',
                        backgroundColor: '#e8f8f0',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                        borderLeft: '4px solid #2ecc71'
                      }}>
                        <strong style={{ color: '#2c3e50', fontSize: '0.9rem' }}>Your Note:</strong>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#2c3e50' }}>{apt.notes}</p>
                      </div>
                    )}

                    {/* Actions for Pending */}
                    {apt.status === 'pending' && (
                      <div style={{ marginTop: '1rem' }}>
                        <textarea
                          placeholder="Add a note for the patient (optional)..."
                          value={notes[apt.id] || ''}
                          onChange={(e) => handleNoteChange(apt.id, e.target.value)}
                          rows="2"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '0.95rem',
                            border: '2px solid #ecf0f1',
                            borderRadius: '8px',
                            outline: 'none',
                            marginBottom: '0.75rem',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                          }}
                        />
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <button
                            onClick={() => handleAppointmentAction(apt.id, 'confirmed')}
                            style={{
                              flex: 1,
                              padding: '0.75rem',
                              backgroundColor: '#2ecc71',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2ecc71'}
                          >
                            <FaCheckCircle /> Confirm
                          </button>
                          <button
                            onClick={() => handleAppointmentAction(apt.id, 'declined')}
                            style={{
                              flex: 1,
                              padding: '0.75rem',
                              backgroundColor: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '1rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.5rem',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
                          >
                            <FaTimesCircle /> Decline
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions for Confirmed */}
                    {apt.status === 'confirmed' && (
                      <div style={{ marginTop: '1rem' }}>
                        <textarea
                          placeholder="Add consultation notes..."
                          value={notes[apt.id] || ''}
                          onChange={(e) => handleNoteChange(apt.id, e.target.value)}
                          rows="2"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            fontSize: '0.95rem',
                            border: '2px solid #ecf0f1',
                            borderRadius: '8px',
                            outline: 'none',
                            marginBottom: '0.75rem',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                          }}
                        />
                        <button
                          onClick={() => handleAppointmentAction(apt.id, 'completed')}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2980b9'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3498db'}
                        >
                          Mark as Completed
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Patients Tab */}
      {activeTab === 'patients' && (
        <div>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, color: '#2c3e50' }}>My Patients</h2>
            <div style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#e8f8f0',
              borderRadius: '20px',
              color: '#2ecc71',
              fontWeight: '600',
              fontSize: '0.9rem'
            }}>
              Total: {patients.length}
            </div>
          </div>

          {patients.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: '#7f8c8d'
            }}>
              <FaUsers style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
              <p style={{ fontSize: '1.1rem' }}>No patients assigned yet.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '1.5rem'
            }}>
              {patients.map(patient => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  doctorName={currentUser?.name}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard