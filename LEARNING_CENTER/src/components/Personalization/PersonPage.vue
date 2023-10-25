<script setup>
import { usePersonStore } from '../../store/person';
import PersonDataForm from './PersonDataForm.vue'
import { computed, ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const personStore = usePersonStore();
const { name : displayName } = useDisplay();

const localeGender = computed(() => {
    return personStore.person.gender == 'male' ? 'Мужской' : 'Женский';
});

const activityLocale = computed(() => {
    let activityType = null;
    switch(personStore.person.activity) {
        case 'min':
            activityType = 'Минимальная';
            break;
        case 'low':
            activityType = 'Слабая';
            break;
        case 'mid':
            activityType = 'Умеренная';
            break;
        case 'hard':
            activityType = 'Высокая';
            break;
        case 'extra':
            activityType = 'Экстремальная';
            break;
    }
    return activityType;
});

const titleBDI = computed(() => {
    let title = null;
    switch(personStore.BDI()) {
        case -1:
            title = 'Ваш вес находится ниже нормы';
            break;
        case 0:
            title = 'Ваш вес находится в пределах нормы';
            break;
        case 1:
            title = 'Ваш вес находится выше нормы';
            break;
        case 2:
            title = 'Ваш вес соответствует 1-2 стадии ожирения';
            break;
        case 3:
            title = 'Ваш вес соответствует 3 стадии ожирения';
            break;
    }
    return title;
});

const colorBDIclass = computed(() => {
    let color = 'text-';
    switch(personStore.BDI()) {
        case -1:
            color += 'low';
            break;
        case 0:
            color += 'normal';
            break;
        case 1:
            color += 'higher';
            break;
        case 2:
            color += 'warn';
            break;
        case 3:
            color += 'danger';
            break;
    }
    return color
});

const openEdit = ref(false);

</script>

<template>
<v-card>
    <v-row>
        <v-col cols="4">
            <v-input>{{ personStore.person.name }}</v-input>
            <v-input>Возраст: {{ personStore.person.age }}</v-input>
            <v-input>Рост: {{ personStore.person.height }}</v-input>
            <v-input>Пол: {{ localeGender }}</v-input>
            <v-input>Активность: {{ activityLocale }}</v-input>
        </v-col>
        <v-col 
            cols="8"
            class="content-center"
        >
            <v-input>Ваш вес</v-input>   
            <v-progress-circular
                :class="colorBDIclass"
                model-value="100"
                size="100"
            >
                {{ personStore.person.weight }}
            </v-progress-circular>
            <v-spacer/>
                <span :class="colorBDIclass">
                    {{ titleBDI }}
                </span>
            <v-spacer/>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <v-btn
                @click="openEdit = true"
                :icon="displayName == 'xs'"
            >
                <v-icon v-if="displayName == 'xs'">mdi-pencil</v-icon>
                {{displayName == 'xs' ? '' : 'Редактировать'}}
            </v-btn>
        </v-col>
        <v-col class="content-center">
            <v-input>Ваша текущая норма каллорий
                для поддержания веса: {{ personStore.person.dayCount }}</v-input>
        </v-col>
    </v-row>
</v-card>

    <!--Диалог редактирования данных-->
    <person-data-form
        v-model:open="openEdit"
        :person="personStore.person"
    />
</template>

<style scoped lang='scss'>
    .card {
        width: 70%
    }
    .v-col {
        display: flex;
        flex-direction: column;
    }

    .content-center {
        align-items: center;
    }
    .v-progress-circular {
        font-size: 32px;
    }

    .text {
        &-low {
            color: #1168ff
        }
        &-normal {
            color: #00af00;
        }
        &-higher {
            color: #aba61a
        }
        &-warn {
            color: #f27d00
        }
        &-danger {
            color: #b20000
        }
    }
</style>