import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    addPost({
      text
    });
    setText('');
  }
  return (
    <form className="form my-1" onSubmit={e => onSubmit(e)}>
      <textarea cols="30" rows="5"
        placeholder="Напишите публикацию"
        value={text}
        onChange={e => setText(e.target.value)}>
      </textarea>
      <input type="submit" value="Отправить" className="btn btn-dark my-1" />
    </form>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addPost
}

export default connect(null, mapDispatchToProps)(PostForm)
