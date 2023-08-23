import {createRouter, createWebHistory} from 'vue-router';
import HelloWorldVue from './components/HelloWorld.vue';
import InfoPage from './components/InformationPage/InfoPage.vue';
import ChooseWindow from './components/Calculating/ChooseWindow.vue';
import ReportPage from './components/Report/ReportPage.vue'

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
    },
    {
        path: '/calculate',
        name: "Calculating",
        component: ChooseWindow
    },
    {
        path: '/report',
        name: 'Report',
        component: ReportPage
    }
]

export default new createRouter({
    history: createWebHistory(),
    routes,
})