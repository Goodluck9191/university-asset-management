// src/pages/Maintenance.jsx
import { useState, useEffect } from 'react'
import { assetService } from '../services/assetService'
import { maintenanceService } from '../services/maintenanceService'
import './Maintenance.css'

const Maintenance = () => {
  const [assets, setAssets] = useState([])
  const [maintenanceRecords, setMaintenanceRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
  const [formData, setFormData] = useState({
    details: '',
    status: 'pending'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')

      // Fetch both assets and maintenance records
      const [assetsResponse, maintenanceResponse] = await Promise.all([
        assetService.getAllAssets(),
        maintenanceService.getAllMaintenance()
      ])

      setAssets(assetsResponse.data)
      setMaintenanceRecords(maintenanceResponse.data)

    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load data. Please try again.')
      
      // Fallback to mock data
      setAssets(getMockAssets())
      setMaintenanceRecords(getMockMaintenanceRecords())
    } finally {
      setLoading(false)
    }
  }

  // Mock data for fallback
  const getMockAssets = () => [
    {
      assetId: 1,
      name: 'Dell Laptop',
      tag: 'IT-001',
      category: 'IT Equipment',
      status: 'in-use',
      location: 'Computer Lab A'
    },
    {
      assetId: 2,
      name: 'Projector',
      tag: 'AV-002', 
      category: 'Audio Visual',
      status: 'available',
      location: 'Lecture Hall B'
    },
    {
      assetId: 3,
      name: 'Microscope',
      tag: 'SCI-003',
      category: 'Laboratory',
      status: 'maintenance',
      location: 'Science Lab'
    }
  ]

  const getMockMaintenanceRecords = () => [
    {
      maintenanceId: 1,
      asset: { assetId: 3, name: 'Microscope' },
      details: 'Lens calibration needed',
      status: 'in-progress',
      createdAt: '2024-01-15'
    }
  ]

  const handleRequestMaintenance = (asset) => {
    setSelectedAsset(asset)
    setShowMaintenanceForm(true)
    setFormData({
      details: '',
      status: 'pending'
    })
  }

  const handleSubmitMaintenance = async (e) => {
    e.preventDefault()
    
    if (!formData.details.trim()) {
      alert('Please enter maintenance details')
      return
    }

    try {
      const maintenanceData = {
        asset: { assetId: selectedAsset.assetId },
        details: formData.details,
        status: formData.status
      }

      await maintenanceService.createMaintenance(maintenanceData)
      alert('Maintenance request submitted successfully!')
      
      setShowMaintenanceForm(false)
      setSelectedAsset(null)
      fetchData() // Refresh data

    } catch (error) {
      console.error('Error creating maintenance request:', error)
      alert('Failed to submit maintenance request. Please try again.')
    }
  }

  const getMaintenanceStatus = (assetId) => {
    const record = maintenanceRecords.find(record => 
      record.asset?.assetId === assetId || record.assetId === assetId
    )
    return record || null
  }

  const getStatusClass = (status) => {
    if (!status) return 'status-unknown'
    
    const statusLower = status.toLowerCase()
    if (statusLower.includes('pending')) return 'status-pending'
    if (statusLower.includes('progress')) return 'status-in-progress'
    if (statusLower.includes('complete')) return 'status-completed'
    return 'status-unknown'
  }

  if (loading) {
    return <div className="loading">Loading maintenance data...</div>
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Maintenance Management</h2>
        <p>View and manage asset maintenance requests</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Maintenance Form Modal */}
      {showMaintenanceForm && selectedAsset && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Request Maintenance</h3>
              <button 
                className="close-btn"
                onClick={() => setShowMaintenanceForm(false)}
              >
                ×
              </button>
            </div>
            
            <div className="asset-info">
              <h4>{selectedAsset.name}</h4>
              <p>ID: {selectedAsset.assetId} | Category: {selectedAsset.category}</p>
            </div>

            <form onSubmit={handleSubmitMaintenance} className="maintenance-form">
              <div className="form-group">
                <label htmlFor="details">Maintenance Details *</label>
                <textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  rows="4"
                  placeholder="Describe the maintenance required..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit Request
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowMaintenanceForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assets List */}
      <div className="maintenance-section">
        <div className="section-header">
          <h3>All Assets</h3>
          <p>List of all university assets that can be scheduled for maintenance</p>
        </div>

        <div className="assets-table-container">
          <table className="assets-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset Tag</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Current Status</th>
                <th>Maintenance Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => {
                const maintenanceRecord = getMaintenanceStatus(asset.assetId)
                
                return (
                  <tr key={asset.assetId} className={maintenanceRecord ? 'under-maintenance' : ''}>
                    <td className="asset-id">{asset.assetId}</td>
                    <td className="asset-tag">{asset.tag || `AST-${asset.assetId}`}</td>
                    <td className="asset-name">{asset.name}</td>
                    <td className="asset-category">{asset.category || 'Uncategorized'}</td>
                    <td className="asset-location">
                      {typeof asset.location === 'object' ? asset.location.name : asset.location}
                    </td>
                    <td>
                      <span className={`status status-${asset.status?.toLowerCase().replace(' ', '-')}`}>
                        {asset.status || 'Unknown'}
                      </span>
                    </td>
                    <td>
                      {maintenanceRecord ? (
                        <span className={`status ${getStatusClass(maintenanceRecord.status)}`}>
                          {maintenanceRecord.status}
                        </span>
                      ) : (
                        <span className="status status-none">No Maintenance</span>
                      )}
                    </td>
                    <td>
                      {!maintenanceRecord ? (
                        <button 
                          className="btn btn-primary btn-small"
                          onClick={() => handleRequestMaintenance(asset)}
                        >
                          Request Maintenance
                        </button>
                      ) : (
                        <button 
                          className="btn btn-secondary btn-small"
                          onClick={() => alert('Maintenance already scheduled')}
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Records */}
      <div className="maintenance-section">
        <div className="section-header">
          <h3>Maintenance Records</h3>
          <p>History of all maintenance requests</p>
        </div>

        {maintenanceRecords.length === 0 ? (
          <div className="no-records">
            <p>No maintenance records found.</p>
          </div>
        ) : (
          <div className="maintenance-table-container">
            <table className="maintenance-table">
              <thead>
                <tr>
                  <th>Maintenance ID</th>
                  <th>Asset</th>
                  <th>Asset ID</th>
                  <th>Category</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Request Date</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRecords.map(record => (
                  <tr key={record.maintenanceId}>
                    <td>MNT-{record.maintenanceId}</td>
                    <td className="asset-name">
                      {record.asset?.name || 'Unknown Asset'}
                    </td>
                    <td className="asset-id">
                      {record.asset?.assetId || record.assetId}
                    </td>
                    <td className="asset-category">
                      {record.asset?.category || 'Unknown'}
                    </td>
                    <td className="maintenance-details">
                      {record.details}
                    </td>
                    <td>
                      <span className={`status ${getStatusClass(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      {new Date(record.createdAt || record.requestDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Maintenance