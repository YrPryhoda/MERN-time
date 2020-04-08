import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGitHubRepos } from '../../actions/profile';
import Spinner from '../layout/Spinner';
const ProfileGithub = ({ username, getGitHubRepos, repos }) => {

  useEffect(() => {
    getGitHubRepos(username)
  }, [getGitHubRepos, username])

  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> GitHub репозитории
    </h2>
      {
        repos === null ? <Spinner /> : (
          repos.map(el => (
            <div key={el._id} class="repo bg-white my-1 p-1">
              <div class="text-dark">
                <h4><a href={el.html_url} target="_blank" rel="noopener noreferrer">
                  {el.name}
                </a> </h4>
                <p>
                  {el.description}
                </p>
              </div>
              <div class="text-dark">
                <ul>
                  <li class="badge badge-primary"> Stars: {el.stargazers_count}</li>
                  <li class="badge badge-dark"> Просмотрено: {el.watchers_count} </li>
                  <li class="badge badge-light"> Ветки: {el.forks_count}</li>
                </ul>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string
}
const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub)
