import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'

import { registration, logout, verify, validate } from './auth.js'

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    registration,
    logout,
    verify,
    validate,
    form: formReducer,
  })

export default rootReducer
