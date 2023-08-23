<script setup>
import InfoTable from './InfoTable.vue';
import SearchInput from './SearchInput.vue';
import { ref } from 'vue';

const search = ref('')
</script>

<template>
<v-container>
    <SearchInput :search="search" @change="search = $event.value"/>
    <InfoTable :key-word="search"/>
</v-container>
</template>

<style scoped lang="scss">

</style>