import { build, files, version } from '$service-worker';

const CACHE_NAME = `time-tracker-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS);
		})
	);

	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((names) => {
			return Promise.all(
				names
					.filter((name) => name !== CACHE_NAME)
					.map((name) => {
						return caches.delete(name);
					})
			);
		})
	);

	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then((cachedResponse) => {
			if (cachedResponse) return cachedResponse;
			return fetch(event.request);
		})
	);
});
