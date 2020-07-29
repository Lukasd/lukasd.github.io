import { SubmissionError } from 'redux-form'

const submit = async (values, dispatch) => {
	console.log('submit start')
	try {
		let response = await fetch(`/api/auth/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
				password: values.password,
			}),
		})

		if (response.status !== 200) {
			let json = await response.json()
			throw new SubmissionError({
				email: json.email,
				password: json.password,
				_error: json.reason,
			})
		}
	} catch (error) {
		throw new SubmissionError({
			email: error.errors.email,
			password: error.errors.password,
			_error: error.errors._error,
		})
	}
}

export default submit
