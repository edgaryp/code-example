<template>
  <div class="card w-100 border-0 mt-4 text-left">
    <div class="card-body">
      <div class="card-body-header mb-3">
        <SvgBase width="40px" height="100%" iconName="myob" viewBox="0 0 480 480" iconColor="grey"><User /></SvgBase>
        <h4 class="mb-0 ml-4">Pay Slip for {{ `${employeeInfo.firstName} ${employeeInfo.lastName}` }}</h4>
      </div>
      <table class="table table-hover">
        <thead>
          <tr class="d-flex">
            <th class="col-6" v-for="tableHeader in tableHeaders" :key="tableHeader" scope="col">{{ tableHeader }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="d-flex" v-for="(data, index) in tabelData" :key="index" v-b-tooltip.hover :title="data.description">
            <td class="col-6">{{ data.item }}</td>
            <td class="col-6">{{ data['Employee Details'] }}</td>
          </tr>
        </tbody>
      </table>
      <b-dropdown v-if="!paid" text="Confirm" class="m-md-2 confirm" variant="success">
        <b-dropdown-item @click="pay">Pay</b-dropdown-item>
        <b-dropdown-item to="/pay-slip-generator">Edit</b-dropdown-item>
      </b-dropdown>
      <b-alert v-if="paid" show variant="success">
        <h4 class="alert-heading">Yay!</h4>
        <p>Payslip is saved.</p>
        <hr>
        <p class="mb-0">Eddie</p>
        <p class="mb-0"><a href="tel:0403356277">0403 356 277</a></p>
        <p class="mb-0"><a href="mailto:edgaryp@me.com">edgaryp@me.com</a></p>
        <hr>
        <b-button class="mt-3 mr-3" variant="primary" @click="singout">Logout and try again</b-button>
        <b-button class="mt-3" variant="success" href="mailto:edgaryp@me.com">Any feedback for Eddie?</b-button>
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import SvgBase from '@/components/SvgBase.vue';
import User from '@/components/icons/User.vue';
import * as actionTypes from '@/store/action-types';
import * as getterTypes from '@/store/getter-types';


export default {
  name: 'preview',
  components: {
    SvgBase,
    User,
  },
  data() {
    return {
      tableHeaders: [
        'Item',
        'Employee Details',
      ],
      paid: false,
    };
  },
  computed: {
    ...mapState([
      'employeeInfo',
    ]),
    ...mapGetters({
      tabelData: getterTypes.TABEL_DATA,
      payslipForFireStore: getterTypes.PAYSLIP_FOR_FIRESTORE,
    }),
  },
  methods: {
    ...mapActions({
      userLogout: actionTypes.USER_LOGOUT,
      savePayslip: actionTypes.SAVE_PAYSLIP,
    }),
    pay() {
      this.savePayslip(this.payslipForFireStore);
      this.paid = true;
    },
    singout() {
      this.userLogout();
    },
  },
};
</script>

<style lang="less" scoped>
  .card-body-header {
    display: flex;
    align-items: center;
  }
  .confirm {
    @media (max-width: 576px)  {
      left: calc(50% - 97.46px / 2) !important;
    }
  }
</style>
