import { Request, Response } from 'express';
import { Movie } from './models';
import colors from '../../utils/colors';

async function getMovies(req: Request, res: Response) {
	try {
		const { user } = res.locals;
		let { limit = 10, page = 1, search, sortBy = 'createdAt', sortOrder = 'descending' } = req.query;

		limit = limit ? +limit : 10;
		page = page ? +page : 1;

		let match: Record<string, any> = {};

		if (search) {
			match.$or = [
				{ name: RegExp(search as string, 'i') },
				{ genre: RegExp(search as string, 'i') },
				{ casts: RegExp(search as string, 'i') },
			];
		}

		match.user = user._id;

		const movies = await Movie.find(match)
			.sort({[sortBy as string]: sortOrder === 'descending' ? -1 : 1})
			.skip((page - 1) * limit)
			.limit(limit);
		const count = await Movie.countDocuments(match);

		return res.json({ movies, count });
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function getMovie(req: Request, res: Response) {
	try {
		const { user } = res.locals;
		const { movieId } = req.params;

		const movie = await Movie.findOne({ _id: movieId, user: user._id });
		if (!movie) {
			return res.status(404).json({ message: 'movie not found' });
		}

		return res.json({ movie });
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function postMovie(req: Request, res: Response) {
	try {
		const {user} = res.locals
		const { name, rating, casts, genre, releasedAt } = req.body;

		const movie = new Movie({name, rating, casts, genre, releasedAt, user: user._id});
		await movie.save();

		return res.status(201).json({ movie });
	} catch (error) {
		console.log(colors.fgBrightRed + 'ERROR: ' + colors.reset, error);
		return res.status(500).json({ message: 'server error' });
	}
}

async function patchMovie(req: Request, res: Response) {
	try {
		const {user} = res.locals
		const { name, rating, casts, genre, releasedAt } = req.body;
		const { movieId } = req.params;

		let movie = await Movie.findOne({_id: movieId, user: user._id});
		if (!movie) {
			return res.status(404).json({ message: 'movie not found' });
		}

		if (name) {
			movie.name = name;
		}
		if (rating) {
			movie.rating = rating;
		}
		if (casts) {
			movie.casts = casts;
		}
		if (genre) {
			movie.genre = genre;
		}
		if (releasedAt) {
			movie.releasedAt = releasedAt;
		}

		await movie.save();

		return res.status(200).json({ message: 'movie details updated' });
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
