import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import colors from '../../utils/colors';
import { User } from '../users/models';

async function authorizeUser(req: Request, res: Response, next: NextFunction) {
	try {
		const authorization = req.headers.authorization;
		if (!authorization || !authorization.startsWith('Bearer ')) {
			return res.status(401).json({ message: 'authorization failed' });
		}

		const token = authorization.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'authorization failed' });
		}

		let email, hash;

		try {
			let payload = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
			email = payload.email;
			hash = payload.hash;
		} catch (error) {
			return res.status(401).json({ message: 'authorization failed' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'user not found' });
		}

		if (user.password.slice(-10) !== hash) {
			return res.status(401).json({ message: 'authorization failed' });
		}

		res.locals.user = user;

		return next();
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

const auth = {
	authorizeUser,
};

export default auth;
