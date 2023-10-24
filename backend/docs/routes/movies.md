
# 🔒 GET `/movies`

## Request Query

```ts
{
	limit?: number;
	page?: number;
  search?: string; // name, genre & casts
  sortBy?: 'rating' | 'releasedAt' | 'createdAt';
  sortOrder?: 'ascending' | 'descending';
}
```

## Response Body

```ts
{
	movies: Movie[],
  count: number;
}
```

## Description

- Returns movies as per the given query
- `search` will search from `name`, `genre` & `casts`
- movies must belong to this user

---

# 🔒 GET `/movies/:movieId`

## Response Body

```ts
{
  movie: Movie
}
```

## Description

- Returns movie details
- movie must belong to this user

---

# 🔒 POST `/movies`

## Request Body

```ts
{
	name: string;
	rating: number;
	casts: string[];
	genre: string;
	releasedAt: Date;
}
```

## Response Body

```ts
{
  movie: Movie;
}
```

## Description

- Creates a new movie

---

# 🔒 PATCH `/movies/:movieId`

## Response Body

```ts
{
  name?: string;
	rating?: number;
	casts?: string[];
	genre?: string;
	releasedAt?: Date;
}
```

## Description

- Update movie details
- movie must belong to this user
