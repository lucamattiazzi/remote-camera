// const CACHE = 'pwabuilder-precache'
// const precacheFiles = []

self.addEventListener('install', event => {
  self.skipWaiting()
  // event.waitUntil(
  //   caches.open(CACHE).then(cache => {
  //     return cache.addAll(precacheFiles)
  //   })
  // )
})

// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim())
// })

// self.addEventListener('fetch', event => {
//   if (event.request.method !== 'GET') return

//   event.respondWith(
//     fromCache(event.request).then(
//       response => {
//         event.waitUntil(
//           fetch(event.request).then(function(response) {
//             return updateCache(event.request, response)
//           })
//         )

//         return response
//       },
//       function() {
//         // The response was not found in the cache so we look for it on the server
//         return fetch(event.request)
//           .then(function(response) {
//             // If request was success, add or update it in the cache
//             event.waitUntil(updateCache(event.request, response.clone()))

//             return response
//           })
//           .catch(function(error) {
//             console.log('[PWA Builder] Network request failed and no cache.' + error)
//           })
//       }
//     )
//   )
// })

// function fromCache(request) {
//   // Check to see if you have it in the cache
//   // Return response
//   // If not in the cache, then return
//   return caches.open(CACHE).then(function(cache) {
//     return cache.match(request).then(function(matching) {
//       if (!matching || matching.status === 404) {
//         return Promise.reject('no-match')
//       }

//       return matching
//     })
//   })
// }

// function updateCache(request, response) {
//   return caches.open(CACHE).then(function(cache) {
//     return cache.put(request, response)
//   })
// }
