// src/pages/EditAsset.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AssetForm from '../components/Assets/AssetForm'
import { assetService } from '../services/assetService'
import { locationService } from '../services/locationService'

const EditAsset = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [asset, setAsset] = useState(null)
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAssetAndLocations()
  }, [id])

  const fetchAssetAndLocations = async () => {
    try {
      setLoading(true)
      
      const [assetResponse, locationsResponse] = await Promise.all([
        assetService.getAssetById(id).catch(() => ({ data: null })),
        locationService.getAllLocations().catch(() => ({ data: [] }))
      ])
      
      setAsset(assetResponse.data)
      setLocations(locationsResponse.data)
      
      // If asset not found via API, try to find it in localStorage
      if (!assetResponse.data) {
        try {
          const assets = JSON.parse(localStorage.getItem('assets') || '[]')
          const foundAsset = assets.find(a => 
            a.assetId === parseInt(id) || a.id === parseInt(id) || a.tag === id
          )
          if (foundAsset) {
            setAsset(foundAsset)
          }
        } catch (e) {
          console.error('Error finding asset in fallback:', e)
        }
      }
      
    } catch (err) {
      setError('Failed to fetch asset data. Please try again.')
      console.error('Error fetching asset data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (assetData) => {
    try {
      await assetService.updateAsset(id, assetData)
      alert('Asset updated successfully!')
      
      // Refresh the assets list
      window.dispatchEvent(new CustomEvent('refreshAssets'))
      
      navigate(`/assets/${id}`)
    } catch (error) {
      console.error('Error updating asset:', error)
      alert('Failed to update asset. Please try again.')
    }
  }

  if (loading) return <div className="loading">Loading asset data...</div>
  if (error) return <div className="error">{error}</div>
  if (!asset) return <div className="error">Asset not found</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Edit Asset</h2>
        <p>Update asset information</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <AssetForm 
        onSubmit={handleSubmit} 
        editAsset={asset} 
        locations={locations}
      />
    </div>
  )
}

export default EditAsset