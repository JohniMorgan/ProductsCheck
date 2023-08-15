<script setup>
import { ref } from 'vue'; 
import BaseCheckList from './BaseCheckList.vue';
import BaseCountWindow from './BaseCountWindow.vue';
import CardMealTime from './CardMealTime.vue';
import BaseDatePicker from '../GeneralComponents/BaseDatePicker.vue';
const step = ref(1);
const choose = ref('');
const time = ref('');
function goToThirdStep(event) {
    step.value = 3;
    choose.value = event.value
};
function goToSecondStep(event) {
    step.value = 2;
    time.value = event.value;
};


</script>

<template>
<v-window v-model="step">
    <v-window-item
    :value="1">
        <BaseDatePicker/>
        <CardMealTime
        time="Завтрак"
        icon="mdi-weather-sunny"
        :color="'#d5e000'"
        @triggered="goToSecondStep"/>
        <CardMealTime
        time="Обед"
        icon="mdi-clock-time-one-outline"
        :color="'#ff8a0d'"
        @triggered="goToSecondStep"/>
        <CardMealTime
        time="Ужин"
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
        @back-step="step = 2"/>
    </v-window-item>
</v-window>
</template>

<style scoped lang='scss'>

</style>