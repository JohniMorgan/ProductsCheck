<script setup>
const props = defineProps({
    open: {
        type: Boolean,
        required: true,
    },
    person: {
        type: Object,
        default(rawProps) {
            return {
                name: 'Имя',
                age: 13,
                height: 170,
                weight: 0,
                gender: 'female',
                activity: 'none',
            }
        }
    }
});
const emit = defineEmits(['update:open']);


function close() {
    console.log('close');
    emit('update:open', false);
};

</script>

<template>
<v-dialog
:model-value="open"
persistent>
    <v-card>
        <v-card-title>Регистрация</v-card-title>
        <v-card-action>
            <v-btn @click="close">Закрыть</v-btn>
        </v-card-action>
    </v-card>
</v-dialog>

</template>

<style scoped lang='scss'>

</style>