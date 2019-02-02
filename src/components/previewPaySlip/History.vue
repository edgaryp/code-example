<template>
  <div class="history">
    <div class="card w-100 border-0 mt-4 text-left">
      <div class="card-body">
      <div class="card-body-header mb-3">
        <h4 class="mb-0 ml-4">History</h4>
      </div>
        <table class="table table-hover">
          <thead>
            <tr class="d-flex">
              <th class="col-6" v-for="tableHeader in tableHeaders" :key="tableHeader" scope="col">{{ tableHeader }}</th>
            </tr>
          </thead>
          <tbody>
            <tr class="d-flex" v-for="(data, index) in employeeInfo.history" :key="index" v-b-tooltip.hover :title="`Pay Date:${data.payDate}`">
              <td class="col-6">{{ data.employee }}</td>
              <td class="col-6">{{ data.pay }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'history',
  data() {
    return {
      tableHeaders: [
        'Employee',
        'Pay',
      ],
    };
  },
  computed: {
    ...mapState([
      'employeeInfo',
    ]),
  },
};
</script>

<style lang="less" scoped>

</style>
