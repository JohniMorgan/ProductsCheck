<script setup>
import { defineProps, computed, defineEmits, ref } from 'vue';
import { useProductStore } from '../../store/product-store';
const productStore = useProductStore();
const count = ref(100);
const props = defineProps({
   selected: Number 
});
const emit = defineEmits(['back-step', 'submit']);
const withoutFirst = computed(() => {
   return productStore.headers.slice(1);
});
const withoutName = computed(() => {
   const {id, name, ...newObject} = food.value;
    
   return newObject;
});
const food = computed(() => {
     
   return productStore.getById(props.selected)
});



function close() {
   emit('back-step');
};
function submit() {
   emit('submit', {value: Number(count.value)});
};


</script>

<template>
<v-card>
    <v-input
    append-icon="mdi-backspace-outline"
    @click:append="close">
        Выбрано {{ food.name }}
    </v-input>
    <v-divider/>
    <v-text-field
    v-model="count"
    prepend-icon="mdi-plus-minus">
    <template v-slot:append>
        грамм
    </template>
    </v-text-field>
    <v-table>
        <thead>
            <tr>
                <th v-for="title in withoutFirst">{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td v-for="field in withoutName">{{ field }}</td>
            </tr>
        </tbody>
    </v-table>

    <v-btn
    @click="submit">Сохранить</v-btn>
</v-card>
</template>

<style scoped lang='scss'>

</style>