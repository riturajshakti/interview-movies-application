import { Schema, model } from 'mongoose';

const movieSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		casts: {
			type: [String],
			required: true,
		},
		genre: {
			type: String,
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		releasedAt: {
			type: Date,
			required: true
		},
	},
	{ versionKey: false, timestamps: true }
);

export const Movie = model('Movie', movieSchema, 'movies');
