import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core';
import { QuizStoreState } from '@/types';
import { QuizCategory, QuizDifficulty } from '@/enums';
import { useToast } from '@/components/ui/toast/use-toast';
import { supabase } from '@/lib/supabaseClient';
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
    correctAnswersPercentage: (state) => {
      if (!state.questions) return 0;
      const correctAnswers = state.questions.filter((question, index) =>
        typeof state.answers[index] !== 'string'
          ? false
          : question.correct_answer.toLocaleLowerCase().replace(/^\s+|\s+$/gm, '') ===
            state.answers[index].toLocaleLowerCase().replace(/^\s+|\s+$/gm, '')
      );
      return (correctAnswers.length / state.questions.length) * 100;
    },

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
    },
    async saveResults() {
      const { data, error } = await supabase.from('quiz_results').insert([
        {
          nickname: 'Bob234',
          result: 40,
          number_of_questions: 10,
          difficulty: 'easy',
          category: ''
        }
      ]);
      if (error) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem saving your results.',
          variant: 'destructive'
        });
      }
      if (data) {
        toast({
          title: 'Success!',
          description: 'Your results have been saved.'
        });
      }
    }
  }
});
