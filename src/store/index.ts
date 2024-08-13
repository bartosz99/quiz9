import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core';
import { QuizStoreState } from '@/types';
import { QuizCategory, QuizDifficulty } from '@/enums';
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

export const useQuizStore = defineStore('quiz', {
  state: (): QuizStoreState => ({
    nickname: null,
    questions: null,
    answers: [],
    preferences: {
      category: QuizCategory.ANY,
      difficulty: QuizDifficulty.ANY
    },
    busy: {
      fetchingQuestions: false
    }
  }),

  getters: {
    fetchURL: (state) => {
      const category =
        state.preferences.category === QuizCategory.ANY
          ? ''
          : `&category=${state.preferences.category}`;
      const difficulty =
        state.preferences.difficulty === QuizDifficulty.ANY
          ? ''
          : `&difficulty=${state.preferences.difficulty}`;
      return `https://opentdb.com/api.php?amount=10${category}${difficulty}`;
    }
  },

  actions: {
    async getQuiz() {
      const { error, data } = await useFetch(this.fetchURL).json();
      if (error.value) {
        console.error(error.value);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          variant: 'destructive'
        });
      }
      if (data.value) {
        console.log(data.value);
        this.questions = data.value.results;
      }
    }
  }
});
