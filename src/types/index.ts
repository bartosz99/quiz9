import { Routes } from '@/enums';

export type NavRoutes = {
  href: Routes;
  label: string;
};

export type Faq = {
  question: string;
  answer: string;
  value: string;
};
