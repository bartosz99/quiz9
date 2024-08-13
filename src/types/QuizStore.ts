import { Nullable } from './Nullable';
import { QuizCategory, QuizDifficulty } from '@/enums';

export type QuizQuestion = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type Preferences = {
  category: QuizCategory;
  difficulty: QuizDifficulty;
};

export type QuizStoreState = {
  nickname: Nullable<string>;
  questions: Nullable<QuizQuestion[]>;
  answers: string[];
  preferences: Preferences;
  busy: {
    fetchingQuestions: boolean;
  };
};
