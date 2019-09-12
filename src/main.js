import Vue from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import App from './App';
import AppHeading from './components/AppHeading';
import router from './router';
import './fontawesome';
// import './registerServiceWorker';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.config.productionTip = false;

Vue.use(VueVirtualScroller);

Vue.component('app-heading', AppHeading);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
