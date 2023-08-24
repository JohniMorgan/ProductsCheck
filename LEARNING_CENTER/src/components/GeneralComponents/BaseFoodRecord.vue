<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useStore } from '../../store/store';
const store = useStore();

const props = defineProps({
    food: Number,
    count: Number,
});
const emit = defineEmits(['delete']);

function onDeleteIcon() {
    emit('delete')
};

</script>

<template>
    <v-input>
        <template v-slot:append>
            <v-icon @click="">mdi-pencil</v-icon>
            <v-icon @click="onDeleteIcon">mdi-close</v-icon>
        </template>
        {{ store.getById(food).name }} - {{ count }} гр.
    </v-input>
</template>

<style scoped lang='scss'>

</style>