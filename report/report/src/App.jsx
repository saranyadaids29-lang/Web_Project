import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useAuth } from './context/useAuth.js'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Login from './pages/Login.jsx'
import SemesterResult from './pages/SemesterResult.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import StudentEditor from './pages/StudentEditor.jsx'
import StudentList from './pages/StudentList.jsx'
import StudentReport from './pages/StudentReport.jsx'

function HomeRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
}

function App() {
  return <>
    <Navbar />
    <main className="app-main"><Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentList />} />
        <Route path="/admin/students/new" element={<StudentEditor />} />
        <Route path="/admin/student/:registerNumber" element={<StudentReport adminView />} />
        <Route path="/admin/student/:registerNumber/edit" element={<StudentEditor />} />
      </Route>
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/semester/1" element={<SemesterResult semesterNumber={1} />} />
        <Route path="/student/semester/2" element={<SemesterResult semesterNumber={2} />} />
        <Route path="/student/report" element={<StudentReport />} />
      </Route>
      <Route path="*" element={<HomeRedirect />} />
    </Routes></main>
    <footer className="site-footer">Prince Dr. K. Vasudevan College of Engineering and Technology <span>·</span> Academic Services</footer>
  </>
}

export default App
