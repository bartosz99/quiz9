<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { RouterLink } from 'vue-router';
</script>

<template>
  <section id="faq" class="container max-w-xl py-24 sm:py-32">
    <Card class="">
      <CardHeader>
        <CardTitle>Statistics coming soon...</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Work in progress...</CardDescription>
        <CardDescription>This section is still under the development.</CardDescription>
      </CardContent>
      <CardFooter class="flex justify-between px-6 pb-6">
        <RouterLink to="/home" class="text-muted-foreground">
          <Button variant="outline"> Go to Homepage </Button>
        </RouterLink>
        <RouterLink to="/quiz" class="text-muted-foreground">
          <Button> Take a quiz </Button>
        </RouterLink>
      </CardFooter>
    </Card>
  </section>
</template>
