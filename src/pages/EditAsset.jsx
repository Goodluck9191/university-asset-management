// src/pages/EditAsset.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AssetForm from '../components/Assets/AssetForm'

const EditAsset = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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
      description: 'Dell Latitude 5420, 16GB RAM, 512GB SSD, Intel i7'
    }
    
    setAsset(mockAsset)
    setLoading(false)
  }, [id])

  const handleSubmit = (assetData) => {
    // In a real application, this would update the asset via API
    console.log('Updating asset:', assetData)
    alert('Asset updated successfully!')
    navigate(`/assets/${id}`)
  }

  if (loading) return <div className="loading">Loading asset data...</div>
  if (!asset) return <div className="error">Asset not found</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Edit Asset</h2>
        <p>Update asset information</p>
      </div>
      
      <AssetForm onSubmit={handleSubmit} editAsset={asset} />
    </div>
  )
}

export default EditAsset