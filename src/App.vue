<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";

</script>

<template>
  <Navbar />
  <Hero />

  <div class="flex flex-col items-center justify-center">
     <h3 class="">
          &copy; 2024 Designed and developed by
          <a
            target="_blank"
            href="https://www.linkedin.com/in/b-ciesla/"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Bartosz Cieśla
          </a>
        </h3>
  </div>
</template>
