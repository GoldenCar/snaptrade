export const settingActionTypes = {
	darkMode: 'darkMode'
};

export const defaultState = {
	darkMode: true
};

export default function settingReducer(state = defaultState, action) {
	switch (action.type) {
		case 'darkMode':
			return {
				...state,
				darkMode: action.payload
			};
		default:
			return state;
	}
}
