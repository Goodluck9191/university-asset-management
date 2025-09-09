// src/pages/AddAsset.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AssetForm from '../components/Assets/AssetForm'
import { assetService } from '../services/assetService'
import { locationService } from '../services/locationService'

const AddAsset = () => {
  const navigate = useNavigate()
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await locationService.getAllLocations()
      setLocations(response.data)
    } catch (error) {
      console.error('Error fetching locations:', error)
      // Fallback to mock locations
      setLocations([
        { locationId: 1, name: 'Computer Lab A' },
        { locationId: 2, name: 'Lecture Hall B' },
        { locationId: 3, name: 'Library' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (assetData) => {
    try {
      await assetService.createAsset(assetData)
      alert('Asset added successfully!')
      
      // Refresh the assets list in the Assets page
      window.dispatchEvent(new CustomEvent('refreshAssets'))
      
      // Navigate back to assets page
      navigate('/assets')
    } catch (error) {
      console.error('Error creating asset:', error)
      alert('Failed to add asset. Please try again.')
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Add New Asset</h2>
        <p>Register a new asset to the university inventory</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <AssetForm 
        onSubmit={handleSubmit} 
        locations={locations}
      />
    </div>
  )
}

export default AddAsset