import express from 'express';
import * as authControl from './auth.controller';
import { registerValidator, validate } from './auth.validator';

const router = express.Router();

router
	.route('/register')
	.post(registerValidator(), validate, authControl.register);

router
	.route('/login')
	.get(authControl.verify)
	.post(authControl.login);

router.route('/logout').post(authControl.logout);
router.route('/email').post(authControl.email);
router.route('/validate/:token').post(authControl.validateEmail);

export default router;
