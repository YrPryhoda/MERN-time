import {
  GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(el => el._id === payload.postId ? {
          ...el,
          likes: payload.likes
        } : el),
        loading: false
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(el => el._id !== payload),
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}
