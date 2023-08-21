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
                this.products = data.map((element, index) => {
                    //Добавляем элементы в массив, но с доп полем id
                    return { ...element, id: index + 1 };
                  });
            } catch (error) {
                console.log(error);
            }
        },
        getCalories(id) {
            let calories = this.getById(id).calories;
            const endIndex = calories.indexOf('к');
            return Number(calories.slice(0, endIndex));
        }
    },
    getters: {
        getById: (store) => 
            (id) => store.products.find((el) => el.id == id)
    }
})