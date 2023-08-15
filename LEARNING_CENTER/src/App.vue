<script setup>
import BaseHeader from './components/BaseHeader.vue';
import { useStore } from './store/store';

const store = useStore();
store.init();

</script>

<template>
<v-layout>
  <BaseHeader/>
<v-main>
  <v-container fluid>
    <RouterView/>
  </v-container>
</v-main>
</v-layout>
</template>

<style lang="scss">

</style>
