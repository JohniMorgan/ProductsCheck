<script setup>
import { ref, computed } from 'vue'; 
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

const countInformation = computed(() => {
    const needCalories = personStore.person.dayCount;
    if (totalCalories.value < needCalories - 400) 
        return "Недостаточно для поддержания веса";
    if (totalCalories.value < needCalories - 50)
        return "Достаточно для плавного снижения веса";
    if (totalCalories.value < needCalories + 50)
        return "Достаточно для поддержания веса";
    if (totalCalories.value < needCalories + 400)
        return "Слабое превышение дневной нормы";
    return "Сильное превышение дневной нормы";
});

const colorStyle = computed(() => {
    const needCalories = personStore.person.dayCount;
    if (totalCalories.value < needCalories - 400) 
        return "color-low";
    if (totalCalories.value < needCalories - 50)
        return "color-normal";
    if (totalCalories.value < needCalories + 50)
        return "color-normal";
    if (totalCalories.value < needCalories + 400)
        return "color-warn";
    return "color-danger";
});


</script>

<template>
<v-window v-model="step">
    <v-window-item :value="1">
        <v-row class="bar centered">
            <v-col cols="3">
                <base-date-picker
                    :date="db.nowDate"
                    @update:date="db.changeDate($event)"
                />
            </v-col>
            <v-col :class="colorStyle">
                <label>{{ countInformation }}</label>
            </v-col>
            <v-col class="justify-self-end" cols="3">
                <label>Всего:</label>
                <v-progress-circular
                    :class="colorStyle"
                    :model-value="totalCalories / personStore.person.dayCount * 100"
                    size="70"
                    width="7"
                >
                    {{ totalCalories }}
                </v-progress-circular>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <card-meal-time
                    title="Завтрак"
                    time="morning"
                    icon="mdi-weather-sunny"
                    :color="'#d5e000'"
                    @triggered="goToSecondStep"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <card-meal-time
                    title="Обед"
                    time="lanch"
                    icon="mdi-clock-time-one-outline"
                    :color="'#ff8a0d'"
                    @triggered="goToSecondStep"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <card-meal-time
                    title="Ужин"
                    time="meal"
                    icon="mdi-pasta"
                    :color="'#bb04c2'"
                    @triggered="goToSecondStep"
                />
            </v-col>
        </v-row>
    </v-window-item>
    <v-window-item :value="2">
        <base-check-list
            @next-step="goToThirdStep"
            @back-step="step--"
        />
    </v-window-item>
    <v-window-item :value="3">
        <base-count-window
            :selected="choose"
            @back-step="step = 2"
            @submit="collectData"
        />
    </v-window-item>
</v-window>
</template>

<style scoped lang='scss'>
    .v-window {
        margin-left: auto;
        margin-right:auto;

        @media (min-width: 960px) {
            width: 70%;
        }
    }
    .bar {
        min-height: 50px;
        max-width: 800px;
        justify-self: center;
        .v-col {
            display: flex;
            align-items: center;

            &.justify-self-end {
                justify-content: end;
            }

            label {
                padding-right: 10px;
            }
        }
    }

    .color {
        &-low {
            color: #1168ff
        }
        &-normal {
            color: #00af00;
        }
        &-warn {
            color: #f27d00
        }
        &-danger {
            color: #b20000
        }
    }

</style>