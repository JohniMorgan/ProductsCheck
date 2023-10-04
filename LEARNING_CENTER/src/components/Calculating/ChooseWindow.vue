<script setup>
import { ref, computed, onBeforeMount } from 'vue'; 
import BaseCheckList from './BaseCheckList.vue';
import BaseCountWindow from './BaseCountWindow.vue';
import CardMealTime from './CardMealTime.vue';
import BaseDatePicker from '../GeneralComponents/BaseDatePicker.vue';
import { useDateDB } from '../../store/date-bd';
import { usePersonStore } from '../../store/person';

const db = useDateDB();
const personStore = usePersonStore();

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
    if (db.getDay())
        return db.dayStatistic(db.currentDayAsString).calories;
});
</script>

<template>
<v-window v-model="step">
    <v-window-item
    :value="1">
    <v-row class="bar">
        <v-col cols="3">
            <BaseDatePicker
            :date="db.nowDate"
            @update:date="db.changeDate($event)"/>
        </v-col>
        <v-col class="justify-self-end">
            <label>Всего: </label>
        </v-col>
        <v-col cols="2">
        <v-progress-circular
        :model-value="totalCalories/personStore.person.dayCount * 100"
        color="#00FF00"
        :size="70"
        width="7">{{ totalCalories }}</v-progress-circular>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <CardMealTime
            title="Завтрак"
            time="morning"
            icon="mdi-weather-sunny"
            :color="'#d5e000'"
            @triggered="goToSecondStep"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <CardMealTime
            title="Обед"
            time="lanch"
            icon="mdi-clock-time-one-outline"
            :color="'#ff8a0d'"
            @triggered="goToSecondStep"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <CardMealTime
            title="Ужин"
            time="meal"
            icon="mdi-pasta"
            :color="'#bb04c2'"
            @triggered="goToSecondStep"/>
        </v-col>
    </v-row>
        
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
    .v-window {
        width: 70%;
        margin-left: auto;
        margin-right:auto;
    }
    .bar {
        .v-col {
            display: flex;
            align-items: center;

            &.justify-self-end {
                justify-content: end;
            }
        }
    }
</style>