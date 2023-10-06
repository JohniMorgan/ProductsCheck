<script setup>
import { useTheme, useDisplay } from 'vuetify';
import { ref, watchEffect, computed } from 'vue';
import { usePersonStore } from '../store/person';
import { useRoute } from 'vue-router'

const personStore = usePersonStore();
const position = ref('');
const route = useRoute();
const { name } = useDisplay();


watchEffect(() => { //Необходимо соблюсти активность навигации
    if (position.value != route.path.slice(1))
        position.value = route.path.slice(1);
});

const theme = useTheme();
const switchTheme = () => {

    theme.global.name.value = theme.global.current.value.dark ? 'baseLightTheme' : 'baseDarkTheme';
}
const appName = computed(() => {
    switch(name.value) {
        case 'xs': return '';
        case 'sm': return 'ЗОЖ - планшет';
    };
    return 'ЗОЖ - учёт продуктов';
});

const isMobile = computed(() => {
    return name.value == 'xs' |name.value == 'sm';
});



</script>

<template>
    <v-app-bar>
    <template v-slot:title>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>
    </template>
    <template v-slot:prepend>

    </template>
    <v-btn-toggle
    v-model="position"
    mandatory
    @update:model-value="$router.push(`/${position}`)">
        <v-btn value="person" stacked
        v-if="personStore.person.name">
            <v-icon>mdi-account</v-icon>
            <span v-if="!isMobile">Параметры</span>
        </v-btn>
        <v-btn value="calculate" stacked>
            <v-icon>mdi-calculator-variant</v-icon>
            <span v-if="!isMobile">Дневник</span>
        </v-btn>
        <v-btn value="report" stacked>
            <v-icon>mdi-chart-line</v-icon>
            <span v-if="!isMobile">Отчёт</span>
        </v-btn>
        <v-btn value="info" stacked>
            <v-icon>mdi-food-fork-drink</v-icon>
            <span v-if="!isMobile">Продукты</span>
        </v-btn>
    </v-btn-toggle>
        <v-col col="1" sm="1" md="1">
            <v-switch @click="switchTheme" hide-details></v-switch>
            <span class="switch-label">Тема</span>
        </v-col>
    </v-app-bar>
</template>

<style scoped lang='scss'>
    h1 {
        font-size: 20px;
    }
    .switch-label {
        display: block;
        text-align:start;
        font-size: 14px;
        margin-top: -12px;
    }
    .v-btn {
        @media (max-width: 600px) {
            aspect-ratio: 1;
            min-width: 25%;
        }
    }
</style>