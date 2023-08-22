import { defineStore } from 'pinia';
import { useStore } from './store';

export const useDateDB = defineStore('date-db', {
    state: () => ({
        days: [],
        nowDate: new Date(),
    }),

    actions: {
        /*-------------------------------------
        Здесь находится блок функций отвечающий
        за взаимодейтсвие с nowDate
        --------------------------------------*/
        changeDate(newDate) {
            this.nowDate = newDate;
        },
        /*-------------------------------------
        Здесь находится блок функций отвечающий
        за взаимодейтсвие с массивом 'days'
        --------------------------------------*/
        //Добавления дня в базу, если он был выбран впервые
        addNewDay(current_date) {
            const temp = {
                date: current_date,
                morning: [],
                lanch: [],
                meal: [],
                total: 0,
            }
            this.days.push(temp);
            this.updateStorage();
            return temp;
            
        },
        //Функция возвращающая объект сегодняшнего дня
        findDay() {
            const now = this.dayAsString;
            let current =  this.days.find((day) => {
                return day.date == now;
            })
            if (current == null) current = this.addNewDay(now);
            return current; 
        },
        //Функция добавления в текущий день съеденного
        addFood(params) {
            /*
            params : {
                //В какой приём пищи добавить\\
                time: {morning/lanch/meal}
                //Пища которая добавляется\\
                food: Number (id),
                //Количество съеденного\\
                count: Number (count);
            */ 
            let day = this.findDay();
            day[params.time].push({
                food: params.food,
                count: params.count
            });
            const foods = useStore();
            day.total += foods.getCalories(params.food) * (params.count / 100);
            this.updateStorage();
        },
        //Удаление продукта из приёма пищи
        deleteFood(params) {
            /*
                params : {
                    //Приём пищи\\
                    time: {morning/lanch/meal}
                    //Позиция в массиве
                    index: Number
                }
            */
           let day = this.findDay();
           const foods = useStore();
           let value = foods.getCalories(day[params.time][params.index].food);
           day.total -= value * (day[params.time])[params.index].count / 100;
           day[params.time].splice(params.index, 1);
           
           this.updateStorage();
        },
        updateStorage() {
            localStorage.setItem('DaysData', JSON.stringify(this.days));
        },
        init() {
            console.log(localStorage.getItem('DaysData'));
            const initData = localStorage.getItem('DaysData');
            this.days = initData ? JSON.parse(initData) : [];
        }
    },
    getters: {
        //Возвращаем дату в формате dd.mm.yyyy
        dayAsString: (state) => {
            const day = String(state.nowDate.getDate()).padStart(2, '0');
            const month = String(state.nowDate.getMonth() + 1).padStart(2,'0');
            const year = state.nowDate.getFullYear()
            return `${day}.${month}.${year}`
        },
    }
});