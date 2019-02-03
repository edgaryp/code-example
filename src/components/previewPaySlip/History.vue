<template>
  <div class="history">
    <div class="card w-100 border-0 mt-4 text-left">
      <div class="card-body">
      <div class="card-body-header mb-3">
        <h4 class="mb-0 ml-4">History</h4>
      </div>
        <table class="table table-hover" role="tablist">
          <thead>
            <tr class="d-flex">
              <th class="col-4" v-for="tableHeader in tableHeaders" :key="tableHeader" scope="col">{{ tableHeader }}</th>
            </tr>
          </thead>
          <tbody v-for="(data, index) in employeeInfo.history" :key="index">
            <tr v-b-toggle="`collapse${index}`" class="d-flex table-item" role="tab">
              <td class="col-4">{{ data.Employee }}</td>
              <td class="col-4">{{ data['Annual Income'].toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }) }}</td>
              <td class="col-4">{{ data.Pay.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }) }}</td>
            </tr>
            <b-collapse :id="`collapse${index}`" accordion="history-accordion" role="tabpanel">
              <div class="card bg-light border-0 mb-4">
                <div class="card-body text-dark">
                  <table class="table bg-transparent">
                    <tr class="d-flex table-secondary">
                      <th class="col-6">Item</th>
                      <th class="col-6">Employee Details</th>
                    </tr>
                    <tr class="d-flex bg-transparent" v-for="(item, index) in data" :key="index">
                      <td class="col-6" v-if="index !== 'Employee'">{{ index }}</td>
                      <td class="col-6" v-if="index !== 'Employee'">{{ item.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' }) }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </b-collapse>
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
        'Pay Date',
        'Annual Salary',
        'Super Rate',
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
.table {
  &-item {
    cursor: pointer;
  }
}
</style>
