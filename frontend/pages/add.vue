<script setup lang="ts">
import { useSnackStore } from '~/stores/snack';

const env = useRuntimeConfig().public;
const snack = useSnackStore();
const token = localStorage.getItem('token');

const cast = ref('');
const name = ref('');
const genre = ref('');
const casts = ref<string[]>([]);
const rating = ref();
const releasedAt = ref('');

onMounted(() => {
	if (!token) {
		return navigateTo('/login');
	}
});

async function addMovie() {
	let res = await fetch(`${env.backend}/movies`, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${token}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			name: name.value,
			rating: +rating.value,
			casts: casts.value,
			genre: genre.value,
			releasedAt: releasedAt.value,
		}),
	});
	const json = await res.json();
	if (!res.ok) {
		return snack.error(json.message);
	}

	navigateTo('/' + json.movie._id);
  snack.success('Movie added successfully')
}

function addCast() {
	if (!cast.value) {
		return;
	}
	casts.value.push(cast.value);
	cast.value = '';
}
</script>

<template>
	<v-container class="mx-auto">
		<v-sheet class="max-width">
			<h1>Add Movie</h1>

			<div class="mt-10">
				<v-text-field label="Name" variant="solo" v-model="name"></v-text-field>

				<v-text-field label="Genre" variant="solo" v-model="genre"></v-text-field>

				<div class="mb-6">
					<v-chip
          closable
						color="var(--theme)"
						class="me-2"
						v-for="e of casts"
						:key="e"
						@click:close="casts = casts.filter((c: string) => c !== e)"
					>
						{{ e }}
					</v-chip>

					<div class="d-flex justify-end align-center mt-7">
						<v-text-field label="Add Cast" hide-details variant="solo" class="me-4" v-model="cast"></v-text-field>
						<v-btn icon="mdi-plus" size="small" class="bg-green" style="font-size: 15px" @click="addCast"></v-btn>
					</div>
				</div>

				<v-text-field label="Rating" type="number" variant="solo" v-model="rating"></v-text-field>

				<v-text-field type="date" label="Released At" variant="solo" v-model="releasedAt"></v-text-field>

				<div class="d-flex justify-end mb-7">
					<v-btn class="text-white px-10" color="var(--theme)" rounded="pill" @click="addMovie">Add</v-btn>
				</div>
			</div>
		</v-sheet>
	</v-container>
</template>

<style scoped></style>
