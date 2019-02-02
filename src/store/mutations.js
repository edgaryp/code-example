import Firebase from '@/helpers/firebase';
import * as mutationTypes from './mutation-types';

const mutations = {
  [mutationTypes.SET_USER_DETAILS](state, userDetails) {
    state.userDetails = Firebase.generateUserDetails(userDetails);
  },
  [mutationTypes.SET_USER_LOGIN_ERROR](state, errorMessage) {
    state.userLoginError = errorMessage;
  },
  [mutationTypes.REMOVE_USER_LOGIN_ERROR](state) {
    state.userLoginError = null;
  },
  [mutationTypes.SET_EMPLOYEE_INFO](state, employeeInfo) {
    const property = employeeInfo[0];
    const value = employeeInfo[1];
    switch (property) {
      case 'firstName':
        state.employeeInfo.firstName = value;
        break;
      case 'lastName':
        state.employeeInfo.lastName = value;
        break;
      case 'annualSalary':
        state.employeeInfo.annualSalary = value;
        break;
      case 'superannuationRate':
        state.employeeInfo.superannuationRate = value;
        break;
      default:
        break;
    }
  },
  [mutationTypes.REMOVE_EMPLOYEE_INFO](state) {
    state.employeeInfo.firstName = null;
    state.employeeInfo.lastName = null;
    state.employeeInfo.annualSalary = null;
    state.employeeInfo.superannuationRate = null;
  },
  [mutationTypes.SET_EMPLOYEE_HISTORY](state, history) {
    if (history) {
      state.employeeInfo.history = [...history];
    } else {
      state.employeeInfo.history = [];
    }
  },
  [mutationTypes.SET_ERROR_MESSAGE](state, error) {
    state.errorMessages.push(error);
  },
};

export default mutations;
