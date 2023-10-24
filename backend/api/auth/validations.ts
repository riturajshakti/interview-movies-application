import { Request, Response, NextFunction } from 'express';
import { validate } from 'super-easy-validator';

function login(req: Request, res: Response, next: NextFunction) {
	try {
		const { errors } = validate(
			{
				email: 'email',
				password: 'string|min:3',
			},
			req.body
		);
		if (errors) {
			return res.status(400).json({ message: errors[0] });
		}
		return next();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'server error' });
	}
}

export default {
	login,
};
