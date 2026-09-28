function DashboardCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <div className="dashboard-card">

      <div className="dashboard-icon">
        {icon}
      </div>

      <div>
        <p className="dashboard-title">
          {title}
        </p>

        <h2>{value}</h2>

        <p className="dashboard-description">
          {description}
        </p>
      </div>

    </div>
  );
}

export default DashboardCard;