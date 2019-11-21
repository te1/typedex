import Vue from 'vue';
import App from './App';
import AppHeading from './components/app/AppHeading';
import router from './router';
import './fontawesome';

Vue.config.productionTip = false;

Vue.component('app-heading', AppHeading);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
