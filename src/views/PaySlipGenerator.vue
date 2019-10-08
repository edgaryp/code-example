<template>
  <div class="pay-slip-generator mt-5">
    <h3>Payslip Generator</h3>
    <div class="card w-100 border-0 mt-4 text-left">
      <div class="card-body">
        <div class="card-body-header mb-3">
          <SvgBase width="40px" height="100%" iconName="myob" viewBox="0 0 480 480" iconColor="grey"><User /></SvgBase>
          <h4 class="mb-0 ml-4">Employee Info</h4>
        </div>
        <b-form @submit.prevent="onSubmit">
          <div class="row">
            <div class="col-sm-6">
              <div class="input-group form-group">
                <label for="first-name">First Name</label>
                <input id="first-name" class="form-control" type="text" v-validate="'required'" name="first-name" v-model="firstName">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group form-group">
                <label for="last-name">Last Name</label>
                <input id="last-name" class="form-control" type="text" v-validate="'required'" name="last-name" v-model="lastName">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <div class="input-group form-group">
                <label for="annual-salary">Annual Salary</label>
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input id="annual-salary" class="form-control" type="text" v-validate="'required|numeric|min_value:1'" name="annual-salary" v-model.number="annualSalary">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="input-group form-group">
                <label for="superannuation-rate">Superannuation Rate</label>
                <div class="input-group-prepend">
                  <span class="input-group-text">%</span>
                </div>
                <input id="superannuation-rate" class="form-control" type="text" v-validate="'required|numeric|min_value:1'" name="superannuation-rate" v-model="superannuationRate">
              </div>
            </div>
          </div>
          <b-button class="mt-3" type="submit" variant="success" :disabled="isValidate">Generate Payslip</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import SvgBase from '@/components/SvgBase.vue';
import User from '@/components/icons/User.vue';
import * as mutationTypes from '@/store/mutation-types';

export default {
  name: 'pay-slip-generator',
  components: {
    SvgBase,
    User,
  },
  computed: {
    ...mapState([
      'employeeInfo',
    ]),
    /**
     * When user travels between pages, input fields' value will be removed,
     * so I use setter and getter for all fields' v-model,
     * this way data will be saved in the state
     * and fields' can get the data from the state when the component is rendered.
     */
    firstName: {
      set(firstName) {
        this.setEmployeeInfo([
          'firstName',
          firstName,
        ]);
      },
      get() {
        return this.employeeInfo.firstName;
      },
    },
    lastName: {
      set(lastName) {
        this.setEmployeeInfo([
          'lastName',
          lastName,
        ]);
      },
      get() {
        return this.employeeInfo.lastName;
      },
    },
    annualSalary: {
      set(annualSalary) {
        this.setEmployeeInfo([
          'annualSalary',
          annualSalary,
        ]);
      },
      get() {
        return this.employeeInfo.annualSalary;
      },
    },
    superannuationRate: {
      set(superannuationRate) {
        this.setEmployeeInfo([
          'superannuationRate',
          superannuationRate,
        ]);
      },
      get() {
        return this.employeeInfo.superannuationRate;
      },
    },
    isValidate() {
      return this.errors.any() || !this.firstName || !this.lastName || !this.annualSalary || !this.superannuationRate;
    },
  },
  methods: {
    ...mapMutations({
      setEmployeeInfo: mutationTypes.SET_EMPLOYEE_INFO,
    }),
    onSubmit() {
      this.$router.push({
        name: 'preview-pay-slip',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.pay-slip-generator {
  label {
    width: 100%;
  }
  .input-group-text, #first-name, #last-name {
    border-top-left-radius: 0.25rem !important;
    border-bottom-left-radius: 0.25rem !important;
  }
  .card-body-header {
    display: flex;
    align-items: center;
  }
}
</style>
