<script setup>
import { useStore } from '../../store';
const store = useStore();
</script>

<template>
    <v-table theme="dark" fixed-header="true">
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
        <tr v-for="product in store.products"
        :key="product.name">
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

</style>