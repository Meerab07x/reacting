import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaUserMd, FaLock, FaEnvelope } from 'react-icons/fa'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('patient')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const success = login(email, password, userType)
    if (success) {
      if (userType === 'patient') {
        navigate('/patient-dashboard')
      } else {
        navigate('/doctor-dashboard')
      }
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '3rem',
        maxWidth: '450px',
        width: '100%'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '0.5rem',
          textAlign: 'center',
          color: '#2c3e50'
        }}>
          Welcome Back
        </h1>
        <p style={{ 
          textAlign: 'center', 
          color: '#7f8c8d',
          marginBottom: '2rem'
        }}>
          Sign in to access your account
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
              fontWeight: '500',
              transition: 'all 0.3s'
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
              fontWeight: '500',
              transition: 'all 0.3s'
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
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '500'
            }}>
              <FaEnvelope style={{ marginRight: '0.5rem' }} />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                border: '2px solid #ecf0f1',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#2c3e50',
              fontWeight: '500'
            }}>
              <FaLock style={{ marginRight: '0.5rem' }} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                border: '2px solid #ecf0f1',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3498db'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
          </div>

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
              transition: 'transform 0.2s',
              marginBottom: '1rem'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Sign In
          </button>

          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              style={{ 
                color: userType === 'patient' ? '#3498db' : '#2ecc71',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign up here
            </Link>
          </p>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#6c757d'
        }}>
          <strong>Demo Credentials:</strong><br/>
          Patient: john.smith@email.com / patient123<br/>
          Doctor: sarah.johnson@surgery.com / doctor123
        </div>
      </div>
    </div>
  )
}

export default Login