import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './views/Home';
import About from './views/About';
import Offense from './views/Offense';
import Defense from './views/Defense';
import Pokemon from './views/Pokemon';
import Moves from './views/Moves';
// import Test from './views/Test';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/offense/:type?', name: 'offense', component: Offense },
    { path: '/defense/:type1?/:type2?', name: 'defense', component: Defense },
    { path: '/pokemon', name: 'pokemon', component: Pokemon },
    { path: '/move', name: 'moves', component: Moves },
    // { path: '/test', name: 'test', component: Test },
    { path: '*', redirect: '/' },
  ],

  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});
