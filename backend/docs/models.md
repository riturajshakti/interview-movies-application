# User

```ts
{
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
```

# Movie

```ts
{
	_id: ObjectId;
	name: string;
	rating: number;
	casts: string[];
	genre: string;
  user: ObjectId('User')
	releasedAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
```
