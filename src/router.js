import Vue from 'vue';
import firebase from 'firebase';
import Router from 'vue-router';
import Login from './views/Login.vue';
import PaySlipGenerator from './views/PaySlipGenerator.vue';
import PreviewPaySlip from './views/PreviewPaySlip.vue';
import store from './store/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/pay-slip-generator',
      name: 'pay-slip-generator',
      component: PaySlipGenerator,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/preview-pay-slip',
      name: 'preview-pay-slip',
      component: PreviewPaySlip,
      meta: {
        requiresAuth: true,
      },
      beforeEnter: (to, from, next) => {
        // redirect user back to '/pay-slip-generator' when no data was entered in pay-slip-generator
        const { firstName, lastName, annualSalary, superannuationRate } = store.state.employeeInfo;
        if (firstName && lastName && annualSalary && superannuationRate) {
          next();
        } else {
          next('pay-slip-generator');
        }
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const authRequired = to.matched.some(routeRecord => routeRecord.meta.requiresAuth);
  if (!currentUser && authRequired) {
    next('login');
  } else if (currentUser && !authRequired) {
    next('pay-slip-generator');
  } else {
    next();
  }
});

export default router;
