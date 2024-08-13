<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useQuizStore } from '@/stores/index';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const quizStore = useQuizStore();
const isSubmitFormVisible = ref(false);

watchEffect(() => {
  if (quizStore.questions && quizStore.quizState.question + 1 === quizStore.questions.length) {
    isSubmitFormVisible.value = true;
  }
});

type Emits = {
  (event: 'quiz-finished'): void;
  (event: 'quiz-canceled'): void;
};

defineEmits<Emits>();
</script>

<template>
  <div class="w-full mr-16 ml-16 flex flex-col items-center gap-8">
    <div
      v-for="(question, index) in quizStore.questions"
      v-show="index === quizStore.stepActiveIndex"
      class="w-full flex justify-center items-center gap-4"
      :key="index"
      :id="'step-' + index"
    >
      <Button
        class="hidden md:block"
        variant="outline"
        :disabled="quizStore.stepActiveIndex === 0"
        @click="quizStore.quizState.question--"
        >Prev</Button
      >
      <div class="w-full">
        <div>
          <p>{{ quizStore.stepActiveIndexPercentage }} %</p>
          <Progress v-model="quizStore.stepActiveIndexPercentage" class="w-full mb-4" />
        </div>
        <Card class="w-full md:w-[600px] md:h-[300px]">
          <CardHeader class="flex flex-col md:flex-row justify-between">
            <div class="flex flex-col md:flex-row gap-4">
              <CardTitle>Question {{ quizStore.stepActiveIndex + 1 }}</CardTitle>
              <Badge variant="outline">{{ question.category }}</Badge>
            </div>

            <Badge
              :class="{
                'text-green-500 bg-green-90 dark:bg-green-950 border-green-900':
                  question.difficulty === 'easy',
                'text-yellow-500 bg-yellow-90 dark:bg-yellow-950 border-yellow-900':
                  question.difficulty === 'medium',
                'text-red-500 bg-red-90 dark:bg-red-950 border-red-900':
                  question.difficulty === 'hard'
              }"
              variant="outline"
              >{{ question.difficulty }}</Badge
            >
          </CardHeader>
          <CardContent class="flex flex-col justify-between">
            <CardDescription class="min-h-32">{{ question.question }}</CardDescription>

            <Label for="email">Answer</Label>
            <Input
              v-if="question.type === 'multiple'"
              id="answer"
              v-model="quizStore.answers[quizStore.stepActiveIndex]"
            />
            <Select v-else v-model="quizStore.answers[quizStore.stepActiveIndex]">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="Select an answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true"> True </SelectItem>
                  <SelectItem value="false"> False </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      <Button
        class="hidden md:block"
        variant="outline"
        :disabled="
          quizStore.questions && quizStore.stepActiveIndex === quizStore.questions.length - 1
        "
        @click="quizStore.quizState.question++"
        >Next</Button
      >
    </div>

    <div class="flex gap-16 md:hidden">
      <Button
        variant="outline"
        :disabled="quizStore.stepActiveIndex === 0"
        @click="quizStore.quizState.question--"
        >Prev</Button
      >
      <Button
        variant="outline"
        :disabled="
          quizStore.questions && quizStore.stepActiveIndex === quizStore.questions.length - 1
        "
        @click="quizStore.quizState.question++"
        >Next</Button
      >
    </div>
    <div class="flex gap-8">
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline"> Cancel </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel the quiz? The entered results will not be saved and
              evaluated
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button @click="$emit('quiz-canceled')" type="submit"> Yes, cancel quiz </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button v-if="!quizStore.unansweredQuestions" @click="$emit('quiz-finished')"
        >Finish Quiz</Button
      >
      <Dialog v-else>
        <DialogTrigger as-child>
          <Button> Submit answers </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel quiz</DialogTitle>
            <DialogDescription> Are you sure you want to submit the quiz? </DialogDescription>
          </DialogHeader>
          <div>
            <p>
              You have
              <span
                class="text-transparent bg-gradient-to-r from-[#D247BF] text-xl to-primary bg-clip-text"
                >{{ quizStore.unansweredQuestions }}</span
              >
              unanswered questions
            </p>
          </div>

          <DialogFooter>
            <Button @click="$emit('quiz-finished')">Finish Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
