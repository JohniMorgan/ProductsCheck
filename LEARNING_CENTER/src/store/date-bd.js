import { defineStore } from 'pinia';
import { useProductStore } from './product-store';


export const useDateDB = defineStore('date-db', {
    state: () => ({
        days: [],
        nowDate: new Date(),
    }),

    actions: {
        changeDate(newDate) {
            this.nowDate = newDate;
        },
        addNewDay(current_date) {
            const temp = {
                date: current_date,
                morning: [],
                lanch: [],
                meal: [],
            }
            this.days.push(temp);
            this.updateStorage();
            return temp;
            
        },
        //Функция возвращающая объект сегодняшнего дня
        getDay() {
            const now = this.currentDayAsString;
            let current =  this.days.find((day) => {
                return day.date == now;
            })
            if (current == null) current = this.addNewDay(now);
            return current; 
        },
        findDay(dayString) {
            let current = this.days.find(day => {
                return day.date == dayString;
            })
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
            let day = this.getDay();
            day[params.time].push({
                food: params.food,
                count: params.count
            });
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
           let day = this.getDay();
           day[params.time].splice(params.index, 1);
           this.updateStorage();
        },
        editFood(params) {
            /*params: {
                Приём пищи
                time: {morning/lanc/meal}
                Позиция в массиве
                index: Number
                Новое количество
                count: Number*/ 
            let day = this.getDay();
            day[params.time][params.index].count = params.count;
            this.updateStorage();
        },
        updateStorage() {
            localStorage.setItem('DaysData', JSON.stringify(this.days));
        },
        init() {
            const initData = localStorage.getItem('DaysData');
            this.days = initData ? JSON.parse(initData) : [];
        },
        dayStatistic(dayString) {
            const day = this.findDay(dayString);
            let statistic = {
                calories: 0,
                proteins: 0,
                fats: 0,
                carbs: 0,
            };
            const foods = useProductStore();
            for (let part of ['morning', 'lanch', 'meal']) {
                day[part].forEach(el => {
                    statistic.calories += foods.getCalories(el.food) * (el.count / 100);
                    statistic.proteins += foods.getOther(el.food, 'proteins') * (el.count / 100);
                    statistic.fats += foods.getOther(el.food, 'fats') * (el.count / 100);
                    statistic.carbs += foods.getOther(el.food, 'carbs') * (el.count / 100);
                });
            }
            return statistic;
        }
    },
    getters: {
        //Возвращаем дату в формате dd.mm.yyyy
        currentDayAsString: (state) => {
            const day = String(state.nowDate.getDate()).padStart(2, '0');
            const month = String(state.nowDate.getMonth() + 1).padStart(2,'0');
            const year = state.nowDate.getFullYear()
            return `${day}.${month}.${year}`
        },
    }
});