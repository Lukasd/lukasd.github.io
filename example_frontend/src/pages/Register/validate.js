export default values => {
	const errors = {}

	if (!values.email) {
		errors.email = 'Jaký máte email?'
	} else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Špatný formát'
	}

	if (!values.password) {
		errors.password = 'Musíte vyplnit heslo'
	} else if (values.password && values.password.length < 8) {
		errors.password = 'Min. 8 znaků'
	}

	if (!values.terms) {
		errors.terms = 'Musíte souhlasit s podmínkami'
	}

	return errors
}
