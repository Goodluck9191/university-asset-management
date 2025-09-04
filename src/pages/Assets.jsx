// src/pages/Assets.jsx
import { useState, useEffect } from 'react'
import AssetList from '../components/Assets/AssetList'
import SearchBar from '../components/UI/SearchBar'
import { assetService } from '../services/assetService'

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      setLoading(true)
      const response = await assetService.getAllAssets()
      setAssets(response.data)
    } catch (err) {
      setError('Failed to fetch assets. Please try again.')
      console.error('Error fetching assets:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading assets...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Asset Inventory</h2>
        <p>Manage all university assets</p>
      </div>
      
      <div className="page-actions">
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search assets..." 
        />
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Assets</option>
          <option value="available">Available</option>
          <option value="in-use">In Use</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      
      <AssetList 
        assets={assets} 
        searchTerm={searchTerm} 
        filter={filter} 
        onAssetUpdate={fetchAssets}
      />
    </div>
  )
}

export default Assets