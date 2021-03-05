<script>
import { mapActions, mapGetters } from 'vuex';
import CardContent from '@/components/card-content.vue';
import AuthLogin from '@/components/auth-login.vue';
import AuthLogout from '@/components/auth-logout.vue';
import getUserInfo from '../../assets/js/userInfo';

export default {
  name: 'CatalogList',
  props: {
    icecreams: {
      type: Array,
      default: () => [],
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      user: '',
    };
  },
  async created() {
    await this.upDateUser();
  },
  computed: {
    ...mapGetters('user', { user: 'user' }),
  },
  methods: {
    ...mapActions('user', ['setUserAction']),
    async upDateUser() {
      this.user = await getUserInfo();
      this.errorMessage = undefined;
      try {
        await this.setUserAction(this.user);
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
  },
};
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
      <h1>xxxxxxxxxx{{user}}</h1>
      <AuthLogin provider="google">Login using Google</AuthLogin>
      <AuthLogout>Logout</AuthLogout>
      <div
        v-for="(icecream) in icecreams"
      :key="icecream.Id"
      role="presentation"
      >
        <div class="card">
          <CardContent
            :name="icecream.Name"
            :description="icecream.Description"
            :imageurl="icecream.ImageUrl"
          />
        </div>
      </div>
    </div>
  </div>
</template>
