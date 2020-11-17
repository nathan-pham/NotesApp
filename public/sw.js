const cacheName = '--prod'

const files = [
	'/favicon.ico',
	'/manifest.json',
	'/scripts/app.js',
	'/scripts/globals.js',
	'/scripts/index.js',
	'/styles/globals.css',
	'/styles/index.css',
	'/icons/android-chrome-192x192.png',
	'/icons/android-chrome-512x512.png',
	'/icons/apple-touch-icon.png',
	'/icons/favicon-16x16.png',
	'/icons/favicon-32x32.png'
]

self.addEventListener('install', e => {
	console.log('[Service Worker] Installed')
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[Service Worker] Caching all resources')
			return cache.addAll(files)
		})
	)
})

self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then(r => {
			console.log(`[Service Worker] Fetching resource: ${e.request.url}`)
			return r || fetch(e.request).then(response => {
				return caches.open(cacheName).then(cache => {
					console.log(`[Service Worker] Caching new resource ${e.request.url}`)
					cache.put(e.request, response.clone())
					return response
				})
			})
		})
	)
})