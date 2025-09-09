// src/components/Assets/AssetCard.jsx
import { Link } from 'react-router-dom'
import { assetService } from '../../services/assetService'

const AssetCard = ({ asset, onAssetUpdate }) => {
  // Get the correct asset ID (handle both backend and mock data)
  const getAssetId = () => {
    return asset.assetId || asset.id || asset.tag
  }

  const getStatusClass = (status) => {
    if (!status) return 'status-unknown'
    
    const statusLower = status.toLowerCase()
    if (statusLower.includes('use') || statusLower === 'in use') return 'status-in-use'
    if (statusLower.includes('available') || statusLower === 'available') return 'status-available'
    if (statusLower.includes('maintenance') || statusLower === 'maintenance') return 'status-maintenance'
    if (statusLower.includes('retired') || statusLower === 'retired') return 'status-retired'
    return 'status-unknown'
  }

  const getStatusText = (status) => {
    if (!status) return 'Unknown'
    
    const statusLower = status.toLowerCase()
    if (statusLower.includes('use') || statusLower === 'in use') return 'In Use'
    if (statusLower.includes('available') || statusLower === 'available') return 'Available'
    if (statusLower.includes('maintenance') || statusLower === 'maintenance') return 'Maintenance'
    if (statusLower.includes('retired') || statusLower === 'retired') return 'Retired'
    return status
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
      return
    }

    try {
      await assetService.deleteAsset(id)
      // Refresh the assets list
      window.dispatchEvent(new CustomEvent('refreshAssets'))
      onAssetUpdate() // Refresh the list
    } catch (error) {
      console.error('Error deleting asset:', error)
      alert('Failed to delete asset. Please try again.')
    }
  }

  const assetId = getAssetId()
  const statusClass = getStatusClass(asset.status)
  const statusText = getStatusText(asset.status)

  return (
    <div className="asset-card">
      <div className="asset-header">
        <div>
          <h3 className="asset-name">{asset.name}</h3>
          <span className="asset-tag">{asset.tag || `ID: ${assetId}`}</span>
        </div>
        <span className={`asset-status ${statusClass}`}>
          {statusText}
        </span>
      </div>
      
      <div className="asset-details">
        <div className="asset-detail">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{asset.category || 'N/A'}</span>
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
        <Link to={`/assets/${assetId}`} className="btn btn-primary">
          View Details
        </Link>
        <Link to={`/assets/edit/${assetId}`} className="btn btn-secondary">
          Edit
        </Link>
        <button 
          className="btn btn-danger" 
          onClick={() => handleDelete(assetId)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default AssetCard