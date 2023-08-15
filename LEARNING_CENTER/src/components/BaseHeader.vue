<script setup>
import { useTheme } from 'vuetify';
import { ref } from 'vue';
const position = ref('calculate');
const theme = useTheme();
const switchTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'baseLightTheme' : 'baseDarkTheme';
}
</script>

<template>
<header>
<v-layout>
    <v-app-bar app>
    <template v-slot:title>
        <v-toolbar-title>ЗОЖ - учёт продуктов {{ position }}</v-toolbar-title>
    </template>
    <template v-slot:prepend>

    </template>
    <v-btn-toggle
    v-model="position"
    mandatory
    @update:model-value="$router.push(`/${position}`)">
        <v-btn value="calculate" stacked>
            <v-icon>mdi-calculator-variant</v-icon>
            Дневник
        </v-btn>
        <v-btn value="report" stacked>
            <v-icon>mdi-chart-line</v-icon>
            Отчёт
        </v-btn>
        <v-btn value="data-base" stacked>
            <v-icon>mdi-food-fork-drink</v-icon>
            Продукты
        </v-btn>
    </v-btn-toggle>
        <v-col col="1" sm="1" md="1">
            <v-switch @click="switchTheme" hide-details></v-switch>
            <span class="switch-label">Тема</span>
        </v-col>
    </v-app-bar>
</v-layout>
</header>
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
</style>