<script>
export default {
  name: 'AuthLogin',
  props: {
    provider: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    goAuth() {
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${this.provider}?${redirect}`;
      window.location.href = url;
    },
  },
};
</script>

<template>
  <!--div class="auth-link" @click="goAuth">{{ provider }}</div-->
  <div class="block">
    <button class="button" @click="goAuth">
    <span class="icon">
      <i v-if="provider=='facebook'" class="fab fa-facebook"></i>
      <i v-if="provider=='github'" class="fab fa-github"></i>
      <i v-if="provider=='google'" class="fab fa-google"></i>
      <i v-if="provider=='twitter'" class="fab fa-twitter"></i>
    </span>
    <span v-if="provider=='aad'">Azure AD</span>
    <span v-if="provider=='facebook'">Facebook</span>
    <span v-if="provider=='github'">GitHub</span>
    <span v-if="provider=='google'">Google</span>
    <span v-if="provider=='twitter'">Twitter</span>
  </button>
  </div>
</template>
