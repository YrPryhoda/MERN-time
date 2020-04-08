import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  postId, auth, deleteComment
}) => (
    <React.Fragment >
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
          {
            !auth.loading && user === auth.user._id && (
              <div className="buttons buttons-right">
                <button className="button-post button-danger"
                  onClick={e => deleteComment(postId, _id)}>
                  <i className="fas fa-times"></i> {' Удалить комментарий'}
                </button>
              </div>
            )
          }
        </div>
      </div>
    </React.Fragment>
  )

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = {
  deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)
