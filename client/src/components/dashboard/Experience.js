import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {

  const experiences = experience.map(el => (
    <tr key={el._id}>
      <td>{el.company}</td>
      <td className="hide-sm">{el.title}</td>
      <td className="hide-sm">{el.location}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">
          {el.from}
        </Moment>
        {` - `}
        {el.to === null ? ('сейчас') : <Moment format="YYYY/MM/DD">
          {el.to}
        </Moment>
        }
      </td>
      <td>
        <button className="btn btn-danger"
          onClick={() => deleteExperience(el._id)}>
          Удалить
        </button>
      </td>
    </tr>
  ))
  if (+(experience.length) === 0) {
    return null;
  }
  return (
    <Fragment>
      <h2 className="my-2">
        Опыт работы
    </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Компания</th>
            <th className="hide-sm">Посада</th>
            <th className="hide-sm">Геолокация</th>
            <th className="hide-sm">Период</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);
