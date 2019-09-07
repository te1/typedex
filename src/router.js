import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home';
import About from './views/About';
import Offense from './views/Offense';
import Defense from './views/Defense';
import Pokemon from './views/Pokemon';
import Moves from './views/Moves';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/offense/:type?', name: 'offense', component: Offense },
    { path: '/defense/:type1?/:type2?', name: 'defense', component: Defense },
    { path: '/pokemon', name: 'pokemon', component: Pokemon },
    { path: '/moves', name: 'moves', component: Moves },
    { path: '*', redirect: '/' },
  ],
});
