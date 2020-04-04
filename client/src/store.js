import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState,
  composeWithDevTools(
    applyMiddleware(
      ...middleware)));
// аргументы: 1-набор редьюсеров, 2-дефолтное значения, 
//3-отладка в браузере => 3.1 все промежуточные функции, типа thunk

export default store;