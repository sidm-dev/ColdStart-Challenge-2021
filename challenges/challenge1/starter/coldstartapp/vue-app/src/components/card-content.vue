<script>
import router from '../router';

export default {
  name: 'CardContent',
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
  methods: {
    navigate() {
      router.push({
        name: 'order-form',
        params: {
          id: this.id,
          name: this.name,
          description: this.description,
          imageurl: this.imageurl,
        },
      });
    },
  },
};
</script>

<template>
  <div class="card-content">
    <header class="card-header">
      <p class="card-header-title">{{ name }}</p>
    </header>

    <div class="content"  v-on:click="navigate()">
      <div class="catalog-image">
        <img v-bind:src="imageurl" />
      </div>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>
