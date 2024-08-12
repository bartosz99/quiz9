import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    },
    getQuiz() {
      console.log('getQuiz');
    }
  }
});
