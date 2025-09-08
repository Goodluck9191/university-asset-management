// src/components/Assets/AssetList.jsx
import AssetCard from './AssetCard'

const AssetList = ({ assets, searchTerm, filter, onAssetUpdate }) => {
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (asset.tag && asset.tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'available' && asset.status === 'available') ||
                         (filter === 'in-use' && asset.status === 'in-use') ||
                         (filter === 'maintenance' && asset.status === 'maintenance')
    
    return matchesSearch && matchesFilter
  })

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
            key={asset.assetId} 
            asset={asset} 
            onAssetUpdate={onAssetUpdate}
          />
        ))
      )}
    </div>
  )
}

export default AssetList