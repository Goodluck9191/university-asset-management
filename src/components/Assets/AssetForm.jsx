// src/components/Assets/AssetForm.jsx
import { useState } from 'react'

const AssetForm = ({ onSubmit, editAsset = null, locations = [] }) => {
  const [formData, setFormData] = useState({
    name: editAsset?.name || '',
    description: editAsset?.description || '',
    location: editAsset?.location ? 
      (typeof editAsset.location === 'object' ? editAsset.location.locationId : editAsset.location) 
      : '',
    status: editAsset?.status || 'available',
    assignedTo: editAsset?.assignedTo || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Prepare the data for API submission
    const submissionData = {
      ...formData,
      location: formData.location ? { locationId: parseInt(formData.location) } : null
    }
    
    onSubmit(submissionData)
  }

  return (
    <div className="asset-form">
      <h2>{editAsset ? 'Edit Asset' : 'Add New Asset'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Asset Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="maintenance">Under Maintenance</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.locationId} value={location.locationId}>
                  {location.name} {location.address && `- ${location.address}`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="assignedTo">Assigned To (User ID)</label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              placeholder="Enter user ID if assigned"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editAsset ? 'Update Asset' : 'Add Asset'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AssetForm