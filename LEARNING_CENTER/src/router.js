import {createRouter, createWebHistory} from 'vue-router';
import InfoPage from './components/InformationPage/InfoPage.vue';
import ChooseWindow from './components/Calculating/ChooseWindow.vue';
import ReportPage from './components/Report/ReportPage.vue';
import PersonPage from './components/Personalization/PersonPage.vue';

const routes = [
    {
        path: '/info',
        name: 'info',
        component: InfoPage
    },
    {
        path: '/calculate',
        name: "calculate",
        component: ChooseWindow
    },
    {
        path: '/report',
        name: 'report',
        component: ReportPage
    },
    {
        path: '/person',
        component: PersonPage
    },
    {
        path: '/',
        redirect: '/calculate'
    }
]

const router =  new createRouter({
    history: createWebHistory(),
    routes,
})
export default router;