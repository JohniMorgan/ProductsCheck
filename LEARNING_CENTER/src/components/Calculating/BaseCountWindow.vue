<script setup>
import { defineProps, computed, defineEmits, ref } from 'vue';
import { useStore } from '../../store/store';
const store = useStore();
const count = ref(100);
const props = defineProps({
   selected: Object 
});
const emit = defineEmits(['back-step']);
const withoutFirst = computed(() => {
   return store.headers.slice(1);
});
const withoutName = computed(() => {
   const {['name']: removedField, ...newObject } = props.selected;
   console.log(newObject);
   return newObject;
});
function close() {
   emit('back-step');
};
function submit() {
   console.log("submit product");
   console.log(props.selected.name + " " + count.value);
};


</script>

<template>
<v-card>
    <v-divider></v-divider>
    <v-input
    append-icon="mdi-backspace-outline"
    @click:append="close">
        Выбрано {{ selected.name }}
    </v-input>
    <v-divider/>
    <v-text-field
    v-model="count"
    prepend-icon="mdi-plus-minus">
    <template v-slot:append>
        <v-input>грамм</v-input>
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