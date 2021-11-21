const BUDGET_CACHE = "budget-cache-v1";

self.addEventListener("fetch", event => {
  console.log(`[Service Worker] Fetched resource ${event.request.url}`);
    if (
      
      !event.request.url.startsWith(self.location.origin)
    ) {
      event.respondWith(fetch(event.request));
      return;
    }
  
    
    if (event.request.url.includes("/api/transaction")) {
      
      event.respondWith(
        caches.open(BUDGET_CACHE).then(cache => {
          return fetch(event.request)
            .then(response => {
              cache.put(event.request, response.clone());
              return response;
            })
            .catch(() => caches.match(event.request));
        })
      );
      return;
    }
  
    
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
  
        
        return caches.open(BUDGET_CACHE).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  });