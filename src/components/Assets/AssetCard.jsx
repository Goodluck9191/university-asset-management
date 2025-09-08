// src/components/Assets/AssetCard.jsx
import { Link } from 'react-router-dom'
import { assetService } from '../../services/assetService'

const AssetCard = ({ asset, onAssetUpdate }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'available': return 'status-available'
      case 'in-use': return 'status-in-use'
      case 'maintenance': return 'status-maintenance'
      case 'retired': return 'status-retired'
      default: return ''
    }
  }

  const getStatusText = (status) => {
    switch(status) {
      case 'available': return 'Available'
      case 'in-use': return 'In Use'
      case 'maintenance': return 'Maintenance'
      case 'retired': return 'Retired'
      default: return status || 'Unknown'
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
      return
    }

    try {
      await assetService.deleteAsset(id)
      onAssetUpdate() // Refresh the list
    } catch (error) {
      console.error('Error deleting asset:', error)
      alert('Failed to delete asset. Please try again.')
    }
  }

  return (
    <div className="asset-card">
      <div className="asset-header">
        <div>
          <h3 className="asset-name">{asset.name}</h3>
          <span className="asset-tag">{asset.tag || `ID: ${asset.assetId}`}</span>
        </div>
        <span className={`asset-status ${getStatusClass(asset.status)}`}>
          {getStatusText(asset.status)}
        </span>
      </div>
      
      <div className="asset-details">
        <div className="asset-detail">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{asset.description || 'N/A'}</span>
        </div>
        {asset.location && (
          <div className="asset-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">
              {typeof asset.location === 'object' ? asset.location.name : asset.location}
            </span>
          </div>
        )}
        {asset.assignedTo && (
          <div className="asset-detail">
            <span className="detail-label">Assigned To:</span>
            <span className="detail-value">
              {typeof asset.assignedTo === 'object' ? asset.assignedTo.name : asset.assignedTo}
            </span>
          </div>
        )}
      </div>
      
      <div className="asset-actions">
        <Link to={`/assets/${asset.assetId}`} className="btn btn-primary">
          View Details
        </Link>
        <Link to={`/assets/edit/${asset.assetId}`} className="btn btn-secondary">
          Edit
        </Link>
        <button 
          className="btn btn-danger" 
          onClick={() => handleDelete(asset.assetId)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AssetCard