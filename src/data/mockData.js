// Initial doctors - save to localStorage on first load
export const initialDoctors = [
  { 
    id: 1, 
    name: 'Dr. Sarah Johnson', 
    email: 'sarah.johnson@surgery.com',
    password: 'doctor123', // In real app, this would be hashed
    specialty: 'General Practice',
    qualifications: 'MBBS, MRCGP',
    yearsExperience: 12,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    workingHours: { start: '09:00', end: '17:00' },
    bio: 'Experienced GP specializing in preventive care and chronic disease management.'
  },
  { 
    id: 2, 
    name: 'Dr. Michael Chen', 
    email: 'michael.chen@surgery.com',
    password: 'doctor123',
    specialty: 'Pediatrics',
    qualifications: 'MBBS, MRCPCH',
    yearsExperience: 8,
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    workingHours: { start: '08:00', end: '16:00' },
    bio: 'Dedicated pediatrician with expertise in child development and immunizations.'
  },
  { 
    id: 3, 
    name: 'Dr. Emily Roberts', 
    email: 'emily.roberts@surgery.com',
    password: 'doctor123',
    specialty: 'Cardiology',
    qualifications: 'MBBS, MD Cardiology',
    yearsExperience: 15,
    availability: ['Monday', 'Wednesday', 'Friday'],
    workingHours: { start: '10:00', end: '18:00' },
    bio: 'Cardiologist specializing in heart disease prevention and management.'
  },
  { 
    id: 4, 
    name: 'Dr. James Williams', 
    email: 'james.williams@surgery.com',
    password: 'doctor123',
    specialty: 'Dermatology',
    qualifications: 'MBBS, MD Dermatology',
    yearsExperience: 10,
    availability: ['Tuesday', 'Wednesday', 'Thursday'],
    workingHours: { start: '09:00', end: '17:00' },
    bio: 'Dermatologist focusing on skin health, acne treatment, and cosmetic procedures.'
  }
]

// Initial patients
export const initialPatients = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    password: 'patient123',
    age: 45,
    dateOfBirth: '1979-05-15',
    phone: '07712345678',
    address: '123 High Street, London, SW1A 1AA',
    medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin'],
    doctorId: 1,
    assignedDoctor: 'Dr. Sarah Johnson',
    registrationDate: '2023-01-15',
    bloodType: 'O+',
    emergencyContact: {
      name: 'Mary Smith',
      relationship: 'Spouse',
      phone: '07712345679'
    }
  },
  {
    id: 2,
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    password: 'patient123',
    age: 32,
    dateOfBirth: '1992-08-22',
    phone: '07723456789',
    address: '45 Oak Avenue, Manchester, M1 2AB',
    medicalConditions: ['Asthma'],
    allergies: ['None'],
    doctorId: 1,
    assignedDoctor: 'Dr. Sarah Johnson',
    registrationDate: '2023-03-20',
    bloodType: 'A+',
    emergencyContact: {
      name: 'David Wilson',
      relationship: 'Father',
      phone: '07723456780'
    }
  },
  {
    id: 3,
    name: 'Oliver Brown',
    email: 'parent.brown@email.com',
    password: 'patient123',
    age: 8,
    dateOfBirth: '2016-11-10',
    phone: '07734567890',
    address: '78 Park Road, Birmingham, B3 1JJ',
    medicalConditions: ['None'],
    allergies: ['Dairy'],
    doctorId: 2,
    assignedDoctor: 'Dr. Michael Chen',
    registrationDate: '2023-02-10',
    bloodType: 'B+',
    emergencyContact: {
      name: 'Sophie Brown',
      relationship: 'Mother',
      phone: '07734567891'
    }
  },
  {
    id: 4,
    name: 'Margaret Thompson',
    email: 'margaret.t@email.com',
    password: 'patient123',
    age: 67,
    dateOfBirth: '1957-03-30',
    phone: '07745678901',
    address: '12 Garden Lane, Leeds, LS1 5QT',
    medicalConditions: ['Arthritis', 'High Cholesterol'],
    allergies: ['Aspirin'],
    doctorId: 3,
    assignedDoctor: 'Dr. Emily Roberts',
    registrationDate: '2022-11-05',
    bloodType: 'AB+',
    emergencyContact: {
      name: 'Robert Thompson',
      relationship: 'Husband',
      phone: '07745678902'
    }
  }
]

// Initial appointments
export const initialAppointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'John Smith',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-02-08',
    time: '10:00',
    reason: 'Annual checkup and diabetes review',
    status: 'confirmed', // pending, confirmed, declined, completed
    notes: ''
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Emma Wilson',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-02-10',
    time: '14:30',
    reason: 'Asthma medication review',
    status: 'pending',
    notes: ''
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'Oliver Brown',
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    date: '2024-02-12',
    time: '09:00',
    reason: 'Vaccination appointment',
    status: 'confirmed',
    notes: ''
  }
]

// Initialize localStorage with data if not present
export function initializeData() {
  if (!localStorage.getItem('doctors')) {
    localStorage.setItem('doctors', JSON.stringify(initialDoctors))
  }
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(initialPatients))
  }
  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify(initialAppointments))
  }
}

// Helper functions to get data from localStorage
export function getDoctors() {
  return JSON.parse(localStorage.getItem('doctors') || '[]')
}

export function getPatients() {
  return JSON.parse(localStorage.getItem('patients') || '[]')
}

export function getAppointments() {
  return JSON.parse(localStorage.getItem('appointments') || '[]')
}

export function saveAppointment(appointment) {
  const appointments = getAppointments()
  appointments.push(appointment)
  localStorage.setItem('appointments', JSON.stringify(appointments))
}

export function updateAppointmentStatus(appointmentId, status, notes = '') {
  const appointments = getAppointments()
  const index = appointments.findIndex(a => a.id === appointmentId)
  if (index !== -1) {
    appointments[index].status = status
    if (notes) appointments[index].notes = notes
    localStorage.setItem('appointments', JSON.stringify(appointments))
  }
}