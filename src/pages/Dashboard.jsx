// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assetService } from '../services/assetService'
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAssets: 0,
    inMaintenance: 0,
    inStock: 0,
    depreciated: 0
  })
  const [recentAssets, setRecentAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Fetch assets from backend
      const response = await assetService.getAllAssets()
      const assets = response.data
      
      // Calculate statistics
      const totalAssets = assets.length
      const inMaintenance = assets.filter(asset => 
        asset.status && asset.status.toLowerCase().includes('maintenance')
      ).length
      
      const inStock = assets.filter(asset => 
        asset.status && (asset.status.toLowerCase().includes('available') || asset.status.toLowerCase().includes('stock'))
      ).length
      
      const depreciated = assets.filter(asset => 
        asset.status && asset.status.toLowerCase().includes('depreciated')
      ).length

      // Get recent assets (last 5)
      const recent = assets.slice(-5).reverse().map(asset => ({
        assetId: asset.assetId,
        tag: asset.tag || `AST-${asset.assetId}`,
        name: asset.name,
        category: asset.category || 'Uncategorized',
        location: asset.location ? (typeof asset.location === 'object' ? asset.location.name : asset.location) : 'Unknown',
        status: asset.status || 'Unknown'
      }))

      setStats({ totalAssets, inMaintenance, inStock, depreciated })
      setRecentAssets(recent)
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data. Using demo data.')
      
      // Fallback to mock data
      setStats({
        totalAssets: 1250,
        inMaintenance: 25,
        inStock: 910,
        depreciated: 315
      })
      
      setRecentAssets([
        {
          assetId: 1,
          tag: 'A12345',
          name: 'Laptop',
          category: 'IT Equipment',
          location: 'Main Building',
          status: 'In Use'
        },
        {
          assetId: 2,
          tag: 'B67990',
          name: 'Microscope',
          category: 'Laboratory',
          location: 'Main Building',
          status: 'In Stock'
        },
        {
          assetId: 3,
          tag: 'C54321',
          name: 'Projector',
          category: 'Audio-Visual',
          location: 'Room 101',
          status: 'In Use'
        },
        {
          assetId: 4,
          tag: 'D98766',
          name: 'Desk',
          category: 'Furniture',
          location: 'Annex',
          status: 'In Maintenance'
        },
        {
          assetId: 5,
          tag: 'E24680',
          name: 'Vehicle',
          category: 'Vehicles',
          location: 'Parking Lot A',
          status: 'Depreciated'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleViewAll = () => {
    navigate('/assets')
  }

// In your Dashboard.jsx, update the status mapping functions:

  const getStatusText = (status) => {
    if (!status) return 'Unknown'
    
    const statusLower = status.toLowerCase()
    if (statusLower.includes('use') || statusLower === 'in use') return 'In Use'
    if (statusLower.includes('available') || statusLower === 'available') return 'Available'
    if (statusLower.includes('maintenance') || statusLower === 'maintenance') return 'Maintenance'
    if (statusLower.includes('retired') || statusLower === 'retired') return 'Retired'
    return status
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard data...</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Overview of university assets and statistics</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Assets</h3>
            <span className="stat-icon">📦</span>
          </div>
          <div className="stat-value">{stats.totalAssets.toLocaleString()}</div>
          <div className="stat-title">All university assets</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>In Maintenance</h3>
            <span className="stat-icon">🔧</span>
          </div>
          <div className="stat-value">{stats.inMaintenance}</div>
          <div className="stat-title">Assets under repair</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>In Stock</h3>
            <span className="stat-icon">✅</span>
          </div>
          <div className="stat-value">{stats.inStock}</div>
          <div className="stat-title">Available assets</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Depreciated</h3>
            <span className="stat-icon">📉</span>
          </div>
          <div className="stat-value">{stats.depreciated}</div>
          <div className="stat-title">Fully depreciated assets</div>
        </div>
      </div>

      {/* Recent Assets Table */}
      <div className="dashboard-section">
        <div className="section-header">
          <h3>Recent Assets</h3>
          <button className="view-all-btn" onClick={handleViewAll}>
            View All ►
          </button>
        </div>
        
        <div className="assets-table-container">
          <table className="assets-table">
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAssets.map(asset => (
                <tr key={asset.assetId || asset.tag}>
                  <td className="asset-tag">{asset.tag}</td>
                  <td className="asset-name">{asset.name}</td>
                  <td className="asset-category">{asset.category}</td>
                  <td className="asset-location">{asset.location}</td>
                  <td>
                    <span className={`status ${getStatusText(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard