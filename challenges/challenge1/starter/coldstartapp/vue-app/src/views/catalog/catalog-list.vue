<script>
import { mapActions, mapGetters } from 'vuex';
import CardContent from '@/components/card-content.vue';
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
    AuthLogout,
  },
  data() {
    return {
      user: '',
      /*
      PreOrder Doc:
        {
            "Id": "0B476647-586A-EB11-9889-000D3AB17657",
            "User": "Pip Doe",
            "Date": "2021-02-08T21:54:56.260Z",
            "IcecreamId": 1,
            "Status": "New",
            "DriverId": null,
            "FullAddress": "1 Microsoft Way, Redmond, WA 98052, USA",
            "LastPosition": null
        }
      */
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
    <AuthLogout v-if="this.user">Logout</AuthLogout>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!icecreams.length && !errorMessage">
      Loading data ...
    </div>
    <div class="container">
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
