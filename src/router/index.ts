import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import PageNotFound from '@/pages/PageNotFound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '*',
      name: '404',
      component: PageNotFound,
    },
  ],
});
