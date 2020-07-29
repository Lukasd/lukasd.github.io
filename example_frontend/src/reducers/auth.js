import {
	REGISTER_START,
	REGISTER_FAILED,
	REGISTER_SUCCESS,
	LOGOUT_START,
	LOGOUT_ERROR,
	LOGOUT_SUCCESS,
	VERIFY_START,
	VERIFY_SUCCESS,
	VERIFY_FAIL,
	VALIDATE_START,
	VALIDATE_FAILURE,
	VALIDATE_SUCCESS,
} from '../actions/auth'

function registration(
	state = {
		isFetching: false,
		errors: '',
	},
	action
) {
	switch (action.type) {
		case REGISTER_START:
			return Object.assign({}, state, { isFetching: true })
		case REGISTER_FAILED:
			return Object.assign({}, state, { isFetching: false, errors: action.err })
		case REGISTER_SUCCESS:
			return Object.assign({}, state, { isFetching: false, errors: '' })
		default:
			return state
	}
}

function logout(
	state = {
		isLoading: false,
		errors: '',
	},
	action
) {
	switch (action.type) {
		case LOGOUT_START:
			return { ...state, isLoading: true }
		case LOGOUT_ERROR:
			return { ...state, isLoading: false, errors: action.errors }
		case LOGOUT_SUCCESS:
			return { ...state, isLoading: false, errors: '' }
		default:
			return state
	}
}

function verify(
	state = {
		user: '',
		isLoggedIn: false,
		isLoading: false,
	},
	action
) {
	switch (action.type) {
		case VERIFY_START:
			return { ...state, isLoading: true }
		case VERIFY_FAIL:
			return { ...state, isLoggedIn: false, isLoading: false }
		case VERIFY_SUCCESS:
			return { ...state, user: action.credentials, isLoggedIn: true, isLoading: false }
		default:
			return state
	}
}

function validate(
	state = {
		isValidating: false,
		isActivated: false,
		message: '',
	},
	action
) {
	switch (action.type) {
		case VALIDATE_START:
			return { ...state, isValidating: true }
		case VALIDATE_FAILURE:
			return { ...state, isValidating: false, message: action.error }
		case VALIDATE_SUCCESS:
			return { ...state, isValidating: false, isActivated: true, message: action.error }
		default:
			return state
	}
}

export { registration, verify, logout, validate }
