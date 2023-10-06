<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useProductStore } from '../../store/product-store';
const productStore = useProductStore();

const props = defineProps({
    food: Number,
    count: Number,
});
const emit = defineEmits(['delete', 'edit']);

function onDeleteIcon() {
    emit('delete')
};

function onEditIcon() {
    emit('edit', {
        food: props.food,
        count: props.count,
    });
};


</script>

<template>
    <v-input>
        <template v-slot:append>
            <v-icon @click="onEditIcon">mdi-pencil</v-icon>
            <v-icon @click="onDeleteIcon">mdi-close</v-icon>
        </template>
        {{ productStore.getById(food).name }} - {{ count }} гр./
        {{ productStore.getCalories(food) * count/100}} кКал.
    </v-input>
</template>

<style scoped lang='scss'>

</style>