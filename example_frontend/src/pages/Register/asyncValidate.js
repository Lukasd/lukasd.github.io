import fetch from 'cross-fetch'

const asyncValidate = (values, dispatch) => {
	return new Promise((resolve, reject) => {
		fetch(`/api/auth/email`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				email: values.email,
			}),
		}).then(response => {
			if (response.status === 200) {
				resolve()
			} else {
				response.json().then(json => {
					reject({ email: json.msg })
				})
			}
		})
	})
}

export default asyncValidate
