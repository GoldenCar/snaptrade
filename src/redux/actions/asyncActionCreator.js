// From: https://engineering.blogfoster.com/managing-complexity-in-redux-higher-order-reducers-and-async-state/

// Here we have a function which accepts a map of async states to action types
// as well as a thunk creator. It will yield a new thunk creator which wraps
// the provided one with our async state logic

import { createThunk } from 'redux-thunk';

export type AsyncTypes = {|
  pending: string,
  complete: string,
  error: string,
|};

const asyncActionCreator = (asyncTypes: AsyncTypes, createThunk) => (...args) => {
  const thunk = createThunk(...args);

  return dispatch => {
    dispatch({ type: asyncTypes.pending });

    // We assume here that the wrapped thunk produces a Promise
    // We call dispatch on the thunk (it's just a normal thunk, after all)
    // and since dispatch yields its result, we can utilize the returned
    // Promise
    return dispatch(thunk)
      .then(payload => ({
        type: asyncTypes.complete,
        payload,
      }))
      .catch(error => ({
        type: asyncTypes.error,
        error: true,
        payload: error,
      }));
  };
};

export default asyncActionCreator;
