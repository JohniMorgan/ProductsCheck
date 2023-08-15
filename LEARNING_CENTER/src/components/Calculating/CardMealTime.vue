<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
   time: String,
   icon: String,
   color: String,
});
const emit = defineEmits(['triggered']);
</script>

<template>
<v-card>
    <template v-slot:prepend>
        <v-icon :color="color" size="x-large">{{ icon }}</v-icon>
    </template>
    
    <template v-slot:default>
        {{ time }}
    </template>
    <template v-slot:append>
        <v-btn
        icon="mdi-plus"
        color="#02bf28"
        @click="emit('triggered', {value: time})"
></v-btn>
    </template>
</v-card>
</template>

<style scoped lang='scss'>

</style>