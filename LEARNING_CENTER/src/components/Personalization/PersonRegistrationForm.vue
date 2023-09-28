<script setup>
import BaseInputSlot from '../GeneralComponents/BaseInputSlot.vue';
import { ref } from 'vue';

const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    person: {
        type: Object,
        default() {
            return {
                name: null,
                age: 0,
                height: 0,
                weight: 0,
                gender: null,
                activity: null,
            }
        }
    }
});
const emit = defineEmits(['update:open']);

const formFieldsInfo = ref([
    {
        title: 'Имя',
        value: '',
        pattern: /^[А-Я][а-я]{1,}$/,
        type: 'текст'
    },
    {
        title: 'Рост (см)',
        value: '',
        pattern: /^1[3-9][0-9]$|^2[0-5][0-9]$/, //Рост между 130 и 259 см (251 - самый высокий)
        type: 'число в диапазоне 130-259'
    },
    {
        title: 'Вес (кг)',
        value: '',
        pattern: /^[3-9][0-9]$|^[1-4][0-9]{1,2}$/,
        type: 'число в диапазоне 30-499' //Рекордный вес на данный момент составил 485 кг
    },
    {
        title: 'Возраст',
        value: '',
        pattern: /^1[3-9]$|^[2-9][0-9]$/,
        type: 'число в диапазоне 13-99' // Людям за 99+ уже не особо надо...
    }
])

function close() {
    console.log('close');
    emit('update:open', false);
};

</script>

<template>
<v-dialog
:model-value="open"
persistent>
    <v-card>
        <v-card-title>Регистрация</v-card-title>
        <base-input-slot v-for="field in formFieldsInfo"
            :value="field.value"
            :name="field.title"
            :pattern="field.type"
            :test="field.pattern"
            @change="field.value = $event.value"/>
        <v-card-action>
            <v-btn @click="close">Закрыть</v-btn>
        </v-card-action>
    </v-card>
</v-dialog>

</template>

<style scoped lang='scss'>

</style>