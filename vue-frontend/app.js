import './styles.scss';

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.moment = require('moment');
window.moment.locale('en');

window.common = require('./../common');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading, { /* options */ });

import Vuetify from 'vuetify';
Vue.use(Vuetify);

import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        links: [
            {
                text: 'List',
                to: '/'
            },
            {
                text: 'Create',
                to: '/create'
            }
        ]
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    }
});

Vue.component('MainComponent', require('./components/main.vue').default);

import ListComponent from './components/list';
Vue.component('list-component', ListComponent);

import CreateComponent from './components/create';
import SingleComponent from './components/single';

const router = new VueRouter({
    mode: 'history',
    history: true,
    //base: process.env.MIX_ROUTER_BASE,
    routes: [
        {
            path: '/',
            name: 'root',
            component: ListComponent,
            props: true
        },
        ,
        {
            path: '/:slug/:id',
            name: 'single',
            component: SingleComponent,
            props: true,
        },
        {
            path: '/create',
            name: 'create',
            component: CreateComponent,
        },
    ],
});

Vue.filter('moment', function (date) {
    return moment(date).format('MMMM Do, YYYY');
})

const app = new Vue({
    el: '#app',
    router,
    store,
});