import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addExperience } from '../../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    company, title, location, from, to, current, description
  } = formData;
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })
  return (
    <Fragment>
      <h1 className="large text-primary">
        Добавить или изменить опыт работы
    </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i>
      Добавить текущее или предыдущее место работы
    </p>
      <small>* Обязательные поля</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addExperience(formData, history)
      }}>
        <div className="form-group">
          <input
            value={title} onChange={e => onChange(e)}
            type="text" placeholder="* Ваша посада" name="title" required />
        </div>
        <div className="form-group">
          <input
            value={company} onChange={e => onChange(e)}
            type="text" placeholder="* Компания" name="company" required />
        </div>
        <div className="form-group">
          <input
            value={location} onChange={e => onChange(e)}
            type="text" placeholder="Местоположение" name="location" />
        </div>
        <div className="form-group">
          <h4 className="text-dark">Дата начала работы</h4>
          <input
            value={from} onChange={e => onChange(e)}
            type="date" name="from" />
        </div>
        <div className="form-group">
          <h4 className="text-dark">Дата окончания</h4>
          <input
            value={to} onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
            type="date" name="to" />
        </div>
        <div className="form-group">
          <p><input
            value={current} onChange={e => {
              setFormData({
                ...formData, current: !current
              });
              toggleDisabled(!toDateDisabled)
            }}
            checked={current}
            type="checkbox" name="current" id="current" />
            <label for="current"> Текущая работа </label></p>
        </div>
        <div className="form-group">
          <textarea
            value={description} onChange={e => onChange(e)}
            name="description" cols="30" rows="5" placeholder="Небольшое описание">
          </textarea>
        </div>
        <input type="submit" value="Подтвердить" className="btn btn-primary my-1" />
        <Link to="/dashboard" className="btn my-1"> Назад</Link>
      </form >
    </Fragment >
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience));
