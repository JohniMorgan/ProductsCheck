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
            }
        },
        updateStorage() {
            localStorage.setItem(ITEM_TAG, JSON.stringify(this.person));
        },
        calculateDayCalories() {
            const genderRatio = this.person.gender == 'male' ? 5 : - 161;
            let activityRatio = null;
            switch (this.person.activity) {
                case 'min':
                    activityRatio = 1.2;
                    break;
                case 'low':
                    activityRatio = 1.375;
                    break;
                case 'mid':
                    activityRatio = 1.55;
                    break;
                case 'hard':
                    activityRatio = 1.7;
                    break;
                case 'extra':
                    activityRatio = 1.9;
                    break;
            }

            let count = 10 * this.person.weight + 6.25 * this.person.height;
            count += -5 * this.person.age + genderRatio;
            count *= activityRatio;
            count = Math.ceil(count);
            this.person.dayCount = count;
        },
        registerPerson(formData) {
            this.person = formData;
            this.calculateDayCalories();
            this.updateStorage();
        },
        BDI() {
            let min_BDI = 20;
            if (this.person.gender == 'female') min_BDI -= 1;
            for (let i = 0; i < 6; i++) {
                if (this.person.age > 24 + 10 * i) min_BDI += 1;
                else break;
            }
            let real_BDI = this.person.weight / (this.person.height * this.person.height) * 10000;
            if (real_BDI < min_BDI)
                return -1
            if (real_BDI < min_BDI + 5)
                return 0
            if (real_BDI < min_BDI + 10)
                return 1
            if (real_BDI < min_BDI + 20)
                return 2
            if (real_BDI >= min_BDI + 20)
                return 3
        }
    }
});