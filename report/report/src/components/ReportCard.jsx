import { summarizeSemester } from '../data/students.js'

function SemesterBlock({ student, semesterNumber }) {
  const result = summarizeSemester(student[`semester${semesterNumber}`])
  return <section className="panel report-section">
    <div className="report-title"><div><h2>Semester {semesterNumber}</h2><div className="report-meta">Academic performance by subject</div></div><span className={`status-pill ${result.subjects.length ? '' : 'pending'}`}>{result.subjects.length ? (result.passed ? 'PASS' : 'FAIL') : 'NOT PUBLISHED'}</span></div>
    {result.subjects.length ? <>
      <div className="data-table-wrap"><table className="data-table"><thead><tr>{result.transcriptMode ? <><th>Semester</th><th>Course code</th><th>Course name</th><th>Credits</th><th>Grade</th><th>Result</th></> : <><th>Subject code</th><th>Subject name</th><th>Internal</th><th>External</th><th>Total</th><th>Grade</th></>}</tr></thead><tbody>
        {result.subjects.map((subject) => <tr key={subject.code}>{result.transcriptMode ? <><td>{semesterNumber}SEM</td><td>{subject.code}</td><td className="student-name-cell">{subject.name}</td><td>{subject.credits}</td><td><strong>{subject.grade}</strong></td><td>{subject.result}</td></> : <><td>{subject.code}</td><td className="student-name-cell">{subject.name}</td><td>{subject.internal}</td><td>{subject.external}</td><td>{subject.total}</td><td><strong>{subject.grade}</strong></td></>}</tr>)}
      </tbody></table></div>
      {result.transcriptMode ? <div className="report-summary"><div className="summary-item"><span className="identity-label">Total credits</span><span className="identity-value">{result.credits}</span></div><div className="summary-item"><span className="identity-label">Result status</span><span className="identity-value">{result.passed ? 'PASS' : 'FAIL'}</span></div></div> : <div className="report-summary"><div className="summary-item"><span className="identity-label">Total marks</span><span className="identity-value">{result.total} / {result.subjects.length * 100}</span></div><div className="summary-item"><span className="identity-label">Percentage</span><span className="identity-value">{result.percentage}%</span></div><div className="summary-item"><span className="identity-label">CGPA</span><span className="identity-value">{result.cgpa?.toFixed(1) ?? '—'}</span></div><div className="summary-item"><span className="identity-label">Result status</span><span className="identity-value">{result.passed ? 'PASS' : 'FAIL'}</span></div></div>}
    </> : <div className="empty-state">Results for this semester have not been published.</div>}
  </section>
}

export default function ReportCard({ student, semesterNumber }) {
  return <article className="report-card">
    <div className="panel">
      <div className="report-title"><div><div className="eyebrow">Student academic report card</div><h2>PRINCE DR. K. VASUDEVAN COLLEGE OF ENGINEERING AND TECHNOLOGY</h2></div></div>
      <div className="identity-grid">{[['Student name', student.name], ['Register number', student.registerNumber], ['Department', student.department], ['Year', student.year], ['Date of birth', student.dob]].map(([label, value]) => <div key={label}><span className="identity-label">{label}</span><span className="identity-value">{value}</span></div>)}</div>
    </div>
    {semesterNumber ? <SemesterBlock student={student} semesterNumber={semesterNumber} /> : <><SemesterBlock student={student} semesterNumber={1} /><SemesterBlock student={student} semesterNumber={2} /></>}
  </article>
}
