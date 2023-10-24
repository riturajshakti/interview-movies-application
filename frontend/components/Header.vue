<script setup lang="ts">
import { removeToken, fetchLoggedInUser } from '~/utils/helpers';
import { type User } from '~/utils/types';

let drawer = ref(false);
let profile = ref<User | undefined>();
let route = useRoute();

onMounted(async () => {
	// profile.value = await fetchLoggedInUser();
});

function logout() {
	removeToken();
	navigateTo('/login');
}

function toggleDrawer() {
	drawer.value = !drawer.value;
}

function goto(path: string) {
	navigateTo(path);
	drawer.value = false;
}
</script>

<template>
	<v-layout>
		<v-main style="height: 70px">
			<header class="d-flex justify-between align-center bg-green-lighten-5 px-8">
				<NuxtLink href="/">
					<img src="/icon.png" alt="Site Logo" class="logo" />
				</NuxtLink>

				<div class="menu h-100 d-flex align-center">
					<NuxtLink v-if="route.path !== '/login'" href="#" @click.prevent="logout">Logout</NuxtLink>

					<!-- <NuxtLink v-else href="/login" :class="{ active: route.path === '/login' }">Login</NuxtLink>

					<NuxtLink href="/contact" :class="{ active: route.path === '/contact' }">Contact</NuxtLink>

					<NuxtLink href="/about" :class="{ active: route.path === '/about' }">About</NuxtLink>

					<v-btn @click="toggleDrawer" icon="mdi-menu" size="small" color="green" class="ms-2"></v-btn> -->
				</div>
			</header>
		</v-main>
		<v-navigation-drawer v-model="drawer" temporary>
			<v-list-item
				prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
				title="John Doe"
				class="mt-8"
				:active="route.path === '/profile'"
				@click="goto('/profile')"
			></v-list-item>

			<v-divider></v-divider>

			<v-list density="compact" nav>
				<v-list-item
					prepend-icon="mdi-home"
					title="Home"
					value="home"
					:active="route.path === '/'"
					@click="goto('/')"
				/>

				<v-list-item
					prepend-icon="mdi-login"
					title="Login"
					value="login"
					:active="route.path === '/login'"
					@click="goto('/login')"
				/>

				<v-list-item
					prepend-icon="mdi-phone"
					title="Contact"
					value="contact"
					:active="route.path === '/contact'"
					@click="goto('/contact')"
				/>

				<v-list-item
					prepend-icon="mdi-information"
					title="About"
					value="about"
					:active="route.path === '/about'"
					@click="goto('/about')"
				/>
			</v-list>
		</v-navigation-drawer>
	</v-layout>
</template>

<style scoped>
header {
	height: 70px;
}

.logo {
	width: auto;
	height: 50px;
}

.menu a {
	color: var(--theme-text);
	text-decoration: none;
	padding: 3px 15px;
	margin-inline: 2px;
	font-weight: 500;
	font-size: 1.1rem;
	border: 5px solid transparent;
	border-radius: 50px;
	text-align: center;
	display: flex;
	align-items: center;
	transition: all 300ms;
}

.menu a:hover {
	background-color: var(--theme);
	color: white;
	border: 5px solid var(--theme-light);
}

a.active {
	background-color: var(--theme);
	color: white;
	border: 5px solid var(--theme-light);
}
</style>
