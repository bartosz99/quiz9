<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import { useQuizStore } from '@/store/index';

import { QuizSteps } from '@/enums/index';
import QuizBefore from '@/components/QuizBefore.vue';
import QuizInProgress from '@/components/QuizInProgress.vue';
import QuizAfter from '@/components/QuizAfter.vue';

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
  quizStore.step = QuizSteps.IN_PROGRESS;
};

const handleFinishQuiz = () => {
  quizStore.saveResults();
  quizStore.step = QuizSteps.AFTER_QUIZ;
};

const handleStartNewQuiz = () => {
  quizStore.$reset();
  quizStore.step = QuizSteps.BEFORE_QUIZ;
};
</script>

<template>
  <div
    class="container min-w-xl max-w-2xl py-24 sm:py-32 flex flex-col items-center justify-center"
  >
    <QuizBefore v-if="quizStore.step === QuizSteps.BEFORE_QUIZ" @quiz-started="handleQuizStart" />
    <QuizInProgress
      v-else-if="quizStore.step === QuizSteps.IN_PROGRESS"
      @quiz-finished="handleFinishQuiz"
    />
    <QuizAfter
      v-else-if="(quizStore.step = QuizSteps.AFTER_QUIZ)"
      @start-new-quiz="handleStartNewQuiz"
    />
  </div>
</template>
