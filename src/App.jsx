// src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import Assets from './pages/Assets'
import AddAsset from './pages/AddAsset'
import Reports from './pages/Reports'
import AssetDetails from './pages/AssetDetails'
import EditAsset from './pages/EditAsset'
import Login from './pages/Login'
import Users from './pages/Users'
import Assignments from './pages/Assignments'
import Maintenance from './pages/Maintenance'
import Locations from './pages/Locations'
import { authService } from './services/authService'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app load
  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <div className="App">
        {user ? (
          <Layout user={user} onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/:id" element={<AssetDetails />} />
              <Route path="/assets/edit/:id" element={<EditAsset />} />
              <Route path="/add-asset" element={<AddAsset />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/users" element={<Users />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App