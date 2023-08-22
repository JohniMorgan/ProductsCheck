<script setup>
import { ref, computed, onBeforeMount } from 'vue'; 
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
    db.addFood({
        time: time.value,
        food: choose.value,
        count: event.value,
    });
    step.value = 1;
}
const totalCalories = computed(() => {
    return db.findDay().total
});

onBeforeMount(() => {
    console.log("before mount")
    console.log(db.findDay());
});
</script>

<template>
<v-window v-model="step">
    <v-window-item
    :value="1">
        <BaseDatePicker
        :date="db.nowDate"
        @update:date="db.changeDate($event)"/>
        <v-input label>Всего употреблено {{ totalCalories }}</v-input>
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