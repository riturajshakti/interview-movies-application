export interface User {
	_id: string;
	name: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export interface Movie {
	_id: string;
	name: string;
	rating: number;
	casts: string[];
	genre: string;
	user: string;
	releasedAt: string;
	createdAt: string;
	updatedAt: string;
}
