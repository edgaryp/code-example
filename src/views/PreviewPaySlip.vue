<template>
<div class="preview-pay-slip mt-5">
  <h3>Payslip Generator</h3>
  <div class="row">
    <div :class="[employeeInfo.history.length ? 'col-md-12 col-lg-7' : 'col-12']">
      <Preview />
    </div>
    <div class="col-md-12 col-lg-5" v-if="employeeInfo.history.length">
      <History />
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import History from '@/components/previewPaySlip/History.vue';
import Preview from '@/components/previewPaySlip/Preview.vue';

export default {
  name: 'preview-pay-slip',
  components: {
    History,
    Preview,
  },
  computed: {
    ...mapState([
      'employeeInfo',
    ]),
  },
};
</script>
