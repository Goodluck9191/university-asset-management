// src/pages/Locations.jsx
import { useState, useEffect } from 'react'
import { locationService } from '../services/locationService'

const Locations = () => {
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
    } catch (err) {
      setError('Failed to fetch locations. Please try again.')
      console.error('Error fetching locations:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading locations...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Locations</h2>
        <p>Manage asset locations</p>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Location ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(location => (
              <tr key={location.locationId}>
                <td>{location.locationId}</td>
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td>{new Date(location.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-secondary btn-small">Edit</button>
                  <button className="btn btn-danger btn-small">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Locations