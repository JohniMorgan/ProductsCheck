<script setup>
import BaseHeader from './components/BaseHeader.vue';
import { useDateDB } from './store/date-bd';
import { useStore } from './store/store';

const store = useStore();
const db = useDateDB();
store.init();
db.init();

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
