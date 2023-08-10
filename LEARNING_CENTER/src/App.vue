<script setup>
import { useStore } from './store';
import { useTheme } from 'vuetify';
const store = useStore();
store.init();
const theme = useTheme();
const switchTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'baseLightTheme' : 'baseDarkTheme';
}
</script>

<template>
  <v-btn @click="switchTheme" color="secondary"></v-btn>
  <RouterView/>
</template>

<style lang="scss">
  $dark-theme-acent: #ff9800;
</style>
