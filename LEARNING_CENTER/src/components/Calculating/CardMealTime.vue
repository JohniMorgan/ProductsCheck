<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { useDateDB } from '../../store/date-bd';
import { useStore } from '../../store/store';
import BaseFoodRecord from '../GeneralComponents/BaseFoodRecord.vue';
const db = useDateDB();
const store = useStore();

const props = defineProps({
   time: String,
   title: String,
   icon: String,
   color: String,
});
const emit = defineEmits(['triggered']);

const getArray = computed(() => {
   return db.findDay()[props.time];
});

const sumCalories = computed(() => {
    let sum = 0;
    getArray.value.forEach(element => {
        sum += store.getCalories(element.food) * element.count/100;
    });
    return sum
});


function triggered() {
   emit('triggered', {value: props.time})
};

function onDeletTrigger(index) {
    console.log(index);
    db.deleteFood({
        time: props.time,
        index: index,
    })
};


</script>

<template>
<v-card>
    <v-container class="mb-6">
    <v-row align-content="center">
        <v-col cols="2">
            <v-icon :color="color" size="x-large">{{ icon }}</v-icon>
            <v-input
                persistent-hint
                :hint="`Калорий: ${sumCalories}`"
            >{{ title }}</v-input>
        </v-col>
        <v-col cols="8">
            <base-food-record
            v-for="(el, index) in getArray"
            :key="index"
            v-bind="el"
            @delete="onDeletTrigger(index)"/>
        </v-col>
        <v-col cols="2">
            <v-btn
            icon="mdi-plus"
            color="#02bf28"
            @click="triggered"/>
        </v-col>
    </v-row>
    </v-container>
</v-card>
</template>

<style scoped lang='scss'>
    .v-col-2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .v-btn {
            align-self:center;
        }
    }
</style>