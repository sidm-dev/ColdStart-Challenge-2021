<script>
import { mapGetters } from 'vuex';
import HeaderBarBrand from '@/components/header-bar-brand.vue';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('user', { user: 'user' }),
  },
  methods: {
  },
};
</script>

<template>
  <header>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
      <HeaderBarBrand></HeaderBarBrand>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item nav-home" to="/">Home</router-link>
           <div v-if="!this.user">
            <AuthLogin provider="aad"></AuthLogin>
            <AuthLogin provider="facebook"></AuthLogin>
            <AuthLogin provider="github"></AuthLogin>
            <AuthLogin provider="google"></AuthLogin>
            <AuthLogin provider="twitter"></AuthLogin>
          </div>
          <AuthLogout v-if="this.user">Logout</AuthLogout>
        </div>
      </div>
    </nav>
  </header>
</template>
