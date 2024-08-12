import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core';
import { QuizStoreState } from '@/types';
import { useToast } from '@/components/ui/toast/use-toast';
const { toast } = useToast();

export const useQuizStore = defineStore('quiz', {
  state: (): QuizStoreState => ({
    questions: null,
    answers: [],
    busy: {
      fetchingQuestions: false
    }
  }),

  actions: {
    async getQuiz() {
      const { error, data } = await useFetch('https://opentdb.com/api.php?amount=10').json();
      if (error.value) {
        console.error(error.value);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          variant: 'destructive'
        });
      }
      if (data.value) {
        console.log(data.value.results);
        this.questions = data.value.results;
      }
    }
  }
});
