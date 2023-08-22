<script setup>
import { useStore } from '../../store/store';
import { defineProps, computed, ref } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import DialogAddProduct from './DialogAddProduct.vue'
const store = useStore();
const dialog = ref(false);
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
    {title: 'Действия',align: 'center', key:'actions', sortable: false},
]
const props = defineProps ({
    keyWord: String
});
const actualProducts = computed(() => {
    return store.products.filter((product) => {
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
function openDialog() {
    dialog.value = true;
    console.log(dialog.value);
};


</script>

<template>
    <v-data-table
    v-model:page="currentPage"
    :items="actualProducts"
    :headers="head"
    items-per-page="7"
    hide-default-footer
    >
    <template v-slot:item.actions="{ item }">
        <div v-if="item.raw.custom">
            <v-icon>mdi-pencil</v-icon>
            <v-icon 
            @click="store.deleteCustomProduct(item.raw)">
            mdi-delete</v-icon>
        </div>
        <v-icon v-else>mdi-minus</v-icon>
    </template>
    <!--
    Нижняя часть таблицы, тулбар
    -->
    <template v-slot:bottom>
    <v-row>
        <v-col cols="2">
        <v-input
        prepend-icon="mdi-minus"
        @click:prepend="decPage">
            <template v-slot:default>
                <label>{{currentPage}} / {{ countPage }}</label>
            </template>
            <template v-slot:append>
                    <v-icon @click="currentPage++">mdi-plus</v-icon> 
            </template>
        </v-input>
        </v-col>
        <v-col cols="8">
        </v-col>
        <v-col cols="2">
            <v-btn @click="openDialog">Добавить</v-btn>
        </v-col>
    </v-row>
    </template>
    </v-data-table>
    <dialog-add-product
    v-model:open="dialog"/>
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
    .v-col {
        display: flex;
        justify-items: center;
    }
</style>