import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post';
const PostItem = ({
  auth, post: { _id, text, name, avatar, user, likes, comments, date },
  addLike, removeLike, deletePost
}) => <div className="post bg-white my-1">
    <div className="align">
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
        <Link to={`/post/${_id}`} className="button-post">
          Обсуждения
          {comments.length > 0 && (
            <span className="comment-count"> [{comments.length}]</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button className="button-post button-danger" onClick={e => deletePost(_id)}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  </div>

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)
