<script setup>
import BaseInputSlot from '../GeneralComponents/BaseInputSlot.vue';
import { ref, onBeforeUpdate } from 'vue';
import { usePersonStore } from '../../store/person';

const mode = ref(null);

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
                gender: 'male',
                activity: 'min',
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

onBeforeUpdate(() => {
    mode.value = props.person.name ? true : false //0-registration;1-edit
    formFieldsInfo.value[0].value = mode.value ? props.person.name : '';
    formFieldsInfo.value[1].value = mode.value ? props.person.height : '';
    formFieldsInfo.value[2].value = mode.value ? props.person.weight : '';
    formFieldsInfo.value[3].value = mode.value ? props.person.age : '';

    formRadio.value = props.person.gender;

    selectedItem.value = props.person.activity;
});

const form = ref(null);

async function validate() {
     
    const {valid} = await form.value.validate();

    if (valid) 
    registrationSubmit();
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
    persistent
>
    <v-card>
        <v-row class="end"><v-icon @click="close">mdi-close</v-icon></v-row>
        <v-card-title v-if="mode">Редактирование</v-card-title>
        <v-card-title v-else>Регистрация</v-card-title>
        <v-form ref="form">
            <base-input-slot v-for="field in formFieldsInfo"
                :value="field.value"
                :name="field.title"
                :pattern="field.type"
                :test="field.pattern"
                @change="field.value = $event.value"
            />
            <v-radio-group
                label="Пол"
                v-model="formRadio"
                inline
            >
                <v-radio 
                    value="male"
                    label="Мужской"
                />
                <v-radio
                    value="female"
                    label="Женский"
                />
            </v-radio-group>
            <v-select 
                :items="formSelectInfo"
                v-model="selectedItem"
            >
                <template #item="{props, item}">
                    <v-list-item v-bind="props" :title="item.raw.title">
                        <v-list-item-subtitle class="text-wrap">{{ item.raw.subtitle }}</v-list-item-subtitle>
                    </v-list-item>
                </template>
            </v-select>
        </v-form>
    <v-row class="end">
        <v-btn @click="validate">Сохранить</v-btn>
    </v-row>
    </v-card>
</v-dialog>

</template>

<style scoped lang='scss'>
    .v-card {
        max-width: 400px;
        width: 40%;
        min-width: 275px;
    }
    .v-list-item {
        max-width: 300px;
        min-width:300px;
    }

    .text-wrap {
        -webkit-line-clamp: unset !important;
    }

    .end {
        justify-content: flex-end;

        .v-btn {
            margin-bottom: 10px;
            margin-right: 10px;
        }
        .v-icon {
            margin-top: 10px;
            margin-right: 10px;
        }
    }
</style>