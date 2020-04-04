import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '', 
  });
  const { email, password } = formData;
  const onChange = (e) => setFormData({
    ...formData, [e.target.name]: e.target.value
  });
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }
  //redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  } 
  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Страница входа
    </h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        <span>Войти</span>
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Ваша почта"
            value={email}
            onChange={e => onChange(e)}
            required />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Введите Ваш пароль"
            value={password}
            onChange={e => onChange(e)}
            minLength="6" />
        </div>
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
      <p className="my-1">
        У вас еще не создан аккаунт?
      <Link to="/register"> Зарегистрируйтесь!</Link>
      </p>

    </React.Fragment>
  )
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
