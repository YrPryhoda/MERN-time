import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">
          Профили
    </h1>
        <p className="lead">
          <i className="fab fa-connectdevelop"> </i> <span>Люди</span>
        </p>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map(el => (
              <ProfileItem key={el._id} el={el} />
            ))
          ) :
            <h4> Не найдено зарегистрированых профилей </h4>}
        </div>
      </Fragment>}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
