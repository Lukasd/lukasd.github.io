const token = (sequelize, DataTypes) => {
	const Token = sequelize.define('token', {
		hash: {
			type: DataTypes.UUID,
			unique: true,
			defaultValue: DataTypes.UUIDV4
		}
	});

	return Token;
};

export default token;
