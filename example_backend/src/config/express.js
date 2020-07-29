import express from 'express';
import session from 'express-session';
import models, { sequelize } from './models';
import logger from 'morgan';
import expressWinston from 'express-winston';
import httpStatus from 'http-status';
import helmet from 'helmet';
import cors from 'cors';
import winstonInstance from './winston';
import routes from '../index.route';
import config from './config';

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

if (config.env === 'development') {
	app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

function extendDefaultFields(defaults, session) {
	return {
		data: defaults.data,
		expires: defaults.expires,
		userId: session.userId
	};
}

const store = new SequelizeStore({
	db: sequelize,
	table: 'session',
	tableName: 'sessions',
	extendDefaultFields: extendDefaultFields
});

app.use(
	session({
		secret: config.sessionSecret,
		name: 'scnaId',
		store: store,
		cookie: {
			secure: config.env === 'production',
			httpOnly: true,
			//domain: 'localhost:4040',
			//path: '/',
			maxAge: 3600000,
			sameSite: true
		},
		unset: 'destroy',
		resave: false,
		saveUninitialized: false
		//proxy: true
	})
);

app.use(async (req, res, next) => {
	req.context = {
		models
	};
	try {
		const sess = await models.Session.findOne({
			where: { sid: req.session.id },
			attributes: ['userId']
		});
		if (sess) {
			req.context = {
				...req.context,
				me: await models.User.findByPk(sess.userId)
			};
		}
	} catch (e) {
		next(e);
	}

	next();
});

if (config.env === 'development') {
	expressWinston.requestWhitelist.push('body');
	expressWinston.responseWhitelist.push('body');
	app.use(
		expressWinston.logger({
			winstonInstance,
			meta: true,
			msg:
				'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
			colorStatus: true
		})
	);
}

app.use('/api', routes);

if (config.env !== 'test') {
	app.use(
		expressWinston.errorLogger({
			winstonInstance
		})
	);
}

app.use((err, req, res, next) => {
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack: config.env === 'development' ? err.stack : {}
	});
});

export default app;
