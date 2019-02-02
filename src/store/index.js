import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userDetails: null,
    userLoginError: null,
    employeeInfo: {
      firstName: null,
      lastName: null,
      annualSalary: null,
      superannuationRate: null,
      history: [],
    },
    taxableIncomeRange: [
      {
        min: 0,
        max: 18200,
        base: 0,
        multiplier: 0,
        description: null,
      },
      {
        min: 18201,
        max: 37000,
        base: 0,
        multiplier: 0.19,
        description: '19c for each $1 over $18,200',
      },
      {
        min: 37001,
        max: 87000,
        base: 3572,
        multiplier: 0.325,
        description: '$3,572 plus 32.5c for each $1 over $37,000',
      },
      {
        min: 87001,
        max: 180000,
        base: 19822,
        multiplier: 0.37,
        description: '$19,822 plus 37c for each $1 over $87,000',
      },
      {
        min: 180001,
        max: 999999999,
        base: 54232,
        multiplier: 0.45,
        description: '$54,232 plus 45c for each $1 over $180,000',
      },
    ],
    errorMessages: [],
  },
  getters,
  mutations,
  actions,
});

export default store;
