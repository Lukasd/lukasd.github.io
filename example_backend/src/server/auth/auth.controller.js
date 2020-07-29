import bcrypt from 'bcryptjs';
import { sendVerification } from '../../mailer';
import domainList from './domainList';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

const register = async (req, res, next) => {
	if (req.body.email && req.body.password) {
		const userEmail = req.body.email.split('@');
		const userDomain = userEmail[1];
		const domainExists = domainList.includes(userDomain);

		if (domainExists) {
			return res.status(422).json({
				email: 'Neplatný email'
			});
		} else {
			try {
				const [user, created] = await req.context.models.User.findOrCreate({
					where: { email: req.body.email },
					defaults: {
						email: req.body.email,
						password: req.body.password,
						token: {}
					},
					include: [req.context.models.Token]
				});

				if (created) {
					sendVerification(user.token.hash, user.email);
					return res.status(200).json({ msg: 'SIGNUP_SUCCESS' });
				} else {
					return res.status(422).json({
						email: 'Email již existuje'
					});
				}
			} catch (e) {
				return next(e);
			}
		}
	} else {
		return res.status(422).json({
			email: 'Zadejte email',
			password: 'Zadejte heslo'
		});
	}
};

const login = async (req, res, next) => {
	try {
		let user = await req.context.models.User.findOne({
			where: { email: req.body.email }
		});
		if (user) {
			bcrypt.compare(req.body.password, user.password, (err, response) => {
				if (response && user.activated) {
					req.session.userId = user.id;
					req.session.save(e => {
						if (e) {
							return next(e);
						} else {
							return res.status(200).json({ msg: 'LOGIN_SUCCESS' });
						}
					});
				} else if (response && !user.activated) {
					return res.status(422).json({
						email: '',
						password: '',
						reason: 'Účet není aktivován'
					});
				} else {
					return res.status(422).json({
						email: '',
						password: 'Špatné heslo',
						reason: 'Špatně zadané údaje'
					});
				}
			});
		} else {
			return res.status(422).json({
				email: 'Špatně zadaný email',
				password: '',
				reason: 'Špatně zadané údaje'
			});
		}
	} catch (e) {
		return next(e);
	}
};

const logout = async (req, res, next) => {
	try {
		await req.session.destroy(err => {
			if (err) {
				return res.status(422).json({ msg: 'LOGOUT_FAILED' });
			} else {
				return res.status(200).json({ msg: 'LOGOUT_SUCCESS' });
			}
		});
	} catch (e) {
		return next(e);
	}
};

const verify = async (req, res, next) => {
	if (req.context.me) {
		console.log(req.context.me);
		return res.status(200).json({ email: req.context.me.email });
	} else {
		return res.status(422).json({
			errors: 'LOGIN_PLEASE'
		});
	}
};

const email = async (req, res, next) => {
	if (req.body.email) {
		const userEmail = req.body.email.split('@');
		const userDomain = userEmail[1];
		const domainExists = domainList.includes(userDomain);

		if (domainExists) {
			return res.status(422).json({
				msg: 'Neplatný email'
			});
		} else {
			req.context.models.User.findOne({
				where: { email: req.body.email }
			}).then(user => {
				if (!user) {
					return res.status(200).json({});
				}
				return res.status(422).json({ msg: 'Email již existuje' });
			});
		}
	} else {
		return res.status(422).json({ msg: 'Zadejte email' });
	}
};

const validateEmail = async (req, res, next) => {
	if (req.params.token) {
		try {
			const user = await req.context.models.User.findOne({
				include: [
					{
						model: req.context.models.Token,
						where: {
							hash: { [Op.eq]: req.params.token }
						}
					}
				]
			});
			//existuje
			if (user) {
				if (!user.activated) {
					//aktivovat
					const updatedUser = await req.context.models.User.update(
						{ activated: true },
						{
							where: {
								id: user.id
							}
						}
					);
					if (updatedUser) {
						const deletedToken = await req.context.models.Token.destroy({
							where: {
								id: user.token.id
							}
						});
						req.session.userId = user.id;
						req.session.save(e => {
							if (e) {
								return next(e);
							} else {
								return res
									.status(200)
									.json({ error: 'Aktivace proběhla úspěšně' });
							}
						});
					}
				} else {
					//uzivatel jiz aktivovan
					return res.status(422).json({ error: 'Účet již byl aktivován' });
				}
			} else {
				//neexistuje - neplatny aktivacni odkaz
				return res.status(422).json({ error: 'Neplatný aktivační odkaz' });
			}
		} catch (error) {
			console.log(error);
			return res.status(422).json({ error: error });
		}
	} else {
		return res.status(422).json({ error: 'Neplatný aktivační odkaz' });
	}
};

export { register, login, logout, verify, email, validateEmail };
