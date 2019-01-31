<template>
  <footer class="footer" v-if="$route.name !== 'login'">
    <b-navbar type="light" variant="light" class="footer-nav">
      <div class="container">
        <b-navbar-brand href="#">
          <SvgBase width="120" height="100%" iconName="myob" viewBox="myob"><Myob /></SvgBase>
        </b-navbar-brand>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" href="#">Link 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link 2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link 3</a>
          </li>
        </ul>
      </div>
    </b-navbar>
    <div class="footer-body">
      <div class="container">
        <div class="author-info row">
          <div class="col-sm-6">
            <span class="text-muted">Edgar Pan</span>
          </div>
          <div class="col-sm-6 text-right">
            <span class="text-muted">0403 356 277 | edgaryp@me.com</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SvgBase from '@/components/SvgBase.vue';
import Myob from '@/components/icons/Myob.vue';

export default {
  components: {
    SvgBase,
    Myob,
  },
};
</script>

<style lang="less">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  line-height: 60px;
  background-color: #f5f5f5;
  &:before {
    background-color: #b93499;
    background: -webkit-gradient(linear, left top, right top, from(#6100a5), color-stop(#8241aa), color-stop(#b93499), to(#ec0677));
    background: linear-gradient(90deg, #6100a5, #8241aa, #b93499, #ec0677);
    content: "";
    display: block;
    height: 0.25em;
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
    z-index: 10;
  }
  @media (max-width: 576px) {
    height: auto;
  }
  @media (max-height: 1200px) {
    position: relative;
    margin-top: 5%;
  }
  &-body {
    background-color: #1b2830;
    .author-info {
        @media (max-width: 576px) {
          line-height: 30px;
          padding-top: 10px;
          padding-bottom: 10px;
          > div {
            text-align: center !important;
          }
        }
    }
  }
}
</style>
