import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
  return (
    <React.Fragment>
      <div className="dash-buttons">
        <Link to="/create-profile" className="btn btn-dash">
          <i className="fas fa-user-circle text-primary"></i>
        Личные данные</Link>
        <Link to="/add-experience" className="btn btn-dash">
          <i className="fab fa-black-tie text-primary"></i>
        Места работы</Link>
        <Link to="/add-education" className="btn btn-dash">
          <i className="fas fa-graduation-cap text-primary"></i>
        Образование</Link>
      </div>
    </React.Fragment>
  )
}

export default DashboardActions
