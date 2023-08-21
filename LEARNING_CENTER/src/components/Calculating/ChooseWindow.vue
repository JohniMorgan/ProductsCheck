<script setup>
import { ref } from 'vue'; 
import BaseCheckList from './BaseCheckList.vue';
import BaseCountWindow from './BaseCountWindow.vue';
import CardMealTime from './CardMealTime.vue';
import BaseDatePicker from '../GeneralComponents/BaseDatePicker.vue';
import { useDateDB } from '../../store/date-bd';

const db = useDateDB();

const step = ref(1);
const choose = ref('');
const time = ref('');
function goToThirdStep(event) {
    choose.value = event.value;
    step.value = 3;
};
function goToSecondStep(event) {
    time.value = event.value;
    step.value = 2;
};
function collectData(event) {
    console.log("Будут сформированны следующие params");
    console.log("key: " + time.value);
    console.log("food: Object{type: " + choose.value + ", count: " + event.value + "}");
    db.addFood({
        time: time.value,
        food: choose.value,
        count: event.value,
    });
    step.value = 1;
}

</script>

<template>
<v-window v-model="step">
    <v-window-item
    :value="1">
        <BaseDatePicker/>
        <CardMealTime
        title="Завтрак"
        time="morning"
        icon="mdi-weather-sunny"
        :color="'#d5e000'"
        @triggered="goToSecondStep"/>
        <CardMealTime
        title="Обед"
        time="lanch"
        icon="mdi-clock-time-one-outline"
        :color="'#ff8a0d'"
        @triggered="goToSecondStep"/>
        <CardMealTime
        title="Ужин"
        time="meal"
        icon="mdi-pasta"
        :color="'#bb04c2'"
        @triggered="goToSecondStep"/>
    </v-window-item>
    <v-window-item
    :value="2">
        <BaseCheckList
        @next-step="goToThirdStep"
        @back-step="step--"/>
    </v-window-item>
    <v-window-item
    :value="3">
        <BaseCountWindow
        :selected="choose"
        @back-step="step = 2"
        @submit="collectData"/>
    </v-window-item>
</v-window>
</template>

<style scoped lang='scss'>

</style>