import { defineStore } from 'pinia';

const ITEM_TAG = 'PersonStore';

export const usePersonStore = defineStore('person', {
    state: () => ({
        person: {
            name: null,
            age: 0,
            height: 0,
            weight: 0,
            gender: 'none',
            activity: 'none',
            dayCount: 2000,
        },
    }),
    actions: {
        init() {
            const initData = localStorage.getItem(ITEM_TAG);
            if (initData) {
                this.person = JSON.parse(initData);
            } else {console.log('Не найдено данных пользователя')}
        },
        updateStorage() {
            localStorage.setItem(ITEM_TAG, JSON.stringify(this.person));
        }
    }
});