import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from "./routes";
import IndexedLayout from './layouts/IndexLayout.vue';
import VueSocialSharing from 'vue-social-sharing';

Vue.use(VueRouter)
Vue.use(VueSocialSharing,{
    networks:{
        fakeblock: 'https://fakeblock.com/share?url=@url&title=@title'
    }
})

const router= new VueRouter({
    mode:'history',
    routes,
})

new Vue({
    el:'#app',
    router,
    render:h=>h(IndexedLayout),
    mounted(){
        document.dispatchEvent(new Event('render-event'))
    }
})
