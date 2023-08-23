<script setup>
import { ref, computed } from 'vue';
import  BaseDatePicker from '../GeneralComponents/BaseDatePicker.vue'
import {useDateDB} from '../../store/date-bd';
import ReportViewModel from './ReportViewModel.vue';
const db = useDateDB();

const firstDate = ref(new Date());
const lastDate = ref(new Date());

firstDate.value.setDate(firstDate.value.getDate() - 3);

function DateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
};

const periodStatistic = computed(() => {
    console.log("Перерасчёт статистики");
    let day = new Date(firstDate.value);
    let data = {
        calories: [],
        proteins: [],
        fats: [],
        carbs: [],
    }
    while (day <= lastDate.value) {
        let stringDay = DateToString(day);
        if (db.findDay(stringDay)) {
            const stat = db.dayStatistic(stringDay);
            for (let i in stat) data[i].push(stat[i]);
        } else {
            for (let i in data) data[i].push(0);
        }
        day.setDate(day.getDate() + 1);
    }
    return data;
})
const periodDataDates = computed(() => {
    let data = [];
    let day = new Date(firstDate.value);
    while (day <= lastDate.value) {
        data.push(DateToString(day));
        day.setDate(day.getDate() + 1);
    }
    return data;
})


</script>

<template>
    <base-date-picker
    v-model:date="firstDate"/>
    <base-date-picker
    v-model:date="lastDate"/>
    <v-row>
        <v-col cols="6">
            <report-view-model
            title="Каллории (кКал)"
            :data="periodStatistic.calories"
            :labels="periodDataDates"/>
        </v-col>
        <v-col>
            <report-view-model
            title="Белки (г)"
            :data="periodStatistic.proteins"
            :labels="periodDataDates"/>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="6">
            <report-view-model
            title="Жиры (г)"
            :data="periodStatistic.fats"
            :labels="periodDataDates"/>
        </v-col>
        <v-col>
            <report-view-model
            title="Углеводы (г)"
            :data="periodStatistic.carbs"
            :labels="periodDataDates"/>
        </v-col>
    </v-row>

    
</template>



<style scoped lang='scss'>

</style>