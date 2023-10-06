<script setup>
import { ref, computed } from 'vue';
import { useDateDB } from '../../store/date-bd';
import { useProductStore } from '../../store/product-store';
import BaseFoodRecord from '../GeneralComponents/BaseFoodRecord.vue';
import DialogEditCard from './DialogEditCard.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import BaseDeleteDialog from '../GeneralComponents/BaseDeleteDialog.vue';
const db = useDateDB();
const productStore = useProductStore();

const { name } = useDisplay();

const props = defineProps({
   time: String,
   title: String,
   icon: String,
   color: String,
});
const emit = defineEmits(['triggered']);
const selected = ref(null);
const dialog = ref(false);
const deleteDialog = ref(false);
const delIndex = ref(null);
const recordProp = computed(() => {
    return selectedRecord.value ? selectedRecord.value : undefined;
});
const getArray = computed(() => {
   return db.getDay()[props.time];
});
const sumCalories = computed(() => {
    let sum = 0;
    getArray.value.forEach(element => {
        sum += productStore.getCalories(element.food) * element.count/100;
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
    deleteDialog.value = true;
    delIndex.value = index;
   
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

function submitDelete() {
    db.deleteFood({
        time: props.time,
        index: delIndex.value,
    })

};


</script>

<template>
<v-card>
    <v-container class="mb-6">
    <v-row align-content="center">
        <v-col  :cols="name != 'xs' ? 2 : 8">
            <v-icon :color="color" size="x-large">{{ icon }}</v-icon>
            <v-input
                persistent-hint
                :hint="`Калорий: ${sumCalories}`"
            >{{ title }}</v-input>
        </v-col>
        <v-col v-if="name != 'xs'">
            <base-food-record
            v-for="(el, index) in getArray"
            :key="el.food"
            v-bind="el"
            @delete="onDeletTrigger(index)"
            @edit="onEditTrigger(index)"/>
        </v-col>
        <v-col :cols="name != 'xs' ? 2 : 4" >
            <v-btn
            icon="mdi-plus"
            color="#02bf28"
            @click="triggered"/>
        </v-col>
    </v-row>
    <v-row v-if="name == 'xs' && getArray.length != 0">
        <v-list>
            <v-list-group value="openMobile">
                <template v-slot:activator="{ props, isOpen }">
                    <div class="center">
                        <v-icon
                        v-bind="props"
                        >{{!isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up'}}</v-icon>
                    </div>
                </template>
                <base-food-record
                v-for="(el, index) in getArray"
                :key="el.food"
                v-bind="el"
                @delete="onDeletTrigger(index)"
                @edit="onEditTrigger(index)"/>
            </v-list-group>
        </v-list>
    </v-row>
    </v-container>
</v-card>

<dialog-edit-card
:time="time"
:record="recordProp"
v-model="dialog"
@submit="updateCount"/>

<base-delete-dialog
v-model:open="deleteDialog"
@submit="submitDelete"/>

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
    .v-list {
        width: 100%;
    }

    .v-list-group {
        display: flex;
        flex-direction: column;

        .self-centered {
            margin-left:50%;
            align-self: end;
        }
    }

    .center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>