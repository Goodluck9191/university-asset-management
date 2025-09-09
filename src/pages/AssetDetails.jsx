// src/pages/AssetDetails.jsx
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { assetService } from '../services/assetService'

const AssetDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [asset, setAsset] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAssetDetails()
  }, [id])

  const fetchAssetDetails = async () => {
    try {
      setLoading(true)
      const response = await assetService.getAssetById(id)
      setAsset(response.data)
    } catch (err) {
      console.error('Error fetching asset details:', err)
      setError('Failed to fetch asset details. Please try again.')
      
      // Try to find the asset in the list from localStorage or mock data
      try {
        const assets = JSON.parse(localStorage.getItem('assets') || '[]')
        const foundAsset = assets.find(a => 
          a.assetId === parseInt(id) || a.id === parseInt(id) || a.tag === id
        )
        if (foundAsset) {
          setAsset(foundAsset)
          setError('')
        }
      } catch (e) {
        console.error('Error finding asset in fallback:', e)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
      return
    }

    try {
      await assetService.deleteAsset(id)
      // Refresh the assets list
      window.dispatchEvent(new CustomEvent('refreshAssets'))
      navigate('/assets')
    } catch (error) {
      console.error('Error deleting asset:', error)
      alert('Failed to delete asset. Please try again.')
    }
  }

  if (loading) return <div className="loading">Loading asset details...</div>
  if (error && !asset) return <div className="error">{error}</div>
  if (!asset) return <div className="error">Asset not found</div>

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/assets" className="back-link">← Back to Assets</Link>
        <h2>{asset.name}</h2>
        <p>Asset Tag: {asset.tag || `ID: ${asset.assetId || asset.id}`}</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="asset-details-container">
        <div className="asset-details-card">
          <h3>Basic Information</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{asset.category || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`status status-${asset.status ? asset.status.toLowerCase().replace(' ', '-') : 'unknown'}`}>
                {asset.status || 'Unknown'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">
                {asset.location ? (typeof asset.location === 'object' ? asset.location.name : asset.location) : 'N/A'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assigned To:</span>
              <span className="detail-value">
                {asset.assignedTo ? (typeof asset.assignedTo === 'object' ? asset.assignedTo.name : asset.assignedTo) : 'Unassigned'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Purchase Date:</span>
              <span className="detail-value">{asset.purchaseDate || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Value:</span>
              <span className="detail-value">{asset.value || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="asset-description">
          <h3>Description</h3>
          <p>{asset.description || 'No description available.'}</p>
        </div>
      </div>
      
      <div className="asset-actions">
        <Link to={`/assets/edit/${asset.assetId || asset.id || asset.tag}`} className="btn btn-primary">
          Edit Asset
        </Link>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete Asset
        </button>
      </div>
    </div>
  )
}

export default AssetDetails