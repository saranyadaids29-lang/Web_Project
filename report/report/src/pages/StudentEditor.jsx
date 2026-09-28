import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { summarizeSemester } from '../data/students.js'

const emptySemester = () => ({ format: 'marks', cgpa: '', subjects: [] })

function SemesterEditor({ number, semester, onChange }) {
  const summary = summarizeSemester(semester)
  const transcriptMode = semester.format === 'transcript' || semester.subjects.some((subject) => subject.credits !== undefined)
  function updateSubject(index, field, value) {
    onChange({ ...semester, subjects: semester.subjects.map((subject, subjectIndex) => subjectIndex === index ? { ...subject, [field]: value } : subject) })
  }
  function removeSubject(index) {
    onChange({ ...semester, subjects: semester.subjects.filter((_, subjectIndex) => subjectIndex !== index) })
  }
  function addSubject() {
    const subject = transcriptMode ? { code: '', name: '', credits: '', grade: '', result: 'P' } : { code: '', name: '', internal: '', external: '' }
    onChange({ ...semester, subjects: [...semester.subjects, subject] })
  }
  return <section className="panel editor-semester">
    <div className="editor-semester-header"><div><h2>Semester {number}</h2><div className="report-meta">{transcriptMode ? 'Course credits, grades, and results' : 'Subject marks and semester CGPA'}</div></div><button className="button button-secondary button-small" type="button" onClick={addSubject}>+ Add subject</button></div>
    <div className="panel-body" style={{ paddingTop: 5 }}>
      {!transcriptMode && <div className="form-field" style={{ maxWidth: 210 }}><label htmlFor={`cgpa-${number}`}>CGPA</label><input id={`cgpa-${number}`} type="number" min="0" max="10" step="0.1" value={semester.cgpa ?? ''} onChange={(event) => onChange({ ...semester, cgpa: event.target.value })} placeholder="e.g. 9.1" /></div>}
      {!semester.subjects.length && <div className="empty-state" style={{ padding: '20px 0' }}>No subjects entered for this semester.</div>}
      {semester.subjects.map((subject, index) => <div className="subject-form" key={`${subject.code}-${index}`}><div className={`subject-form-grid ${transcriptMode ? 'transcript-subject-grid' : ''}`}>
        <div className="form-field"><label htmlFor={`subject-code-${number}-${index}`}>Subject code</label><input id={`subject-code-${number}-${index}`} required value={subject.code} onChange={(event) => updateSubject(index, 'code', event.target.value.toUpperCase())} placeholder="CS101" /></div>
        <div className="form-field"><label htmlFor={`subject-name-${number}-${index}`}>Subject name</label><input id={`subject-name-${number}-${index}`} required value={subject.name} onChange={(event) => updateSubject(index, 'name', event.target.value)} placeholder="Programming" /></div>
        {transcriptMode ? <><div className="form-field"><label htmlFor={`subject-credits-${number}-${index}`}>Credits</label><input id={`subject-credits-${number}-${index}`} required type="number" min="0" value={subject.credits} onChange={(event) => updateSubject(index, 'credits', event.target.value)} /></div><div className="form-field"><label htmlFor={`subject-grade-${number}-${index}`}>Grade</label><input id={`subject-grade-${number}-${index}`} required value={subject.grade} onChange={(event) => updateSubject(index, 'grade', event.target.value.toUpperCase())} /></div><div className="form-field"><label htmlFor={`subject-result-${number}-${index}`}>Result</label><select id={`subject-result-${number}-${index}`} value={subject.result} onChange={(event) => updateSubject(index, 'result', event.target.value)}><option value="P">P</option><option value="F">F</option></select></div></> : <><div className="form-field"><label htmlFor={`subject-internal-${number}-${index}`}>Internal / 30</label><input id={`subject-internal-${number}-${index}`} required type="number" min="0" max="30" value={subject.internal} onChange={(event) => updateSubject(index, 'internal', event.target.value)} /></div><div className="form-field"><label htmlFor={`subject-external-${number}-${index}`}>External / 70</label><input id={`subject-external-${number}-${index}`} required type="number" min="0" max="70" value={subject.external} onChange={(event) => updateSubject(index, 'external', event.target.value)} /></div></>}
        <button className="navbar-logout subject-remove" type="button" onClick={() => removeSubject(index)}>Remove</button>
      </div><div className="editor-summary">{transcriptMode ? `${subject.credits} credits · Grade ${subject.grade} · Result ${subject.result}` : `Current total ${summary.subjects[index]?.total ?? 0} / 100 · Grade ${summary.subjects[index]?.grade ?? '—'}`}</div></div>)}
      {semester.subjects.length > 0 && <div className="editor-summary">{transcriptMode ? `${summary.credits} total credits · ${summary.passed ? 'PASS' : 'FAIL'}` : `Semester total: ${summary.total} / ${summary.subjects.length * 100} · ${summary.percentage}% · ${summary.passed ? 'PASS' : 'FAIL'}`}</div>}
    </div>
  </section>
}

