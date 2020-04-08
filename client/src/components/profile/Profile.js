import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGuthub from './ProfileGithub';

const Profile = ({
  match, getProfileById, auth,
  profile: { profile, loading } }) => {

  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (<Spinner />) : (
        <Fragment>
          <Link to="/profiles" className="btn">
            <i className="fas fa-arrow-left"></i>
            <span>Назад</span>
          </Link>
          {
            auth.isAuthenticated && auth.loading === false &&
            auth.user._id === profile.user._id &&
            <Link to='/edit-profile' className="btn btn-dark btn-profiles">
              Редактировать профиль
            </Link>
          }
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">
                Опыт деятельности
              </h2>
              {
                profile.experience.length > 0 ? (<Fragment>
                  {profile.experience.map(el => (
                    <ProfileExperience key={el._id} exp={el} />
                  ))}
                </Fragment>) : (<Fragment>
                  <h4 className="text-dark my-2 py-2"> Опыта работы нет или он еще  не указан </h4>
                </Fragment>)
              }
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">
                Образование
              </h2>
              {
                profile.education.length > 0 ? (<Fragment>
                  {profile.education.map(el => (
                    <ProfileEducation key={el._id} edu={el} />
                  ))}
                </Fragment>) : (<Fragment>
                  <h4 className="text-dark my-2 py-2"> Нет информации об учебных заведениях </h4>
                </Fragment>)
              }
            </div>
            {
              profile.githubusername.length && (
                <ProfileGuthub username={profile.githubusername} />
              )
            }
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(Profile);
