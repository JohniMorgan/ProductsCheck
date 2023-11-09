<script setup>
import { useTheme, useDisplay } from 'vuetify';
import { ref, watchEffect, computed } from 'vue';
import { usePersonStore } from '../store/person';
import { useRoute } from 'vue-router'

const personStore = usePersonStore();
const position = ref('');
const route = useRoute();
const { name : displayName } = useDisplay();

watchEffect(() => { //Необходимо соблюсти активность навигации
    if (position.value != route.path.slice(1))
        position.value = route.path.slice(1);
});

const theme = useTheme();
const switchTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'baseLightTheme' : 'baseDarkTheme';
}
const appName = computed(() => {
    switch(displayName.value) {
        case 'xs': return '';
        case 'sm': return 'ЗОЖ - планшет';
    };
    return 'ЗОЖ - учёт продуктов';
});
</script>

<template>
    <v-app-bar>
    <template #title>
        <v-toolbar-title><h1 class="header-label">{{ appName }}</h1></v-toolbar-title>
    </template>
    <template #prepend>

    </template>
    <v-btn-toggle
        v-model="position"
        mandatory
        @update:model-value="$router.push(`/${position}`)"
    >
        
        <v-btn
            value="person" 
            stacked
            v-if="personStore.person.name"
        >
            <v-icon>mdi-account</v-icon>
            <span class="show-no-mobile">Параметры</span>
        </v-btn>
        <v-btn
            value="calculate"
            stacked
        >
            <v-icon>mdi-calculator-variant</v-icon>
            <span class="show-no-mobile">Дневник</span>
        </v-btn>
        <v-btn
            value="report"
            stacked
        >
            <v-icon>mdi-chart-line</v-icon>
            <span class="show-no-mobile">Отчёт</span>
        </v-btn>
        <v-btn
            value="info"
            stacked
        >
            <v-icon>mdi-food-fork-drink</v-icon>
            <span class="show-no-mobile">Продукты</span>
        </v-btn>
    </v-btn-toggle>
        <v-col
            col="1"
            sm="1"
            md="1"
        >
            <v-switch
                @click="switchTheme"
                hide-details
            />
            <span class="switch-label">Тема</span>
        </v-col>
    </v-app-bar>
</template>

<style scoped lang='scss'>
    .header-label {
        font-size: 1.5rem;
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

    .show-no-mobile {
        @media (max-width: 960px) {
            display: none;
        }
    }
</style>