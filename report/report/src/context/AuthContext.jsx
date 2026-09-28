import { useEffect, useState } from 'react'
import AuthContext from './authContextValue.js'
import { initialStudents } from '../data/students.js'

const STUDENTS_KEY = 'reportCardStudents'
const SESSION_KEY = 'loggedInUser'
const DATA_VERSION_KEY = 'reportCardDataVersion'
const DATA_VERSION = '3'

export function AuthProvider({ children }) {
  const [students, setStudents] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startupTimer = setTimeout(() => {
      try {
        const storedStudents = localStorage.getItem(STUDENTS_KEY)
        const parsedStudents = storedStudents ? JSON.parse(storedStudents) : initialStudents
        let loadedStudents = Array.isArray(parsedStudents) ? parsedStudents : initialStudents
        if (localStorage.getItem(DATA_VERSION_KEY) !== DATA_VERSION) {
          const demoStudent = initialStudents.find((student) => student.registerNumber === '23AD001')
          const hasDemoStudent = loadedStudents.some((student) => student.registerNumber === demoStudent.registerNumber)
          loadedStudents = hasDemoStudent
            ? loadedStudents.map((student) => student.registerNumber === demoStudent.registerNumber ? demoStudent : student)
            : [...loadedStudents, demoStudent]
          localStorage.setItem(DATA_VERSION_KEY, DATA_VERSION)
        }
        const storedUser = localStorage.getItem(SESSION_KEY)
        const session = storedUser ? JSON.parse(storedUser) : null
        const validSession = session?.role === 'admin' || (session?.role === 'student' && loadedStudents.some((student) => student.registerNumber === session.registerNumber))
        setStudents(loadedStudents)
        setUser(validSession ? session : null)
      } catch {
        setStudents(initialStudents)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }, 0)
    return () => clearTimeout(startupTimer)
  }, [])

  useEffect(() => {
    if (!loading) localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
  }, [students, loading])

  useEffect(() => {
    if (loading) return
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user, loading])

  function login(username, password) {
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      const adminUser = { role: 'admin', name: 'Administrator' }
      setUser(adminUser)
      return { ok: true, user: adminUser }
    }
    const student = students.find((entry) => entry.registerNumber.toLowerCase() === username.trim().toLowerCase() && entry.dob === password.trim())
    if (!student) return { ok: false, error: 'Register number or date of birth is incorrect.' }
    const studentUser = { role: 'student', registerNumber: student.registerNumber, name: student.name }
    setUser(studentUser)
    return { ok: true, user: studentUser }
  }

  function logout() { setUser(null) }
  function saveStudent(student) {
    setStudents((current) => {
      const exists = current.some((entry) => entry.registerNumber === student.registerNumber)
      return exists ? current.map((entry) => entry.registerNumber === student.registerNumber ? student : entry) : [...current, student]
    })
  }
  function deleteStudent(registerNumber) {
    setStudents((current) => current.filter((student) => student.registerNumber !== registerNumber))
  }

  return <AuthContext.Provider value={{ students, user, loading, login, logout, saveStudent, deleteStudent }}>{children}</AuthContext.Provider>
}
