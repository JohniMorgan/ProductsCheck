<script setup>
import { computed, reactive } from 'vue';
import { useStore } from "../store.js";

defineProps({
  msg: String,
})
const store = useStore();
// Объвяление реактивных переменных
/* const count = ref(0) */
//Обявление computed-свойств
/* const countIncByOne = computed(() => count.value + 1); */
//Второй способ объявления реактивного объекта
const books = reactive({
  firstBook: "Пушкин",
  secondBook: "Достоевский",
  thirdBook: "Толстой"
})
//Объявление метода (функции) в setup
function increment() {
  store.increment();
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <v-btn color="#F00" @click="increment">count is {{ store.count }}</v-btn>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped> 
.read-the-docs {
  color: #888;
}
</style>
