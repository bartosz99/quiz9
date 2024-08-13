<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area';

import { useResultStore } from '@/stores/index';

const resultStore = useResultStore();

resultStore.getResults();

const data = [
  {
    name: '10%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: '20%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: '30%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: '40%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: '50%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: '60%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  },
  {
    name: '70%',
    total: Math.floor(Math.random() * 2000) + 500,
    predicted: Math.floor(Math.random() * 2000) + 500
  }
];
</script>

<template>
  <div class="flex items-center justify-center mt-16">
    <div class="max-w-5xl w-full">
      <h3>Results by difficulty</h3>
      <AreaChart
        :data="resultStore.resultsForChart"
        index="name"
        :categories="['any', 'easy', 'medium', 'hard']"
      />
    </div>
  </div>
</template>
