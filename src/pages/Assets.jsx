// src/pages/Assets.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AssetList from '../components/Assets/AssetList'
import SearchBar from '../components/UI/SearchBar'
import { assetService } from '../services/assetService'

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchAssets()
  }, [])

  const fetchAssets = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await assetService.getAllAssets()
      setAssets(response.data)
    } catch (err) {
      console.error('Error fetching assets:', err)
      setError('Failed to fetch assets. Please try again.')
      // Fallback to mock data if backend is not available
      setAssets(getMockAssets())
    } finally {
      setLoading(false)
    }
  }

  // Mock data for fallback
  const getMockAssets = () => {
    return [
      {
        assetId: 1,
        name: 'Dell Latitude Laptop',
        description: 'Dell Latitude 5420, 16GB RAM, 512GB SSD',
        location: { locationId: 1, name: 'Computer Lab A' },
        status: 'available'
      },
      {
        assetId: 2,
        name: 'Projector Epson',
        description: 'Epson HD Projector with 4000 lumens',
        location: { locationId: 2, name: 'Lecture Hall B' },
        status: 'in-use'
      }
    ]
  }

  const handleAddAsset = () => {
    navigate('/add-asset')
  }

  const handleAssetUpdate = () => {
    fetchAssets() // Refresh the list after operations
  }

  if (loading) return <div className="loading">Loading assets...</div>

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Asset Inventory</h2>
          <p>Manage all university assets</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddAsset}>
          Add New Asset
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
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
        onAssetUpdate={handleAssetUpdate}
      />
    </div>
  )
}

export default Assets