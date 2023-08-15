<script setup>
import { defineProps, defineEmits} from 'vue';
const props = defineProps ({
    search: String
});
const emit = defineEmits(['change', 'focused', 'unfocused']);
function onInput(event) {
    emit('change', {value: event.target.value})
}
</script>

<template>
    <v-text-field
    :value="search"
    label="Поиск по названию" 
    prepend-icon="mdi-magnify"
    variant="underlined"
    height="40px"
    @input="onInput"
    @focus="emit('focused')"
    @blur="emit('unfocused')">
    </v-text-field>
</template>

<style scoped lang="scss">

</style>