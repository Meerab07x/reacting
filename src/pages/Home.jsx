import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaCalendarAlt, FaUserMd, FaUsers, FaHospital, FaCheckCircle, FaClock, FaShieldAlt } from 'react-icons/fa'

function Home() {
  const { currentUser, userType } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '0 0 30px 30px',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          fontWeight: '700'
        }}>
          Welcome to Surgery Management System
        </h1>
        <p style={{
          fontSize: '1.3rem',
          marginBottom: '2rem',
          maxWidth: '700px',
          margin: '0 auto',
          opacity: 0.95
        }}>
          Modern healthcare made simple. Book appointments, manage patient records, 
          and connect with doctors - all in one secure platform.
        </p>

        {!currentUser ? (
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <Link to="/signup" style={{
              backgroundColor: 'white',
              color: '#667eea',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Get Started
            </Link>
            <Link to="/login" style={{
              backgroundColor: 'transparent',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: '600',
              border: '2px solid white',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#667eea'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = 'white'
            }}
            >
              Sign In
            </Link>
          </div>
        ) : (
          <Link to={userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard'} style={{
            backgroundColor: 'white',
            color: '#667eea',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            display: 'inline-block',
            marginTop: '1rem',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      {/* Features Section */}
      <div style={{ padding: '0 2rem', marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#2c3e50'
        }}>
          Why Choose Our System?
        </h2>
        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          color: '#7f8c8d',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Built with simplicity and efficiency in mind for both patients and healthcare providers
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Feature 1 */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <FaCalendarAlt style={{ fontSize: '2rem', color: '#3498db' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Easy Booking</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Book appointments online in seconds. Choose your preferred doctor, date, and time slot.
            </p>
          </div>

          {/* Feature 2 */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#e8f5e9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <FaUserMd style={{ fontSize: '2rem', color: '#2ecc71' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Expert Doctors</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Access qualified healthcare professionals across various specialties, all in one place.
            </p>
          </div>

          {/* Feature 3 */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#f3e5f5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <FaUsers style={{ fontSize: '2rem', color: '#9b59b6' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Patient Records</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              All your medical information stored securely and accessible whenever you need it.
            </p>
          </div>

          {/* Feature 4 */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#fff3e0',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <FaClock style={{ fontSize: '2rem', color: '#f39c12' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Real-Time Updates</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Get instant notifications when your appointment is confirmed or updated by your doctor.
            </p>
          </div>

          {/* Feature 5 */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#ffebee',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <FaShieldAlt style={{ fontSize: '2rem', color: '#e74c3c' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Secure & Private</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Your medical data is encrypted and protected with industry-standard security measures.
            </p>
          </div>

          {/* Feature 6 */}
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: '#e0f2f1',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <FaHospital style={{ fontSize: '2rem', color: '#16a085' }} />
            </div>
            <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Digital First</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              Say goodbye to paper forms. Everything is managed digitally for maximum efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '4rem 2rem',
        borderRadius: '30px',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          color: '#2c3e50'
        }}>
          How It Works
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Step 1 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: '0 auto 1rem auto'
            }}>
              1
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Create Account</h3>
            <p style={{ color: '#7f8c8d' }}>
              Sign up as a patient or doctor with your details
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#2ecc71',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: '0 auto 1rem auto'
            }}>
              2
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Get Matched</h3>
            <p style={{ color: '#7f8c8d' }}>
              Patients are automatically assigned to appropriate doctors
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#9b59b6',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              margin: '0 auto 1rem auto'
            }}>
              3
            </div>
            <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Book & Manage</h3>
            <p style={{ color: '#7f8c8d' }}>
              Schedule appointments and manage your healthcare journey
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!currentUser && (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            color: '#2c3e50'
          }}>
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#7f8c8d',
            marginBottom: '2rem'
          }}>
            Join our platform today and experience modern healthcare management
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <Link to="/signup" style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
            >
              <FaUsers /> Sign Up as Patient
            </Link>
            <Link to="/signup" style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
            >
              <FaUserMd /> Sign Up as Doctor
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home