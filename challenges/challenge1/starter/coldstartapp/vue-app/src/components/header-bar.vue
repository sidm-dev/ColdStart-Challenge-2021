<script>
import { mapGetters } from 'vuex';
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import AuthLogout from '@/components/auth-logout.vue';

export default {
  name: 'HeaderBar',
  components: {
    HeaderBarBrand,
    AuthLogout,
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
          <router-link v-if="!this.user" class="navbar-item" to="/login">Login</router-link>
          <AuthLogout v-if="this.user" class="mt-6">Logout</AuthLogout>
        </div>
      </div>
    </nav>
  </header>
</template>
