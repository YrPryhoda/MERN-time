import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map(el => (
    <tr key={el._id}>
      <td>{el.school}</td>
      <td className="hide-sm">{el.degree}</td>
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
          onClick={() => deleteEducation(el._id)} >
          Удалить
        </button>
      </td>
    </tr>
  ))
  if (+(education.length) === 0) {
    return null;
  }
  return (
    <Fragment>
      <h2 className="my-2">
        Образование
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Учебное заведение</th>
            <th className="hide-sm">Профиль</th>
            <th className="hide-sm">Период</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {educations}
        </tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
}

export default connect(null, { deleteEducation })(Education);
