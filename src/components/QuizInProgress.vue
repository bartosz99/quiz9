<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useQuizStore } from '@/store/index';

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
const activeIndex = ref(0);
const isSubmitFormVisible = ref(false);

watchEffect(() => {
  if (quizStore.questions && activeIndex.value + 1 === quizStore.questions.length) {
    isSubmitFormVisible.value = true;
  }
});

type Emits = {
  (event: 'quiz-finished'): void;
};

defineEmits<Emits>();
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <div
      v-for="(question, index) in quizStore.questions"
      v-show="index === quizStore.stepActiveIndex"
      class="flex justify-center items-center gap-4"
      :key="index"
      :id="'step-' + index"
    >
      <Button :disabled="quizStore.stepActiveIndex === 0" @click="quizStore.quizState.question--"
        >Prev</Button
      >
      <Card class="w-[600px] h-[300px]">
        <CardHeader class="flex flex-row justify-between">
          <div class="flex gap-4">
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
      <Button
        :disabled="
          quizStore.questions && quizStore.stepActiveIndex === quizStore.questions.length - 1
        "
        @click="quizStore.quizState.question++"
        >Next</Button
      >
    </div>
    <Button v-if="isSubmitFormVisible" @click="$emit('quiz-finished')">Finish Quiz</Button>
  </div>
</template>
