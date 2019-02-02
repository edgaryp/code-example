<template>
  <div class="card w-100 border-0 mt-4 text-left">
    <div class="card-body">
      <b-form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email address</label>
          <input id="email" class="form-control" type="text" v-validate="'required|email'" name="email" v-model.lazy="email">
          <span>{{ errors.first('email') }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" v-validate="'required'" id="password" v-model="password">
          <span>{{ errors.first('password') }}</span>
        </div>
        <b-button class="mt-3 w-100" type="submit" :variant="signUpMode ? 'primary' : 'success'" :disabled="isValidate">{{ signUpMode ? 'Sign Up' : 'Sign In' }}</b-button>
        <p class="mt-3 mb-0 text-center sign-up" @click="signInUpOption"><small class="text-primary">{{ signUpMode ? 'Got account already?' : 'Don\'t have an account yet?' }}</small></p>
      </b-form>
      <div v-if="userLoginError" class="alert alert-warning mt-4" role="alert">
        <p class="m-0">{{ userLoginError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import * as actionTypes from '@/store/action-types';
import * as mutationTypes from '@/store/mutation-types';

export default {
  name: 'login-form',
  data() {
    return {
      email: null,
      password: null,
      signUpMode: false,
    };
  },
  computed: {
    ...mapState([
      'userLoginError',
    ]),
    isValidate() {
      return this.errors.any() || !this.email || !this.password;
    },
  },
  methods: {
    ...mapActions({
      userSignIn: actionTypes.USER_SIGNIN,
      userSignUp: actionTypes.USER_SIGNUP,
    }),
    ...mapMutations({
      removeUserLoginError: mutationTypes.REMOVE_USER_LOGIN_ERROR,
    }),
    onSubmit() {
      this.removeUserLoginError();
      const emailPassword = {
        email: this.email,
        password: this.password,
      };
      if (!this.signUpMode) {
        this.userSignIn(emailPassword);
      } else {
        this.userSignUp(emailPassword);
      }
    },
    signInUpOption() {
      this.signUpMode = !this.signUpMode;
      this.email = null;
      this.password = null;
      this.$nextTick(() => this.$validator.reset());
      this.removeUserLoginError();
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  background-color: white;
  @media (min-width: 576px) {
    width: 40% !important;
    min-width: 430px;
  }
  .sign-up {
    cursor: pointer;
  }
}
</style>
