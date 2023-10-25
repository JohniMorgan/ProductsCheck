<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
   product: Object, 
});
const emit = defineEmits(['choose']);
function onChoose() {
    emit('choose', {
        trigger: props.product.id,
    })
};

</script>

<template>
    <v-list-item @click="onChoose">
        <v-list-item-title>{{ product.name }}</v-list-item-title>
    </v-list-item>
</template>