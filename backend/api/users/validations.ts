import { Request, Response, NextFunction } from 'express';
import { validate } from 'super-easy-validator';
import colors from '../../utils/colors';

function postUser(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			name: 'fullname',
			email: 'email',
			password: 'string|min:3',
		};
		const { errors } = validate(rules, req.body);
		if (errors) {
			return res.status(400).json({ message: errors[0] });
		}
		return next();
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function patchUser(req: Request, res: Response, next: NextFunction) {
	try {
		let rules = {
			name: 'optional|fullname',
			email: 'optional|email',
			password: 'optional|string|min:3',
		};
		const { errors } = validate(rules, req.body);
		if (errors) {
			return res.status(400).json({ message: errors[0] });
		}
		return next();
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

export default {
	postUser,
	patchUser,
};
