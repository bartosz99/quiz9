<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

import { Faq } from '@/types';

const FAQList: Faq[] = [
  {
    question: 'Is this quiz free?',
    answer: 'Yes, this quiz is completely free.',
    value: 'item-1'
  },
  {
    question: 'Are my data safe?',
    answer: 'Yes, your date stays in your browser history.',
    value: 'item-2'
  },
  {
    question: 'Which technologies were used to develop this quiz?',
    answer:
      'This quiz was developed using Vue-3 with Composition API, Typescript and vue-shadcn component library.',
    value: 'item-3'
  }
];
</script>

<template>
  <section id="faq" class="container max-w-2xl py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">FAQS</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">Common Questions</h2>
    </div>

    <Accordion type="single" collapsible class="AccordionRoot">
      <AccordionItem v-for="{ question, answer, value } in FAQList" :key="value" :value="value">
        <AccordionTrigger class="text-left"> {{ question }} </AccordionTrigger>

        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <h3 class="font-medium mt-4 text-center">
      Still have questions?
      <a href="#" class="text-muted-foreground">
        <a href="#" class="underline">Contact us</a>
      </a>
    </h3>
  </section>
</template>
