import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Defend from './views/Defend.vue';
import Attack from './views/Attack.vue';
import About from './views/About';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/defend',
      name: 'defend',
      component: Defend,
    },
    {
      path: '/attack',
      name: 'attack',
      component: Attack,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
