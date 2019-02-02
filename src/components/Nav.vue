<template>
  <b-navbar v-if="$route.name !== 'login'" toggleable="sm" type="light" variant="light">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <SvgBase width="120" height="100%" iconName="myob" viewBox="myob"><Myob /></SvgBase>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ userDetails.email }}</em>
            </template>
            <b-dropdown-item @click="singout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import SvgBase from '@/components/SvgBase.vue';
import Myob from '@/components/icons/Myob.vue';
import * as actionTypes from '@/store/action-types';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    SvgBase,
    Myob,
  },
  computed: {
    ...mapState([
      'userDetails',
    ]),
  },
  methods: {
    ...mapActions({
      userLogout: actionTypes.USER_LOGOUT,
    }),
    singout() {
      this.userLogout();
    },
  },
};
</script>

<style lang="less">
.navbar {
  position: relative;
  &:before {
    background-color: #b93499;
    background: -webkit-gradient(linear, left top, right top, from(#6100a5), color-stop(#8241aa), color-stop(#b93499), to(#ec0677));
    background: linear-gradient(90deg, #6100a5, #8241aa, #b93499, #ec0677);
    content: "";
    display: block;
    height: 0.25em;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
}
</style>
