import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/user/Login';

import store from '../store/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
      },
    },
    { path: '*', redirect: '/login' },
  ],
});


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (from.path.indexOf('/login') !== -1 && to.path.indexOf('/login') === -1 && store.state.user.userInfo != null && to.query.redirect) {
    next({ path: to.query.redirect });
  } else {
    next();
  }
})

export default router;
