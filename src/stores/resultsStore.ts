import { defineStore } from 'pinia';
import { useToast } from '@/components/ui/toast/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { ResultStoreState } from '@/types/ResultStore';

const { toast } = useToast();

export const useResultStore = defineStore('results', {
  state: (): ResultStoreState => ({
    results: []
  }),

  getters: {},

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
