<script setup>
import { ref, computed } from 'vue';
import { useDateDB } from '../../store/date-bd';
import { useStore } from '../../store/store';
import BaseFoodRecord from '../GeneralComponents/BaseFoodRecord.vue';
import DialogEditCard from './DialogEditCard.vue';
const db = useDateDB();
const store = useStore();

const props = defineProps({
   time: String,
   title: String,
   icon: String,
   color: String,
});
const emit = defineEmits(['triggered']);
const selected = ref(null);
const dialog = ref(false);
const recordProp = computed(() => {
    return selectedRecord.value ? selectedRecord.value : undefined;
});
const getArray = computed(() => {
   return db.getDay()[props.time];
});
const sumCalories = computed(() => {
    let sum = 0;
    getArray.value.forEach(element => {
        sum += store.getCalories(element.food) * element.count/100;
    });
    return sum
});

const selectedRecord = computed(() => {
    return getArray.value[selected.value];
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
function onEditTrigger(index) {
    selected.value = index;
    dialog.value = true;
};
function updateCount(event) {
    db.editFood({
        time: props.time,
        index: selected.value,
        count: event,
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
            :key="el.food"
            v-bind="el"
            @delete="onDeletTrigger(index)"
            @edit="onEditTrigger(index)"/>
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

<dialog-edit-card
:time="time"
:record="recordProp"
v-model="dialog"
@submit="updateCount"/>

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