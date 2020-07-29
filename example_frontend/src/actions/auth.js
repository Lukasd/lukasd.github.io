import fetch from 'cross-fetch'
import { push } from 'connected-react-router'

export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function logoutStart() {
  return {
    type: LOGOUT_START,
  }
}

function logoutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch(logoutStart())
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (response.status === 200) {
        dispatch(logoutSuccess())
        return dispatch(verifyFailure())
      } else {
        return dispatch(logoutError(response.error))
      }
    } catch (error) {
      return dispatch(logoutError(error))
    }
  }
}

export const VERIFY_START = 'VERIFY_START'
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS'
export const VERIFY_FAIL = 'VERIFY_FAIL'

function verifyStart() {
  return {
    type: VERIFY_START,
  }
}

function verifySuccess(credentials) {
  return {
    type: VERIFY_SUCCESS,
    credentials,
  }
}

function verifyFailure() {
  return {
    type: VERIFY_FAIL,
  }
}

export function verifyUser() {
  return async (dispatch) => {
    dispatch(verifyStart())
    try {
      const success = await fetch(`/api/auth/login`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      if (success.status === 200) {
        const res = await success.json()
        return dispatch(verifySuccess(res))
      } else {
        return dispatch(verifyFailure())
      }
    } catch (error) {
      console.log(error)
      return dispatch(verifyFailure())
    }
  }
}

export const VALIDATE_START = 'VALIDATE_START'
export const VALIDATE_FAILURE = 'VALIDATE_FAILURE'
export const VALIDATE_SUCCESS = 'VALIDATE_SUCCESS'

function validateStart() {
  return {
    type: VALIDATE_START,
  }
}

function validateFailure(error) {
  return {
    type: VALIDATE_FAILURE,
    error,
  }
}

function validateSuccess(error) {
  return {
    type: VALIDATE_SUCCESS,
    error,
  }
}

export function validateEmail(token) {
  return async (dispatch) => {
    dispatch(validateStart())
    try {
      const req = await fetch(`/api/auth/validate/${token}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      if (req.status === 200) {
        const json = await req.json()
        dispatch(validateSuccess(json.error))
        dispatch(verifyUser())
        return dispatch(push('/'))
      } else {
        const json = await req.json()
        return dispatch(validateFailure(json.error))
      }
    } catch (error) {
      console.log(error)
      return dispatch(validateFailure('Problem s připojením'))
    }
  }
}
