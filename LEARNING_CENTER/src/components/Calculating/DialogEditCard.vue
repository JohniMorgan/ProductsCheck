<script setup>
import { ref, onBeforeUpdate, computed } from 'vue';
import { useProductStore } from '../../store/product-store'
const props = defineProps({
    time: {
        type: String,
        required: true,
        validator(value) {
            return ['morning', 'lanch', 'meal'].includes(value);
        }
    },
    record: {
        type: Object, // {food: Number, count: Number}
        default() {
            return {
                food: 0,
                count: 0,
            }
        }
    },
    modelValue: { //param: open
        type: Boolean,
        default: false,
    }
});
const emit = defineEmits(['update:modelValue', 'submit']);
const inputValue = ref(100);
const productStore = useProductStore();

onBeforeUpdate(() => {
    inputValue.value = props.record.count;
});

const selectedProduct = computed(() => productStore.getById(props.record.food));


function submit() {  
    emit('submit', Number(inputValue.value));
    emit('update:modelValue', false);
};


function close() {
    emit('update:modelValue', false);
};

</script>

<template>
<v-dialog :model-value="modelValue">
    <v-card>
        <template #title>
            <v-input 
                append-icon="mdi-close"
                @click:append="close"
            >
                Редактирование приёма пищи
            </v-input>
        </template>
        <v-row>
            <v-col>
                <v-text-field
                    label="Количество"
                    v-model="inputValue"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-input>Выбранный продукт: {{ selectedProduct.name }}</v-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-input>Каллории: {{ selectedProduct.calories }}</v-input>
            </v-col>
            <v-col>
                <v-input>Белки: {{ selectedProduct.proteins }}</v-input>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-input>Жиры: {{ selectedProduct.fats }}</v-input>
            </v-col>
            <v-col>
                <v-input>Углеводы: {{ selectedProduct.carbs }}</v-input>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-btn @click="submit">Сохранить</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>