import { createRouter, createWebHistory } from 'vue-router';
import { Routes } from '@/enums/routes';

import Home from '@/views/Home.vue';
import Quiz from '@/views/Quiz.vue';
import Statistics from '@/views/Statistics.vue';
import Leaderboard from '@/views/Leaderboard.vue';
import FAQ from '@/views/Leaderboard.vue';

const routes = [
  { path: Routes.HOME, component: Home },
  { path: Routes.QUIZ, component: Quiz },
  { path: Routes.STATISTICS, component: Statistics },
  { path: Routes.LEADERBOARD, component: Leaderboard },
  { path: Routes.FAQ, component: FAQ }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