export default function StudentEditor() {
  const { students, saveStudent } = useAuth()
  const { registerNumber } = useParams()
  const existingStudent = students.find((entry) => entry.registerNumber === registerNumber)
  const isNew = !registerNumber
  const [form, setForm] = useState(() => existingStudent ? structuredClone(existingStudent) : { registerNumber: '', name: '', dob: '', department: '', year: '', semester1: emptySemester(), semester2: emptySemester() })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  if (!isNew && !existingStudent) return <div className="alert">Student record not found. <Link to="/admin/students">Return to students</Link></div>
  function setField(field, value) { setForm((current) => ({ ...current, [field]: value })) }
  function setSemester(number, value) { setForm((current) => ({ ...current, [`semester${number}`]: value })) }
  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!form.registerNumber.trim() || !form.name.trim() || !form.dob.trim() || !form.department.trim() || !form.year.trim()) { setError('Complete all student information before saving.'); return }
    if (!/^\d{2}-\d{2}-\d{4}$/.test(form.dob)) { setError('Date of birth must use DD-MM-YYYY format.'); return }
    if (isNew && students.some((student) => student.registerNumber.toLowerCase() === form.registerNumber.trim().toLowerCase())) { setError('That register number is already in use.'); return }
    function normalizeSemester(semester) {
      const transcriptMode = semester.format === 'transcript' || semester.subjects.some((subject) => subject.credits !== undefined)
      return { ...semester, format: transcriptMode ? 'transcript' : 'marks', cgpa: transcriptMode ? null : Number(semester.cgpa) || 0, subjects: semester.subjects.map((subject) => transcriptMode ? { ...subject, code: subject.code.trim().toUpperCase(), name: subject.name.trim(), credits: Number(subject.credits), grade: subject.grade.trim().toUpperCase(), result: subject.result } : { ...subject, code: subject.code.trim().toUpperCase(), name: subject.name.trim(), internal: Number(subject.internal), external: Number(subject.external) }) }
    }
    const cleanRecord = { ...form, registerNumber: form.registerNumber.trim().toUpperCase(), name: form.name.trim(), dob: form.dob.trim(), department: form.department.trim(), year: form.year.trim(), semester1: normalizeSemester(form.semester1), semester2: normalizeSemester(form.semester2) }
    saveStudent(cleanRecord)
    navigate(`/admin/student/${encodeURIComponent(cleanRecord.registerNumber)}`, { replace: true })
  }

  return <>
    <div className="page-heading"><div><div className="eyebrow">Student records</div><h1>{isNew ? 'Add student' : 'Edit student record'}</h1><p>Update academic details and semester marks.</p></div></div>
    <form onSubmit={handleSubmit}>
      <section className="panel"><div className="panel-heading"><div><h2>Student information</h2><div className="report-meta">The register number is used for student sign-in.</div></div></div><div className="panel-body">
        {error && <div className="alert" role="alert">{error}</div>}
        <div className="form-row"><div className="form-field"><label htmlFor="registerNumber">Register number</label><input id="registerNumber" required disabled={!isNew} value={form.registerNumber} onChange={(event) => setField('registerNumber', event.target.value.toUpperCase())} placeholder="23AD001" /></div><div className="form-field"><label htmlFor="name">Student name</label><input id="name" required value={form.name} onChange={(event) => setField('name', event.target.value)} /></div></div>
        <div className="form-row"><div className="form-field"><label htmlFor="dob">Date of birth (DD-MM-YYYY)</label><input id="dob" required pattern="\d{2}-\d{2}-\d{4}" placeholder="15-08-2006" value={form.dob} onChange={(event) => setField('dob', event.target.value)} /></div><div className="form-field"><label htmlFor="department">Department</label><input id="department" required value={form.department} onChange={(event) => setField('department', event.target.value)} /></div></div>
        <div className="form-field" style={{ maxWidth: 'calc(50% - 7px)' }}><label htmlFor="year">Year</label><input id="year" required value={form.year} onChange={(event) => setField('year', event.target.value)} placeholder="2nd Year" /></div>
      </div></section>
      <SemesterEditor number={1} semester={form.semester1} onChange={(value) => setSemester(1, value)} />
      <SemesterEditor number={2} semester={form.semester2} onChange={(value) => setSemester(2, value)} />
      <div className="editor-footer"><Link className="button button-secondary" to={isNew ? '/admin/students' : `/admin/student/${encodeURIComponent(registerNumber)}`}>Cancel</Link><button className="button button-primary" type="submit">Save student and results</button></div>
    </form>
  </>
}
