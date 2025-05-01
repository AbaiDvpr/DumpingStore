import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Prices from '../views/Prices/Prices.vue'
import Profile from '@/views/Profile/Profile.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/prices',
        name: 'Prices',
        component: Prices
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
