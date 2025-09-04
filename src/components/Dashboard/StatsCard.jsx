// src/components/Dashboard/StatsCard.jsx
const StatsCard = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+')
  
  return (
    <div className="stat-card">
      <div className="stat-header">
        <h3 className="stat-title">{title}</h3>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${isPositive ? '' : 'negative'}`}>
        {change} from last month
      </div>
    </div>
  )
}

export default StatsCard