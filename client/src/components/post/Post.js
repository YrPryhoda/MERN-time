import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostSingle from './PostSingle';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({ getPost, post: { loading, post }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id])
  return loading || post === null ? <Spinner /> : (<Fragment>
    <PostSingle post={post} />
    <div className="post-form-header bg-primary">
      <h3>
        Вы можете оставить комментарий
      </h3>
    </div>
    <div className="post-form">
      <CommentForm postId={post._id} />
      <div className="posts">
        {
          post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))
        }
      </div>
    </div>
  </Fragment>)
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  post: state.post
})

const mapDispatchToProps = {
  getPost
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);
