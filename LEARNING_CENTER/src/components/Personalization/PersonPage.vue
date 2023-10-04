<script setup>
import { usePersonStore } from '../../store/person';
import { computed } from 'vue';

const personStore = usePersonStore();

const localeGender = computed(() => {
    return personStore.person.gender == 'male' ? 'Мужской' : 'Женский';
});

const activityLocale = computed(() => {
    let activityType = null;
    switch(personStore.person.activity) {
        case 'min':
            activityType = 'Минимальная';
            break;
        case 'low':
            activityType = 'Слабая';
            break;
        case 'mid':
            activityType = 'Умеренная';
            break;
        case 'hard':
            activityType = 'Высокая';
            break;
        case 'extra':
            activityType = 'Экстремальная';
            break;
    }
    return activityType;
});

const titleBDI = computed(() => {
    let title = null;
    switch(personStore.BDI()) {
        case -1:
            title = 'Ваш вес находится ниже нормы';
            break;
        case 0:
            title = 'Ваш вес находится в пределах нормы';
            break;
        case 1:
            title = 'Ваш вес находится выше нормы';
            break;
        case 2:
            title = 'Ваш вес соответствует 1-2 стадии ожирения';
            break;
        case 3:
            title = 'Ваш вес соответствует 3 стадии ожирения';
            break;
    }
    return title;
});

const colorBDI = computed(() => {
    let color = '#';
    switch(personStore.BDI()) {
        case -1:
            color += '1108bf';
            break;
        case 0:
            color += '00ff00';
            break;
        case 1:
            color += 'e67700';
            break;
        case 2:
            color += 'b30000';
            break;
        case 3:
            color += '6e0303';
            break;
    }
    return color
});


</script>

<template>
    <v-card>
    <v-row>
    <v-col>
        <v-input>{{ personStore.person.name }}</v-input>
        <v-input>Возраст: {{ personStore.person.age }}</v-input>
        <v-input>Рост: {{ personStore.person.height }}</v-input>
        <v-input>Пол: {{ localeGender }}</v-input>
        <v-input>Активность: {{ activityLocale }}</v-input>
    </v-col>
    <v-col>
        <v-input>Ваш вес:</v-input>
        <v-progress-circular
        model-value="100"
        :color="colorBDI"
        size="70">
            {{ personStore.person.weight }}
        </v-progress-circular>
        <v-input>{{ titleBDI }}</v-input>
        <v-input>Ваша текущая норма каллорий
             для поддержания веса: {{ personStore.person.dayCount }}</v-input>
    </v-col>
    </v-row>
        <v-btn>Редактировать</v-btn>
    </v-card>
</template>

<style scoped lang='scss'>
    .card {
        width: 70%
    }
</style>