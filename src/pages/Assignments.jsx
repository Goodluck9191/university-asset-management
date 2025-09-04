// src/pages/Assignments.jsx
import { useState, useEffect } from 'react'
import { assignmentService } from '../services/assignmentService'

const Assignments = () => {
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      const response = await assignmentService.getAllAssignments()
      setAssignments(response.data)
    } catch (err) {
      setError('Failed to fetch assignments. Please try again.')
      console.error('Error fetching assignments:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading assignments...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Asset Assignments</h2>
        <p>View and manage asset assignments to users</p>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Assignment ID</th>
              <th>User</th>
              <th>Asset</th>
              <th>Assigned At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assignment => (
              <tr key={assignment.assignmentId}>
                <td>{assignment.assignmentId}</td>
                <td>{assignment.user?.name || `User ID: ${assignment.user?.userId}`}</td>
                <td>{assignment.asset?.name || `Asset ID: ${assignment.asset?.assetId}`}</td>
                <td>{new Date(assignment.assignedAt).toLocaleDateString()}</td>
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

export default Assignments