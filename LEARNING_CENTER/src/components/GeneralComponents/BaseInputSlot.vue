<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';
const props = defineProps({
    value: String,
    name: String,
    pattern: String,
    test:  Object,
});
const emit = defineEmits(['change']);
const testResult = computed(() => {
    return props.test.test(props.value);
});

const rules = ref([
    value => !!value || 'Поле должно быть заполнено',
    value => {
        return props.test.test(value) || `Вы должны ввести ${props.pattern}`;
    }  
])

function onInput(event) {
    emit('change', {
        value: event.target.value,
    })
};

</script>

<template>
    <v-text-field
    :label="name"
    :rules="rules"
    :model-value="value"
    @input="onInput">
    </v-text-field>
    <v-input>{{ testResult }}</v-input>
</template>

<style scoped lang='scss'>

</style>