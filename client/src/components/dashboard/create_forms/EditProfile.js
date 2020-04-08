import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfile = ({
  createProfile, getCurrentProfile,
  history, profile: { profile, loading }
}) => {

  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedIn: '',
    youtube: '',
    instagram: ''
  });
  const [displaySocial, toggleSocial] = useState(false);
  useEffect(() => {
      getCurrentProfile();
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills,
      githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social.twitter ? '' : profile.social.twitter,
      facebook: loading || !profile.social.facebook ? '' : profile.social.facebook,
      linkedIn: loading || !profile.social.linkedIn ? '': profile.social.linkedIn,
      youtube: loading || !profile.social.youtube ? '' : profile.social.youtube,
      instagram: loading || !profile.social.instagram ? '' : profile.social.instagram
    })
  }, [loading, getCurrentProfile]);

  const {
    company, website,
    location, status,
    skills, githubusername,
    bio, twitter,
    facebook, linkedIn,
    youtube, instagram
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true)
  };
  return (
    <Fragment>
      <h1 className="large text-primary">
        Создать профиль
    </h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Добавим немного информации о себе
    </p>
      <small>* - обязательные поля</small>
      <form action="" className="form" onSubmit={(e) => onSubmit(e)} >
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)} >
            <option value="0"> * Выберите свой статус</option>
            <option value="Developer"> Developer </option>
            <option value="Junior Developer"> Junior Developer </option>
            <option value="Senior Developer"> Senior Developer </option>
            <option value="Manager"> Менеджер </option>
            <option value="Student or Learning"> Студент или учащийся </option>
            <option value="Instructor"> Ментор </option>
            <option value="Intern"> Стажер </option>
            <option value="Other"> Другое </option>
          </select>
          <small className="form-text">
            Дайте нам понять на каком вы этапе своей карьеры
        </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Компания" name="company"
            value={company} onChange={e => onChange(e)} />
          <small className="form-text">
            Вы можете быть владельцем компании или работать в ней
        </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Ваш сайт" name="website"
            value={website} onChange={e => onChange(e)} />
          <small className="form-text">
            Это может быть ваш сайт или сайт компании
        </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Местоположение" name="location"
            value={location} onChange={e => onChange(e)} />
          <small className="form-text">
            Укажите свой город, регион, страну
        </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Навыки" name="skills"
            value={skills} onChange={e => onChange(e)} />
          <small className="form-text">
            Перечислите ваши навыки через запятую (Напр. HTML,CSS,JS,NodeJS)
        </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Имя на GitHub" name="githubusername"
            value={githubusername} onChange={e => onChange(e)} />
          <small className="form-text">
            Введите ваше имя на GitHub и мы отобразим ваши последние репозитории
        </small>
        </div>
        <div className="form-group">
          <textarea placeholder="Короткая биография" name="bio"
            defaultValue={bio} onChange={e => onChange(e)} cols='30' rows='5'>
          </textarea>
          <small className="form-text">
            Расскажите немного о себе
        </small>
        </div>
        <div className="my-2">
          <button type="button" name="btn" className="btn btn-profiles"
            onClick={() => toggleSocial(!displaySocial)}>
            Добавить ссылки на социльные сети
        </button>
          <small className="form-text">
            По желанию
        </small>
        </div>
        {displaySocial && <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" name="twitter" placeholder="Twitter URL"
              value={twitter} onChange={e => onChange(e)} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" name="facebook" placeholder="Facebook URL"
              value={facebook} onChange={e => onChange(e)} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" name="youtube" placeholder="Youtube URL"
              value={youtube} onChange={e => onChange(e)} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-linkedin fa-2x"></i>
            <input type="text" name="linkedIn" placeholder="Linkedin URL"
              value={linkedIn} onChange={e => onChange(e)} />
          </div>
          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" name="instagram" placeholder="Instagram URL"
              value={instagram} onChange={e => onChange(e)} />
          </div>
        </Fragment>}
        <input type="submit" value="Подтвердить"
          className="btn btn-primary my-1 py-1" />
        <Link to="/dashboard"> Назад </Link>
      </form>
    </Fragment >
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile

})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
