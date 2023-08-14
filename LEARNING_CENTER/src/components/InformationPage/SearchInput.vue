<script setup>
import { defineProps, defineEmits, ref } from 'vue';
const props = defineProps ({
    search: String
});
const value = ref('');
const emit = defineEmits(['change']);
function onInput(event) {
    emit('change', {value: event.target.value})
}
</script>

<template>
    <v-text-field
    v-model="value"
    label="Поиск по названию" 
    prepend-icon="mdi-magnify"
    variant="underlined"
    height="40px"
    @input="onInput">
    </v-text-field>
</template>

<style scoped lang="scss">

</style>