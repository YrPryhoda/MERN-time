import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, postId }) => {
  const [comment, setComment] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    addComment(postId, { comment });
    setComment('');
  }
  return (
    <form className="form my-1" onSubmit={e => onSubmit(e)}>
      <textarea
        name="text"
        value={comment}
        onChange={e => setComment(e.target.value)}
        cols="30" rows="5" placeholder="Напишите публикацию"
        required
      >
      </textarea>
      <input type="submit" value="Отправить" className="btn btn-dark my-1" />
    </form>
  )
}
CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addComment
}

export default connect(null, mapDispatchToProps)(CommentForm);
