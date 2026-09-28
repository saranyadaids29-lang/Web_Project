import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import Loading from './Loading.jsx'

export default function ProtectedRoute({ role }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />
  return <Outlet />
}
