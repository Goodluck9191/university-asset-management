// src/pages/Users.jsx
import { useState, useEffect } from 'react'
import { userService } from '../services/userService'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers()
      setUsers(response.data)
    } catch (err) {
      setError('Failed to fetch users. Please try again.')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading users...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page">
      <div className="page-header">
        <h2>Users Management</h2>
        <p>Manage system users and their roles</p>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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

export default Users