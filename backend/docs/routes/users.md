
# 🌍 POST `/users`

## Request Body

```ts
{
	name: string;
	email: string;
	password: string;
}
```

## Response Body

```ts
{
	user: User
}
```

## Description

- Register a user account with given data
- Fails if the email is already exist

---

# 🔒 GET `/users`

## Response Body

```ts
{
	user: User;
}
```

## Description

- Returns user profile (excluding password)

---

# 🔒 PATCH `/users`

## Request Body

```ts
{
  name?: string;
  email?: string;
  password?: string;
}
```

## Response Body

```ts
{
	message: string;
  token?: string;
}
```

## Description

- Update user details
- If `email` or `password` is given, it will return the updated `token` as per new password so that frontend can update the token immediately and the user don't need to login again
