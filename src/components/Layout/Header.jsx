// Update your Header component to show user info
import React, { useState } from 'react';

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
          <div className="avatar">
            {user?.avatar || user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-role">{user?.role || 'Staff'}</span>
          </div>
          
          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-item user-profile-info">
                <strong>{user?.name}</strong>
                <br />
                <small>{user?.email}</small>
                <br />
                <small>Role: {user?.role}</small>
              </div>
              <button className="dropdown-item">Profile Settings</button>
              <button className="dropdown-item" onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;