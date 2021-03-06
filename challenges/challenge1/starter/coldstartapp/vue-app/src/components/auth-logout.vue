<script>
import { mapActions } from 'vuex';

export default {
  name: 'AuthLogout',
  methods: {
    ...mapActions('user', ['updateUserAction']),
    async goAuth() {
      const { pathname } = window.location;
      const redirect = `post_logout_redirect_uri=${pathname}`;
      const url = `/.auth/logout?${redirect}`;
      window.location.href = url;
      await this.updateUserAction();
    },
  },
};
</script>

<template>
  <div @click="goAuth">Logout</div>
</template>
