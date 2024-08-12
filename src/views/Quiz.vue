<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { useQuizStore } from '@/store/index';

const quizStore = useQuizStore();
const activeIndex = ref(0);

const handleStartTest = () => {
  quizStore.getQuiz();
};
</script>

<template>
  <div class="container max-w-2xl py-24 sm:py-32 flex flex-col items-center justify-center">
    <p>{{ activeIndex }}</p>
    <Button @click="handleStartTest">Start a test</Button>

    <div v-if="quizStore.questions">
      <div
        v-for="(question, index) in quizStore.questions"
        v-show="index === activeIndex"
        class="flex items-center gap-4"
        :key="index"
      >
        <Button v-if="activeIndex !== 0" @click="activeIndex--">Prev</Button>
        <p>{{ question.type }}</p>
        <p>{{ question.question }}</p>
        <Button v-if="activeIndex !== quizStore.questions.length - 1" @click="activeIndex++"
          >Next</Button
        >
      </div>
    </div>
  </div>
</template>
