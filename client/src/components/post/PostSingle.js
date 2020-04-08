import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { withRouter } from 'react-router-dom'

const PostSingle = ({
  post: { _id, name, avatar, text, date, likes, user },
  addLike, removeLike, deletePost, auth, history
}) => {

  return (<React.Fragment>
    <Link to="/posts" className="btn btn-light">
      <i className="fas fa-arrow-left"></i>
              Назад
            </Link>
    <div className="post bg-white my-1">
      <div className='align'>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt="user's photo"
            className="round-img" />
        </Link>
        <Link to={`/profile/${user}`}>
          <h4>{name}</h4>
        </Link>
      </div>
      <div className="text-dark single-post">
        <p className="my-1 post-height">
          {text}
        </p>
        <p className='post-date'>
          Публикация от {' '}
          <Moment format="YYYY/MM/DD">
            {date}
          </Moment>
        </p>
        <div className="buttons buttons-right">
          <button className="button-post" onClick={e => addLike(_id)}>
            <i className="fas fa-thumbs-up"></i>
            {
              likes.length > 0 && (
                <span>{` ${likes.length}`}</span>
              )
            }
          </button>
          <button className="button-post" onClick={e => removeLike(_id)}>
            <i className="fas fa-thumbs-down" ></i>
          </button>
          {!auth.loading && user === auth.user._id && (
            <button className="button-post button-danger" onClick={e => { deletePost(_id); history.push('/posts') }}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  </React.Fragment>
  )
}

PostSingle.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addLike, removeLike, deletePost
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostSingle))
