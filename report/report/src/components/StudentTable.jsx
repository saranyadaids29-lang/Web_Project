import { Link } from 'react-router-dom'
import { summarizeSemester } from '../data/students.js'

export default function StudentTable({ students, onDelete }) {
  if (!students.length) return <div className="empty-state">No students match your search.</div>
  return <div className="data-table-wrap"><table className="data-table">
    <thead><tr><th>Register no.</th><th>Student name</th><th>Department</th><th>Year</th><th>Sem 1</th><th>Sem 2</th><th>Actions</th></tr></thead>
    <tbody>{students.map((student) => <tr key={student.registerNumber}>
      <td>{student.registerNumber}</td><td className="student-name-cell">{student.name}</td><td>{student.department}</td><td>{student.year}</td>
      {[1, 2].map((number) => <td key={number}><span className={`status-pill ${summarizeSemester(student[`semester${number}`]).subjects.length ? '' : 'pending'}`}>{summarizeSemester(student[`semester${number}`]).subjects.length ? 'Published' : 'Pending'}</span></td>)}
      <td><div className="row-actions"><Link className="text-link" to={`/admin/student/${encodeURIComponent(student.registerNumber)}`}>View</Link><Link className="text-link" to={`/admin/student/${encodeURIComponent(student.registerNumber)}/edit`}>Edit</Link><button className="navbar-logout" type="button" onClick={() => onDelete(student)} aria-label={`Delete ${student.name}`}>Delete</button></div></td>
    </tr>)}</tbody>
  </table></div>
}
