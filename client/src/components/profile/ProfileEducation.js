import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


const ProfileEducation = ({
  edu: { degree, school, fieldofstudy, location, from, to, description }
}) => (
    <div class="text-dark">
      <h3><strong>Название заведения : </strong> {school}</h3>
      <p><strong>Период : </strong>
        <Moment format="YYYY/MM/DD">
          {from}
        </Moment>
        {` - `}
        {to === null ? ('сейчас') : <Moment format="YYYY/MM/DD">
          {to}
        </Moment>
        }
      </p>
      <p><strong>Расположение : </strong> {location}</p>
      <p><strong>Степень: </strong> {degree}</p>
      <p><strong>Специальность: </strong> {fieldofstudy}</p>
      {
        description && (
          <p>  <strong>Описание:</strong> {description}</p>
        )
      }
    </div>
  )
ProfileEducation.propTypes = {
  exp: PropTypes.array.isRequired
}

export default ProfileEducation
