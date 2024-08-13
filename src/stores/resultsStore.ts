import { defineStore } from 'pinia';
import { useToast } from '@/components/ui/toast/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { ResultStoreState } from '@/types/ResultStore';

const { toast } = useToast();

export const useResultStore = defineStore('results', {
  state: (): ResultStoreState => ({
    results: []
  }),

  getters: {
    // this is terrible and disgusting part of code with unefficient time complexity
    // made ASAP, to be rewriten later
    resultsForChart: (state) => {
      return [
        {
          name: '0%',
          any: state.results.filter((result) => result.result < 10).length,
          easy: state.results.filter((result) => result.result < 10 && result.difficulty === 'easy')
            .length,
          medium: state.results.filter(
            (result) => result.result < 10 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter((result) => result.result < 10 && result.difficulty === 'hard')
            .length
        },
        {
          name: '10%',
          any: state.results.filter((result) => result.result >= 10 && result.result < 20).length,
          easy: state.results.filter(
            (result) => result.result >= 10 && result.result < 20 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 10 && result.result < 20 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 10 && result.result < 20 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '20%',
          any: state.results.filter((result) => result.result >= 20 && result.result < 30).length,
          easy: state.results.filter(
            (result) => result.result >= 20 && result.result < 30 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 20 && result.result < 30 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 20 && result.result < 30 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '30%',
          any: state.results.filter((result) => result.result >= 30 && result.result < 40).length,
          easy: state.results.filter(
            (result) => result.result >= 30 && result.result < 40 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 30 && result.result < 40 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 30 && result.result < 40 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '40%',
          any: state.results.filter((result) => result.result >= 40 && result.result < 50).length,
          easy: state.results.filter(
            (result) => result.result >= 40 && result.result < 50 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 40 && result.result < 50 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 40 && result.result < 50 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '50%',
          any: state.results.filter((result) => result.result >= 50 && result.result < 60).length,
          easy: state.results.filter(
            (result) => result.result >= 50 && result.result < 60 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 50 && result.result < 60 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 50 && result.result < 60 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '60%',
          any: state.results.filter((result) => result.result >= 60 && result.result < 70).length,
          easy: state.results.filter(
            (result) => result.result >= 60 && result.result < 70 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 60 && result.result < 70 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 60 && result.result < 70 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '70%',
          any: state.results.filter((result) => result.result >= 70 && result.result < 80).length,
          easy: state.results.filter(
            (result) => result.result >= 70 && result.result < 80 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 70 && result.result < 80 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 70 && result.result < 80 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '80%',
          any: state.results.filter((result) => result.result >= 80 && result.result < 90).length,
          easy: state.results.filter(
            (result) => result.result >= 80 && result.result < 90 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 80 && result.result < 90 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 80 && result.result < 90 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '90%',
          any: state.results.filter((result) => result.result >= 90 && result.result < 100).length,
          easy: state.results.filter(
            (result) => result.result >= 90 && result.result < 100 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result >= 90 && result.result < 100 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result >= 90 && result.result < 100 && result.difficulty === 'hard'
          ).length
        },
        {
          name: '100%',
          any: state.results.filter((result) => result.result === 100).length,
          easy: state.results.filter(
            (result) => result.result === 100 && result.difficulty === 'easy'
          ).length,
          medium: state.results.filter(
            (result) => result.result === 100 && result.difficulty === 'medium'
          ).length,
          hard: state.results.filter(
            (result) => result.result === 100 && result.difficulty === 'hard'
          ).length
        }
      ];
    }
  },

  actions: {
    async getResults() {
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('result', { ascending: false });
      if (error) {
        console.log(error);
        toast({
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          variant: 'destructive'
        });
      }
      if (data) {
        this.results = data;
      }
    }
  },
  persist: true
});
