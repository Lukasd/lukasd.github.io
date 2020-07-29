import { body, validationResult } from 'express-validator';

const registerValidator = () => {
	return [
		body('email')
			.isEmail()
			.withMessage('Spatny format emailu.'),
		body('password')
			.isLength({ min: 8 })
			.withMessage('Heslo musi mit minimalne 8 znaku.')
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		return next();
	}

	const extractedErrors = [];
	errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		errors: extractedErrors
	});
};

export { registerValidator, validate };
