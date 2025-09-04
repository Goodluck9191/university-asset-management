// src/components/Layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'assets', label: 'Assets', icon: '💻', path: '/assets' },
    { id: 'add-asset', label: 'Add Asset', icon: '➕', path: '/add-asset' },
    { id: 'users', label: 'Users', icon: '👥', path: '/users' },
    { id: 'assignments', label: 'Assignments', icon: '🔗', path: '/assignments' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧', path: '/maintenance' },
    { id: 'locations', label: 'Locations', icon: '📍', path: '/locations' },
    { id: 'reports', label: 'Reports', icon: '📈', path: '/reports' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>🏫 University</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map(item => (
            <li key={item.id}>
              <Link 
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar