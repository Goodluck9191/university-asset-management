// src/pages/AssetDetails.jsx
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const AssetDetails = () => {
  const { id } = useParams()
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock API call
    const mockAsset = {
      id: parseInt(id),
      name: 'Dell Latitude Laptop',
      tag: 'IT-001',
      category: 'IT Equipment',
      status: 'available',
      location: 'Computer Lab A',
      assignedTo: 'Unassigned',
      purchaseDate: '2023-01-15',
      value: '$1,200',
      description: 'Dell Latitude 5420, 16GB RAM, 512GB SSD, Intel i7',
      serialNumber: 'DL5420-12345',
      warranty: '2025-01-15',
      supplier: 'Dell Technologies',
      maintenanceHistory: [
        { date: '2023-06-10', type: 'Routine Check', technician: 'John Smith' },
        { date: '2023-03-15', type: 'Software Update', technician: 'Emma Davis' }
      ]
    }
    
    setAsset(mockAsset)
    setLoading(false)
  }, [id])

  if (loading) return <div className="loading">Loading asset details...</div>
  if (!asset) return <div className="error">Asset not found</div>

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/assets" className="back-link">← Back to Assets</Link>
        <h2>{asset.name}</h2>
        <p>Asset Tag: {asset.tag}</p>
      </div>
      
      <div className="asset-details-container">
        <div className="asset-details-card">
          <h3>Basic Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{asset.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`status status-${asset.status}`}>
                {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{asset.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assigned To:</span>
              <span className="detail-value">{asset.assignedTo}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Purchase Date:</span>
              <span className="detail-value">{asset.purchaseDate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Value:</span>
              <span className="detail-value">{asset.value}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Serial Number:</span>
              <span className="detail-value">{asset.serialNumber}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Warranty Until:</span>
              <span className="detail-value">{asset.warranty}</span>
            </div>
            <div className="detail-item full-width">
              <span className="detail-label">Supplier:</span>
              <span className="detail-value">{asset.supplier}</span>
            </div>
            <div className="detail-item full-width">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{asset.description}</span>
            </div>
          </div>
        </div>
        
        <div className="maintenance-history">
          <h3>Maintenance History</h3>
          {asset.maintenanceHistory.length > 0 ? (
            <div className="history-list">
              {asset.maintenanceHistory.map((record, index) => (
                <div key={index} className="history-item">
                  <div className="history-date">{record.date}</div>
                  <div className="history-type">{record.type}</div>
                  <div className="history-technician">By: {record.technician}</div>
                </div>
              ))}
            </div>
          ) : (
            <p>No maintenance records found.</p>
          )}
        </div>
      </div>
      
      <div className="asset-actions">
        <Link to={`/assets/edit/${asset.id}`} className="btn btn-primary">
          Edit Asset
        </Link>
        <button className="btn btn-secondary">Request Maintenance</button>
        <button className="btn btn-secondary">Print Details</button>
      </div>
    </div>
  )
}

export default AssetDetails