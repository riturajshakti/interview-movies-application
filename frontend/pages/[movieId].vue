<script setup lang="ts">
import { useSnackStore } from '~/stores/snack';

const env = useRuntimeConfig().public;
const snack = useSnackStore();
const token = localStorage.getItem('token');
const route = useRoute();

const movie = ref<Movie | undefined>();
const movieId = route.params.movieId;
const editMode = ref(false);
const cast = ref('');

onMounted(() => {
	if (!token) {
		return navigateTo('/login');
	}
	fetchMovie();
});

async function fetchMovie() {
	let res = await fetch(`${env.backend}/movies/${movieId}`, {
		headers: { authorization: `Bearer ${token}` },
	});
	const json = await res.json();
	if (!res.ok) {
		return snack.error('Movie not found');
	}
	movie.value = json.movie;
	movie.value.releasedAt = movie.value.releasedAt.split('T')[0];
}

async function updateMovie() {
	if (!movie.value) {
		return;
	}
	let res = await fetch(`${env.backend}/movies/${movieId}`, {
		method: 'PATCH',
		headers: {
			authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			name: movie.value.name,
			rating: +movie.value.rating,
			casts: movie.value.casts,
			genre: movie.value.genre,
			releasedAt: movie.value.releasedAt,
		}),
	});
	const json = await res.json();
	if (!res.ok) {
		return snack.error(json.message);
	}
	snack.success('Movie details updated successfully');
	editMode.value = false;
}

function addCast() {
	if (!cast.value || !movie.value) {
		return;
	}
	movie.value.casts.push(cast.value);
	cast.value = '';
}

function cancelEditing() {
	editMode.value = false;
	fetchMovie()
}
</script>

<template>
	<v-container class="mx-auto">
		<v-sheet class="max-width" v-if="movie">
			<h1>Movie Details</h1>

			<div class="mt-10">
				<v-text-field :readonly="!editMode" label="Name" variant="solo" v-model="movie.name"></v-text-field>

				<v-text-field :readonly="!editMode" label="Genre" variant="solo" v-model="movie.genre"></v-text-field>

				<div class="mb-6">
					<v-chip
						:closable="editMode"
						color="var(--theme)"
						class="me-2"
						v-for="e of movie.casts"
						:key="e"
						@click:close="movie.casts = movie.casts.filter((c: string) => c !== e)"
					>
						{{ e }}
					</v-chip>

					<div class="d-flex justify-end align-center mt-7" v-if="editMode">
						<v-text-field label="Add Cast" hide-details variant="solo" class="me-4" v-model="cast"></v-text-field>
						<v-btn icon="mdi-plus" size="small" class="bg-green" style="font-size: 15px" @click="addCast"></v-btn>
					</div>
				</div>

				<v-text-field
					:readonly="!editMode"
					label="Rating"
					type="number"
					variant="solo"
					v-model="movie.rating"
				></v-text-field>

				<v-text-field
					:readonly="!editMode"
					type="date"
					label="Released At"
					variant="solo"
					v-model="movie.releasedAt"
				></v-text-field>

				<div class="d-flex justify-end mb-7">
					<v-btn v-if="!editMode" class="text-white px-10" color="var(--theme)" rounded="pill" @click="editMode = true">
						Edit
					</v-btn>
					<template v-else>
						<v-btn class="text-white px-10 me-3" color="red" rounded="pill" @click="cancelEditing">Cancel</v-btn>
					<v-btn class="text-white px-10" color="var(--theme)" rounded="pill" @click="updateMovie">Save</v-btn>
					</template>
				</div>
			</div>
		</v-sheet>
		<v-sheet class="max-width" v-else>
			<h1 class="text-red">Movie not found</h1>
		</v-sheet>
	</v-container>
</template>

<style scoped></style>
