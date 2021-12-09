import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // {
    //   path: '/',
    //   name: 'Auth',
    //   component: Auth
    // },
    {
        path: '/',
        name: 'Auth',
        component: () => import('../views/Auth.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router
