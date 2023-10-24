import { Request, Response } from 'express';
import { User } from './models';
import helpers from '../../utils/helpers';
import colors from '../../utils/colors';

async function postUser(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body;

		let user = await User.findOne({ email });
		if (user) {
			return res.status(409).json({ message: 'user with this email already exist' });
		}

		user = new User({
			name,
			email,
			password: helpers.getHash(password),
		});
		await user.save();

		// @ts-ignore
		user.password = undefined;

		return res.status(201).json({ user });
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function getUser(req: Request, res: Response) {
	try {
		let user = res.locals.user;

		// @ts-ignore
		user.password = undefined;

		return res.json({ user });
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function patchUser(req: Request, res: Response) {
	try {
		let user = res.locals.user;
		const { name, email, password } = req.body;

		let token;
		if (name) {
			user.name = name;
		}
		if (email) {
			const existingUser = await User.findOne({email})
			if(existingUser) {
				return res.status(409).json({message: 'a user with this email already exist'})
			}
			user.email = email;
		}
		if (password) {
			user.password = helpers.getHash(password);
		}
		if(email || password) {
			token = helpers.getToken(user.email, user.password, true);
		}

		await user.save();

		return res.json({
			token,
			message: 'user details updated',
		});
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

export default {
	postUser,
	getUser,
	patchUser,
};
