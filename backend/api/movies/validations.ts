import { Request, Response, NextFunction } from 'express';
import { validate } from 'super-easy-validator';
import colors from '../../utils/colors';

function getMovies(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			limit: 'optional|string|natural|max:200',
			page: 'optional|string|natural',
			search: 'optional|string',
			sortBy: 'optional|enums:rating,releasedAt,createdAt',
			sortOrder: 'optional|enums:ascending,descending',
		};
		const { errors } = validate(rules, req.query);
		if (errors) {
			return res.status(400).json({ message: errors[0] });
		}
		return next();
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

function getMovie(req: Request, res: Response, next: NextFunction) {
	try {
		const { errors } = validate({ movieId: 'mongoid' }, req.params);
		if (errors) {
			return res.status(400).json({ message: errors[0] });
		}
		return next();
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function postMovie(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			name: 'string|min:1',
			rating: 'number|min:0|max:10',
			casts: 'arrayof:string|arrayof:min:2',
			genre: 'string|min:2',
			releasedAt: 'date',
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

async function patchMovie(req: Request, res: Response, next: NextFunction) {
	try {
		const rules = {
			name: 'optional|string|min:1',
			rating: 'optional|number|min:0|max:10',
			casts: 'optional|arrayof:string|arrayof:min:2',
			genre: 'optional|string|min:2',
			releasedAt: 'optional|date',
		};
		const { errors } = validate(rules, { ...req.body });
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
	getMovies,
	getMovie,
	postMovie,
	patchMovie,
};
