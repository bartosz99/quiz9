<script setup lang="ts">
import { ref } from 'vue';
import JSConfetti from 'js-confetti';
import { useQuizStore } from '@/store/index';
import { Button } from '@/components/ui/button';

type Emits = {
  (event: 'start-new-quiz'): void;
};

defineEmits<Emits>();

const TIME_TO_DISPLAY_PRE_RESULT = 2000;
const TIME_TO_DISPLAY_RESULT = 5000;
const TIME_TO_DISPLAY_BUTTONS = 7000;
const quizStore = useQuizStore();
const jsConfetti = new JSConfetti();
const isResultGoingToBeDisplayed = ref(false);
const isResultDisplayed = ref(false);
const areButtonsDisplayed = ref(false);

console.log('quizStore.quizState.confettiDisplayed', quizStore.quizState.confettiDisplayed);
if (!quizStore.quizState.confettiDisplayed) {
  jsConfetti.addConfetti();
}

setTimeout(() => {
  isResultGoingToBeDisplayed.value = true;
}, TIME_TO_DISPLAY_PRE_RESULT);

setTimeout(() => {
  isResultDisplayed.value = true;
}, TIME_TO_DISPLAY_RESULT);

setTimeout(() => {
  areButtonsDisplayed.value = true;
  quizStore.quizState.confettiDisplayed = true;
}, TIME_TO_DISPLAY_BUTTONS);
</script>

<template>
  <div class="flex flex-col items-center justify-center min-w-xl max-w-2xl mx-auto transform">
    <div class="text-center max-w-screen-md mx-auto">
      <h2
        class="text-5xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text mb-4"
      >
        Congratulations {{ quizStore.nickname }}!
      </h2>
      <h3 class="text-2xl">You have finished the quiz!</h3>
      <div class="flex flex-col gap-4 mt-8">
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
        >
          <p
            v-show="quizStore.quizState.confettiDisplayed || isResultGoingToBeDisplayed"
            class="text-xl"
          >
            You have answered ...
          </p>
        </transition>
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
        >
          <p v-show="quizStore.quizState.confettiDisplayed || isResultDisplayed" class="text-xl">
            <span
              class="text-3xl font-bold text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
              >{{ quizStore.correctAnswersPercentage }}%</span
            >
            of the questions correctly

            <!-- <span
              class="text-3xl font-bold text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
              >{{ quizStore.finalScore }} points</span
            > -->
          </p>
        </transition>
        <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
        >
          <div
            v-show="quizStore.quizState.confettiDisplayed || areButtonsDisplayed"
            class="flex items-center justify-center gap-8"
          >
            <Button @click="$emit('start-new-quiz')" variant="outline">Take another quiz</Button>
            <RouterLink to="/leaderboard">
              <Button>Compare to others</Button>
            </RouterLink>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
