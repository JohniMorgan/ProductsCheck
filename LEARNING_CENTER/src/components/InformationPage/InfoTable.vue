<script setup>
import { useStore } from '../../store';
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
const keyWordDoubled = computed(() => {
    return props.keyWord + " " + props.keyWord
})
</script>

<template>
    <v-table fixed-header height="400px">
        <thead>
        <tr>
            <th>Название</th>
            <th>Калории</th>
            <th>Белки</th>
            <th>Жиры</th>
            <th>Углеводы</th>
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