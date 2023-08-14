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
  <v-btn @click="switchTheme"></v-btn>
  <RouterView/>
</template>

<style lang="scss">

</style>
