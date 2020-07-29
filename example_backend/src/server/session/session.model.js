const session = (sequelize, DataTypes) => {
	const Session = sequelize.define('session', {
		sid: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		userId: DataTypes.INTEGER,
		expires: DataTypes.DATE,
		data: DataTypes.TEXT
	});

	return Session;
};

export default session;
