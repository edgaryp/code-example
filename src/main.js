import Vue from 'vue';
import * as firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import Firebase from './helpers/firebase';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
  inject: true,
  // Custom fieldsBagName because fields is used in BoostrapVue so it is causing conflicts.
  fieldsBagName: 'veeFields',
});

Vue.config.productionTip = false;

firebase.initializeApp(Firebase.getConfig());

/**
 * Because router's navigation guard comes before firebase initialisation,
 * so checking if if user is signed in before initialising Vue instance.
 * The user will be passed into App.vue as a prop.
 */
firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    render: h => h(App, {
      props: {
        user,
      },
    }),
  }).$mount('#app');
});
