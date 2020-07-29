import 'core-js/stable'
import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import configureStore from './configureStore'
import { Provider, useSelector } from 'react-redux'

import actions from './actions'

const store = configureStore()

store.dispatch(actions.verifyUser())

const Root = () => {
	const verifyState = useSelector(state => state.verify)
	return <App isLoggedIn={verifyState.isLoggedIn} isLoading={verifyState.isLoading} />
}

ReactDOM.render(
	<Provider store={store}>
		<Root />
	</Provider>,
	document.getElementById('root')
)

module.hot.accept()
