import { type User } from './types';

export function getToken() {
	return localStorage.getItem('token');
}

export function removeToken() {
	return localStorage.removeItem('token');
}

export async function fetchLoggedInUser(): Promise<User | undefined> {
	let env = useRuntimeConfig().public;
	let token = getToken();
	if (!token) {
		removeToken();
		return undefined;
	}

	let res = await fetch(`${env.backend}/user`, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) {
		removeToken();
		return undefined;
	}

	let json = await res.json();
	return json.user as User;
}

export function debounce(func: Function, delay = 500) {
  let timer: NodeJS.Timeout;

  return function() {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}