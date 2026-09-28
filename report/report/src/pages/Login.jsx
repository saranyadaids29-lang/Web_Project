import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import Loading from '../components/Loading.jsx'

export default function Login() {
  const { user, loading, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  if (loading) return <Loading label="Preparing the sign-in page..." />
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!username.trim() || !password.trim()) { setError('Enter both your register number and date of birth.'); return }
    setSubmitting(true)
    const result = login(username, password)
    setSubmitting(false)
    if (!result.ok) { setError(result.error); return }
    const requestedPath = result.user.role === 'student' && location.state?.from?.startsWith('/student') ? location.state.from : null
    navigate(requestedPath || (result.user.role === 'admin' ? '/admin' : '/student'), { replace: true })
  }

  return <section className="login-layout">
    <div className="login-aside">
      <div className="college-mark"><span className="seal">PV</span><span>PRINCE DR. K. VASUDEVAN<br />COLLEGE OF ENGINEERING AND TECHNOLOGY</span></div>
      <div className="login-hero"><div className="eyebrow">Academic records, together</div><h1>Your progress, clearly recorded.</h1><p>Access semester results and academic information through your secure student portal.</p></div>
      <div className="aside-foot">Student Academic Services &nbsp; / &nbsp; 2025–2026</div>
    </div>
    <div className="login-form-area"><form className="login-form" onSubmit={handleSubmit}>
      <div className="eyebrow">Welcome to the portal</div><h2>Sign in</h2><p className="muted">Use your college credentials to continue.</p>
      {error && <div className="alert" role="alert">{error}</div>}
      <div className="form-field"><label htmlFor="username">Register number or admin username</label><input autoComplete="username" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="e.g. 23AD001" required /></div>
      <div className="form-field"><label htmlFor="password">Date of birth or password</label><input autoComplete="current-password" id="password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="DD-MM-YYYY" required /></div>
      <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Checking credentials...' : 'Sign in to portal'}</button>
      <div className="demo-credentials"><strong>Student</strong> &nbsp;23AD001 / 19-12-2007<br /><strong>Sample admin</strong> &nbsp;admin / admin123</div>
    </form></div>
  </section>
}
