<script setup>
const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    product: { //Удаляется ли продукт?
        type: Boolean,
        default: false,
    }
});
const emit = defineEmits(['update:open', 'submit']);

function applay() {
    emit('submit');
    close();
};

function close() {
    emit('update:open', false);
};
</script>

<template>
<v-dialog
    :model-value="open"
    persistent
>
    <v-card>
        <v-row><v-icon @click="close">mdi-close</v-icon></v-row>
        <v-card-title>Удалить?</v-card-title>
        <label>Отменить это действие будет невозможно.</label>
        <label>Вы уверены что хотите удалить {{ product ? 'продукт из базы' : 'запись из карточки' }}?</label>
        <div class="center">
            <v-btn @click="applay">Подтвердить</v-btn>
        </div>
    </v-card>
</v-dialog>
</template>

<style scoped lang='scss'>
    .v-row {
        display: flex;
        justify-content: flex-end;

        .v-icon {
            margin-right: 10px;
            margin-top: 5px;
        }
    }

    .center {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>