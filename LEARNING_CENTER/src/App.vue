<script setup>
import BaseHeader from './components/BaseHeader.vue';
import { useStore } from './store/store';

const store = useStore();
store.init();

</script>

<template>
  
  <BaseHeader/>
  
  <RouterView/>
</template>

<style lang="scss">

</style>
