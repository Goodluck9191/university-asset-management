// src/components/Layout/Layout.jsx
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header user={user} onLogout={onLogout} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout