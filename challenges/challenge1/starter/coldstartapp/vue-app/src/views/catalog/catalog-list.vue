<script>
import { mapActions, mapGetters } from 'vuex';
import CardContent from '@/components/card-content.vue';

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
    await this.updateUser();
  },
  computed: {
    ...mapGetters('user', { user: 'user' }),
  },
  methods: {
    ...mapActions('user', ['updateUserAction']),
    async updateUser() {
      this.errorMessage = undefined;
      try {
        await this.updateUserAction();
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
