import { handleActions, combineActions } from 'redux-actions';

// import { Action, ReducerClass } from "reducer-class";
import {
	signupRequestPending,
	signupRequestSuccess,
	signupRequestFailed,
	loginRequestPending,
	loginRequestSuccess,
	loginRequestFailed,
	clearAuthState
} from './actions.AuthFeed';

export type AuthFeedState = {|
	error: string,
	pending: boolean,
	loggin: boolean
|};

const initialState: AuthFeedState = {
	error: '',
	pending: false,
	loggin: false
};

const reducer = handleActions(
	{
		[combineActions(signupRequestPending, loginRequestPending)]: (
			state,
			action
		) => ({
			...state,
			pending: true
		}),
		[combineActions(signupRequestSuccess, loginRequestSuccess)]: (
			state,
			action
		) => ({
			...state,
			pending: false,
			loggin: true,
			error: ''
		}),
		[combineActions(signupRequestFailed, loginRequestFailed)]: (
			state,
			action
		) => ({
			...state,
			pending: false,
			error: action.payload.error
		}),
		[clearAuthState]: () => ({
			...initialState
		})
	},
	initialState
);

export default reducer;
