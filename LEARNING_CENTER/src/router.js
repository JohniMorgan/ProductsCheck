import {createRouter, createWebHistory} from 'vue-router';
import HelloWorldVue from './components/HelloWorld.vue';
import InfoPage from './components/InformationPage/InfoPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorldVue
    },
    {
        path: '/info',
        name: 'Information',
        component: InfoPage
    }
]

export default new createRouter({
    history: createWebHistory(),
    routes,
})