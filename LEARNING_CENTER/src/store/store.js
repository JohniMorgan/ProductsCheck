import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        count: 0,
        products: [],
        headers: ['Название', 'Каллории', 'Белки', 'Жиры', 'Углеводы'],
    }),
    actions: {
        increment() {
            this.count++
        },
        async init() {
            try {
                const response = await fetch('/food_base.json');
                const data = await response.json();
                this.products = data;
            } catch (error) {
                console.log(error);
            }
        }
    },
})