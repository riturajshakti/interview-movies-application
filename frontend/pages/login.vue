<script setup lang="ts">
import { useSnackStore } from '~/stores/snack';

const env = useRuntimeConfig().public;
const snack = useSnackStore();

const email = ref('');
const password = ref('');

async function login() {
	let res = await fetch(env.backend + '/auth/login', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			email: email.value,
			password: password.value,
		}),
	});
	const json = await res.json();
	if (!res.ok) {
		return snack.error(json.message);
	}
	const token = json.token;
	localStorage.setItem('token', token);
	navigateTo('/');
}
</script>

<template>
	<v-container class="mx-auto">
		<v-sheet class="max-width">
			<h1>Login Page</h1>

			<div class="mt-10">
				<v-text-field label="Email" variant="solo" v-model="email"></v-text-field>
				<v-text-field label="Password" type="password" variant="solo" v-model="password"></v-text-field>

				<v-btn class="ms-auto d-block text-white px-10" color="var(--theme)" rounded="pill" @click="login">Login</v-btn>
			</div>
		</v-sheet>
	</v-container>
</template>

<style scoped></style>
