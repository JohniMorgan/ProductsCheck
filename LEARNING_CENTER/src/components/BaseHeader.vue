<script setup>
import { useTheme } from 'vuetify';
import { ref } from 'vue';

const position = ref('calculate');
const theme = useTheme();
const switchTheme = () => {
    console.log(position.value);
    theme.global.name.value = theme.global.current.value.dark ? 'baseLightTheme' : 'baseDarkTheme';
}
</script>

<template>
    <v-app-bar>
    <template v-slot:title>
        <v-toolbar-title>ЗОЖ - учёт продуктов</v-toolbar-title>
    </template>
    <template v-slot:prepend>

    </template>
    <v-btn-toggle
    v-model="position"
    mandatory
    @update:model-value="$router.push(`/${position}`)">
        <v-btn value="person" stacked>
            <v-icon>mdi-account</v-icon>
            Параметры
        </v-btn>
        <v-btn value="calculate" stacked>
            <v-icon>mdi-calculator-variant</v-icon>
            Дневник
        </v-btn>
        <v-btn value="report" stacked>
            <v-icon>mdi-chart-line</v-icon>
            Отчёт
        </v-btn>
        <v-btn value="info" stacked>
            <v-icon>mdi-food-fork-drink</v-icon>
            Продукты
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
    .active {
    }
</style>