import React from 'react'
import { useDispatch } from 'react-redux'

import RegistrationForm from './RegistrationForm'
import actions from '../../actions'

export default () => {
	const dispatch = useDispatch()

	const handleSubmit = values => {
		dispatch(actions.register(values))
	}

	return <RegistrationForm onSubmit={handleSubmit} />
}
