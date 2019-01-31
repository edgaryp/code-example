<template>
  <div class="card w-100 border-0 mt-4 text-left">
    <div class="card-body">
      <b-form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email address</label>
          <input id="email" class="form-control" type="text" v-validate="'required|email'" name="email" v-model="email">
          <span>{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" v-validate="'required'" id="password" v-model="password">
          <span>{{ errors.first('password') }}</span>
        </div>
        <b-button class="mt-3 w-100" type="submit" variant="success" :disabled="isValidate">Submit</b-button>
      </b-form>
      <div v-if="userLoginError" class="alert alert-warning mt-4" role="alert">
        <p class="m-0">Incorrect password!!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as actionTypes from '@/store/action-types';

export default {
  name: 'login-form',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState([
      'userDetails',
      'userLoginError',
    ]),
    isValidate() {
      return this.errors.any() || !this.email || !this.password;
    },
  },
  methods: {
    ...mapActions({
      userSignIn: actionTypes.USER_SIGNIN,
    }),
    async onSubmit() {
      this.userSignIn({
        email: this.email,
        passowrd: this.password,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  background-color: white;
  @media (min-width: 576px) {
    width: 40% !important;
    min-width: 500px;
  }
}
</style>
