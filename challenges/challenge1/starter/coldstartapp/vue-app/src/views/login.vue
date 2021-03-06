<script>
import { mapGetters } from 'vuex';
import AuthLogin from '@/components/auth-login.vue';

export default {
  name: 'Login',
  components: {
    AuthLogin,
  },
  props: {
    provider: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    ...mapGetters('user', { user: 'user' }),
  },
  methods: {
  },
};
</script>

<template>
  <!--div class="auth-link" @click="goAuth">{{ provider }}</div-->
<div class="columns  is-centered">
  <div class="column is-multiline is-5">
    <figure class="image mt-6">
      <img src="../assets/COLDSTART-TRUCK-400x300.png">
    </figure>
  </div>
  <div class="column is-1">
  </div>
  <div class="content column is-multiline is-6">
      <h1 class="font-weight: bold;">Login to Pre-order</h1>
      <br/>
      <AuthLogin provider="aad"></AuthLogin>
      <AuthLogin provider="facebook"></AuthLogin>
      <AuthLogin provider="github"></AuthLogin>
      <AuthLogin provider="google"></AuthLogin>
      <AuthLogin provider="twitter"></AuthLogin>
  </div>
</div>
</template>
