import { handleActions, combineActions } from 'redux-actions';

import { clearUserState } from '../actions/user';
import {
	signupRequestSuccess,
	loginRequestSuccess,
	logout,
	login
} from '../../screens/AuthFeed/actions.AuthFeed';

export type UserFeedState = {|
	isLogin: boolean,
	// token: string,
	pending: fabooleanlse

|};

const initialState: AuthFeedState = {
	isLogin: false,
	pending: false
};

const reducer = handleActions(
	{
		[combineActions(signupRequestSuccess, loginRequestSuccess, login)]: (
			state,
			action
		) => ({
			...state,
			isLogin: true,
		}),
		[combineActions(logout, clearUserState)]: () => ({
			...initialState
		}),
	},
	initialState
);

export default reducer;
