<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { useResultStore } from '@/stores/index';

const resultStore = useResultStore();

resultStore.getResults();
</script>

<template>
  <div class="flex flex-grow items-center justify-center mt-16">
    <div class="min-w-2xl flex-growmax-w-4xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> Position </TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Nickname</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead class="text-right"> Amount </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(result, index) in resultStore.results" :key="result.id">
            <TableCell class="font-medium">
              {{ index + 1 }}
            </TableCell>
            <TableCell class="font-medium">
              {{ result.result }}
            </TableCell>
            <TableCell class="font-medium">
              {{ result.nickname }}
            </TableCell>
            <TableCell>{{ result.difficulty }}</TableCell>
            <TableCell class="text-right font-medium">{{ result.created_at }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
