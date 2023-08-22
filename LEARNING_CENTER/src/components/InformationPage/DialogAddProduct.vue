<script setup>
import BaseInputSlot from '../GeneralComponents/BaseInputSlot.vue';
import { ref, defineProps, defineEmits } from 'vue';
import { useStore } from '../../store/store';
const props = defineProps({
    open: Boolean, 
});
const emit = defineEmits(['update:open']);
const store = useStore();
const formInfo = ref([
    {
        title: 'Название продукта',
        value: '',
        pattern: /.+/,
        type: 'текст',
    },
    {
        title: 'Калории (кКл)',
        value: '0',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    },
    {
        title: 'Белки (г)',
        value: '0',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    },
    {
        title: 'Жиры (г)',
        value: '0',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    },
    {
        title: 'Углеводы (г)',
        value: '0',
        pattern: /^[0-9]{1,}[\.,\,]{0,1}[0-9]{1,}$/,
        type: 'число',
    }
]);

function close() {
    emit('update:open', false);
};
function submit() {
    let data = formInfo.value;
    store.addCustomProduct({
        name: data[0].value,
        calories: data[1].value + ' кКал',
        proteins: data[2].value + ' г',
        fats: data[3].value + ' г',
        carbs: data[4].value + ' г',
    })
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
        @click:append="close">Добавить продукт в базу</v-input>
        </template>
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
        <v-card-actions>
            <v-btn @click="submit">Сохранить</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<style scoped lang='scss'>

</style>