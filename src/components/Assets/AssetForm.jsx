// src/components/Assets/AssetForm.jsx
import { useState, useEffect } from 'react'

const AssetForm = ({ onSubmit, editAsset = null, locations = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    status: 'available', // Default status
    category: '',
    tag: '',
    purchaseDate: '',
    value: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editAsset) {
      setFormData({
        name: editAsset.name || '',
        description: editAsset.description || '',
        location: editAsset.location ? 
          (typeof editAsset.location === 'object' ? editAsset.location.locationId : editAsset.location) 
          : '',
        status: editAsset.status || 'available',
        category: editAsset.category || '',
        tag: editAsset.tag || '',
        purchaseDate: editAsset.purchaseDate || '',
        value: editAsset.value || ''
      })
    }
  }, [editAsset])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Asset name is required'
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required'
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
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
            <label htmlFor="name">Asset Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter asset name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="tag">Asset Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g., IT-001"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option value="IT Equipment">IT Equipment</option>
              <option value="Audio Visual">Audio Visual</option>
              <option value="Furniture">Furniture</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
            >
              <option value="available">Available</option>
              <option value="in-use">In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="retired">Retired</option>
            </select>
            {errors.status && <span className="error-text">{errors.status}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.locationId} value={location.locationId}>
                  {location.name}
                </option>
              ))}
            </select>
            {errors.location && <span className="error-text">{errors.location}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="purchaseDate">Purchase Date</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Value ($)</label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="e.g., 1200.00"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter asset description"
          />
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