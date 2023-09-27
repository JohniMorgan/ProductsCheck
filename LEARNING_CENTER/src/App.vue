<script setup>
import BaseHeader from './components/BaseHeader.vue';
import PersonRegistrationForm from './components/Personalization/PersonRegistrationForm.vue';
import { useDateDB } from './store/date-bd';
import { useStore } from './store/store';
import {usePersonStore} from './store/person'
import { ref } from 'vue';

const store = useStore();
const db = useDateDB();
const person = usePersonStore();
store.init();
db.init();
person.init();

const open = ref(person.person.name == null);
</script>

<template>
<v-layout>
  <BaseHeader/>
<v-main>
  <v-container fluid>
    <RouterView/>
    <person-registration-form
    v-model:open="open"/>
  </v-container>
</v-main>
</v-layout>
</template>

<style lang="scss">

</style>
