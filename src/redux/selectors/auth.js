import { State } from '../actions/types';
import { AuthFeedState } from '../../screens/AuthFeed/reducer.AuthFeed';
const getRootPath = (state: State = {}) => {
	return state.auth;
};

export const getAuthErrors = (state: AuthFeedState) =>
	getRootPath(state).error;
export const getAuthPending = (state: AuthFeedState) =>
	getRootPath(state).pending;
export const getAuthLogin = (state: AuthFeedState) =>
	getRootPath(state).loggin;
