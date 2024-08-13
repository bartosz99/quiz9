<script setup lang="ts">
import { AreaChart } from '@/components/ui/chart-area';

import { useResultStore } from '@/stores/index';

const resultStore = useResultStore();

resultStore.getResults();
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
