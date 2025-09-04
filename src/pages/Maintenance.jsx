// src/pages/Maintenance.jsx
import { useState, useEffect } from 'react'
import { maintenanceService } from '../services/maintenanceService'

const Maintenance = () => {
  const [maintenanceRecords, setMaintenanceRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMaintenanceRecords()
  }, [])

  const fetchMaintenanceRecords = async () => {
    try {
      const response = await maintenanceService.getAllMaintenance()
      setMaintenanceRecords(response.data)
    } catch (err) {
      setError('Failed to fetch maintenance records. Please try again.')
      console.error('Error fetching maintenance records:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading maintenance records...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Maintenance Records</h2>
        <p>View and manage asset maintenance records</p>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Maintenance ID</th>
              <th>Asset</th>
              <th>Details</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceRecords.map(record => (
              <tr key={record.maintenanceId}>
                <td>{record.maintenanceId}</td>
                <td>{record.asset?.name || `Asset ID: ${record.asset?.assetId}`}</td>
                <td>{record.details}</td>
                <td>
                  <span className={`status status-${record.status?.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-secondary btn-small">Edit</button>
                  <button className="btn btn-danger btn-small">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Maintenance