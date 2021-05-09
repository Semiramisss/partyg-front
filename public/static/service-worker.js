let CACHE_VERSION=1;

let CURRENT_CACHE={
    partyg : 'partyg-cache-v'+ CACHE_VERSION
}

self.addEventListener('install',(event)=>{
    console.log('installing service worker',event);
    //this is async request that retern promise
    //caches.open('partyg-cache')
    //because of that(be async req) we use event.waituntil
    event.waitUntil(
        caches.open(CURRENT_CACHE['partyg']).then((cache)=>{
            // cache.addAll([
            //     '/',
            //     '/static/css/material.css',
            //     '/static/js/app.js'
            // ])
            // OR
            cache.add('./../src/assets/styles/partyg.css')
        })
    )
})

self.addEventListener('activate',(event)=>{
    console.log('activate service worker',event)
    let expectedCacheNames=Object.values(CURRENT_CACHE);
    
    event.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.forEach(cacheName=>{
                    if(!expectedCacheNames.includes(cacheName)){
                        //deleting out of date cache
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
});

self.addEventListener('fetch',(event)=>{
    console.log('fech urls ',event);
    event.responseWith(
        caches.open(CURRENT_CACHE['partyg']).then((cache)=>{
            // check cache existed
            return cache.match(event.request).then(response=>{
                return response || fetch(event.request);
            })
        })
    )
});