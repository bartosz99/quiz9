<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
const mode = useColorMode();

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-vue-next';
import { Routes } from '@/enums/index';
</script>

<template>
  <section class="container">
    <div class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
      <div class="text-center space-y-8">
        <Badge variant="outline" class="text-sm py-2">
          <span class="mr-2 text-primary">
            <Badge>New</Badge>
          </span>
          <span> Art category available! </span>
        </Badge>

        <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
          <h1>
            Take the
            <span class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
              >challenge
            </span>
            and complete the quiz
          </h1>
        </div>

        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">
          Test your knowledge, complete quiz and compare your results with others!
        </p>

        <div class="space-y-4 md:space-y-0 md:space-x-4">
          <RouterLink :to="Routes.QUIZ">
            <Button class="w-5/6 md:w-1/4 font-bold group/arrow">
              Get Started
              <ArrowRight
                class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform"
              />
            </Button>
          </RouterLink>

          <Button as-child variant="secondary" class="w-5/6 md:w-1/4 font-bold">
            <a href="https://github.com/bartosz99/quiz9" target="_blank">Github respository</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
