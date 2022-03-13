import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [{
        path: '',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/login.vue')

    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: () =>
            import ( /* webpackChunkName: "signUp" */ '../views/signUp.vue')

    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('../views/accueil.vue')
    },
    {
        path: '/profil',
        name: 'profil',
        component: () =>
            import ('../views/profil.vue')
    },
    {
        path: '/new',
        name: 'new',
        component: () =>
            import ('../views/new-post.vue')

    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router