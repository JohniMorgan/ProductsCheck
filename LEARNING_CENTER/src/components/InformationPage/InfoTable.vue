<script setup>
import { useStore } from '../../store/store';
import { defineProps, computed } from 'vue';
const store = useStore();
const props = defineProps ({
    keyWord: String
});
const actualProducts = computed(() => {
    return store.products.filter((product) => {
        return product.name.includes(props.keyWord);
    })
})
</script>

<template>
    <v-table fixed-header height="400px">
        <thead>
        <tr>
            <th v-for="title in store.headers">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in actualProducts"
        :key="index">
            <td>{{ product.name }}</td>
            <td>{{ product.calories }}</td>
            <td>{{ product.proteins }}</td>
            <td>{{ product.fats }}</td>
            <td>{{ product.carbs }}</td>
        </tr>
        </tbody>
    </v-table>
</template>

<style scoped lang="scss">
    v-table {
        overflow: scroll;
    }
</style>