import { Nullable } from './Nullable';
import { QuizCategory, QuizDifficulty, QuizSteps } from '@/enums';

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

export type QuizState = {
  step: QuizSteps;
  question: number;
  effectiveTime: number;
  timeLeft: number;
  confettiDisplayed: boolean;
};

export type QuizStoreState = {
  nickname: Nullable<string>;
  questions: Nullable<QuizQuestion[]>;
  quizState: QuizState;
  answers: string[];
  preferences: Preferences;
  busy: {
    fetchingQuestions: boolean;
  };
};
