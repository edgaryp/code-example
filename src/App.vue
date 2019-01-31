<template>
  <div id="app">
    <Nav />
    <main class="container">
      <div class="row">
        <div class="col-12">
          <router-view />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Footer from '@/components/Footer.vue';
import { mapMutations } from 'vuex';
import * as mutationTypes from '@/store/mutation-types';

export default {
  components: {
    Footer,
    Nav,
  },
  props: [
    'user', // This prop is coming from main.js
  ],
  methods: {
    ...mapMutations({
      setUserDetails: mutationTypes.SET_USER_DETAILS,
    }),
  },
  created() {
    // if user is already login then store the user details to the state
    if (this.user) {
      this.setUserDetails(this.user);
    }
  },
};
</script>
