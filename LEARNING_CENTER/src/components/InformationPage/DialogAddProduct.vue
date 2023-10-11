<script setup>
import BaseInputSlot from '../GeneralComponents/BaseInputSlot.vue';
import { ref, onBeforeUpdate, computed } from 'vue';
import { useProductStore } from '../../store/product-store';
const props = defineProps({
    open: Boolean,
    productId: {
       type: Number,
       required: true,
    }  
});
const emit = defineEmits(['update:open']);
const productStore = useProductStore();
const productForm = ref(null);

const formInfo = ref([
    {
        title: 'Название продукта',
        value: '',
        pattern: /.+/,
        type: 'текст',
    },
    {
        title: 'Калории (кКл)',
        value: '',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    },
    {
        title: 'Белки (г)',
        value: '',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    },
    {
        title: 'Жиры (г)',
        value: '',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    },
    {
        title: 'Углеводы (г)',
        value: '',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    }
]);

onBeforeUpdate(() => {
    const infoArray = formInfo.value;
    if (props.open && props.productId != -1) {
        const product = productStore.getById(props.productId);
         
         
        infoArray[0].value = product.name;
        infoArray[1].value = product.calories.slice(0, product.calories.indexOf(' к'));
        infoArray[2].value = product.proteins.slice(0, product.proteins.indexOf(' г'));
        infoArray[3].value = product.fats.slice(0, product.fats.indexOf(' г'));
        infoArray[4].value = product.carbs.slice(0, product.carbs.indexOf(' г'));
    } else {
        for (let i in infoArray) infoArray[i].value = i == 0 ? '' : '0';
    }
});

const title = computed(() => {
    return props.productId == -1 ? 'Добавить продукт в базу' : 'Редактирование продукта';
});


function close() {
    emit('update:open', false);
};

async function validate() {
     
    const {valid} = await productForm.value.validate();

    if (valid) 
    submit();
};

function submit() {
    let data = formInfo.value;
    const formData = {
        name: data[0].value,
        calories: data[1].value + ' кКал',
        proteins: data[2].value + ' г',
        fats: data[3].value + ' г',
        carbs: data[4].value + ' г',
    }
    if (props.productId == -1) {
        productStore.addCustomProduct(formData);
    } else {
        productStore.editCustomProduct(props.productId, formData);
    }
    close();
};

</script>

<template>
<v-dialog
:model-value="open"
persistent>
    <v-card>
        <template v-slot:title>
        <v-input append-icon="mdi-close"
        @click:append="close">{{ title }}</v-input>
        </template>
    <v-form ref="productForm">
        <v-row>
        <v-col>
            <base-input-slot
            v-model="formInfo[0].value"
            :name="formInfo[0].title"
            :pattern="formInfo[0].type"
            :test="formInfo[0].pattern"
            @change="formInfo[0].value = $event.value"/>
        </v-col>
        </v-row>
        <v-row v-for="id in 2">
            <v-col cols="6">
                <base-input-slot
                :value="formInfo[id].value"
                :name="formInfo[id].title"
                :pattern="formInfo[id].type"
                :test="formInfo[id].pattern"
                @change="formInfo[id].value = $event.value"/>
            </v-col>
            <v-col cols="6">
                <base-input-slot
                :value="formInfo[id+2].value"
                :name="formInfo[id+2].title"
                :pattern="formInfo[id+2].type"
                :test="formInfo[id+2].pattern"
                @change="formInfo[id+2].value = $event.value"/>
            </v-col>
        </v-row>
    </v-form>
        <v-card-actions>
            <v-btn @click="validate">Сохранить</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<style scoped lang='scss'>

</style>