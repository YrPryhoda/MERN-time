import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {
  const { bio, skills } = profile;
  return (
    <div className="profile-about bg-light p-1">
      {
        bio && <Fragment>
          <h2 className="text-primary">Биография</h2>
          <p className="text-dark">
            {bio}
          </p>
        </Fragment>
      }
      <div className="line text-profiles">
        <h2 className="text-primary"> Навыки</h2>
        <div className="skills">
          {
            skills.map((el, i) => (
              <div key={i} className="p-1 text-dark">
                <i className="fas fa-check"></i> <span> {el} </span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
