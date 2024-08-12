<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <Toaster />
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer class="mb-8" />
  </div>
</template>
