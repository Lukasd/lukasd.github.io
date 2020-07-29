import config from './config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
	config.postgresql.database,
	config.postgresql.username,
	config.postgresql.password,
	{
		host: config.postgresql.host,
		dialect: 'mysql'
	}
);

const models = {
	User: sequelize.import('../server/user/user.model.js'),
	Session: sequelize.import('../server/session/session.model.js'),
	Team: sequelize.import('../server/team/team.model.js'),
	Event: sequelize.import('../server/event/event.model.js'),
	Token: sequelize.import('../server/token/token.model.js')
};

Object.keys(models).forEach(key => {
	if ('associate' in models[key]) {
		models[key].associate(models);
	}
});

export { sequelize };

export default models;
