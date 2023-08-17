<script setup>
import { ref, computed } from 'vue';
import { VDatePicker } from 'vuetify/lib/labs/components.mjs';

const menu = ref(false);
const selectedDate = ref(new Date());

const dateToString = computed(() => {
    const day = String(selectedDate.value.getDate()).padStart(2, '0');
    const month = String(selectedDate.value.getMonth() + 1).padStart(2,'0');
    const year = selectedDate.value.getFullYear()
    return `${day}.${month}.${year}`
});

function inOkInput(event) {
  console.log(event);
  selectedDate.value = event;
};

</script>

<template>
<v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        prepend-icon="mdi-calendar"
        readonly
      >{{ dateToString }}</v-btn>
    </template>
    <v-locale-provider locale="ru">
      <v-date-picker
        @update:model-value="inOkInput"
        :model-value="selectedDate"
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