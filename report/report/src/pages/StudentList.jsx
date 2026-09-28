import { useState } from 'react'
import { Link } from 'react-router-dom'
import StudentTable from '../components/StudentTable.jsx'
import { useAuth } from '../context/useAuth.js'

export default function StudentList() {
  const { students, deleteStudent } = useAuth()
  const [search, setSearch] = useState('')
  const filtered = students.filter((student) => `${student.registerNumber} ${student.name}`.toLowerCase().includes(search.toLowerCase().trim()))
  function handleDelete(student) {
    if (window.confirm(`Delete ${student.name} (${student.registerNumber}) and their results?`)) deleteStudent(student.registerNumber)
  }
  return <>
    <div className="page-heading"><div><div className="eyebrow">Directory</div><h1>Students</h1><p>{students.length} student records</p></div><Link className="button button-primary" to="/admin/students/new">+ Add student</Link></div>
    <section className="panel"><div className="panel-heading"><div><h2>All students</h2><div className="report-meta">Find students by register number or name</div></div><input className="search-field" aria-label="Search by register number or student name" placeholder="Search students..." value={search} onChange={(event) => setSearch(event.target.value)} /></div><StudentTable students={filtered} onDelete={handleDelete} /></section>
  </>
}
