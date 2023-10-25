<script setup>
import { useProductStore } from '../../store/product-store';
import { defineProps, computed, ref } from 'vue';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import BaseDeleteDialog from '../GeneralComponents/BaseDeleteDialog.vue';
import DialogAddProduct from './DialogAddProduct.vue'
const productStore = useProductStore();
const dialog = ref(false);
const selectProductId = ref(-1);
const head = [
    { title: 'Название', align: 'start', sortable: false, order: 'asc', key: 'name'},
    {title: 'Каллории', align:'end', key: 'calories'},
    {title: 'Белки', align: 'end', key: 'proteins'},
    {title: 'Жиры', align: 'end', key: 'fats'},
    {title: 'Углеводы', align: 'end', key: 'carbs'},
    {title: 'Действия',align: 'center', key:'actions', sortable: false},
]
const props = defineProps ({
    keyWord: String
});

const deleteDialog = ref(false);
const actualProducts = computed(() => {
    return productStore.products.filter((product) => {
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
function openEditDialog(product) {
    selectProductId.value = product.id;
    dialog.value = true;
}
function openDialog() {
    dialog.value = true;
};

const deleteIndex = ref(null);

function deleteReq(index) {
    deleteIndex.value = index;
    deleteDialog.value = true;
};

function applay() {
    productStore.deleteCustomProduct(deleteIndex.value);
    deleteIndex.value = null
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
    <template #item.actions="{ item }">
        <div v-if="item.raw.custom">
            <v-icon @click="openEditDialog(item.raw)">
                mdi-pencil
            </v-icon>
            <v-icon @click="deleteReq(item.raw)">
                mdi-delete
            </v-icon>
        </div>
        <v-icon v-else>mdi-minus</v-icon>
    </template>
    <!--
    Нижняя часть таблицы, тулбар
    -->
    <template #bottom>
    <v-row>
        <v-col>
        <div class="page-navigation">
            <v-icon @click="decPage">mdi-minus</v-icon>
            <label>{{currentPage}} / {{ countPage }}</label>
            <v-icon @click="currentPage++">mdi-plus</v-icon>
            <v-spacer/> 
            <div>
                <v-icon @click="currentPage = 1">
                    mdi-skip-backward
                </v-icon>
                <v-icon @click="currentPage = countPage" class="ended">
                    mdi-skip-forward
                </v-icon>
            </div>
        </div>
        </v-col>
        <v-col class="ended">
            <v-btn @click="openDialog">Добавить</v-btn>
        </v-col>
    </v-row>
    </template>
    </v-data-table>
    <dialog-add-product
        v-model:open="dialog"
        @update:open="selectProductId = -1"
        :product-id="selectProductId"
    />
    <base-delete-dialog
        v-model:open="deleteDialog"
        @submit="applay"
        product
    />
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
        justify-content: center;
        justify-items: center;
        align-items: flex-start;
        flex-direction: column;
        > * {
            margin-left: 5px;
            margin-right: 5px;
        }
    }
    .ended {
        align-items: flex-end !important;
        justify-content: flex-end;
    }
    .page-navigation {
        
        label {
            padding-left: 2px;
            padding-right: 2px;
        }
        div {
            display: flex;
            justify-content:space-between;
        }
    }
</style>