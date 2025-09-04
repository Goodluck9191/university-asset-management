// src/components/Assets/AssetCard.jsx
import { Link } from 'react-router-dom'

const AssetCard = ({ asset, onDelete, isDeleting }) => {
  const getStatusClass = (asset) => {
    // Check if asset is assigned or has maintenance status
    if (asset.status === 'maintenance') return 'status-maintenance'
    if (asset.assignedTo) return 'status-in-use'
    return 'status-available'
  }

  const getStatusText = (asset) => {
    if (asset.status === 'maintenance') return 'Maintenance'
    if (asset.assignedTo) return 'In Use'
    return 'Available'
  }

  return (
    <div className="asset-card">
      <div className="asset-header">
        <div>
          <h3 className="asset-name">{asset.name}</h3>
          <span className="asset-tag">{asset.tag || `ID: ${asset.assetId}`}</span>
        </div>
        <span className={`asset-status ${getStatusClass(asset)}`}>
          {getStatusText(asset)}
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
        <Link to={`/assets/${asset.assetId || asset.id}`} className="btn btn-primary">
          View Details
        </Link>
        <Link to={`/assets/edit/${asset.assetId || asset.id}`} className="btn btn-secondary">
          Edit
        </Link>
        <button 
          className="btn btn-danger" 
          onClick={() => onDelete(asset.assetId || asset.id)}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default AssetCard