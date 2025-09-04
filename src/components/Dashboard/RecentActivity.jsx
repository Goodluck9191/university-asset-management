// src/components/Dashboard/RecentActivity.jsx
const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'assignment',
      asset: 'Projector Epson',
      user: 'Dr. James Wilson',
      date: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'maintenance',
      asset: 'Microscope Olympus',
      technician: 'Tech Support Team',
      date: '1 day ago',
      status: 'in-progress'
    },
    {
      id: 3,
      type: 'purchase',
      asset: 'Tablet iPad Pro',
      quantity: 5,
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'decommission',
      asset: 'Old Desktop Computers',
      quantity: 12,
      date: '3 days ago',
      status: 'pending'
    }
  ]

  const getActivityIcon = (type) => {
    switch(type) {
      case 'assignment': return '👤'
      case 'maintenance': return '🔧'
      case 'purchase': return '🛒'
      case 'decommission': return '🗑️'
      default: return '📝'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#27ae60'
      case 'in-progress': return '#f39c12'
      case 'pending': return '#7f8c8d'
      default: return '#7f8c8d'
    }
  }

  return (
    <div className="activity-list">
      <h3>Recent Activity</h3>
      <div className="activity-items">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-details">
              {activity.type === 'assignment' && (
                <p>
                  <span className="highlight">{activity.asset}</span> assigned to <span className="highlight">{activity.user}</span>
                </p>
              )}
              {activity.type === 'maintenance' && (
                <p>
                  <span className="highlight">{activity.asset}</span> under maintenance by <span className="highlight">{activity.technician}</span>
                </p>
              )}
              {activity.type === 'purchase' && (
                <p>
                  <span className="highlight">{activity.quantity}</span> new <span className="highlight">{activity.asset}</span> purchased
                </p>
              )}
              {activity.type === 'decommission' && (
                <p>
                  <span className="highlight">{activity.quantity}</span> <span className="highlight">{activity.asset}</span> decommissioned
                </p>
              )}
              <div className="activity-meta">
                <span className="activity-date">{activity.date}</span>
                <span 
                  className="activity-status"
                  style={{ color: getStatusColor(activity.status) }}
                >
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity