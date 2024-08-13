<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input';
import { useQuizStore } from '@/store/index';
import { QuizCategories } from '@/constants/index';
import { QuizDifficulty } from '@/enums/index';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type Emits = {
  (event: 'quiz-started'): void;
};

defineEmits<Emits>();

const quizStore = useQuizStore();
</script>

<template>
  <div class="flex flex-col gap-8 flex-grow min-w-full">
    <Button :disabled="!quizStore.nickname" @click="$emit('quiz-started')">Start a test</Button>
    <div>
      <Label for="nickname">Nickname</Label>
      <Input id="nickname" v-model="quizStore.nickname as string" />
    </div>

    <div>
      <Label for="email">Answer</Label>
      <Select v-model="quizStore.preferences.category">
        <SelectTrigger class="">
          <SelectValue placeholder="Select an answer" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup v-for="category in QuizCategories">
            <SelectItem :value="category.value">{{ category.label }}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label for="email">Difficulty</Label>
      <Select v-model="quizStore.preferences.difficulty">
        <SelectTrigger class="">
          <SelectValue placeholder="Select an answer" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="difficulty in QuizDifficulty" :value="difficulty">
              {{ difficulty }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
