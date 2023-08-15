<script setup>
import { ref } from 'vue'; 
import BaseCheckList from './BaseCheckList.vue';
import BaseCountWindow from './BaseCountWindow.vue';
const step = ref(1);
const choose = ref('');

function goToSecondStep(event) {
   step.value = 2;
   choose.value = event.value
};


</script>

<template>
<v-window v-model="step">
    <v-window-item
    :value="1">
        <BaseCheckList
        @next-step="goToSecondStep"/>
    </v-window-item>
    <v-window-item
    :value="2">
        <BaseCountWindow
        :selected="choose"
        @back-step="step = 1"/>
    </v-window-item>
</v-window>
</template>

<style scoped lang='scss'>

</style>