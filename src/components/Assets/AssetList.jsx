// src/components/Assets/AssetList.jsx
import { useState } from 'react'
import AssetCard from './AssetCard'
import { assetService } from '../../services/assetService'

const AssetList = ({ assets, searchTerm, filter, onAssetUpdate }) => {
  const [deletingId, setDeletingId] = useState(null)

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (asset.tag && asset.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    // For now, we'll use a simple filter based on assignment status
    // You might need to adjust this based on your actual data structure
    const matchesFilter = filter === 'all' || 
                         (filter === 'available' && !asset.assignedTo) ||
                         (filter === 'in-use' && asset.assignedTo) ||
                         (filter === 'maintenance' && asset.status === 'maintenance')
    return matchesSearch && matchesFilter
  })

  const handleDeleteAsset = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) {
      return
    }

    setDeletingId(id)
    try {
      await assetService.deleteAsset(id)
      onAssetUpdate() // Refresh the asset list
    } catch (error) {
      console.error('Error deleting asset:', error)
      alert('Failed to delete asset. Please try again.')
    } finally {
      setDeletingId(null)
    }
  }

  if (assets.length === 0) {
    return <div className="no-assets">No assets found in the system.</div>
  }

  return (
    <div className="asset-list">
      {filteredAssets.length === 0 ? (
        <div className="no-assets">No assets found matching your criteria.</div>
      ) : (
        filteredAssets.map(asset => (
          <AssetCard 
            key={asset.assetId || asset.id} 
            asset={asset} 
            onDelete={handleDeleteAsset}
            isDeleting={deletingId === (asset.assetId || asset.id)}
          />
        ))
      )}
    </div>
  )
}

export default AssetList