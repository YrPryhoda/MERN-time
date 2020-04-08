import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';


const ProfileExperience = ({
  exp: { title, company, location, from, to, description }
}) => (
    <div class="text-dark">
      <h3><strong>Название фирмы : </strong> {company}</h3>
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
      <p><strong>Позиция: </strong> {title}</p>
      {
        description && (
          <p>  <strong>Описание:</strong> {description}</p>
        )
      }
    </div>
  )

ProfileExperience.propTypes = {
  exp: PropTypes.array.isRequired
}

export default ProfileExperience
