import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
    state: () => ({
        lastId: 0,
        products: [],
        headers: ['Название', 'Каллории', 'Белки', 'Жиры', 'Углеводы'],
    }),
    actions: {
        async init() {
            try {
                const response = await fetch('/food_base.json');
                const data = await response.json();
                this.products = data.map((element, index) => {
                    //Добавляем элементы в массив, но с доп полем id
                    return { ...element, id: index + 1 };
                  });
                this.lastId = this.products[this.products.length-1].id;
            } catch (error) {
                console.log(error);
            }
        },
        getCalories(id) {
            let calories = this.getById(id).calories;
            const endIndex = calories.indexOf('к');
            return Number(calories.slice(0, endIndex));
        },
        addCustomProduct(product) {
            this.products.push({...product, id: this.lastId + 1});
            this.lastId += 1;
            console.log(this.products[this.products.length-1]);
        }
    },
    getters: {
        getById: (store) => 
            (id) => store.products.find((el) => el.id == id)
    }
})