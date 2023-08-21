<script setup>
import { defineProps, computed, defineEmits, ref } from 'vue';
import { useStore } from '../../store/store';
const store = useStore();
const count = ref(100);
const props = defineProps({
   selected: Number 
});
const emit = defineEmits(['back-step', 'submit']);
const withoutFirst = computed(() => {
   return store.headers.slice(1);
});
const withoutName = computed(() => {
   const {id, name, ...newObject} = food.value;
   console.log(newObject);
   return newObject;
});
const food = computed(() => {
    console.log(store.getById(props.selected));
   return store.getById(props.selected)
});



function close() {
   emit('back-step');
};
function submit() {
   emit('submit', {value: count.value});
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