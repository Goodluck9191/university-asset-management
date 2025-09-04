// src/components/Layout/Header.jsx
import { useState } from 'react'

const Header = ({ user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <header className="header">
      <div className="header-left">
        <h1>University Asset Management</h1>
      </div>
      <div className="header-right">
        <div 
          className="user-profile" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={user.avatar} alt={user.name} className="avatar" />
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          
          {showDropdown && (
            <div className="user-dropdown">
              <button className="dropdown-item">Profile</button>
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item" onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header