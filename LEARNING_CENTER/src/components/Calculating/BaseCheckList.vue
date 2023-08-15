<script setup>
import { useStore } from '../../store/store';
import { ref, computed, defineEmits } from 'vue';
import BaseListItem from './BaseListItem.vue';
import SearchInput from '../InformationPage/SearchInput.vue';

const store = useStore();
const msg = ref("");
const selected = ref([]);

const actualProducts = computed(() => store.products.filter(
    (product) => {
        return product.name.includes(msg.value);
    }));

function addToChoosen(event) {
    selected.value = event.trigger;
    emit('next-step', {value: selected.value});
};
const emit = defineEmits(['next-step']);
</script>

<template> 
<v-card>
    <SearchInput
        :search="msg"
        @change="msg = $event.value"
    />
    <v-virtual-scroll
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