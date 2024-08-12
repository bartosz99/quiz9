<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { useQuizStore } from '@/store/index';

const quizStore = useQuizStore();

const handleStartTest = () => {
  quizStore.getQuiz();
};
</script>

<template>
  <div class="container max-w-2xl py-24 sm:py-32 flex flex-col items-center justify-center">
    <Button @click="handleStartTest">Start a test</Button>
  </div>
</template>
