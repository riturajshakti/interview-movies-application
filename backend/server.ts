import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import colors from './utils/colors';
import mongoose from 'mongoose';
import constants from './utils/constants';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
require('dotenv').config();

app.use('/api/auth', require('./api/auth/routes'));
app.use('/api/users', require('./api/users/routes'));
app.use('/api/movies', require('./api/movies/routes'));

app.all('*', (req, res) => {
	return res.status(405).json({ message: 'route not found' });
});

app.listen(process.env.PORT, async () => {
	console.log(colors.fgBrightGreen + 'INFO:' + colors.reset, 'Server started!');
	let client = await mongoose.connect(process.env.MONGO_URL!, {
		dbName: process.env.DATABASE,
	});
	constants.db = client.connection;
	console.log(colors.fgBrightGreen + 'INFO:' + colors.reset, 'Atlas connected!');
});
