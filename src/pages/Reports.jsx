// src/pages/Reports.jsx
const Reports = () => {
  const reports = [
    { id: 1, title: 'Asset Inventory Report', description: 'Complete list of all assets', icon: '📋' },
    { id: 2, title: 'Maintenance Schedule', description: 'Upcoming and past maintenance', icon: '🔧' },
    { id: 3, title: 'Asset Value Report', description: 'Financial summary of assets', icon: '💰' },
    { id: 4, title: 'Assignment History', description: 'History of asset assignments', icon: '📊' },
    { id: 5, title: 'Depreciation Report', description: 'Asset depreciation over time', icon: '📉' },
    { id: 6, title: 'Audit Trail', description: 'All changes to asset records', icon: '👁️' },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h2>Reports</h2>
        <p>Generate and view various asset management reports</p>
      </div>
      
      <div className="reports-grid">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-icon">{report.icon}</div>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <button className="btn btn-primary">Generate Report</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reports