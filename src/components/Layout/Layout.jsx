// src/components/Layout/Layout.jsx
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import './Layout.css'

const Layout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="layout">
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      
      <Sidebar />
      
      <div className="main-content">
        <Header user={user} onLogout={onLogout} />
        <div className="content">
          {children}
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

export default Layout