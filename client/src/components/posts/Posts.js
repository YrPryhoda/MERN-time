import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, posts: { posts, loading } }) => {
  
  useEffect(() => {
    getPosts();
  }, [getPosts])
  return loading ? <Spinner /> : (<Fragment>
    <h1 className="large text-primary">
      Публикации
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i> Просмотр ленты публикаций
    </p>
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Напишите что то.....</h3>
      </div>
      <PostForm />
      <div className="posts">
        {
          posts.map(post => (
            <PostItem key = {post._id} post={post} />
          ))
        }
      </div>
    </div>
  </Fragment>)
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  posts: state.post
})
const mapDispatchToProps = {
  getPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
