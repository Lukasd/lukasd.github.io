import Joi from 'joi';

require('dotenv').config();

const envVarsSchema = Joi.object({
	NODE_ENV: Joi.string()
		.allow(['development', 'production', 'test', 'provision'])
		.default(['development']),
	PORT: Joi.number().default(4040),
	SESSION_SECRET: Joi.string()
		.required()
		.description('Session secred.'),
	POSTGRESQL_DATABASE: Joi.string()
		.required()
		.description('Postgresql database'),
	POSTGRESQL_USERNAME: Joi.string()
		.required()
		.description('Postgresql username'),
	POSTGRESQL_PASSWORD: Joi.string()
		.required()
		.description('Postgresql password'),
	POSTGRESQL_HOST: Joi.string()
		.required()
		.description('Postgresql host'),
	POSTGRESQL_PORT: Joi.number()
		.default(27017)
		.description('Postgresql port'),
	MAIL_HOST: Joi.string()
		.required()
		.description('Mail host'),
	MAIL_USER: Joi.string()
		.required()
		.description('Mail user'),
	MAIL_PASS: Joi.string()
		.required()
		.description('Mail password')
})
	.unknown()
	.required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

const config = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	sessionSecret: envVars.SESSION_SECRET,
	postgresql: {
		database: envVars.POSTGRESQL_DATABASE,
		username: envVars.POSTGRESQL_USERNAME,
		password: envVars.POSTGRESQL_PASSWORD,
		host: envVars.POSTGRESQL_HOST
	},
	mail: {
		host: envVars.MAIL_HOST,
		user: envVars.MAIL_USER,
		pass: envVars.MAIL_PASS
	}
};

export default config;
