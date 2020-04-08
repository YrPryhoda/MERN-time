import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addEducation } from '../../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school, degree, fieldofstudy, from, to, current, description
  } = formData;
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })
  return (
    <Fragment>
      <h1 class="large text-primary">
        Добавить или изменить место обучения
    </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i>
      Добавить текущее или предыдущее место обучения
    </p>
      <small>* Обязательные поля</small>
      <form class="form" onSubmit={e => {
        e.preventDefault();
        addEducation(formData, history)
      }}>
        <div class="form-group">
          <input
            value={degree} onChange={e => onChange(e)}
            type="text" placeholder="* Ваше образование" name="degree" required />
        </div>
        <div class="form-group">
          <input
            value={school} onChange={e => onChange(e)}
            type="text" placeholder="* Учебное заведение" name="school" required />
        </div>
        <div class="form-group">
          <input
            value={fieldofstudy} onChange={e => onChange(e)}
            type="text" placeholder="Местоположение" name="fieldofstudy" />
        </div>
        <div class="form-group">
          <h4 class="text-dark">Дата начала работы</h4>
          <input
            value={from} onChange={e => onChange(e)}
            type="date" name="from" />
        </div>
        <div class="form-group">
          <h4 class="text-dark">Дата окончания</h4>
          <input
            value={to} onChange={e => onChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
            type="date" name="to" />
        </div>
        <div class="form-group">
          <p><input
            value={current} onChange={e => {
              setFormData({
                ...formData, current: !current
              });
              toggleDisabled(!toDateDisabled)
            }}
            checked={current}
            type="checkbox" name="current" id="current" />
            <label for="current"> Текущее место обучения </label></p>
        </div>
        <div class="form-group">
          <textarea
            value={description} onChange={e => onChange(e)}
            name="description" cols="30" rows="5" placeholder="Небольшое описание">
          </textarea>
        </div>
        <input type="submit" value="Подтвердить" class="btn btn-primary my-1" />
        <Link to="/dashboard" class="btn my-1"> Назад</Link>
      </form >
    </Fragment >
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation));
