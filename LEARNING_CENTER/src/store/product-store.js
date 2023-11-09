import { defineStore } from 'pinia';

const ITEM_TAG = 'ProductsInfoData(EB)';
const BASE_POWER = 2488; //Заведомо известен размер JSON файла

export const useProductStore = defineStore('products', {
    state: () => ({
        lastId: 0,
        products: [],
        headers: ['Название', 'Каллории', 'Белки', 'Жиры', 'Углеводы'],
    }),
    actions: {
        async init() {
            const initData = localStorage.getItem(ITEM_TAG);
            //Подгружаем исходную базу данных
            try {
                const response = await fetch('/src/assets/food_base.json');
                const data = await response.json();
                this.products = data.map((element, index) => {
                    //Добавляем элементы в массив, но с доп полем id
                    return { ...element, id: index + 1 };
                });
            } catch (error) {
                console.log(error);
            }
            //Если нашлись дата в localStorage
            //Мы добавляем их к массиву
            if (initData) {
                console.log(JSON.parse(initData));
                Array.prototype.push.apply(this.products, JSON.parse(initData).map((element, index) => {
                    return {...element, id: index + 1 + BASE_POWER};
                }))
            }
            this.lastId = this.products[this.products.length - 1].id;
        },
        updateStorage() {
            //Т.к. все кастомные продукты добавлены в конец
            //Срезаем массив получая только кастом
            //И записываем его в localStorage
            localStorage.setItem(ITEM_TAG, JSON.stringify(this.products.slice(BASE_POWER)));
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
        },
    },
    getters: {
        getById: (store) => 
            (id) => store.products.find((el) => el.id == id)
    }
})
