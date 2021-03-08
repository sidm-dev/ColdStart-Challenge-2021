<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import API from '../store/config';
import router from '../router';

export default {
  name: 'order-form',
  components: {},
  props: {
    id: {
      type: String,
      default: () => '',
    },
    name: {
      type: String,
      default: () => '',
    },
    description: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      addressLine1: '',
      addressLine2: '',
      town: '',
      county: '',
      postcode: '',
      country: '',
      output1: '',
      // IdX: '123', // Date.now().toUTCString(),
      // http://sidmdevcoldstartstore.queue.core.windows.net/sidm-dev-coldstart-pre-order-queue
      // User: this.user.userDetails,
      // Date: Date.now(),
      // IcecreamId: 1,
      // Status: 'New',
      // DriverId: null,
      // FullAddress: '1 Microsoft Way, Redmond, WA 98052, USA',
      // LastPosition: null,
    };
  },
  computed: {
    ...mapGetters('user', { user: 'user' }),
    now() {
      return (new Date()).toISOString();
    },
    fullAddress() {
      const hasAddr1 = (this.addressLine1) ? `${this.addressLine1}, ` : '';
      const hasAddr2 = (this.addressLine2) ? `${this.addressLine2}, ` : '';
      const hastown = (this.town) ? `${this.town}, ` : '';
      const hascounty = (this.county) ? `${this.county}, ` : '';
      const haspostcode = (this.postcode) ? `${this.postcode}, ` : '';
      return `${hasAddr1}${hasAddr2}${hastown}${hascounty}${haspostcode}${this.country}`;
    },
  },
  methods: {
    async formSubmit(e) {
      e.preventDefault();
      const currentObj = this;
      await axios
        .post(`${API}/orders`,
          {
            data: JSON.stringify({
              Id: '0B476647-586A-EB11-9889-000(D3AB17657', // TODO npm install uuid and use it here.
              Date: this.now,
              IcecreamId: this.name,
              Status: 'New',
              DriverId: null,
              FullAddress: this.fullAddress,
              LastPosition: null,
            }),
          })
        .then((response) => {
          currentObj.output1 = response.data;
        })
        .catch((error) => {
          currentObj.output1 = error;
        });
      router.push({ name: 'catalog' });
    },
    reset_form() {

    },
  },
};
</script>

<template>
  <div class="columns is-vcentered">
    <div class="column is-half">
      <div class="card-content">
        <header class="card-header">
          <p class="card-header-title">{{ name }}</p>
        </header>
        <div class="catalog-image">
          <img v-bind:src="imageurl" />
        </div>
        <p class="description">{{ description }}</p>
      </div>
    </div>
    <div class="column is-half">
      <form @submit="formSubmit">
        <div class="card-content">
          <div class="control">
            <label class="label">Address line 1 (or Company name)</label>
            <input type="text" class="input" placeholder="Text input" v-model="addressLine1" />
          </div>
          <div class="control">
            <label class="label">Address line 2 (optional)</label>
            <input type="text" class="input" placeholder="Text input" v-model="addressLine2" />
          </div>
          <div class="control">
            <label class="label">Town/City</label>
            <input type="text" class="input" placeholder="Text input" v-model="town" />
          </div>
          <div class="control">
            <label class="label">County</label>
            <input type="text" class="input" placeholder="Text input" v-model="county" />
          </div>
          <div class="control">
            <label class="label">Post Code</label>
            <input type="text" class="input" placeholder="Text input" v-model="postcode" />
          </div>
          <div class="control">
            <label class="label">Country</label>
            <input type="text" class="input" placeholder="Text input" v-model="country" />
          </div>
          <br/>
          <div class="box columns">
            <input class="column button is-4" type="submit"
                   v-on:click="formSubmit" value="Submit input" />
            <div class="column"/>
            <input class="column button is-4" type="reset"
                   v-on:click="reset_form" value="Reset input" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
