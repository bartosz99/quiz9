export type Result = {
  id: number;
  created_at: string;
  result: number;
  number_of_questions: number;
  nickname: string;
  difficulty: string;
  category: string;
};

export type ResultStoreState = {
  results: Result[];
};
