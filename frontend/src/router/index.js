import { createRouter, createWebHashHistory } from 'vue-router'
import VueRouteMiddleware from "vue-route-middleware";
import auth from "../auth/auth";
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
            import ('../views/accueil.vue'),
        meta: {
            middleware: auth, // middleware (vue-route-middleware)
        },
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

router.beforeEach(VueRouteMiddleware());
export default router