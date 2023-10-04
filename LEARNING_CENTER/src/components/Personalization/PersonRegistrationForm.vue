<script setup>
import BaseInputSlot from '../GeneralComponents/BaseInputSlot.vue';
import { ref } from 'vue';
import { usePersonStore } from '../../store/person';

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
const formRadio = ref('male');

function close() {
    console.log('close');
    emit('update:open', false);
};

const formSelectInfo = ref([
    {
        value: 'min',
        title: 'Минимальная активность',
        subtitle: 'Сидячая работа, без физической активности',
    },
    {
        value: 'low',
        title: 'Слабая активность',
        subtitle: 'Небольшие пробежки, лёгкая гимнастика 1-3 раза в неделю или частые пешие прогулки',
    },
    {
        value: 'mid',
        title: 'Умеренная активность',
        subtitle: 'Интенсивные тренировки 3-5 раз в неделю',
    },
    {
        value: 'hard',
        title: 'Высокая активность',
        subtitle: 'Интенсивные занятия спортом 5-7 раз в неделю или тяжёлая работа',
    },
    {
        value: 'extra',
        title: 'Экстремальная активность',
        subtitle: 'Очень трудоёмкая работа, ежедневные тренировки в несколько подходов',
    }
])

const selectedItem = ref('min');

const form = ref(null);

async function validate() {
    const {valid} = await form.value.validate();

    if (valid) registrationSubmit();
};

function registrationSubmit() {
    const fullFormData = {
        name: formFieldsInfo.value[0].value,
        age: formFieldsInfo.value[3].value,
        height: formFieldsInfo.value[1].value,
        weight: formFieldsInfo.value[2].value,
        gender: formRadio.value,
        activity: selectedItem.value,
    }
    const store = usePersonStore();

    store.registerPerson(fullFormData);
    close();
};


</script>

<template>
<v-dialog
:model-value="open"
persistent>
    <v-card>
        <v-card-title>Регистрация</v-card-title>
        <v-form ref="form">
        <base-input-slot v-for="field in formFieldsInfo"
            :value="field.value"
            :name="field.title"
            :pattern="field.type"
            :test="field.pattern"
            @change="field.value = $event.value"/>
        <v-radio-group
            label="Пол"
            v-model="formRadio"
            inline>
            <v-radio value="male" label="Мужской"></v-radio>
            <v-radio value="female" label="Женский"></v-radio>
        </v-radio-group>
        <v-select :items="formSelectInfo"
        v-model="selectedItem">
            <template v-slot:item="{props, item}">
                <v-list-item v-bind="props" :title="item.raw.title">
                    <v-list-item-subtitle class="text-wrap">{{ item.raw.subtitle }}</v-list-item-subtitle>
                </v-list-item>
            </template>
        </v-select>
        </v-form>
    <v-card-action>
        <v-btn @click="close">Закрыть</v-btn>
        <v-btn @click="validate">Chek-In</v-btn>
    </v-card-action>
    </v-card>
</v-dialog>

</template>

<style scoped lang='scss'>
    .v-card {
        max-width: 400px;
        width: 40%;
        min-width: 300px;
    }
    .v-list-item {
        max-width: 300px;
        min-width:300px;
    }

    .text-wrap {
        -webkit-line-clamp: unset !important;
    }
</style>