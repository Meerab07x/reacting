import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHospital, FaSignOutAlt, FaUser } from 'react-icons/fa'

function Navbar() {
  const { currentUser, userType, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '1rem 0',
      marginBottom: '0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        {/* Logo/Brand */}
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaHospital style={{ fontSize: '1.8rem' }} />
          <span>Surgery System</span>
        </Link>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {!currentUser ? (
            // Not logged in - show public links
            <>
              <Link to="/" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Home
              </Link>
              <Link to="/doctors" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.8'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Our Doctors
              </Link>
              <Link to="/login" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                padding: '0.5rem 1.5rem',
                backgroundColor: '#3498db',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Login
              </Link>
              <Link to="/signup" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '1rem',
                padding: '0.5rem 1.5rem',
                backgroundColor: '#2ecc71',
                borderRadius: '6px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
              >
                Sign Up
              </Link>
            </>
          ) : (
            // Logged in - show user-specific links
            <>
              {userType === 'patient' && (
                <>
                  <Link to="/patient-dashboard" style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                  >
                    My Dashboard
                  </Link>
                  <Link to="/doctors" style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                  >
                    Our Doctors
                  </Link>
                </>
              )}

              {userType === 'doctor' && (
                <>
                  <Link to="/doctor-dashboard" style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.8'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                  >
                    My Dashboard
                  </Link>
                </>
              )}

              {/* User Info */}
              <div style={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '6px'
              }}>
                <FaUser />
                <span>{currentUser.name}</span>
                <span style={{
                  fontSize: '0.8rem',
                  padding: '0.25rem 0.5rem',
                  backgroundColor: userType === 'patient' ? '#3498db' : '#2ecc71',
                  borderRadius: '4px',
                  marginLeft: '0.5rem'
                }}>
                  {userType}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                style={{
                  color: 'white',
                  backgroundColor: '#e74c3c',
                  border: 'none',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar