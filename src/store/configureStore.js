import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BOND_DETAILS':
      console.log('did this happen?');
      return { ...state, ...action.value };
    default:
      return state;
  }
};
export default () => {
  return createStore(reducer, applyMiddleware(thunk));
};
