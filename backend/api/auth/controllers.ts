import { Request, Response } from 'express';
import { User } from '../users/models';
import helpers from '../../utils/helpers';

async function login(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'user not found' });
		}

		const passwordHash = helpers.getHash(password);
		if (user.password !== passwordHash) {
			return res.status(401).json({ message: 'authentication failed' });
		}

		const token = helpers.getToken(user.email, passwordHash, true);
		return res.status(200).json({ token, message: 'authentication successful' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'server error' });
	}
}

export default {
	login,
};
