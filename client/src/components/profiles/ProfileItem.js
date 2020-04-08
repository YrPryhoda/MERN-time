import React from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const ProfileItem = ({ el }) => {
  return (
    <div className="profile bg-light">
      <img src={el.user.avatar}
        alt="Dev avatar" className="round-img" />
      <div className="text-dark">
        <h2 className="">{el.user.name}</h2>
        <p>{el.status} {el.company && <span>{` в ${el.company}`}</span>}</p>
        <p>{el.location && <span>{el.location}</span>}</p>
        <Link to={`/profile/${el.user._id}`}
          className="btn btn-primary btn-profiles">
          Профиль
        </Link>
      </div>
      <ul>
        {el.skills.slice(0, 4).map((skill, i) => (
          <li key={i} className="text-primary">
            <i className="fas fa-check">{' '}{skill}</i>
          </li>
        ))}
      </ul>
    </div >
  )
}

ProfileItem.propTypes = {
  el: PropTypes.object.isRequired
}

export default ProfileItem
