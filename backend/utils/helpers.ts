import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function getHash(password: string) {
	const salt = process.env.PASSWORD_SALT!;
	const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
	return hash.toString('hex');
}

function getToken(email: string, passwordHash: string, remember: boolean): string {
	const hash = passwordHash.slice(-10);
	const expiry = remember ? undefined : { expiresIn: '24h' };
	const token = jwt.sign({ email, hash }, process.env.JWT_SECRET!, expiry);
	return token;
}

const helpers = {
	getHash,
	getToken,
};

export default helpers;
