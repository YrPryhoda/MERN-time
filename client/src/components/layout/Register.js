import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) => setFormData({
    ...formData, [e.target.name]: e.target.value
  });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Пароли не совпадают', 'danger', 3000);
    } else {
      register({ name, email, password });
    }
  }
  if(isAuthenticated) {
    return (<Redirect to='/dashboard' />)
  }
  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Регистрация
  </h1>
      <p className="lead"><i className="fas fa-user"></i>
        <span>Создайте аккаунт</span>
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={name}
            onChange={e => onChange(e)}
            /* required */ />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Ваша почта"
            value={email}
            onChange={e => onChange(e)}
            /* required */ />
          <small className="form-text">
            Этот сайт использует Gavatar
      </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Создйте  надежный пароль"
            value={password}
            onChange={e => onChange(e)}
            /* minLength="6" */ />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            placeholder="Подтвердите пароль"
            value={password2}
            onChange={e => onChange(e)}
            /* minLength="6" */ />
        </div>
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
      <p className="my-1 media-mobile">
        У вас уже создан аккаунт?
        <Link to="/login"> Войдите</Link>
      </p>
    </React.Fragment>
  )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
//connect(mapStateToProps, mapDispatchToProps, [mergeProps], [options])
export default connect(mapStateToProps, { setAlert, register })(Register);