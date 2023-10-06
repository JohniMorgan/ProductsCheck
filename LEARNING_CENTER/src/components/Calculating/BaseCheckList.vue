<script setup>
import { useProductStore } from '../../store/product-store';
import { ref, computed, defineEmits } from 'vue';
import BaseListItem from './BaseListItem.vue';
import SearchInput from '../InformationPage/SearchInput.vue';

const productStore = useProductStore();
const msg = ref("");
const started = ref(false);

const actualProducts = computed(() => productStore.products.filter(
    (product) => {
        return product.name.includes(msg.value);
    }));

function addToChoosen(event) {
    emit('next-step', {value: event.trigger});
};
function onInput(event) {
    msg.value = event.value;
    started.value = true;
};

const emit = defineEmits(['next-step', 'back-step']);
</script>

<template> 
<v-card>
    <SearchInput
        :search="msg"
        @change="onInput"
        :append-icon="'mdi-backspace-outline'"
        @click:append="emit('back-step')"
    />
    
    <v-virtual-scroll
    v-if="started"
    :items="actualProducts"
    height="200">
    <template v-slot:default="{ item }">
        <BaseListItem :product="item"
        @choose="addToChoosen"/>
    </template>
    </v-virtual-scroll>
</v-card>
</template>

<style scoped lang='scss'>
</style>