import { State } from '../actions/types';
import { createSelector } from 'reselect';
// import { UserFeedState } from '../reducers/user';
const getRootPath = (state: State = {}) => {
	return state.user;
};

export const getUserLoggin = createSelector(
	getRootPath,
	user => user.isLogin
);

export const getUserPending = createSelector(
	getRootPath,
	user => user.pending
);
