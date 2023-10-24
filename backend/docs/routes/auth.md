
# 🌍 POST `/auth/login`

## Request Query

```ts
{
	email: string;
	password: string;
}
```

## Response Body

```ts
{
	token?: string;
	message: string;
}
```

## Description

- Returns token after successful login