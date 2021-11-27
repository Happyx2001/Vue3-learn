import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        // 配置默认路由
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        redirect: '/home/welcome',
        component: () => import('../views/Home.vue'),
        meta: {
            title: "DEMO主页面"
        },
        children: [
            {
                path:'/home/welcome',
                name: "Welcome",
                component: () => import("../views/Welcome.vue")
            },
            {
                path: '/home/demo1',
                name: "Demo1",
                component: () => import("../views/demo/demo1.vue")
            },
            {
                path: '/home/demo2',
                name: "Demo2",
                component: () => import("../views/demo/demo2.vue")
            },
            {
                path: '/home/demo3',
                name: "Demo3",
                component: () => import("../views/demo/demo3.vue")
            },
            {
                path: '/home/demo4',
                name: "Demo4",
                component: () => import("../views/demo/demo4.vue")
            },
            {
                path: '/home/blog',
                name: "Blog",
                component: () => import('../views/blog/blog.vue')
            }
        ]
    }
]

const router = createRouter({
    // hash模式的 路由 （ IP地址/#/... ）
    history: createWebHashHistory(),
    routes
})

export default router
