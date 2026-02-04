import { Routes, Route } from 'react-router-dom'  // for the routing system
import Navbar from './components/Navbar'            // your navbar component
import Home from './pages/Home'                     // home page
import Login from './pages/Login'                   // login page
import Signup from './pages/Signup'                 // signup page
import Doctors from './pages/Doctors'               // doctors page
import PatientDashboard from './pages/PatientDashboard'   // patient dashboard
import DoctorDashboard from './pages/DoctorDashboard'     // doctor dashboard
import './App.css'                                  // your global styles

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App