import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navebar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Люди
          </Link>
      </li>
      <li><Link to="/posts">Публикации</Link></li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>
          <span className="hide-sm"> Портфолио </span>
        </Link>
      </li>
      <li>
        <Link to="/login" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm"> Выйти </span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Люди</Link></li>
      <li><Link to="/register">Регистрация</Link></li>
      <li><Link to="/login">Логин</Link></li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i>
          <span className="logo">{' '}
            IT Universe
            </span>
        </Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  )
}
Navebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navebar);
