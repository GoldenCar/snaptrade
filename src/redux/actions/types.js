import type { Dispatch } from 'redux';

// import type { HomeFeedState } from '../screens/WacthListFeed/reducer.HomeFeed';

import type {
  FeedFetchBegin,
  FeedFetchComplete,
  FeedFetchMoreComplete,
  FeedFetchError,
} from '../screens/WacthListFeed/actions.HomeFeed';
import type {
  AuthFeedState
} from '../screens/AuthFeed/actions.AuthFeed'

// All actions and states

export type Action =
  | Thunk
  | FeedFetchBegin
  | FeedFetchComplete
  | FeedFetchMoreComplete
  | FeedFetchError;

export type State = {|
  // feed: HomeFeedState,
  auth: AuthFeedState
|};

export type Reducers = $Keys<State>;
export type ReducerState = $Values<State>;

export type Reducer = (state: ReducerState, action: Action) => ReducerState;
export type MapDispatch = (dispatch: Dispatch<Action>, props: Object) => Object;
export type MapState = (state: State, props: Object) => Object;

// Hack for supporting Thunk
export type Thunk = (dispatch: Dispatch<Action>, getState: () => State) => any;
