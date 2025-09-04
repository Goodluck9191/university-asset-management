// src/pages/Dashboard.jsx
import StatsCard from '../components/Dashboard/StatsCard'
import RecentActivity from '../components/Dashboard/RecentActivity'

const Dashboard = () => {
  const stats = [
    { title: 'Total Assets', value: '1,248', change: '+5%', icon: '💼' },
    { title: 'Available Assets', value: '842', change: '+2%', icon: '✅' },
    { title: 'Under Maintenance', value: '127', change: '-3%', icon: '🔧' },
    { title: 'Decommissioned', value: '279', change: '+1%', icon: '❌' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of university assets and recent activity</p>
      </div>
      
      <div className="stats-grid">
        {stats.map(stat => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="dashboard-content">
        <RecentActivity />
        <div className="chart-placeholder">
          <h3>Asset Distribution</h3>
          <p>Chart would be displayed here</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard