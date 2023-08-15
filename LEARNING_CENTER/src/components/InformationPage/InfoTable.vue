<script setup>
import { useStore } from '../../store/store';
import { defineProps, computed, ref } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
const store = useStore();
const head = [
    {
        title: 'Название',
        align: 'start',
        sortable: false,
        order: 'asc',
        key: 'name',
    },
    {title: 'Каллории', align:'end', key: 'calories'},
    {title: 'Белки', align: 'end', key: 'proteins'},
    {title: 'Жиры', align: 'end', key: 'fats'},
    {title: 'Углеводы', align: 'end', key: 'carbs'},
]
const props = defineProps ({
    keyWord: String
});
const actualProducts = computed(() => {
    return store.products.filter((product, index) => {
        return product.name.toLowerCase().includes(props.keyWord.toLowerCase());
    })
});
const currentPage = ref(1);
const countPage = computed(() => {
   return Math.ceil(actualProducts.value.length / 7);
});
function decPage() {
   if (currentPage.value != 1) currentPage.value--
};


</script>

<template>
    <!--<v-table fixed-header>
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
    </v-table>-->
    <v-data-table
    v-model:page="currentPage"
    :items="actualProducts"
    :headers="head"
    items-per-page="7"
    hide-default-footer
    >
    <template v-slot:bottom>
        <v-input
        prepend-icon="mdi-minus"
        @click:prepend="decPage"
    >
        <template v-slot:default>
            <label>{{currentPage}} / {{ countPage }}</label>
        </template>
        <template v-slot:append>
                <v-icon @click="currentPage++">mdi-plus</v-icon> 
        </template>
    </v-input>
    </template>
    </v-data-table>
</template>

<style scoped lang="scss">
    v-table {
        overflow: scroll;
    }
    .v-input {
        max-width: 160px;
    }
    label {
        margin-right: auto;
        margin-left: auto;
    }
</style>