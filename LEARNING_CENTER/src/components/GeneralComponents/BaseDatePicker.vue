<script setup>
import { ref, computed } from 'vue';
import { VDatePicker } from 'vuetify/lib/labs/components.mjs';
import { useDateDB } from '../../store/date-bd';

const menu = ref(false);
const db = useDateDB();

const dateToString = computed(() => {
    const day = String(db.nowDate.getDate()).padStart(2, '0');
    const month = String(db.nowDate.getMonth() + 1).padStart(2,'0');
    const year = db.nowDate.getFullYear()
    return `${day}.${month}.${year}`
});

function inOkInput(event) {
  db.changeDate(event);
};

const current = computed(() => {
   return db.findDay();
});


</script>

<template>
<v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        prepend-icon="mdi-calendar"
        readonly
      >{{ dateToString }}</v-btn>
      <v-input>{{ current }}</v-input>
    </template>
    <v-locale-provider locale="ru">
      <v-date-picker
        @update:model-value="inOkInput"
        :model-value="db.nowDate"
        ok-text="ОК"
        cancel-text="Отмена"
        header="Выберите дату"
        title="Выберите дату">
      </v-date-picker>
    </v-locale-provider>
</v-menu>
</template>

<style lang='scss'>
</style>