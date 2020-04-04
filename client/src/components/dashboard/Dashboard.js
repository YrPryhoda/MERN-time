import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getCurrentProfile } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">
      Портфолио
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i> Привет{user && `, ${user.name}!`}
    </p>
    <DashboardActions />
    {profile !== null ? <Fragment>
      <h2 className="my-2">
        Опыт работы
    </h2>
      <table className="table">
        <thead>
          <tr>
            <th>Компания</th>
            <th className="hide-sm">Название</th>
            <th className="hide-sm">Период</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Microsoft Corp</td>
            <td className="hide-sm">Middle web Developer</td>
            <td className="hide-sm">20/10/2018-сейчас</td>
            <td>
              <button className="btn btn-danger">
                Удалить
            </button>
            </td>
          </tr>
          <tr>
            <td>EPAM</td>
            <td className="hide-sm">Junior web Developer</td>
            <td className="hide-sm">20/10/2015-20/09/2018</td>
            <td>
              <button className="btn btn-danger">
                Удалить
            </button>
            </td>
          </tr>
        </tbody>
      </table>
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
          <tr>
            <td>НТУУ КПИ</td>
            <td className="hide-sm">Телекоммуникации и радиотехника</td>
            <td className="hide-sm">20/10/2010-30/06/2015</td>
            <td>
              <button className="btn btn-danger">
                Удалить
            </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="my-2">
        <button className="btn btn-danger btn-profiles">
          <i className="fas fa-user-minus"></i>
        Удалить аккаунт
      </button>
      </div>
    </Fragment> : <Fragment>
        <p className='my-1 py-1'>Заполните поля профиля!</p>
      </Fragment>}
  </Fragment>;
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}
const mapDispatchToProps = {
  getCurrentProfile,
  setAlert
}
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
