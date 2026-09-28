export default function Loading({ label = 'Loading academic records...' }) {
  return <div className="loading-state" role="status"><span className="spinner" /><span>{label}</span></div>
}
