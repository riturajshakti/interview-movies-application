<script setup lang="ts">
import { useSnackStore } from '~/stores/snack';
import { type Movie } from '~/utils/types';
import moment from 'moment';

const env = useRuntimeConfig().public;
const snack = useSnackStore();
const token = localStorage.getItem('token');

const movies = ref<Movie[]>([]);
const limit = ref(10);
const page = ref(1);
const count = ref(0);
const totalPages = computed(() => Math.ceil(count.value / limit.value));
const search = ref('');

onMounted(() => {
	if (!token) {
		return navigateTo('/login');
	}
	fetchMovies();
});

watch([search, limit, page], debounce(fetchMovies));
watch(search, () => (page.value = 1));

async function fetchMovies() {
	const query = new URLSearchParams({
		limit: `${limit.value}`,
		page: `${page.value}`,
		search: search.value,
	});
	let res = await fetch(`${env.backend}/movies?${query}`, {
		headers: { authorization: `Bearer ${token}` },
	});
	const json = await res.json();
	if (!res.ok) {
		return snack.error(json.message);
	}
	movies.value = json.movies;
	count.value = json.count;
}
</script>

<template>
	<Head>
		<Title>Movies</Title>
	</Head>

	<v-container>
		<v-sheet>
			<h1>Movies</h1>

			<div class="mt-10">
				<v-text-field label="Search" variant="solo" v-model="search" rounded="pill"></v-text-field>
			</div>

			<div class="my-3">
				<v-btn class="px-10 text-white d-block ms-auto" color="var(--theme)" @click="navigateTo('/add')">
					Add Movie
				</v-btn>
			</div>

			<div class="mt-3 mb-10">
				<v-table>
					<thead>
						<tr>
							<th class="text-left">Name</th>
							<th class="text-left">Rating</th>
							<th class="text-left">Genre</th>
							<th class="text-left">Released At</th>
							<th class="text-left">Created At</th>
							<th class="text-left">Updated At</th>
							<th class="text-left">Details</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="movie in movies" :key="movie._id">
							<td>{{ movie.name }}</td>
							<td>{{ movie.rating }} <Icon name="mdi-star" class="fz-13 text-yellow-darken-4" /></td>
							<td>{{ movie.genre }}</td>
							<td>{{ moment(movie.releasedAt).format('MMMM D, YYYY') }}</td>
							<td>{{ moment(movie.createdAt).format('hh:mm a, D-MM-YYYY') }}</td>
							<td>{{ moment(movie.updatedAt).format('hh:mm a, D-MM-YYYY') }}</td>
							<td>
								<v-btn
									icon="mdi-information-variant"
									size="small"
									class="bg-green"
									style="font-size: 15px"
									@click="navigateTo(`/${movie._id}`)"
								></v-btn>
							</td>
						</tr>
					</tbody>
				</v-table>
			</div>

			<div class="max-width">
				<v-pagination v-model="page" :length="totalPages" rounded="circle"></v-pagination>
			</div>
		</v-sheet>
	</v-container>
</template>
