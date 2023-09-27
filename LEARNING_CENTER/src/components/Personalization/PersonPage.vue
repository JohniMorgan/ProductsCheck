<script setup>

</script>

<template>
    <v-card>
        <v-input>ВАШЕ ИМЯ</v-input>
        <!--Здесь будет график-->
        <v-card class="centered card">
            ВАШ ВЕС <br>
            график<br>
            график<br>
            график<br>
            график<br>
            график<br>
        </v-card>
        <v-btn class="centered">Добавить данные</v-btn>
        <v-row>
            <v-col>
                <v-input>ВОЗРАСТ</v-input>
            </v-col>
            <v-col>
                <v-input>РОСТ</v-input>
            </v-col>
            <v-col>
                <v-input>ПОЛ</v-input>
            </v-col>
            <v-col>
                <v-input>АКТИВНОСТЬ</v-input>
            </v-col>
        </v-row>
        <v-btn>Редактировать</v-btn>
    </v-card>
</template>

<style scoped lang='scss'>
    .card {
        width: 70%
    }
</style>