import { Nullable } from './Nullable';

export type QuizQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuizStoreState = {
  questions: Nullable<QuizQuestion[]>;
  busy: {
    fetchingQuestions: boolean;
  };
};
