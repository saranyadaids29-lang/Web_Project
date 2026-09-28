import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { summarizeSemester } from '../data/students.js'

function SemesterCard({ student, number }) {
  const result = summarizeSemester(student[`semester${number}`])
  return <section className="semester-card"><div className="semester-card-head"><div><div className="eyebrow">Academic results</div><h2>Semester {number}</h2></div><span className="semester-number">0{number}</span></div>
    {result.subjects.length ? <div className="semester-card-metrics">{(result.transcriptMode ? [['Credits', result.credits], ['Courses', result.subjects.length], ['Result', result.passed ? 'PASS' : 'FAIL']] : [['CGPA', result.cgpa?.toFixed(1) ?? '—'], ['Percentage', `${result.percentage}%`], ['Result', result.passed ? 'PASS' : 'FAIL']]).map(([label, value]) => <div key={label}><span className="semester-metric-label">{label}</span><span className="semester-metric-value">{value}</span></div>)}</div> : <p className="muted" style={{ fontSize: 13 }}>Results have not been published yet.</p>}
    <Link className="text-link" style={{ display: 'inline-block', marginTop: 17 }} to={`/student/semester/${number}`}>View semester {number} results →</Link>
  </section>
}

export default function StudentDashboard() {
  const { user, students } = useAuth()
  const student = students.find((entry) => entry.registerNumber === user.registerNumber)
  if (!student) return <div className="alert">Your student record is no longer available. Please contact the administrator.</div>
  return <>
    <div className="page-heading"><div><div className="eyebrow">Student portal · 2025–2026</div><h1>Welcome, {student.name}</h1><p>Your academic results at a glance.</p></div></div>
    <section className="panel"><div className="identity-grid">{[['Register number', student.registerNumber], ['Department', student.department], ['Year', student.year], ['Date of birth', student.dob]].map(([label, value]) => <div key={label}><span className="identity-label">{label}</span><span className="identity-value">{value}</span></div>)}</div></section>
    <div className="semester-card-grid"><SemesterCard student={student} number={1} /><SemesterCard student={student} number={2} /></div>
    <div className="semester-actions"><Link className="button button-primary" to="/student/semester/1">View Semester 1</Link><Link className="button button-secondary" to="/student/semester/2">View Semester 2</Link><Link className="button button-secondary" to="/student/report">View full report</Link></div>
  </>
}
