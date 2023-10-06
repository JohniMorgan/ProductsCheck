<script setup>
import BaseHeader from './components/BaseHeader.vue';
import PersonDataForm from './components/Personalization/PersonDataForm.vue';
import { useDateDB } from './store/date-bd';
import { useProductStore } from './store/product-store';
import {usePersonStore} from './store/person'
import { ref } from 'vue';

const productStore = useProductStore();
const db = useDateDB();
const person = usePersonStore();
productStore.init();
db.init();
person.init();

const open = ref(person.person.name == null);
</script>

<template>
<v-layout>
  <base-header/>
<v-main>
  <v-container fluid>
    <router-view/>
    <person-data-form
    v-model:open="open"/>
  </v-container>
</v-main>
</v-layout>
</template>

<style lang="scss">

</style>
