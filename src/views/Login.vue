<template>
  <div class="login container">
    <SvgBase width="100%" height="50px" iconName="myob" viewBox="myob"><Myob /></SvgBase>
    <h2 class="font-weight-normal mb-0 text-center">Pay Slip Generator</h2>
    <LoginForm />
  </div>
</template>

<script>
import SvgBase from '@/components/SvgBase.vue';
import Myob from '@/components/icons/Myob.vue';
import LoginForm from '@/components/login/LoginForm.vue';

export default {
  name: 'login',
  components: {
    LoginForm,
    SvgBase,
    Myob,
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 576px) {
    h2 {
      font-size: 1.2rem;
      margin-top: 6px;
    }
    svg {
      height: 40px;
    }
  }
}
</style>
