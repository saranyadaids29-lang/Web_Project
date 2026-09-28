import { Link } from 'react-router-dom'
import ReportCard from '../components/ReportCard.jsx'
import { useAuth } from '../context/useAuth.js'

export default function SemesterResult({ semesterNumber }) {
  const { user, students } = useAuth()
  const student = students.find((entry) => entry.registerNumber === user.registerNumber)
  if (!student) return <div className="alert">Your student record is no longer available. Please contact the administrator.</div>
  return <>
    <div className="page-heading"><div><div className="eyebrow">Student results</div><h1>Semester {semesterNumber}</h1><p>{student.name} · {student.registerNumber}</p></div><Link className="button button-secondary" to="/student/report">View full report</Link></div>
    <ReportCard student={student} semesterNumber={semesterNumber} />
  </>
}
