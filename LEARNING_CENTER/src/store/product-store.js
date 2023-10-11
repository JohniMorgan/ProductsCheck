import { defineStore } from 'pinia';

const ITEM_TAG = 'ProductsInfoData';

export const useProductStore = defineStore('products', {
    state: () => ({
        lastId: 0,
        products: [],
        headers: ['Название', 'Каллории', 'Белки', 'Жиры', 'Углеводы'],
    }),
    actions: {
        async init() {
            const initData = localStorage.getItem(ITEM_TAG);
            if (!initData) {
                try {
                    const response = await fetch('/food_base.json');
                    const data = await response.json();
                    this.products = data.map((element, index) => {
                        //Добавляем элементы в массив, но с доп полем id
                        return { ...element, id: index + 1 };
                    });
                    localStorage.setItem(ITEM_TAG, JSON.stringify(this.products));
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                this.products = JSON.parse(initData);
            }
            this.lastId = this.products[this.products.length-1].id;
        },
        updateStorage() {
            localStorage.setItem(ITEM_TAG, JSON.stringify(this.products));
        },
        getCalories(id) {
            let calories = this.getById(id).calories;
            const endIndex = calories.indexOf('к');
            return Number(calories.replace(',', '.').slice(0, endIndex));
        },
        getOther(id, category) {
            let other = this.getById(id)[category];
            const endIndex = other.indexOf('г');
            return Number(other.replace(',', '.').slice(0, endIndex));
        },
        addCustomProduct(product) {
            this.products.push({...product, id: this.lastId + 1, custom: true});
            this.lastId += 1;
             
            this.updateStorage();
        },
        editCustomProduct(productId, newValue) {
            const product = this.getById(productId);
            Object.assign(product, newValue);
            this.updateStorage();
        },
        deleteCustomProduct(product) {
            const index = this.products.indexOf(product);
            this.products.splice(index, 1);
            this.updateStorage();
        }
    },
    getters: {
        getById: (store) => 
            (id) => store.products.find((el) => el.id == id)
    }
})
