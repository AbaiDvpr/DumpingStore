import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Prices from '../views/Prices/Prices.vue'
import Profile from '@/views/Profile/Profile.vue'
import Settings from '@/views/Settings/Settings.vue'
import Login from '@/views/Auth/Login/Login.vue'
import Register from '@/views/Auth/Register/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }  
    },
    {
        path: '/prices',
        name: 'Prices',
        component: Prices,
        meta: { requiresAuth: true }  
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true } 
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: { requiresAuth: true } 
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false } 
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false } 
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (to.meta.requiresAuth && (!token || !userId)) {
        next('/login');  
    } 
    else if ((token && userId) && (to.name === 'Login' || to.name === 'Register')) {
        next('/');  
    } 
    else {
        next();  
    }
});

export default router;
