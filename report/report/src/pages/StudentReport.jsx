import { Link, useParams } from 'react-router-dom'
import ReportCard from '../components/ReportCard.jsx'
import { useAuth } from '../context/useAuth.js'

export default function StudentReport({ adminView = false }) {
  const { user, students } = useAuth()
  const { registerNumber } = useParams()
  const student = adminView ? students.find((entry) => entry.registerNumber === registerNumber) : students.find((entry) => entry.registerNumber === user.registerNumber)
  if (!student) return <><div className="page-heading"><div><div className="eyebrow">Academic records</div><h1>Record not found</h1><p>The requested student record is unavailable.</p></div></div><Link className="button button-secondary" to={adminView ? '/admin/students' : '/student'}>Return to dashboard</Link></>
  return <>
    <div className="page-heading"><div><div className="eyebrow">{adminView ? 'Student record' : 'Academic records'}</div><h1>{adminView ? student.name : 'Full report card'}</h1><p>{student.registerNumber} · {student.department}</p></div>{adminView ? <Link className="button button-primary" to={`/admin/student/${encodeURIComponent(student.registerNumber)}/edit`}>Edit student &amp; marks</Link> : <Link className="button button-secondary" to="/student">Back to overview</Link>}</div>
    <ReportCard student={student} />
  </>
}
