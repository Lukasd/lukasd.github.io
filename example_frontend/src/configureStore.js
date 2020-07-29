import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
	const middlewares = [thunkMiddleware]
	const middlewareEnhancer = applyMiddleware(routerMiddleware(history), ...middlewares, loggerMiddleware)
	const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
	const composedEnhancers = compose(...enhancers)
	const store = createStore(rootReducer(history), preloadedState, composeWithDevTools(composedEnhancers))
	return store
}
