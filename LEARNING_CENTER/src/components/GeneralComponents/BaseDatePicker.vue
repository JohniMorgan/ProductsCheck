<script setup>
import { ref, computed } from 'vue';
import { VDatePicker } from 'vuetify/lib/labs/components.mjs';

const props = defineProps({
    date: Date 
});
const emit = defineEmits(['update:date']);

const isThisOpen = ref(false);

const dateToString = computed(() => {
    const day = String(props.date.getDate()).padStart(2, '0');
    const month = String(props.date.getMonth() + 1).padStart(2, '0');
    const year = props.date.getFullYear()
    return `${day}.${month}.${year}`
});

function inOkInput(event) {
  emit('update:date', event);
};


</script>

<template>
<v-menu
  v-model="isThisOpen"
  :close-on-content-click="false"
  offset-y
>
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        prepend-icon="mdi-calendar"
        readonly
      >
        {{ dateToString }}
      </v-btn>
    </template>
    <v-locale-provider locale="ru">
      <v-date-picker
          width="400"
          @update:model-value="inOkInput"
          :model-value="date"
          @click:cancel="isThisOpen= false"
          @click:save="isThisOpen = false"
          ok-text="ОК"
          cancel-text="Отмена"
          header="Выберите дату"
          title="Выберите дату"
        />
    </v-locale-provider>
</v-menu>
</template>

<style lang='scss'>
  .v-date-picker {
    @media (max-width: 400px) {
      scale: 0.8;
      transform: translate(-20px, 5px);
    }
  }
</style>