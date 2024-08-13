<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { useQuizStore } from '@/stores/index';

import { QuizSteps } from '@/enums/index';
import QuizBefore from '@/components/QuizBefore.vue';
import QuizInProgress from '@/components/QuizInProgress.vue';
import QuizAfter from '@/components/QuizAfter.vue';

const INITAL_TIME_FOR_QUIZ = 300;
const quizStore = useQuizStore();
const activeIndex = ref(0);
const isSubmitFormVisible = ref(false);

watchEffect(() => {
  if (quizStore.questions && activeIndex.value + 1 === quizStore.questions.length) {
    isSubmitFormVisible.value = true;
  }
});
const handleQuizStart = async () => {
  await quizStore.getQuiz();
  quizStore.quizState.timeLeft = INITAL_TIME_FOR_QUIZ;
  quizStore.startCountdown();
  quizStore.quizState.step = QuizSteps.IN_PROGRESS;
};

const handleFinishQuiz = () => {
  quizStore.saveResults();
  quizStore.quizState.effectiveTime = quizStore.quizState.timeLeft;
  quizStore.quizState.step = QuizSteps.AFTER_QUIZ;
};

const handleStartNewQuiz = () => {
  console.log('handle start new quiz');
  quizStore.$reset();
  quizStore.quizState.step = QuizSteps.BEFORE_QUIZ;
};
</script>

<template>
  <div
    class="container min-w-xl max-w-2xl py-24 sm:py-32 flex flex-col items-center justify-center"
  >
    <QuizBefore
      v-if="quizStore.quizState.step === QuizSteps.BEFORE_QUIZ"
      @quiz-started="handleQuizStart"
    />
    <QuizInProgress
      v-else-if="quizStore.quizState.step === QuizSteps.IN_PROGRESS"
      @quiz-finished="handleFinishQuiz"
      @quiz-canceled="handleStartNewQuiz"
    />
    <QuizAfter
      v-else-if="(quizStore.quizState.step = QuizSteps.AFTER_QUIZ)"
      @start-new-quiz="handleStartNewQuiz"
    />
  </div>
</template>
