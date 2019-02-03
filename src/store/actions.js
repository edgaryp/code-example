
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
  async [actionTypes.USER_SIGNUP]({ commit }, signupDetails) {
    try {
      const promise = await Firebase.userSignUp(signupDetails);
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
  async [actionTypes.SAVE_PAYSLIP]({ commit, dispatch }, payslipData) {
    try {
      await Firebase.collectionRef('payslips').doc().set(payslipData);
      dispatch(actionTypes.GET_EMPLOYEE_PAY_HISTORY);
    } catch (error) {
      commit(mutationTypes.SET_ERROR_MESSAGE, error);
    }
  },
  async [actionTypes.GET_EMPLOYEE_PAY_HISTORY]({ state, commit }) {
    try {
      const { firstName, lastName } = state.employeeInfo;
      const promise = await Firebase.collectionRef('payslips').where('Employee', '==', `${firstName} ${lastName}`).get();
      if (!promise.empty) {
        const history = [];
        promise.forEach((doc) => {
          history.push(doc.data());
        });
        commit(mutationTypes.SET_EMPLOYEE_HISTORY, history);
      } else {
        commit(mutationTypes.SET_EMPLOYEE_HISTORY, null);
      }
    } catch (error) {
      commit(mutationTypes.SET_ERROR_MESSAGE, error);
    }
  },
};

export default actions;
