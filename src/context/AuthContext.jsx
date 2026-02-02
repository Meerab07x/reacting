import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'patient' or 'doctor'

  const login = (email, password, type) => {
    // In a real app, this would check against a database
    // For now, we'll use our mock data
    if (type === 'patient') {
      const patient = JSON.parse(localStorage.getItem('patients') || '[]')
        .find(p => p.email === email && p.password === password)
      if (patient) {
        setCurrentUser(patient)
        setUserType('patient')
        return true
      }
    } else if (type === 'doctor') {
      const doctor = JSON.parse(localStorage.getItem('doctors') || '[]')
        .find(d => d.email === email && d.password === password)
      if (doctor) {
        setCurrentUser(doctor)
        setUserType('doctor')
        return true
      }
    }
    return false
  }

  const logout = () => {
    setCurrentUser(null)
    setUserType(null)
  }

  const signup = (userData, type) => {
    if (type === 'patient') {
      const patients = JSON.parse(localStorage.getItem('patients') || '[]')
      const newPatient = { ...userData, id: Date.now() }
      patients.push(newPatient)
      localStorage.setItem('patients', JSON.stringify(patients))
      setCurrentUser(newPatient)
      setUserType('patient')
    } else if (type === 'doctor') {
      const doctors = JSON.parse(localStorage.getItem('doctors') || '[]')
      const newDoctor = { ...userData, id: Date.now() }
      doctors.push(newDoctor)
      localStorage.setItem('doctors', JSON.stringify(doctors))
      setCurrentUser(newDoctor)
      setUserType('doctor')
    }
  }

  return (
    <AuthContext.Provider value={{ currentUser, userType, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}