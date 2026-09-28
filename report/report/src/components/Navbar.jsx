import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function handleLogout() { logout(); navigate('/login', { replace: true }) }

  return <header className="navbar">
    <NavLink className="brand" to={user?.role === 'admin' ? '/admin' : user ? '/student' : '/login'}>
      <span className="brand-seal">PV</span>
      <span className="brand-text">PRINCE VASUDEVAN<small>STUDENT ACADEMIC PORTAL</small></span>
    </NavLink>
    {user && <>
      <nav className="navbar-links" aria-label="Main navigation">
        {user.role === 'admin' ? <><NavLink to="/admin">Overview</NavLink><NavLink to="/admin/students">Students</NavLink></> : <><NavLink to="/student">Overview</NavLink><NavLink to="/student/report">Full report</NavLink></>}
      </nav>
      <div className="navbar-user"><span className="navbar-user-name">{user.name}<small className="navbar-user-role">{user.role}</small></span><button className="navbar-logout" type="button" onClick={handleLogout}>Log out</button></div>
    </>}
  </header>
}
