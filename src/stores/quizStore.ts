import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core';
import { QuizStoreState } from '@/types';
import { QuizCategory, QuizDifficulty, QuizSteps } from '@/enums';
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
    quizState: {
      step: QuizSteps.BEFORE_QUIZ,
      question: 0,
      effectiveTime: 0,
      timeLeft: 300,
      confettiDisplayed: false
    },
    busy: {
      fetchingQuestions: false
    }
  }),

  getters: {
    stepActiveIndex: (state) => state.quizState.question,
    stepActiveIndexPercentage: (state) => (state.quizState.question / 10) * 100,
    timeInMinutes: (state) =>
      `${Math.floor(state.quizState.timeLeft / 60)}:${
        state.quizState.timeLeft % 60 < 10 ? '0' : ''
      }${state.quizState.timeLeft % 60}`,

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
    unansweredQuestions: (state) => {
      if (!state.questions) return 0;
      return state.questions.filter((_, index) => typeof state.answers[index] !== 'string').length;
    },
    timeMultiplier: (state) => {
      if (state.quizState.effectiveTime > 180) return 1;
      return 0.8 + (state.quizState.effectiveTime / 180) * 0.2;
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
      return `https://opentdb.com/api.php?amount=10${category}${difficulty}&encode=base64`;
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
        this.questions = data.value.results.map((question: any) => {
          return {
            ...question,
            category: atob(question.category),
            correct_answer: atob(question.correct_answer),
            difficulty: atob(question.difficulty),
            incorrect_answers: question.incorrect_answers.map((answer: string) => atob(answer)),
            question: atob(question.question),
            type: atob(question.type)
          };
        });
        console.log(this.questions);
      }
    },
    async saveResults() {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            nickname: this.nickname,
            result: this.correctAnswersPercentage,
            number_of_questions: this.questions ? this.questions.length : 0,
            difficulty: this.preferences.difficulty,
            category: this.preferences.category
          }
        ])
        .select();
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
    },
    startCountdown() {
      console.log('start countdown');
      const interval = setInterval(() => {
        if (this.quizState.timeLeft > 0) {
          this.quizState.timeLeft--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  },
  persist: true
});
