// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'assets', label: 'Assets', icon: '💻', path: '/assets' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧', path: '/maintenance' },
    { id: 'reports', label: 'Reports', icon: '📈', path: '/reports' },
    { id: 'users', label: 'User Management', icon: '👥', path: '/users' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <h1>UAMS</h1>
          <span className="logo-subtitle">University Asset Management System</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <Link 
                to={item.path}
                className={location.pathname === item.path ? 'nav-link active' : 'nav-link'}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">U</div>
          <div className="user-details">
            <span className="user-name">University Admin</span>
            <span className="user-role">System Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar