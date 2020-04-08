import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { Link } from 'react-router-dom';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">
      Портфолио
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i> Привет{user && `, ${user.name}!`}
    </p>
    {profile !== null ? <Fragment>
      <DashboardActions />
      <Experience experience={profile.experience} />
      <Education education={profile.education} />
      <div className="my-2">
        <button className="btn btn-danger btn-profiles"
          onClick={() => deleteAccount()}>
          <i className="fas fa-user-minus"></i>
        Удалить аккаунт
      </button>
      </div>
    </Fragment> : <Fragment>
        <div className="create-profile">
          <p className='my-1 py-1'> Добавте информации о себе </p>
          <Link to="/create-profile" className="btn btn-dash">
            <i className="fas fa-user-circle text-primary"></i>
            {' '} Создать профиль</Link>
        </div>
      </Fragment>}
  </Fragment>;
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
}
const mapDispatchToProps = {
  getCurrentProfile,
  setAlert,
  deleteAccount
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
