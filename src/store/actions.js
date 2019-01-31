import * as firebase from 'firebase';
import * as actionTypes from './action-types';
import * as mutationTypes from './mutation-types';
import Firebase from '@/helpers/firebase';
import router from '@/router';

const actions = {
  async [actionTypes.USER_SIGNIN]({ commit }, loginDetails) {
    try {
      const promise = await Firebase.userSignIn(loginDetails);
      commit(mutationTypes.SET_USER_DETAILS, promise.user);
      router.push('/pay-slip-generator');
    } catch (error) {
      commit(mutationTypes.SET_USER_LOGIN_ERROR, error.message);
    }
  },
  async [actionTypes.USER_LOGOUT]({ commit }) {
    // Removing employee info when user logged out
    firebase.auth().signOut().then(() => {
      router.push('/login');
      commit(mutationTypes.REMOVE_EMPLOYEE_INFO);
    });
  },
};

export default actions;
