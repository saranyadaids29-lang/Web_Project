import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentTable from '../components/StudentTable.jsx'
import { useAuth } from '../context/useAuth.js'
import { summarizeSemester } from '../data/students.js'

export default function AdminDashboard() {
  const { students, deleteStudent } = useAuth()
  const [search, setSearch] = useState('')
  const filteredStudents = useMemo(() => students.filter((student) => `${student.registerNumber} ${student.name}`.toLowerCase().includes(search.toLowerCase().trim())), [students, search])
  const semOne = students.filter((student) => summarizeSemester(student.semester1).subjects.length).length
  const semTwo = students.filter((student) => summarizeSemester(student.semester2).subjects.length).length
  function handleDelete(student) {
    if (window.confirm(`Delete ${student.name} (${student.registerNumber}) and their results?`)) deleteStudent(student.registerNumber)
  }

  return <>
    <div className="page-heading"><div><div className="eyebrow">Academic administration</div><h1>Admin dashboard</h1><p>Manage student records and semester results.</p></div><Link className="button button-primary" to="/admin/students/new">+ Add student</Link></div>
    <div className="stat-grid"><div className="stat-card"><div className="stat-label">Total students</div><div className="stat-value">{students.length}</div><div className="stat-note">Active academic records</div></div><div className="stat-card"><div className="stat-label">Semester 1 results</div><div className="stat-value">{semOne}<span className="muted" style={{ fontSize: 14 }}> / {students.length}</span></div><div className="stat-note">Student records with marks</div></div><div className="stat-card"><div className="stat-label">Semester 2 results</div><div className="stat-value">{semTwo}<span className="muted" style={{ fontSize: 14 }}> / {students.length}</span></div><div className="stat-note">Student records with marks</div></div></div>
    <section className="panel"><div className="panel-heading"><div><h2>Student records</h2><div className="report-meta">Search, review, and manage academic information</div></div><input className="search-field" aria-label="Search by register number or student name" placeholder="Search students..." value={search} onChange={(event) => setSearch(event.target.value)} /></div><StudentTable students={filteredStudents} onDelete={handleDelete} /></section>
  </>
}
